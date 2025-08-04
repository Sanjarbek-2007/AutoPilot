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
import { MoreHorizontal, Edit, MapPin, Trash2, ArrowUpDown } from 'lucide-react';

const CarsTable = ({ cars, onDelete, onUpdate, onViewMap }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (!sortBy) return 0;
    
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCars = sortedCars.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-badge active',
      inactive: 'status-badge inactive',
      maintenance: 'status-badge maintenance',
    };

    return (
      <Badge className={statusClasses[status] || 'status-badge'}>
        {t(status)}
      </Badge>
    );
  };

  const SortableHeader = ({ column, children }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="admin-table-header">
            <TableRow>
              <SortableHeader column="id">ID</SortableHeader>
              <TableHead>{t('carName')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <SortableHeader column="owner">{t('owner')}</SortableHeader>
              <SortableHeader column="year">{t('year')}</SortableHeader>
              <TableHead>{t('location')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCars.map((car) => (
              <TableRow key={car.id} className="admin-table-row transition-theme">
                <TableCell className="font-medium">#{car.id.slice(-6)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={car.image || "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                      alt={`${car.make} ${car.model}`}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {car.make} {car.model} {car.year}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {car.licensePlate}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(car.status)}</TableCell>
                <TableCell>{car.owner}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {car.location}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUpdate(car.id, { status: car.status === 'active' ? 'inactive' : 'active' })}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewMap(car)}>
                        <MapPin className="mr-2 h-4 w-4" />
                        {t('viewOnMap')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(car.id)}
                        className="text-red-600 dark:text-red-400"# thoughts

I need to create a comprehensive React-based admin dashboard for car management with the following key requirements:

1. **Authentication System**: Token-based authentication with automatic redirect for missing/expired tokens
2. **Dashboard Pages**: All Cars, All Users, Reports, Profile with proper navigation
3. **Data Management**: CRUD operations for cars, users, and reports with filtering, sorting, and search
4. **Map Integration**: Real-time car location display using Leaflet
5. **Multilingual Support**: i18next integration for Uzbek, Russian, and English
6. **Theme System**: Light/dark mode toggle with localStorage persistence
7. **Responsive Design**: Mobile and desktop optimized
8. **Role-based Access**: Admin features with proper permission controls
9. **Toast Notifications**: Using react-toastify for user feedback
10. **Logo Integration**: Use provided logos appropriately (dark logo for light theme, light logo for dark theme)

The project structure shows that the backend API routes and storage are already implemented, so I need to focus on the frontend React components that will consume these APIs. I need to create a modern, professional admin interface that matches the design reference while ensuring all functionality works seamlessly.

Key implementation points:
- Use React Context for authentication, theme, and language state management
- Implement proper token validation and redirect logic
- Create responsive tables with pagination, sorting, and filtering
- Integrate Leaflet maps for car location visualization
- Use react-toastify for notifications
- Implement proper form validation and error handling
- Use the provided car logos correctly based on theme
- Store user preferences in localStorage
- Ensure proper role-based access control

# useful_guidelines_from_blueprints

- Always prefer using in-memory storage (MemStorage) unless asked to use a database
- Use wouter for routing on the frontend and register pages in client/src/App.tsx
- Always use @tanstack/react-query when fetching data with proper typing
- Use shadcn's useForm hook and Form component for forms with zodResolver validation
- Use icons from lucide-react for actions and visual cues
- When defining custom properties in index.css, always use proper HSL format like hsl(20, 14.3%, 4.1%) for colors
- Store theme and language preferences in localStorage
- Use CSS variables for theming with :root and .dark classes

# directory_structure

```json
[
    {"path": "client/index.html", "status": "overwritten"},
    {"path": "client/src/main.tsx", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "client/src/utils/i18n.js", "status": "new"},
    {"path": "client/src/contexts/AuthContext.jsx", "status": "new"},
    {"path": "client/src/contexts/ThemeContext.jsx", "status": "new"},
    {"path": "client/src/contexts/LanguageContext.jsx", "status": "new"},
    {"path": "client/src/components/ProtectedRoute.jsx", "status": "new"},
    {"path": "client/src/pages/Login.jsx", "status": "new"},
    {"path": "client/src/pages/Dashboard.jsx", "status": "new"},
    {"path": "client/src/pages/AllCars.jsx", "status": "new"},
    {"path": "client/src/pages/AllUsers.jsx", "status": "new"},
    {"path": "client/src/pages/Reports.jsx", "status": "new"},
    {"path": "client/src/pages/Profile.jsx", "status": "new"},
    {"path": "client/src/components/Layout/Layout.jsx", "status": "new"},
    {"path": "client/src/components/Layout/Sidebar.jsx", "status": "new"},
    {"path": "client/src/components/Layout/TopHeader.jsx", "status": "new"},
    {"path": "client/src/components/Tables/CarsTable.jsx", "status": "new"},
    {"path": "client/src/components/Tables/UsersTable.jsx", "status": "new"},
    {"path": "client/src/components/Tables/ReportsTable.jsx", "status": "new"},
    {"path": "client/src/components/Modals/CarRegistrationModal.jsx", "status": "new"},
    {"path": "client/src/components/Modals/MapModal.jsx", "status": "new"},
    {"path": "client/src/components/Common/Pagination.jsx", "status": "new"},
    {"path": "client/src/components/ui/toaster.tsx", "status": "overwritten"}
]
