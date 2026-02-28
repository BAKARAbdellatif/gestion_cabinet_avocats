# ⚖️ Projet de synthèse : Gestion de Cabinet d'Avocats

**Gestion de Cabinet d'Avocats** est un projet de synthèse conçu pour démontrer la maîtrise des concepts fondamentaux du développement Front-end moderne et de l'interaction avec une API simulée. L'objectif est de gérer la facturation complexe d'un cabinet de consultants juridiques en fonction de leurs performances et de leur grade.

---

## 🚀 Objectifs Pédagogiques

Ce projet met en pratique les compétences suivantes :

* **Manipulation du DOM :** Création dynamique d'interfaces pour l'affichage des dossiers et des statistiques.
* **Objets JavaScript :** Modélisation des données (Avocats, Dossiers) et gestion de la logique métier.
* **Appels Asynchrones (AJAX/Fetch) :** Communication avec une API REST pour persister les données.
* **Gestion des Événements :** Interactivité utilisateur (formulaires, filtres, validation de procès).
* **Logique Algorithmique :** Calculs complexes de paliers de facturation et de primes.

---

## 🛠️ Règles Métier (Logique de Facturation)

L'application intègre un moteur de calcul basé sur le grade de l'avocat :

| Grade | Quota Heures/Semaine | Heures Supplémentaires | Prime de Succès |
| --- | --- | --- | --- |
| **Junior** | 30h | Payées **Double (x2)** | +10% du total dossier |
| **Senior** | 20h | Majoration de **+50% (x1.5)** | +10% du total dossier |

> **Prime de Succès :** Si un procès est marqué comme **"Gagné"** par l'administrateur, une prime de 10% sur l'ensemble des honoraires du dossier est automatiquement ajoutée.

---

## 📂 Structure des Données

Le projet utilise un fichier `db.json` à la racine faisant office de base de données :

* **`users`** : `id`, `nom`, `grade` (Junior/Senior), `salaireHoraire`.
* **`dossiers`** : `id`, `avocatId`, `client`, `heuresPassees`, `status` (Gagné/Perdu/En cours), `dateCloture`.

---

## 💻 Installation et Lancement

### 1. Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Installation des dépendances

Installez `json-server` globalement (ou localement) pour simuler l'API backend :

```bash
npm install -g json-server

```

### 3. Lancer la Base de Données

Pour démarrer le serveur API sur le port **3000**, exécutez la commande suivante à la racine du projet :

```bash
json-server --watch db.json --port 3000

```

### 4. Lancer l'Application

Ouvrez simplement le fichier `index.html` dans votre navigateur (ou utilisez l'extension *Live Server* sur VS Code).

---

## 📈 Fonctionnalités à venir

* [ ] Génération de factures au format PDF.
* [ ] Tableau de bord (Dashboard) avec graphiques de rentabilité par avocat.
* [ ] Système d'authentification pour différencier l'Admin des Avocats.

---

**Développé avec passion dans le cadre du module JavaScript Avancé.**

