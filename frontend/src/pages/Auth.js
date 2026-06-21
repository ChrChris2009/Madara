import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Une erreur est survenue');

            if (isLogin) {
                localStorage.setItem('token', data.token);
                onAuthSuccess(data.user);
            } else {
                setIsLogin(true); // Redirige vers la connexion après inscription
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Nom d'utilisateur" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Adresse email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Mot de passe" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit">{isLogin ? 'Se connecter' : "S'inscrire"}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
                </p>
            </div>
        </div>
    );
};

export default Auth;

