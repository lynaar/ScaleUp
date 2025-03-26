// components/RegisterModal.jsx
import { useState } from 'react';

const RegisterModal = ({ show, onClose, switchToLogin }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Champs spécifiques aux startups
    startupName: '',
    companyFile: null,
    website: '',
    creationYear: '',
    employees: '',
    // Champ spécifique aux mentors
    profession: '',
    Nom: '',
    Prénom : '',
    // Champ spécifique aux particuliers
    Nom: '',
    Prénom: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', { ...formData, userType: selectedUserType });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyFile: e.target.files[0] });
  };

  if (!show) return null;

  return (
        <>
    <style jsx>{`
    
    /* styles/RegisterModal.css */


/* Account type selection */
.account-type-selection {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.account-type-selection h4 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 1.1rem;
}

.type-button {
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background-color: white;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-button:hover {
  border-color:rgb(215, 30, 30);
  background-color: #f8f9fa;
}

.type-button:active {
  background-color: #e9ecef;
}

/* Back button */
.back-button {
  background: none;
  border: none;
  color: #007bff;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.back-button:hover {
  text-decoration: underline;
}

/* Form styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color:rgb(255, 174, 0);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}


.auth-redirect {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 0.9rem;
}

.link-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0 4px;
  font-size: 0.9rem;
}

.link-button:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    padding: 16px;
  }
  
  .modal-header h3 {
    font-size: 1.3rem;
  }
  
  .type-button {
    padding: 10px 16px;
  }
}
    `}</style>
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            {selectedUserType 
              ? `Créer un compte - ${selectedUserType}`
              : "Créer un compte"}
          </h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        {!selectedUserType ? (
          <div className="account-type-selection">
            <h4>Je suis :</h4>
            <button 
              className="type-button"
              onClick={() => setSelectedUserType('startup')}
            >
              Une Startup
            </button>
            <button
              className="type-button"
              onClick={() => setSelectedUserType('mentor')}
            >
              Un Mentor
            </button>
            <button
              className="type-button"
              onClick={() => setSelectedUserType('particulier')}
            >
              Un Particulier
            </button>
          </div>
        ) : (
          <>
            <button 
              className="back-button"
              onClick={() => setSelectedUserType(null)}
            >
              &lt; Retour
            </button>

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Champs communs à tous */}
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
                  type="tel"
                  required
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Champs spécifiques aux startups */}
              {selectedUserType === 'startup' && (
                <>
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
                </>
              )}

              {/* Champs spécifiques aux mentors */}
              {selectedUserType === 'mentor' && (
                <div className="form-group">
                  <label>
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({ ...formData, Nom: e.target.value })}
                  />
                  <label>
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({ ...formData, Nom: e.target.value })}
                  />
                  <label>Profession</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  />
                </div>
              )}
             { /* Champs spécifiques aux particuliers */}
              {selectedUserType === 'particulier' && (
                <div className="form-group">
                  <label>
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({ ...formData, Nom: e.target.value })}
                  />
                  <label>
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({ ...formData, Prénom: e.target.value })}
                  />
                </div>
              )}


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
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default RegisterModal;