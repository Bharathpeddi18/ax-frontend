"use client";

import { useEffect } from "react";

export const ServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'development') {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      } else {
        navigator.serviceWorker
          .register('/sw.js')
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
    }
  }, []);

  return null;
};

export default ServiceWorker;