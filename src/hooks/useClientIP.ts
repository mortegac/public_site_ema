import { useState, useEffect } from 'react';

export const useClientIP = () => {
  const [ip, setIp] = useState<string>('unknown');

  useEffect(() => {
    // Usar un servicio externo para obtener la IP del cliente
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setIp(data.ip);
      })
      .catch(() => {
        // Fallback si falla la API
        setIp('unknown');
      });
  }, []);

  return ip;
}; 