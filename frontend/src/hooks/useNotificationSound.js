// frontend/src/hooks/useNotificationSound.js
import { useState } from 'react';

export const useNotificationSound = () => {
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    // Utilisation d'un bip audio standard encodé en base64 pour éviter les fichiers manquants
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAQA');

    const playNotification = () => {
        if (soundEnabled) {
            audio.play().catch(err => console.log("Audio bloqué par le navigateur:", err));
        }
    };

    return { soundEnabled, setSoundEnabled, playNotification };
};

