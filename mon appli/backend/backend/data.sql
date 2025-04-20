-- 1. Créer la base de données 
CREATE DATABASE accelera;
--2.creation d'un schema
CREATE SCHEMA "app_schema";
--permet de creer des tables dans le schema I_NOTE--
SET SEARCH_PATH = "app_schema";
-- 2. Créer le type ENUM pour les rôles
CREATE TYPE app_schema.role_utilisateur AS ENUM ('startup', 'mentor', 'particulier');
-- 3. Table utilisateurs (parente)
--La clé étrangère lie chaque table fille (startups, mentors, etc.) à la table parente utilisateurs--
CREATE TABLE app_schema.utilisateur(
    id SERIAL,-- le type SERIAL signifie que la valeur de la colonne est générée automatiquement par la base de données.
    email VARCHAR(255) UNIQUE NOT NULL,
   motDePasse  VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    role app_schema.role_utilisateur NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,--écrit la date et l'heure exacte quand vous ajoutez une nouvelle ligne dans table.
    PRIMARY KEY (id, role) -- Clé primaire composite
);
--4.table startups (enfant):
--FOREIGN KEY permet de créer une liaison logique entre la table parente (utilisateurs) et les tables enfants-- 
CREATE TABLE app_schema.startups (
    utilisateur_id INT PRIMARY KEY,
    role app_schema.role_utilisateur NOT NULL DEFAULT 'startup' CHECK (role = 'startup'),
    nom_entreprise VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    annee_creation INT,
    nombre_employes INT,
    fichier_entreprise VARCHAR(255),
    FOREIGN KEY (utilisateur_id, role) --Lie la table enfant à utilisateurs via id + role.
        REFERENCES app_schema.utilisateurs(id, role) ON DELETE CASCADE --Si une ligne de utilisateurs est supprimée, toutes les lignes enfant  avec le même (id, role) sont automatiquement supprimées.

);

-- 4. Table mentors (enfant):
CREATE TABLE app_schema.mentors (
    utilisateur_id INT PRIMARY KEY,
    role app_schema.role_utilisateur NOT NULL DEFAULT 'mentor' CHECK (role = 'mentor'),
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    profession VARCHAR(100),
    FOREIGN KEY (utilisateur_id, role) 
        REFERENCES app_schema.utilisateurs(id, role) ON DELETE CASCADE
);

-- 5. Table particuliers (enfant):
CREATE TABLE app_schema.particuliers (
    utilisateur_id INT PRIMARY KEY,
    role app_schema.role_utilisateur NOT NULL DEFAULT 'particulier' CHECK (role = 'particulier'),
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    FOREIGN KEY (utilisateur_id, role) 
        REFERENCES app_schema.utilisateurs(id, role) ON DELETE CASCADE
);
-- Creer des nouveaux type pour la colonne stage  de la startup
 create type app_schema.stageStartup as enum ('Idéation','Pré-MVP','MVP', 'Growth', 'Scaling');
-- Ajouter la colonne stage avec le type app_schema.stageStartup (qui contient les types de stage)dans la table startups 
 alter table app_schema.startups add column stage app_schema.stageStartup NOT NULL default 'Idéation';
 -- creer table equipe
 CREATE TABLE app_schema.equipe(
    id serial PRIMARY KEY,
    matricule int,
    nom varchar(255) not null,
    prenom  varchar(255) not null,
    startup_id int not null, 
 --Chaque membre est associé à une startup via startup_id
    FOREIGN KEY (startup_id) REFERENCES app_schema.startups(utilisateur_id) ON DELETE CASCADE
 )
 