# {NOM DU PROJET}

## Contexte du projet ← seule section à remplir au démarrage

| Champ | Valeur |
|---|---|
| **Description** | {Une phrase : ce que fait l'app et pour qui} |
| **Architecture** | {ex. API REST + SPA React / API seule / Monorepo} |
| **Base de données** | PostgreSQL — schéma : `{nom_du_schema ou public}` |
| **Environnements** | dev local → staging → prod |
| **URL API (dev)** | `http://localhost:{PORT}` |
| **Branches** | `main` → prod · `develop` → staging · `feature/*` → dev |

### Particularités de ce projet
> {Contraintes spécifiques, intégrations tierces, décisions d'architecture déjà prises.
> Supprimer cette ligne et écrire ici. Laisser vide si aucune.}

---

## Stack technique — Node.js / PostgreSQL

Tous les agents connaissent ces conventions. Elles s'appliquent à tous les projets de cette équipe.

### Runtime et outillage

| Outil | Choix standard |
|---|---|
| Runtime | Node.js LTS (≥ 20) |
| Gestionnaire de paquets | `npm` — toujours committer `package-lock.json` |
| Langage | TypeScript strict (`"strict": true` dans `tsconfig.json`) |
| Framework API | Express.js ou Fastify |
| ORM / Query builder | Prisma (migrations) ou `pg` + `node-postgres` (requêtes brutes) |
| Validation | Zod (schémas partagés entre API et frontend si applicable) |
| Variables d'env | `dotenv` + fichier `.env.example` toujours à jour |

### Base de données PostgreSQL

- **Migrations** : via Prisma Migrate (`prisma migrate dev`) ou fichiers SQL versionnés dans `db/migrations/`
- **Nommage** : tables en `snake_case`, colonnes en `snake_case`
- **Toujours présents** : colonnes `created_at TIMESTAMPTZ DEFAULT NOW()` et `updated_at TIMESTAMPTZ`
- **Soft delete** : colonne `deleted_at TIMESTAMPTZ NULL` — ne jamais supprimer physiquement les données utilisateur
- **Indexes** : obligatoires sur toutes les clés étrangères et les colonnes filtrées fréquemment
- **Transactions** : obligatoires pour toute opération multi-table

### Linting et formatage

```bash
# Formatage
npx prettier --write .

# Linting
npx eslint . --ext .ts,.js

# Vérification TypeScript
npx tsc --noEmit
```

Configuration attendue : `.eslintrc.json`, `.prettierrc`, `tsconfig.json` à la racine.

### Tests

| Type | Framework | Emplacement |
|---|---|---|
| Unitaires | Vitest ou Jest | `src/**/*.test.ts` |
| Intégration | Supertest + Vitest | `tests/integration/` |
| Base de données | Transactions rollback | DB de test dédiée |

```bash
npm test                  # tous les tests
npm run test:unit         # unitaires seulement
npm run test:integration  # intégration seulement
npm run test:coverage     # avec rapport de couverture
```

Couverture minimale attendue : **80%** sur les chemins critiques (auth, paiement, données sensibles).

### Structure de projet standard

```
{projet}/
├── src/
│   ├── app.ts              # Configuration Express/Fastify (sans listen)
│   ├── server.ts           # Point d'entrée (listen + graceful shutdown)
│   ├── config/             # Variables d'environnement typées et validées
│   ├── routes/             # Définitions des routes (thin layer)
│   ├── controllers/        # Handlers HTTP — orchestrent les services
│   ├── services/           # Logique métier pure — pas de req/res ici
│   ├── repositories/       # Accès base de données — requêtes SQL/Prisma
│   ├── middleware/         # Auth, validation, logging, error handler
│   ├── schemas/            # Schémas Zod (validation entrées/sorties)
│   ├── types/              # Types TypeScript partagés
│   └── utils/              # Fonctions utilitaires pures
├── tests/
│   └── integration/
├── db/
│   ├── migrations/         # Fichiers SQL ou migrations Prisma
│   └── seeds/              # Données de test
├── docs/
│   └── adr/                # Architecture Decision Records
├── .env.example            # Variables requises sans valeurs
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── package.json
└── CLAUDE.md               # Ce fichier
```

### Conventions de code

**Controllers** : reçoivent `req/res`, valident avec Zod, appellent un service, retournent la réponse. Pas de logique métier.

**Services** : logique métier pure. Ne connaissent pas `req`/`res`. Lancent des erreurs typées.

**Repositories** : toutes les requêtes SQL/Prisma. Un repository par entité. Retournent des types métier, pas des raw rows.

**Erreurs** : utiliser des classes d'erreur typées :
```typescript
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string
  ) { super(message); }
}
```

**Réponses API** : format uniforme :
```typescript
// Succès
{ data: T, meta?: { page, total } }

// Erreur
{ error: { code: string, message: string, details?: unknown } }
```

**Jamais** dans le code :
- `any` TypeScript sans commentaire justificatif
- `console.log` en dehors du debugging (utiliser le logger configuré)
- Secrets ou URLs en dur (tout dans `.env`)
- Requêtes SQL construites par concaténation de strings (risque injection)

---

## Équipe d'agents

### Rôles et déclencheurs

| Agent | Rôle | Déclencheurs typiques |
|---|---|---|
| `architect` | Conception, ADRs, structure | "comment structurer", "quel pattern", "design de" |
| `developer` | Implémentation, refactoring | "implémente", "écris", "modifie", "corrige" |
| `code-reviewer` | Revue qualité | "revue le code", "review", "avant de merger" |
| `security-auditor` | Audit sécurité | "sécurité", "auth", "audit", "données sensibles" |
| `test-writer` | Rédaction de tests | "teste", "couverture", "cas limites" |
| `doc-writer` | Documentation | "documente", "README", "CHANGELOG", "JSDoc" |
| `infra-architect` | Architecture cloud Azure/AWS, réseau, coûts, pipelines | "infrastructure", "Azure", "AWS", "cloud", "réseau", "scaling" |
| `devops` | Implémentation CI/CD, Docker, déploiement | "déploie", "Dockerfile", "pipeline", "GitHub Actions" |
| `debugger` | Diagnostic de bugs | "bug", "erreur", "crash", "comportement inattendu" |

### Workflows standard

**Nouvelle fonctionnalité :**
```
architect → developer → test-writer → code-reviewer → [security-auditor] → doc-writer → [devops]
```
*Les étapes entre [ ] sont conditionnelles selon la nature de la fonctionnalité.*

**Correction de bug :**
```
debugger → developer → test-writer → code-reviewer
```

**Refactoring :**
```
architect → developer → test-writer → code-reviewer
```

**Nouveau projet / nouvelle infra :**
```
infra-architect → devops
```

**Avant déploiement majeur :**
```
security-auditor → devops
```

---

## Commandes du projet

```bash
# Développement
npm install
cp .env.example .env        # puis remplir les valeurs
npm run db:migrate          # appliquer les migrations
npm run dev                 # lancer avec hot-reload

# Tests
npm test
npm run test:coverage

# Base de données
npm run db:migrate          # migrations en attente
npm run db:migrate:create   # nouvelle migration
npm run db:seed             # données de test

# Vérifications (à passer avant tout commit)
npx tsc --noEmit
npx eslint . --ext .ts
npx prettier --check .
npm test
```

---

## Règles absolues pour tous les agents

1. **Lire avant d'agir** — toujours inspecter les fichiers existants avant de modifier ou créer
2. **Respecter la séparation controller / service / repository** — ne pas mélanger les couches
3. **Zod pour toute entrée externe** — body, query params, variables d'env, réponses d'API tierces
4. **Transactions PostgreSQL** pour toute opération multi-table
5. **Pas de secret dans le code** — `.env` uniquement, jamais committé
6. **Mise à jour de `.env.example`** si une nouvelle variable d'environnement est ajoutée
7. **Un test de non-régression** pour chaque bug corrigé

---

## Système de documentation vivante

### Fichiers maintenus par les agents

| Fichier | Qui écrit | Quand |
|---|---|---|
| `DEVLOG.md` | developer, architect | À chaque session de travail |
| `docs/future-work.md` | Tous les agents | Quand une amélioration est identifiée |
| `docs/adr/*.md` | architect | À chaque décision architecturale |
| JSDoc inline | developer | Sur chaque fonction publique créée/modifiée |
| `.env.example` | developer, devops | Quand une variable d'env est ajoutée |
| `BUGS.md` | debugger, code-reviewer, security-auditor | Quand un bug non bloquant est identifié |

### Règle fondamentale

Une tâche n'est **pas terminée** tant que :
1. Les fonctions modifiées/créées ont leur JSDoc à jour
2. Une entrée DEVLOG.md a été ajoutée pour la session
3. Les améliorations identifiées sont notées dans `docs/future-work.md`

Le `code-reviewer` vérifie ces trois points et bloque le merge si manquants.

### Pourquoi DEVLOG.md et pas juste git log ?

Le git log dit *quoi* a changé. DEVLOG.md dit *pourquoi*, *comment ça impacte les appelants*,
et *ce qui reste à faire*. C'est la mémoire de projet que les agents lisent pour comprendre
le contexte sans avoir à analyser tout le dépôt.
