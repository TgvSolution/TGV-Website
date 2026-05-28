# DEVLOG — Journal de développement

Ce fichier est **maintenu par les agents**. Chaque modification significative du code doit produire une entrée ici.  
Format : une entrée par session de travail, en ordre chronologique inverse (plus récent en premier).

---

## Format d'une entrée

```
## YYYY-MM-DD — {titre court décrivant le travail}
**Agent(s)** : developer | architect | devops | ...
**Fichiers modifiés** : src/services/user.service.ts, src/routes/user.routes.ts

### Ajouté
- `createUser(dto: CreateUserDto): Promise<User>` dans `UserService`
  → Crée un utilisateur, hash le mot de passe, envoie un email de bienvenue
- Route `POST /users` avec validation Zod du body

### Modifié
- `getUserById()` : ajout du paramètre optionnel `includeDeleted: boolean`
  → **Raison** : besoin d'accéder aux comptes supprimés depuis le panel admin
  → **Impact** : tous les appelants existants non affectés (défaut = false)

### Retiré
- `getUserByEmail()` (dépréciée depuis v1.2) — remplacée par `findUser({ email })`

### Corrigé
- Bug : `updateUser()` ne mettait pas à jour `updated_at` sur soft delete

### ⚠️ Points d'attention pour les autres agents
- La validation d'email est maintenant dans `UserService`, pas dans le controller
- Le schéma Zod `CreateUserSchema` est exporté depuis `src/schemas/user.schema.ts`

### 🔮 Noté pour développement futur
- [ ] Ajouter pagination sur `listUsers()` — actuellement retourne tout
- [ ] Envisager un index sur `users.email` pour les lookups fréquents
- [ ] Rate limiting sur `POST /users` à implémenter avant la prod
```

---

<!-- Les entrées réelles commencent ici -->
