import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CarsTable from '../components/Tables/CarsTable';
import CarRegistrationModal from '../components/Modals/CarRegistrationModal';
import MapModal from '../components/Modals/MapModal';
import { Plus, MapPin, X } from 'lucide-react';
import { toast } from 'react-toastify';

const AllCars = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['/api/cars'],
  });

  const createCarMutation = useMutation({
    mutationFn: async (carData) => {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error('Failed to create car');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      setIsCarModalOpen(false);
      toast.success(t('carAdded'));
    },
    onError: () => {
      toast.error('Failed to add car');
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: async (carId) => {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      toast.success(t('carDeleted'));
    },
    onError: () => {
      toast.error('Failed to delete car');
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cars'] });
      toast.success(t('carUpdated'));
    },
    onError: () => {
      toast.error('Failed to update car');
    },
  });

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || car.status === statusFilter;
    const matchesBrand = !brandFilter || car.make.toLowerCase() === brandFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesBrand;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setBrandFilter('');
  };

  const handleCarSubmit = (carData) => {
    createCarMutation.mutate(carData);
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCarMutation.mutate(carId);
    }
  };

  const handleUpdateCar = (carId, updates) => {
    updateCarMutation.mutate({ id: carId, ...updates });
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
                {t('allCars')}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('manageCars')}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsMapModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {t('viewOnMap')}
              </Button>
              <Button
                onClick={() => setIsCarModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('addNewCar')}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder={t('searchCars')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('allStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allStatus')}</SelectItem>
                <SelectItem value="active">{t('active')}</SelectItem>
                <SelectItem value="inactive">{t('inactive')}</SelectItem>
                <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('allBrands')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allBrands')}</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              {t('clearFilters')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cars Table */}
      <Card>
        <CarsTable 
          cars={filteredCars}
          onDelete={handleDeleteCar}
          onUpdate={handleUpdateCar}
          onViewMap={(car) => setIsMapModalOpen(true)}
        />
      </Card>

      {/* Modals */}
      <CarRegistrationModal
        isOpen={isCarModalOpen}
        onClose={() => setIsCarModalOpen(false)}
        onSubmit={handleCarSubmit}
        isLoading={createCarMutation.isPending}
      />

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        cars={cars}
      />
    </div>
  );
};

export default AllCars;
