// src/unregisterSW.js
// Dieses Skript entfernt alle Service Worker, die zuvor registriert wurden

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      console.log('Service Worker deregistriert:', registration);
      registration.unregister();
    }
  });
}
