import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Pagination from '../Common/Pagination';
import { MoreHorizontal, Eye, CheckCircle, Trash2 } from 'lucide-react';

const ReportsTable = ({ reports, onView, onResolve, onDelete, isUpdating }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = reports.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-badge pending',
      reviewed: 'status-badge reviewed',
      resolved: 'status-badge resolved',
    };

    return (
      <Badge className={statusClasses[status] || 'status-badge'}>
        {t(status)}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      accident: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
      maintenance: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400',
      complaint: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400',
      feedback: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    };

    return (
      <Badge className={typeColors[type] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400'}>
        {t(type)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateMessage = (message, maxLength = 80) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="admin-table-header">
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>{t('user')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead>{t('message')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id} className="admin-table-row transition-theme">
                <TableCell className="font-medium">
                  #{report.id.slice(-6)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={report.user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt={`${report.user.firstName} ${report.user.lastName}`}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {report.user.firstName} {report.user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {report.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(report.type)}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {truncateMessage(report.message)}
                  </p>
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {formatDate(report.createdAt)}
                </TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={isUpdating}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(report)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t('view')}
                      </DropdownMenuItem>
                      {report.status !== 'resolved' && (
                        <DropdownMenuItem 
                          onClick={() => onResolve(report.id)}
                          className="text-green-600 dark:text-green-400"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(report.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={reports.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ReportsTable;
