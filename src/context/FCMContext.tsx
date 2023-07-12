import { ReactNode, createContext, useContext, useEffect } from 'react'
import { env } from '@/env.mjs';
import { getMessaging } from "firebase/messaging/sw";
import { app, db } from '@/lib/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import { useAuth } from './AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

const FCMContext = createContext({

});

export const FCMProvider = ({ children }: { children: ReactNode }) => {

    const { user } = useAuth();

    function requestPermission() {
        console.log("Requesting permission...");
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");

                const messaging = getMessaging(app);
                getToken(messaging, {
                    vapidKey:
                        env.NEXT_PUBLIC_FCM_VAPID_KEY,
                }).then((currentToken) => {
                    if (currentToken) {
                        // console.log("currentToken: ", currentToken);
                        updateDoc(doc(db, "users", user!.uid), {
                            fcmToken: currentToken
                        });
                    } else {
                        console.log("Can not get token");
                    }
                });
            } else {
                console.log("Do not have permission!");
            }
        });
    }

    useEffect(() => {
        requestPermission();
    }, [])

    const contextValue = {

    }

    return (
        <FCMContext.Provider value={contextValue}>
            {children}
        </FCMContext.Provider>
    )
}

export const useFCM = () => useContext(FCMContext);