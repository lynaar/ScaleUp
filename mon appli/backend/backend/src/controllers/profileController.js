import { utilisateur } from '../models/utilisateurs.js';
import { Startup } from '../models/startup.js';


export const profileController = {
async profilstartup(req, res) {
	try{
        const userId = req.params.userId;
        console.log("ID reçu :", userId);
        const user = await utilisateur.findById(userId);
        console.log("Utilisateur trouvé :", user);
        if(!user) return res.status(404).json({error: 'Utilisateur non trouve'});
          const startup = await Startup.findByUserId(userId);
          if (!startup) return res.status(404).json({ error: 'Profil startup non trouvé' });

    
            const data = {
                nom_entreprise: startup.nom_entreprise,
                email: user.email,
                telephone: user.telephone,
                site_web: startup.site_web,
                annee_creation: startup.annee_creation,
                nombre_employes: startup.nombre_employes,
                fichier_entreprise: startup.fichier_entreprise,
                date_creation: user.date_creation
              };
              res.status(200).json(data);
          
    }catch(err){
        res.status(500).json({ error: 'Erreur serveur' });
    }
}}