import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  FileText, 
  User 
} from 'lucide-react';
import logoDark from '@assets/Logo_1754323886231.png';
import logoLight from '@assets/night logo_1754323886231.png';

const Sidebar = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  const menuItems = [
    { 
      path: '/', 
      label: t('dashboard'), 
      icon: LayoutDashboard 
    },
    { 
      path: '/cars', 
      label: t('allCars'), 
      icon: Car 
    },
    { 
      path: '/users', 
      label: t('allUsers'), 
      icon: Users 
    },
    { 
      path: '/reports', 
      label: t('reports'), 
      icon: FileText 
    },
    { 
      path: '/profile', 
      label: t('profile'), 
      icon: User 
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location === '/';
    }
    return location.startsWith(path);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="h-10 w-10 mr-3">
          <img 
            src={isDark ? logoLight : logoDark} 
            alt="CarAdmin Logo" 
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-white">CarAdmin</h1>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleLinkClick}
                className={`
                  group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${active 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon 
                  className={`mr-3 h-5 w-5 ${
                    active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                  }`} 
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
