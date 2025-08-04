import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      allCars: "All Cars",
      allUsers: "All Users",
      reports: "Reports",
      profile: "Profile",
      
      // Authentication
      signIn: "Sign in to your account",
      adminDashboardAccess: "Admin Dashboard Access",
      emailAddress: "Email address",
      password: "Password",
      signInButton: "Sign in",
      logout: "Logout",
      
      // Dashboard
      totalCars: "Total Cars",
      activeUsers: "Active Users",
      pendingReports: "Pending Reports",
      monthlyRevenue: "Monthly Revenue",
      recentActivity: "Recent Activity",
      
      // Cars
      manageCars: "Manage your fleet of vehicles",
      viewOnMap: "View on Map",
      addNewCar: "Add New Car",
      searchCars: "Search cars...",
      allStatus: "All Status",
      active: "Active",
      inactive: "Inactive",
      maintenance: "Maintenance",
      allBrands: "All Brands",
      clearFilters: "Clear Filters",
      carName: "Car Name",
      
      // Users
      manageUsers: "Manage user accounts and permissions",
      addNewUser: "Add New User",
      searchUsers: "Search users...",
      allRoles: "All Roles",
      admin: "Admin",
      user: "User",
      driver: "Driver",
      activate: "Activate",
      deactivate: "Deactivate",
      delete: "Delete",
      
      // Reports
      manageReports: "View and manage user-submitted reports",
      exportReports: "Export Reports",
      searchReports: "Search reports...",
      allTypes: "All Types",
      accident: "Accident",
      complaint: "Complaint",
      feedback: "Feedback",
      pending: "Pending",
      reviewed: "Reviewed",
      resolved: "Resolved",
      
      // Profile
      profileSettings: "Profile Settings",
      managePersonalInfo: "Manage your personal information and preferences",
      changePhoto: "Change Photo",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      bio: "Bio",
      preferences: "Preferences",
      preferredLanguage: "Preferred Language",
      timeZone: "Time Zone",
      security: "Security",
      changePassword: "Change Password",
      twoFactorAuth: "Two-Factor Authentication",
      twoFactorDesc: "Add an extra layer of security to your account",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      
      // Car Registration
      registerNewCar: "Register New Car",
      carMake: "Car Make",
      model: "Model",
      year: "Year",
      licensePlate: "License Plate",
      ownerName: "Owner Name",
      status: "Status",
      selectStatus: "Select Status",
      registerCar: "Register Car",
      
      // Map
      carLocationsMap: "Car Locations - Real-time Map",
      interactiveMap: "Interactive Map",
      mapDescription: "Car locations will be displayed here using Leaflet.js",
      
      // Common
      actions: "Actions",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      close: "Close",
      save: "Save",
      edit: "Edit",
      view: "View",
      location: "Location",
      date: "Date",
      type: "Type",
      message: "Message",
      owner: "Owner",
      joinDate: "Join Date",
      lastActive: "Last Active",
      
      // Notifications
      loginSuccess: "Successfully logged in",
      loginError: "Invalid credentials",
      profileUpdated: "Profile updated successfully",
      carAdded: "Car added successfully",
      carUpdated: "Car updated successfully",
      carDeleted: "Car deleted successfully",
      userActivated: "User activated successfully",
      userDeactivated: "User deactivated successfully",
      userDeleted: "User deleted successfully",
      reportResolved: "Report marked as resolved",
      reportDeleted: "Report deleted successfully",
    }
  },
  ru: {
    translation: {
      // Navigation
      dashboard: "Панель управления",
      allCars: "Все автомобили",
      allUsers: "Все пользователи",
      reports: "Отчеты",
      profile: "Профиль",
      
      // Authentication
      signIn: "Войти в аккаунт",
      adminDashboardAccess: "Доступ к панели администратора",
      emailAddress: "Адрес электронной почты",
      password: "Пароль",
      signInButton: "Войти",
      logout: "Выйти",
      
      // Dashboard
      totalCars: "Всего автомобилей",
      activeUsers: "Активные пользователи",
      pendingReports: "Ожидающие отчеты",
      monthlyRevenue: "Месячный доход",
      recentActivity: "Последняя активность",
      
      // Cars
      manageCars: "Управление автопарком",
      viewOnMap: "Показать на карте",
      addNewCar: "Добавить автомобиль",
      searchCars: "Поиск автомобилей...",
      allStatus: "Все статусы",
      active: "Активный",
      inactive: "Неактивный",
      maintenance: "Обслуживание",
      allBrands: "Все марки",
      clearFilters: "Очистить фильтры",
      carName: "Название автомобиля",
      
      // Users
      manageUsers: "Управление пользователями и разрешениями",
      addNewUser: "Добавить пользователя",
      searchUsers: "Поиск пользователей...",
      allRoles: "Все роли",
      admin: "Администратор",
      user: "Пользователь",
      driver: "Водитель",
      activate: "Активировать",
      deactivate: "Деактивировать",
      delete: "Удалить",
      
      // Reports
      manageReports: "Просмотр и управление отчетами пользователей",
      exportReports: "Экспорт отчетов",
      searchReports: "Поиск отчетов...",
      allTypes: "Все типы",
      accident: "Авария",
      complaint: "Жалоба",
      feedback: "Отзыв",
      pending: "Ожидает",
      reviewed: "Рассмотрен",
      resolved: "Решен",
      
      // Profile
      profileSettings: "Настройки профиля",
      managePersonalInfo: "Управление личной информацией и настройками",
      changePhoto: "Изменить фото",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная почта",
      phone: "Телефон",
      bio: "О себе",
      preferences: "Настройки",
      preferredLanguage: "Предпочитаемый язык",
      timeZone: "Часовой пояс",
      security: "Безопасность",
      changePassword: "Изменить пароль",
      twoFactorAuth: "Двухфакторная аутентификация",
      twoFactorDesc: "Добавить дополнительный уровень безопасности",
      cancel: "Отмена",
      saveChanges: "Сохранить изменения",
      
      // Car Registration
      registerNewCar: "Регистрация нового автомобиля",
      carMake: "Марка автомобиля",
      model: "Модель",
      year: "Год",
      licensePlate: "Номерной знак",
      ownerName: "Имя владельца",
      status: "Статус",
      selectStatus: "Выберите статус",
      registerCar: "Зарегистрировать",
      
      // Map
      carLocationsMap: "Карта расположения автомобилей",
      interactiveMap: "Интерактивная карта",
      mapDescription: "Местоположения автомобилей будут отображены здесь",
      
      // Common
      actions: "Действия",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успех",
      close: "Закрыть",
      save: "Сохранить",
      edit: "Редактировать",
      view: "Просмотр",
      location: "Местоположение",
      date: "Дата",
      type: "Тип",
      message: "Сообщение",
      owner: "Владелец",
      joinDate: "Дата регистрации",
      lastActive: "Последняя активность",
      
      // Notifications
      loginSuccess: "Успешный вход в систему",
      loginError: "Неверные учетные данные",
      profileUpdated: "Профиль успешно обновлен",
      carAdded: "Автомобиль успешно добавлен",
      carUpdated: "Автомобиль успешно обновлен",
      carDeleted: "Автомобиль успешно удален",
      userActivated: "Пользователь успешно активирован",
      userDeactivated: "Пользователь успешно деактивирован",
      userDeleted: "Пользователь успешно удален",
      reportResolved: "Отчет отмечен как решенный",
      reportDeleted: "Отчет успешно удален",
    }
  },
  uz: {
    translation: {
      // Navigation
      dashboard: "Boshqaruv paneli",
      allCars: "Barcha mashinalar",
      allUsers: "Barcha foydalanuvchilar",
      reports: "Hisobotlar",
      profile: "Profil",
      
      // Authentication
      signIn: "Hisobingizga kiring",
      adminDashboardAccess: "Admin paneliga kirish",
      emailAddress: "Elektron pochta manzili",
      password: "Parol",
      signInButton: "Kirish",
      logout: "Chiqish",
      
      // Dashboard
      totalCars: "Jami mashinalar",
      activeUsers: "Faol foydalanuvchilar",
      pendingReports: "Kutilayotgan hisobotlar",
      monthlyRevenue: "Oylik daromad",
      recentActivity: "So'nggi faoliyat",
      
      // Cars
      manageCars: "Transport vositalarini boshqarish",
      viewOnMap: "Xaritada ko'rish",
      addNewCar: "Yangi mashina qo'shish",
      searchCars: "Mashinalarni qidirish...",
      allStatus: "Barcha holatlar",
      active: "Faol",
      inactive: "Nofaol",
      maintenance: "Ta'mirlash",
      allBrands: "Barcha brendlar",
      clearFilters: "Filtrlarni tozalash",
      carName: "Mashina nomi",
      
      // Users
      manageUsers: "Foydalanuvchilar va ruxsatlarni boshqarish",
      addNewUser: "Yangi foydalanuvchi qo'shish",
      searchUsers: "Foydalanuvchilarni qidirish...",
      allRoles: "Barcha rollar",
      admin: "Administrator",
      user: "Foydalanuvchi",
      driver: "Haydovchi",
      activate: "Faollashtirish",
      deactivate: "Faolsizlantirish",
      delete: "O'chirish",
      
      // Reports
      manageReports: "Foydalanuvchi hisobotlarini ko'rish va boshqarish",
      exportReports: "Hisobotlarni eksport qilish",
      searchReports: "Hisobotlarni qidirish...",
      allTypes: "Barcha turlar",
      accident: "Avariya",
      complaint: "Shikoyat",
      feedback: "Fikr-mulohaza",
      pending: "Kutilmoqda",
      reviewed: "Ko'rib chiqilgan",
      resolved: "Hal qilingan",
      
      // Profile
      profileSettings: "Profil sozlamalari",
      managePersonalInfo: "Shaxsiy ma'lumotlar va sozlamalarni boshqarish",
      changePhoto: "Rasmni o'zgartirish",
      firstName: "Ism",
      lastName: "Familiya",
      email: "Elektron pochta",
      phone: "Telefon",
      bio: "O'zim haqimda",
      preferences: "Sozlamalar",
      preferredLanguage: "Afzal ko'rgan til",
      timeZone: "Vaqt zonasi",
      security: "Xavfsizlik",
      changePassword: "Parolni o'zgartirish",
      twoFactorAuth: "Ikki faktorli autentifikatsiya",
      twoFactorDesc: "Hisobingizga qo'shimcha xavfsizlik qatlami qo'shing",
      cancel: "Bekor qilish",
      saveChanges: "O'zgarishlarni saqlash",
      
      // Car Registration
      registerNewCar: "Yangi mashina ro'yxatga olish",
      carMake: "Mashina markasi",
      model: "Model",
      year: "Yil",
      licensePlate: "Davlat raqami",
      ownerName: "Egasi nomi",
      status: "Holat",
      selectStatus: "Holatni tanlang",
      registerCar: "Ro'yxatga olish",
      
      // Map
      carLocationsMap: "Mashinalar joylashuvi xaritasi",
      interactiveMap: "Interaktiv xarita",
      mapDescription: "Mashinalar joylashuvi bu yerda ko'rsatiladi",
      
      // Common
      actions: "Amallar",
      loading: "Yuklanmoqda...",
      error: "Xato",
      success: "Muvaffaqiyat",
      close: "Yopish",
      save: "Saqlash",
      edit: "Tahrirlash",
      view: "Ko'rish",
      location: "Joylashuv",
      date: "Sana",
      type: "Tur",
      message: "Xabar",
      owner: "Egasi",
      joinDate: "Ro'yxatga olingan sana",
      lastActive: "So'nggi faollik",
      
      // Notifications
      loginSuccess: "Muvaffaqiyatli kirildi",
      loginError: "Noto'g'ri ma'lumotlar",
      profileUpdated: "Profil muvaffaqiyatli yangilandi",
      carAdded: "Mashina muvaffaqiyatli qo'shildi",
      carUpdated: "Mashina muvaffaqiyatli yangilandi",
      carDeleted: "Mashina muvaffaqiyatli o'chirildi",
      userActivated: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      userDeactivated: "Foydalanuvchi muvaffaqiyatli faolsizlantirildi",
      userDeleted: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      reportResolved: "Hisobot hal qilingan deb belgilandi",
      reportDeleted: "Hisobot muvaffaqiyatli o'chirildi",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
