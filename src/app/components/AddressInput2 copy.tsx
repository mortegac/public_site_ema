"use client";

/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Props {
  onSelectAddress: (addressDetails: {
    StreetAddress: string | null;
    City: string | null;
    State: string | null;
    ZipCode: string | null;
    Country: string | null;
    Latitude: number | null;
    Longitude: number | null;
  } | null) => void;
}

const KEY = "AIzaSyBdAjJeBoZ8ehrL0byX2ZBHHtQSI6pfIvQ";

const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
    script.async = true;
    
    script.onload = () => {
      // Esperamos un momento para asegurarnos de que todo esté inicializado
      setTimeout(() => {
        if (window.google?.maps?.places) {
          console.log('Google Maps script loaded successfully');
          resolve();
        } else {
          reject(new Error('Google Maps Places API not available'));
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('Error loading Google Maps script');
      reject(new Error('Error loading Google Maps script'));
    };

    document.head.appendChild(script);
  });
};

const AddressInput: React.FC<Props> = ({ onSelectAddress }) => {
  const [address, setAddress] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript();
        setIsScriptLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps script:', error);
      }
    };

    initializeGoogleMaps();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!isScriptLoaded || !autoCompleteRef.current || autocomplete || !window.google?.maps?.places) {
        return;
      }

      try {
        const newAutocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'cl' },
          fields: ['address_components', 'geometry', 'formatted_address']
        });

        newAutocomplete.addListener('place_changed', () => {
          const place = newAutocomplete.getPlace();
          if (place?.geometry) {
            console.log('Lugar seleccionado:', place);
            setAddress(place.formatted_address || '');

            const stateComponent = place.address_components?.find((comp: AddressComponent) => comp.types.includes('administrative_area_level_1'));
            const cityComponent = place.address_components?.find((comp: AddressComponent) => comp.types.includes('locality'));
            
            if (stateComponent?.short_name === 'RM' && cityComponent?.long_name === 'Santiago') {
              const streetNumber = place.address_components?.find((comp: AddressComponent) => comp.types.includes('street_number'))?.long_name || null;
              const route = place.address_components?.find((comp: AddressComponent) => comp.types.includes('route'))?.long_name || null;
              const city = cityComponent.long_name || null;
              const state = stateComponent.short_name || null;
              const zipCode = place.address_components?.find((comp: AddressComponent) => comp.types.includes('postal_code'))?.long_name || null;
              const country = place.address_components?.find((comp: AddressComponent) => comp.types.includes('country'))?.long_name || null;
              const latitude = place.geometry?.location?.lat() || null;
              const longitude = place.geometry?.location?.lng() || null;
              const streetAddress = streetNumber && route ? `${streetNumber} ${route}` : (streetNumber || route || null);

              onSelectAddress({
                StreetAddress: streetAddress,
                City: city,
                State: state,
                ZipCode: zipCode,
                Country: country,
                Latitude: latitude,
                Longitude: longitude,
              });
            } else {
              setAddress('');
              onSelectAddress(null);
              alert('Por favor, selecciona una dirección en Santiago de Chile.');
            }
          } else {
            setAddress('');
            onSelectAddress(null);
          }
        });

        setAutocomplete(newAutocomplete);
      } catch (error) {
        console.error('Error initializing Autocomplete:', error);
      }
    };

    initializeAutocomplete();
  }, [isScriptLoaded, onSelectAddress, autocomplete]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div className='w-full'>
      <input
        ref={autoCompleteRef}
        type="text"
        id="address"
        tabIndex={4} 
        placeholder="Ingresa una dirección en Santiago de Chile"
        value={address}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{
          height: '40px',
          fontSize: '1rem',
          fontFamily: 'inherit',
          backgroundColor: 'white'
        }}
      />
    </div>
  );
};

export default AddressInput;