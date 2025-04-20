import { useState } from 'react';

const RegisterModal = ({ show, onClose, switchToLogin }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Startup fields
    startupName: '',
    companyFile: null,
    website: '',
    creationYear: '',
    employees: '',
    // Mentor/Particulier fields
    profession: '',
    lastName: '',
    firstName: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return false;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      setError('Veuillez entrer un numéro de téléphone valide.');
      return false;
    }

    // Additional validations based on user type
    if (selectedUserType === 'startup') {
      if (!formData.startupName.trim()) {
        setError('Le nom de la startup est requis.');
        return false;
      }
      if (!formData.creationYear) {
        setError("L'année de création est requise.");
        return false;
      }
    }

    if (selectedUserType === 'mentor' || selectedUserType === 'particulier') {
      if (!formData.lastName.trim()) {
        setError('Le nom est requis.');
        return false;
      }
      if (!formData.firstName.trim()) {
        setError('Le prénom est requis.');
        return false;
      }
      if (selectedUserType === 'mentor' && !formData.profession.trim()) {
        setError('La profession est requise pour les mentors.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (!validateForm()) {
      setLoading(false);
      return;
    }
  
    const formDataToSend = new FormData();
  
    // 1. Correction des noms de champs pour correspondre au backend
    // Champs communs à tous les utilisateurs
    formDataToSend.append('email', formData.email.trim());
    formDataToSend.append('password', formData.password); // 'motDePasse' → 'password'
    formDataToSend.append('telephone', formData.phone.trim()); // 'telephone' → 'phone'
    formDataToSend.append('role', selectedUserType.toLowerCase()); // Conversion en majuscules
  
    // 2. Structuration des données spécifiques dans infosRole
    if (selectedUserType === 'startup') {
      formDataToSend.append('infosRole[startupName]', formData.startupName);
      formDataToSend.append('infosRole[website]', formData.website);
      formDataToSend.append('infosRole[creationYear]', formData.creationYear);
      formDataToSend.append('infosRole[employees]', formData.employees);
      
    
    } 
    else if (selectedUserType === 'mentor' || selectedUserType === 'particulier') {
      formDataToSend.append('infosRole[lastName]', formData.lastName.trim()); // 'nom' → 'lastName'
      formDataToSend.append('infosRole[firstName]', formData.firstName.trim()); // 'prenom' → 'firstName'
      
      if (selectedUserType === 'mentor') {
        formDataToSend.append('infosRole[profession]', formData.profession.trim());
      }
    }
  
    try {
      // 3. Vérification du contenu avant envoi
      console.log('--- Données envoyées ---');
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
  
      const response = await fetch('http://localhost:8083/api/auth/register', {
        method: 'POST',
        body: formDataToSend
      });
      console.log('Données envoyées:', formDataToSend);
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      const responseData = await response.json();
      console.log('Réponse du serveur:', responseData);

      if (!response.ok) {
        // Try to get detailed error message from server
        const serverError = responseData.error || 
                          responseData.message || 
                          `Erreur serveur (code ${response.status})`;
        throw new Error(serverError);
      }
      // Success
      alert('Inscription réussie !');
      onClose(); // Close modal
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      
      // Handle specific error cases
      if (err.message.includes('email')) {
        setError('Cet email est déjà utilisé. Veuillez en choisir un autre.');
      } else if (err.message.includes('validation')) {
        setError('Données invalides. Vérifiez les informations saisies.');
      } else {
        setError(err.message || 'Une erreur est survenue lors de l\'inscription.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyFile: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!show) return null;

  return (
    <>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        
        .error-message {
          color: #d32f2f;
          background-color: #fde8e8;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        
        .loading-message {
          color: #1976d2;
          margin-bottom: 16px;
        }
        
        .cta-button {
          background-color: rgb(215, 30, 30);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }
        
        .cta-button:hover {
          background-color: rgb(180, 25, 25);
        }
        
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
          width: 100%;
        }
        
        .type-button:hover {
          border-color: rgb(215, 30, 30);
          background-color: #f8f9fa;
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
          border-color: rgb(255, 174, 0);
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
                ? `Créer un compte - ${selectedUserType === 'startup' ? 'Startup' : selectedUserType === 'mentor' ? 'Mentor' : 'Particulier'}`
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
                {error && <p className="error-message">{error}</p>}
                {loading && <p className="loading-message">Chargement...</p>}

                {/* Common fields */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Confirmer le mot de passe</label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Téléphone mobile</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Startup specific fields */}
                {selectedUserType === 'startup' && (
                  <>
                    <div className="form-group">
                      <label>Nom de la startup</label>
                      <input
                        type="text"
                        placeholder="ScaleUp"
                        required
                        value={formData.startupName}
                        onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                      />
                    </div>

                  

                    <div className="form-group">
                      <label>Site web</label>
                      <input
                        type="url"
                        placeholder="https://www.example.com/"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Année de création</label>
                      <input
                        type="number"
                        placeholder="2010"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                        value={formData.creationYear}
                        onChange={(e) => setFormData({ ...formData, creationYear: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nombre d'employés</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.employees}
                        onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Mentor/Particulier fields */}
                {(selectedUserType === 'mentor' || selectedUserType === 'particulier') && (
                  <>
                    <div className="form-group">
                      <label>Nom</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Prénom</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    {selectedUserType === 'mentor' && (
                      <div className="form-group">
                        <label>Profession</label>
                        <input
                          type="text"
                          required
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        />
                      </div>
                    )}
                  </>
                )}

                <button type="submit" className="cta-button" disabled={loading}>
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
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