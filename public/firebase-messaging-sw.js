
//  * Here is is the code snippet to initialize Firebase Messaging in the Service
//  * Worker when your app is not hosted on Firebase Hosting.

 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
    import { getMessaging } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-sw.js';
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = getMessaging(app);


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Reminder';
  const notificationOptions = {
    body: 'Anda memiliki jadwal konsumsi obat yang belum terpenuhi.',
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});