// components/RegisterModal.jsx
import { useState } from 'react';

const RegisterModal = ({ show, onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    startupName: '',
    companyFile: null,
    website: '',
    creationYear: '',
    employees: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter la logique d'inscription ici
    console.log('Données du formulaire:', formData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyFile: e.target.files[0] });
  };

  if (!show) return null;

  return (
    
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Créer un compte</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              required
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Téléphone mobile</label>
            <input
              type="number"
              required
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Nom de la startup</label>
            <input
              type="text"
              placeholder="ScaleUp"
              required
              onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Fichier de l'entreprise</label>
            <input
              type="file"
              required
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Site web</label>
            <input
              type="url"
              placeholder="https://www.levelup.com/"
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Année de création</label>
            <input
              type="number"
              placeholder="2010"
              min="2010"
              max="2025"
              required
              onChange={(e) => setFormData({ ...formData, creationYear: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Nombre d'employés</label>
            <input
              type="number"
              min="1"
              required
              onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
            />
          </div>

          <button type="submit" className="cta-button">
            S'inscrire
          </button>
        </form>

        <div className="auth-redirect">
          <p>Déjà un compte ? 
            <button className="link-button" onClick={switchToLogin}>
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;