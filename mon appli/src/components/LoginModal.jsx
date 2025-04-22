// components/LoginModal.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, onClose ,switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8083/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          motDePasse: password,  
        }),
      });
  
      const data = await response.json();
      console.log(data);
    
  
      if (response.ok) {
        console.log('Connexion réussie :', data);
        if (data.utilisateur.role === 'startup') {
          navigate('/startup');
        } else if (data.utilisateur.role === 'particulier') {
          navigate('/particulier');
        }
        localStorage.setItem('user', JSON.stringify(data.utilisateur));
       
        localStorage.setItem('role', data.utilisateur.role); // stocker le rôle de l'utilisateur

        // ici tu peux rediriger ou stocker les infos utilisateur
      } else {
        console.error('Erreur de connexion :', data.error);
        // afficher une erreur à l'utilisateur par exemple
      }
    } catch (error) {
      console.error('Erreur serveur:', error);
    }
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