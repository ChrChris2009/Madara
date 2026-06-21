import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Settings.css';

const Settings = ({ currentUser, onLogout, soundEnabled, setSoundEnabled, onClose }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="settings-overlay">
            <div className="settings-modal active-glow">
                <div className="settings-header">
                    <h3>Paramètres du compte</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="settings-body">
                    <div className="profile-section">
                        <div className="avatar-large">{currentUser.username[0].toUpperCase()}</div>
                        <h4>@{currentUser.username}</h4>
                    </div>

                    <hr />

                    <div className="setting-item">
                        <span>Mode Sombre</span>
                        <label className="switch">
                            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <span>Sons de notification</span>
                        <label className="switch">
                            <input type="checkbox" checked={soundEnabled} onChange={setSoundEnabled} />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <button className="logout-btn" onClick={onLogout}>Déconnexion</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

