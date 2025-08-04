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
import Pagination from '../Common/Pagination';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

const UsersTable = ({ users, onActivate, onDeactivate, onDelete, isUpdating }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-badge active',
      inactive: 'status-badge inactive',
      suspended: 'status-badge suspended',
    };

    return (
      <Badge className={statusClasses[status] || 'status-badge'}>
        {t(status)}
      </Badge>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400',
      user: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400',
      driver: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    };

    return (
      <Badge className={roleColors[role] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400'}>
        {t(role)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return formatDate(dateString);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="admin-table-header">
            <TableRow>
              <TableHead>{t('user')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>{t('joinDate')}</TableHead>
              <TableHead>{t('lastActive')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} className="admin-table-row transition-theme">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {formatDate(user.joinDate)}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(user.lastActive)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeactivate(user.id)}
                        disabled={isUpdating}
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        {t('deactivate')}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onActivate(user.id)}
                        disabled={isUpdating}
                        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {t('activate')}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(user.id)}
                      disabled={isUpdating}
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      {t('delete')}
                    </Button>
                  </div>
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
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default UsersTable;
