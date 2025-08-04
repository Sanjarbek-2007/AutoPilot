import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { use# thoughts

Looking at the request, I need to create a React-based admin dashboard for car management with:
1. Token-based authentication with automatic redirect for missing/expired tokens
2. Dashboard with sidebar navigation (All Cars, All Users, Reports, Profile)
3. Car management with table views, filtering, sorting, search, and map integration
4. User management with activate/deactivate/delete functionality
5. Reports management with filtering and search
6. Profile management for user information updates
7. Multilingual support (Uzbek, Russian, English) using i18next
8. Light/dark theme toggle with localStorage persistence
9. Responsive design for mobile and desktop
10. Role-based access control
11. Map integration using Leaflet
12. Toast notifications using react-toastify
13. Pagination for large datasets
14. Integration of provided logos for both themes

The design reference shows a comprehensive admin interface with professional styling, soft color schemes, and all the required functionality. I need to convert this to a React application using the existing project structure and ensuring it works with simple npm install/npm start commands.

Key implementation points:
- Use React Context for authentication, theme, and language state management
- Implement proper token validation and redirect logic
- Create all the required pages and components
- Integrate i18next for multilingual support
- Use Leaflet for map functionality
- Implement react-toastify for notifications
- Use the provided logos appropriately (dark logo for light theme, light logo for dark theme)
- Ensure responsive design with proper mobile/desktop breakpoints
- Store preferences in localStorage
- Use dummy data for all sections as requested

# useful_guidelines_from_blueprints

- Always prefer using in-memory storage (MemStorage) unless asked to use a database
- Make sure to update IStorage in server/storage.ts to accommodate any storage CRUD operations needed
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
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/storage.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "client/src/components/ui/toaster.tsx", "status": "overwritten"},
    {"path": "client/src/contexts/AuthContext.jsx", "status": "new"},
    {"path": "client/src/contexts/ThemeContext.jsx", "status": "new"},
    {"path": "client/src/contexts/LanguageContext.jsx", "status": "new"},
    {"path": "client/src/pages/Login.jsx", "status": "new"},
    {"path": "client/src/pages/Dashboard.jsx", "status": "new"},
    {"path": "client/src/pages/AllCars.jsx", "status": "new"},
    {"path": "client/src/pages/AllUsers.jsx", "status": "new"},
    {"path": "client/src/pages/Reports.jsx", "status": "new"},
    {"path": "client/src/pages/Profile.jsx", "status": "new"},
    {"path": "client/src/components/Layout/Sidebar.jsx", "status": "new"},
    {"path": "client/src/components/Layout/TopHeader.jsx", "status": "new"},
    {"path": "client/src/components/Layout/Layout.jsx", "status": "new"},
    {"path": "client/src/components/Modals/CarRegistrationModal.jsx", "status": "new"},
    {"path": "client/src/components/Modals/MapModal.jsx", "status": "new"},
    {"path": "client/src/components/Tables/CarsTable.jsx", "status": "new"},
    {"path": "client/src/components/Tables/UsersTable.jsx", "status": "new"},
    {"path": "client/src/components/Tables/ReportsTable.jsx", "status": "new"},
    {"path": "client/src/services/api.js", "status": "new"},
    {"path": "client/src/data/dummyData.js", "status": "new"},
    {"path": "client/src/utils/i18n.js", "status": "new"},
    {"path": "client/src/main.tsx", "status": "overwritten"},
    {"path": "client/index.html", "status": "overwritten"}
]
