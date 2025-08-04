import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const MapModal = ({ isOpen, onClose, cars }) => {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (isOpen && mapRef.current && window.L && !mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = window.L.map(mapRef.current).setView([40.7128, -74.0060], 10);
      
      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers for cars with location data
      cars.forEach(car => {
        if (car.latitude && car.longitude) {
          const lat = parseFloat(car.latitude);
          const lng = parseFloat(car.longitude);
          
          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = window.L.marker([lat, lng]).addTo(map);
            
            // Create popup content
            const popupContent = `
              <div class="p-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  ${car.make} ${car.model} ${car.year}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Plate:</strong> ${car.licensePlate}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Owner:</strong> ${car.owner}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Status:</strong> ${car.status}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Location:</strong> ${car.location || 'Unknown'}
                </p>
              </div>
            `;
            
            marker.bindPopup(popupContent);
          }
        }
      });

      // Fit map bounds to show all markers
      const validCars = cars.filter(car => car.latitude && car.longitude && 
        !isNaN(parseFloat(car.latitude)) && !isNaN(parseFloat(car.longitude)));
      
      if (validCars.length > 0) {
        const group = new window.L.featureGroup(
          validCars.map(car => 
            window.L.marker([parseFloat(car.latitude), parseFloat(car.longitude)])
          )
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, cars]);

  const handleClose = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              {t('carLocationsMap')}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 pt-2">
          {window.L ? (
            <div ref={mapRef} className="w-full h-full rounded-lg border" />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <div className="text-6xl mb-4">🗺️</div>
                <h4 className="text-xl font-semibold mb-2">{t('interactiveMap')}</h4>
                <p className="text-sm">{t('mapDescription')}</p>
                <p className="text-xs mt-2 opacity-75">Loading map...</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
