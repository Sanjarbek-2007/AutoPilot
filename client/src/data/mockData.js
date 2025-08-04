// This file is kept for reference but real data comes from the API
export const mockStats = {
  totalCars: 1247,
  activeUsers: 8942,
  pendingReports: 23,
  revenue: '$127,890'
};

export const mockRecentActivity = [
  {
    id: 1,
    type: 'car_registered',
    message: 'New car registered: Toyota Camry 2024',
    timestamp: '2 minutes ago',
    color: 'blue'
  },
  {
    id: 2,
    type: 'user_activated',
    message: 'User account activated: jane.doe@example.com',
    timestamp: '15 minutes ago',
    color: 'green'
  },
  {
    id: 3,
    type: 'report_submitted',
    message: 'New report submitted: Accident Report #1247',
    timestamp: '1 hour ago',
    color: 'yellow'
  }
];
