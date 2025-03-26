// components/LoginModal.jsx
import { useState } from 'react';


const LoginModal = ({ show, onClose ,switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter la logique de connexion ici
    console.log('Email:', email, 'Password:', password);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Connexion</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="cta-button">
            Se connecter
          </button>
        </form>

        <div className="auth-redirect">
          <p>Pas de compte ? 
          <button 
              className="link-button" 
              onClick={switchToRegister} // Utilisation correcte de la prop
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;