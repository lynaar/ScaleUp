import pool from '../../db.js'; // Chemin relatif depuis le dossier models

 export class Mentor {
    constructor(utilisateur_id, nom, prenom, profession) {
        this.utilisateur_id = utilisateur_id;
        this.role = 'mentor'; // Rôle fixé
        this.nom = nom;
        this.prenom = prenom;
        this.profession = profession;
    }
    async save() {
        await pool.query(
            `INSERT INTO app_schema.mentors 
            (utilisateur_id, nom, prenom, profession)
            VALUES ($1, $2, $3, $4)`,
            [
              this.utilisateur_id,
              this.nom,
              this.prenom,
              this.profession
            ]
        );
    }
	static async create(utilisateurId, infosRole) { // il manquait cette classe lfruiti 
		const mentor = new Mentor(
			utilisateurId,
			infosRole.nom,
			infosRole.prenom,
			infosRole.profession
		);
		await mentor.save();
	}
}
