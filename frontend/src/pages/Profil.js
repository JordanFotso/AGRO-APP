import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Profil.css';
import { UserContext } from '../UserContext';

function Profil() {
  const { user, setUser } = useContext(UserContext);
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', {
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user); // met à jour le contexte global
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/users', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      // Auto-login après inscription
      const loginRes = await axios.post('/api/auth/login', {
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', loginRes.data.token);
      setUser(loginRes.data.user); // met à jour le contexte global
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // vide le contexte global
    setForm({ name: '', email: '', password: '' });
  };

  if (!user) {
    return (
      <div className="profil-container">
        <h2>{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>
        <form className="profil-form" onSubmit={mode === 'login' ? handleLogin : handleRegister}>
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              required
              className="profil-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="profil-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="profil-input"
          />
          <button type="submit" className="profil-btn">
            {mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>
        {error && <div className="profil-error">{error}</div>}
        <div className="profil-switch">
          {mode === 'login' ? (
            <span>
              Pas de compte ?{' '}
              <button className="profil-link" onClick={() => setMode('register')}>S'inscrire</button>
            </span>
          ) : (
            <span>
              Déjà inscrit ?{' '}
              <button className="profil-link" onClick={() => setMode('login')}>Se connecter</button>
            </span>
          )}
        </div>
      </div>
    );
  }

  // Affichage des infos utilisateur connecté
  return (
    <div className="profil-container">
      <h2>Profil utilisateur</h2>
      <div className="profil-info">
        <span className="material-symbols-outlined profil-icon">account_circle</span>
        <div>
          <div><strong>Nom :</strong> {user.name}</div>
          <div><strong>Email :</strong> {user.email}</div>
        </div>
      </div>
      <button className="profil-btn" onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Profil;