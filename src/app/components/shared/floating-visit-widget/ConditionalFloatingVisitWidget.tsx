'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingVisitWidget from './index';

const STORAGE_KEY = 'floatingVisitWidgetClosed';
const NOT_ALLOWED_PATHS = [
  '/agenda',
  '/agenda/recibo-pago',
  '/cotizador',
  '/return',
  '/cargadores-vehiculos-electricos-sin-instalacion',
  '/cargadores-en-edificios',
  '/postulacion-cargadores-edificios',
];

const ConditionalFloatingVisitWidget = () => {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    // Verificar si el widget fue cerrado previamente en esta sesión
    const wasClosed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    
    // No mostrar el widget si:
    // 1. Está en /agenda, /agenda/recibo-pago, /cotizador
    // 2. Fue cerrado previamente en esta sesión
    const isPathNotAllowed = NOT_ALLOWED_PATHS.includes(pathname);

    if (isPathNotAllowed || wasClosed) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
  }, [pathname]);
  
  if (!shouldShow) {
    return null;
  }
  
  return <FloatingVisitWidget />;
};

export default ConditionalFloatingVisitWidget;
