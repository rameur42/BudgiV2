# Budget Tracker

Application de suivi de budget journalier : je définis un budget par jour
sur une période, j'enregistre mes dépenses chaque soir, et l'application
m'indique si je suis en avance ou en retard sur mon budget.

## Objectif du projet

Projet personnel pour reprendre le développement full-stack TypeScript
(NestJS / React / PostgreSQL) en appliquant les bonnes pratiques :
tests, validation, Docker, CI, déploiement.

## Fonctionnalités

- Créer une période (date de début, date de fin, budget journalier)
- Ajouter une dépense à une date donnée
- Consulter le bilan de la période en cours
- Consulter l'historique des périodes passées

## Règles métier

### Calculs
- **Budget total** = budget journalier × nombre de jours de la période (bornes incluses)
- **Jours écoulés** = jours depuis le début de la période, aujourd'hui inclus
- **Dépense prévue** = budget journalier × jours écoulés
- **Écart** = dépense prévue − total dépensé
  (positif : en avance ; négatif : en retard)
- **Budget restant par jour** = (budget total − total dépensé) ÷ jours restants

### Cas particuliers
- Le dernier jour de la période : on affiche le budget restant total
- Si le budget total est dépassé : on affiche « Budget dépassé de X € »

### Contraintes
- Deux périodes ne peuvent pas se chevaucher
- Une dépense ne peut être enregistrée que si sa date appartient à une période existante
- un montant ne peut pas etre negatif
## Modèle de données

### Period
| Champ       | Type          | Description |
|-------------|---------------|-------------|
| id          |               |             |
| startDate   | À COMPLÉTER   |             |
| endDate     | À COMPLÉTER   |             |
| dailyBudget | À COMPLÉTER   |             |

### Expense
| Champ    | Type        | Description |
|----------|-------------|-------------|
| id       | À COMPLÉTER |             |
| date     | À COMPLÉTER |             |
| amount   | À COMPLÉTER |             |
| periodId | À COMPLÉTER |             |

Relation : une période possède plusieurs dépenses (1-N).

## Stack technique

- **Backend** : NestJS (TypeScript)
- **Frontend** : React (TypeScript)
- **Base de données** : PostgreSQL + Prisma
- **Conteneurisation** : Docker Compose

## Choix techniques

- **Système de modules backend**: CommonJS, le format par défaut de NestJS, compatible avec Jest sans configuration supplémentaire.
- **Linter**: ESLint, standard du marché et déjà utilisé par le backend NestJS, pour garder un outillage cohérent dans tout le projet.
- **Base de données**: PostgreSQL 16 via Docker Compose**, avec un volume nommé pour persister les données et un healthcheck (`pg_isready`) pour savoir quand la base est prête à accepter des connexions.

## Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) (version LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd budget-tracker
```

### 2. Configurer les variables d'environnement

Copier le fichier d'exemple puis adapter les valeurs si nécessaire :

```bash
cp .env.example .env
```

| Variable            | Description                              | Exemple          |
|---------------------|------------------------------------------|------------------|
| `POSTGRES_USER`     | Utilisateur de la base de données        | `budget`         |
| `POSTGRES_PASSWORD` | Mot de passe de la base de données       | `changeme`       |
| `POSTGRES_DB`       | Nom de la base de données                | `budget_tracker` |
| `POSTGRES_PORT`     | Port exposé sur la machine hôte          | `5432`           |

> Si un PostgreSQL tourne déjà sur votre machine, changez `POSTGRES_PORT` (ex. `5433`).

### 3. Lancer la base de données

```bash
docker compose up -d
```

Vérifier que la base est prête (statut `healthy`) :

```bash
docker compose ps
```

### 4. Lancer le backend

```bash
cd backend
npm install
npm run start:dev
```

### 5. Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

### Commandes utiles

| Commande                    | Effet                                                      |
|-----------------------------|------------------------------------------------------------|
| `docker compose logs db`    | Afficher les logs de la base                               |
| `docker compose down`       | Arrêter la base (les données sont conservées)              |
| `docker compose down -v`    | Arrêter la base **et supprimer toutes les données**        |

## Roadmap

- [x] Modélisation
- [ ] Mise en place (Git, structure, Docker)
- [ ] Logique métier + tests unitaires
- [ ] API NestJS
- [ ] Front React
- [ ] Tests e2e + CI
- [ ] Déploiement