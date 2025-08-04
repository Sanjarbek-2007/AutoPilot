import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportsTable from '../components/Tables/ReportsTable';
import { Download, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Reports = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['/api/reports'],
  });

  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
  });

  const updateReportMutation = useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const response = await fetch(`/api/reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update report');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
      toast.success(t('reportResolved'));
    },
    onError: () => {
      toast.error('Failed to update report');
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: async (reportId) => {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete report');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
      toast.success(t('reportDeleted'));
    },
    onError: () => {
      toast.error('Failed to delete report');
    },
  });

  // Create a map of user IDs to user data for easy lookup
  const usersMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  // Enrich reports with user data
  const enrichedReports = reports.map(report => ({
    ...report,
    user: usersMap[report.userId] || { firstName: 'Unknown', lastName: 'User', email: '', avatar: '' }
  }));

  const filteredReports = enrichedReports.filter(report => {
    const matchesSearch = report.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !typeFilter || report.type === typeFilter;
    const matchesStatus = !statusFilter || report.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter) {
      const reportDate = new Date(report.createdAt).toDateString();
      const filterDate = new Date(dateFilter).toDateString();
      matchesDate = reportDate === filterDate;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setStatusFilter('');
    setDateFilter('');
  };

  const handleResolveReport = (reportId) => {
    updateReportMutation.mutate({ 
      id: reportId, 
      status: 'resolved',
      resolvedAt: new Date().toISOString()
    });
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteReportMutation.mutate(reportId);
    }
  };

  const handleViewReport = (report) => {
    // In a real app, this would open a detailed view modal
    alert(`Report Details:\n\nType: ${report.type}\nUser: ${report.user.firstName} ${report.user.lastName}\nMessage: ${report.message}\nStatus: ${report.status}\nDate: ${new Date(report.createdAt).toLocaleDateString()}`);
  };

  const handleExportReports = () => {
    // In a real app, this would generate and download a CSV/PDF file
    toast.info('Export functionality would be implemented here');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {t('reports')}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('manageReports')}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleExportReports}
                className="border-gray-300 dark:border-gray-600"
              >
                <Download className="mr-2 h-4 w-4" />
                {t('exportReports')}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder={t('searchReports')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('allTypes')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allTypes')}</SelectItem>
                <SelectItem value="accident">{t('accident')}</SelectItem>
                <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
                <SelectItem value="complaint">{t('complaint')}</SelectItem>
                <SelectItem value="feedback">{t('feedback')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('allStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allStatus')}</SelectItem>
                <SelectItem value="pending">{t('pending')}</SelectItem>
                <SelectItem value="reviewed">{t('reviewed')}</SelectItem>
                <SelectItem value="resolved">{t('resolved')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
            
            <Button variant="outline" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <ReportsTable 
          reports={filteredReports}
          onView={handleViewReport}
          onResolve={handleResolveReport}
          onDelete={handleDeleteReport}
          isUpdating={updateReportMutation.isPending}
        />
      </Card>
    </div>
  );
};

export default Reports;
