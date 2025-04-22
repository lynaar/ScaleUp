import bcrypt from 'bcrypt';
import { utilisateur } from '../models/utilisateurs.js';
import { Startup } from '../models/startup.js';
import { Particulier } from '../models/particulier.js';
import { Mentor } from '../models/mentors.js';


// Exporte un objet avec deux méthodes login et register
export const authController = {
  // Méthode pour gérer la connexion
  async login(req, res) {
    try {
      //recuperer l'email et le mot de passe
      const { email, motDePasse } = req.body;
     
      // appel asynchrone (await) pour trouver l'uttilisateur s'il exsiste
      const user = await utilisateur.findByEmail(email);
// si existe pas aucun utilisateur n'est trouvé envoie une erreur 401:
      if (!user) return res.status(401).json({ error: 'utilisateur non trouvé' });
      // si existe on compare le mot de passe envoyé avec celuis de la BD
      const match = await bcrypt.compare(motDePasse, user.motdepasse);
  //si mot passe incorrect(false):
      if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });
//si mot passe correct (true);
      res.status(200).json({
        message: 'Connexion réussie',
        role: user.role,
        utilisateur: { id: user.id, email: user.email, role: user.role }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
  // Méthode pour gérer l'inscription
  async register(req, res) {
    try {
      //recuperer les donnees de user
      console.log('Reçu :', req.body);
      const { email, password, telephone, role, infosRole } = req.body;
      console.log('Infos utilisateur:', email, password, telephone, role, infosRole);

    
      // Forcer en string (et vérifier que ce n'est pas un Buffer ou autre)
      const motDePasse = typeof password === 'string' ? password : String(password);
      
      console.log('Mot de passe traité:', motDePasse);
      
    
   
    // Vérifie si le rôle est valide
    const validRoles = ['startup', 'mentor', 'particulier'];
    if (typeof motDePasse !== 'string') { // Vérifie le type de donnée
        return res.status(400).json({ 
            error: "Le mot de passe doit être une chaîne de caractères" 
        });
    }
    
    if (motDePasse.length < 6) { // Vérifie la longueur 
        return res.status(400).json({ 
            error: "Le mot de passe doit contenir au moins 6 caractères" 
        });
    }
    // Verifie si l'email est deja utiliser
      const existingUser = await utilisateur.findByEmail(email);
      // Si oui renvoie une erreur 400
      if (existingUser) return res.status(400).json({ error: 'utilisateur déjà inscrit' });
//// Génère un hash du mot de passe avec un "salt round" de 10
      const hashedmotDePasse = await bcrypt.hash(motDePasse, 10);
      // creer le user
      const utilisateurId = await utilisateur.create(email, hashedmotDePasse, telephone, role);
      console.log('Utilisateur créé avec ID:', utilisateurId);
      console.log('Infos role:', infosRole);
      console.log('Role:', role);

      // Gestion spécifique au rôle
      switch (role) {
        case 'startup':
          // Créer une startup
          await Startup.create(utilisateurId, {
            nom_entreprise: infosRole.startupName,  // Assure-toi que startupName devient nom_entreprise
            site_web: infosRole.website,
            annee_creation: infosRole.creationYear,
            nombre_employes: infosRole.employees,
            fichier_entreprise: infosRole.fichier_entreprise || null,  // Assure-toi que fichier_entreprise est défini
          });
          break;
      
        case 'mentor':
          // Créer un mentor
          
          await Mentor.create(utilisateurId, {
            nom: infosRole.lastName,  // Mapper lastName à nom
            prenom: infosRole.firstName,  // Mapper firstName à prenom
            profession: infosRole.profession,  // Profession spécifique au mentor
          });
        
          break;
      
        case 'particulier':
          // Créer un particulier
        
          // Créer un particulier avec les informations transmises
          await Particulier.create(utilisateurId, {
            nom: infosRole.lastName,  
            prenom: infosRole.firstName  // Assure-toi que prenom est correctement défini
          });
          break;
      
        default:
          // Si le rôle n'est pas reconnu
          throw new Error('Rôle invalide');
      }

      res.status(201).json({ message: 'Inscription réussie' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
  async updatePassword(req, res) {
   try {
     const {email, oldPassword, newPassword } = req.body;
      // Log des données reçues
      console.log("Données reçues :", { email,oldPassword, newPassword });
 
     // on verifie d'abord si l'user existe ou non dans la BDD
     const user = await utilisateur.findByEmail(email);
 
     console.log("Utilisateur trouvé :", user); // Vérifiez si l'utilisateur existe
     if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
 
     // Vérifiez que user.motdepasse existe
     console.log("Hash stocké :", user.motdepasse);
     // on compare l'ancien mot de passe avec celui stocké dans bdd
     const match = await bcrypt.compare(oldPassword, user.motdepasse);
     if (!match) return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
 
     // verification pour le nouveau mot de passe
     if (typeof newPassword !== 'string' ) {
       return res.status(400).json({ 
         error: 'Le nouveau mot de passe doit etre une chaine de caractere' 
       });
     }
 if (newPassword.length < 6){
   return res.status(400).json({
     error: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
   })
 }
     //on crypte le mot de passe
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     await utilisateur.updatePassword(user.id, hashedPassword);
     
     res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Erreur serveur' });
   }
 },
 async updatePassword(req, res) {
  try {
    const {email, oldPassword, newPassword } = req.body;
     // Log des données reçues
     console.log("Données reçues :", { email,oldPassword, newPassword });

    // on verifie d'abord si l'user existe ou non dans la BDD
    const user = await utilisateur.findByEmail(email);

    console.log("Utilisateur trouvé :", user); // Vérifiez si l'utilisateur existe
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    // Vérifiez que user.motdepasse existe
    console.log("Hash stocké :", user.motdepasse);
    // on compare l'ancien mot de passe avec celui stocké dans bdd
    const match = await bcrypt.compare(oldPassword, user.motdepasse);
    if (!match) return res.status(401).json({ error: 'Ancien mot de passe incorrect' });

    // verification pour le nouveau mot de passe
    if (typeof newPassword !== 'string' ) {
      return res.status(400).json({ 
        error: 'Le nouveau mot de passe doit etre une chaine de caractere' 
      });
    }
if (newPassword.length < 6){
  return res.status(400).json({
    error: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
  })
}
    //on crypte le mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await utilisateur.updatePassword(user.id, hashedPassword);
    
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
},
async logout(req, res) {
  try {
    res.status(200).json({ 
      success: true,
      message: 'Déconnexion réussie' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
}
};