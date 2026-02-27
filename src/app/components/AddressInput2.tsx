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
  /** Controlled value (e.g. from formik). When provided, typed input is synced back via onAddressChange. */
  value?: string;
  /** Called when the user types in the address field so parent (e.g. formik) can keep address in sync for validation. */
  onAddressChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
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
      // Esperamos a que el objeto google.maps.places esté disponible
      const checkPlaces = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(checkPlaces);
          console.log('Google Maps Places API loaded successfully');
          resolve();
        }
      }, 100);

      // Timeout después de 5 segundos
      setTimeout(() => {
        clearInterval(checkPlaces);
        reject(new Error('Timeout waiting for Google Maps Places API'));
      }, 5000);
    };
    
    script.onerror = () => {
      console.error('Error loading Google Maps script');
      reject(new Error('Error loading Google Maps script'));
    };

    document.head.appendChild(script);
  });
};

const AddressInput: React.FC<Props> = ({ onSelectAddress, value: controlledValue, onAddressChange, error, helperText }) => {
  const [address, setAddress] = useState(controlledValue ?? '');
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
    if (isScriptLoaded && autoCompleteRef.current && !autocomplete) {
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
          const countryComponent = place.address_components?.find((comp: AddressComponent) => comp.types.includes('country'));
          
          if (countryComponent?.short_name !== 'CL') {
            setAddress('');
            onSelectAddress(null);
            alert('Por favor, selecciona una dirección en Chile.');
            return;
          }
          
          // if (stateComponent?.short_name === 'RM' && cityComponent?.long_name === 'Santiago') {
            const streetNumber = place.address_components?.find((comp: AddressComponent) => comp.types.includes('street_number'))?.long_name || null;
            const route = place.address_components?.find((comp: AddressComponent) => comp.types.includes('route'))?.long_name || null;
            const city = cityComponent?.long_name || null;
            const state = stateComponent?.short_name || null;
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
          }
        // } else {
        //   setAddress('');
        //   onSelectAddress(null);
        // }
      });

      setAutocomplete(newAutocomplete);
    }
  }, [isScriptLoaded, onSelectAddress, autocomplete]);

  const displayValue = controlledValue !== undefined ? controlledValue : address;
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== address) {
      setAddress(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setAddress(v);
    onAddressChange?.(v);
  };

  return (
    <div style={{
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: '100%',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.4375em',
      fontFamily: "'Plus Jakarta Sans','Plus Jakarta Sans Fallback',Helvetica,Arial,sans-serif",
      color: '#2A3547',
      boxSizing: 'border-box',
      cursor: 'text',
      display: 'inline-flex',
      WebkitBoxAlign: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      borderRadius: '7px',
      border: '1px solid',
      borderColor: error ? '#d32f2f' : '#e0e0e0'
    }}>
      <input
        ref={autoCompleteRef}
        type="text"
        id="address"
        tabIndex={4} 
        placeholder="Ingresa una dirección en Santiago de Chile"
        value={displayValue}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{
          fontSize: '1rem',
          fontFamily: 'inherit',
          backgroundColor: 'white',
          WebkitFontSmoothing: 'antialiased',
          WebkitTextSizeAdjust: '100%',
          font: 'inherit',
          letterSpacing: 'inherit',
          color: 'currentColor',
          border: 0,
          boxSizing: 'content-box',
          background: 'none',
          height: '1.4375em',
          margin: 0,
          WebkitTapHighlightColor: 'transparent',
          display: 'block',
          minWidth: 0,
          width: '100%',
          animationName: 'mui-auto-fill-cancel',
          animationDuration: '10ms',
          padding: '12px 14px'
        }}
      />
      {error && helperText && (
        <Typography
          variant="caption"
          color="error"
          sx={{
            position: 'absolute',
            bottom: '-20px',
            left: '14px',
            fontSize: '0.75rem'
          }}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export default AddressInput;