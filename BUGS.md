# BUGS — Registre des bugs actifs

Bugs connus, non bloquants, à corriger selon priorité.  
Les bugs **bloquants** (crash, perte de données, sécurité) ne vont pas ici — ils sont traités immédiatement.

---

## Comment utiliser ce fichier

**Ajouter un bug** : n'importe quel agent qui en identifie un l'ajoute dans la bonne section.  
**Fermer un bug** : déplacer l'entrée dans la section ✅ Corrigés avec la date et le commit.  
**Escalader** : si un bug change de nature (devient bloquant ou révèle un risque sécurité), le noter explicitement et appeler `security-auditor` ou `debugger`.

---

## Format d'une entrée

```
### BUG-{NNN} — {titre court}
**Découvert** : YYYY-MM-DD par {agent ou "manuel"}  
**Sévérité** : Faible | Moyenne  
**Composant** : {fichier ou module}  
**Symptôme** : {ce que l'utilisateur ou le système observe}  
**Condition** : {dans quel contexte ça se produit — pas toujours, seulement si...}  
**Impact** : {conséquence concrète — ex. "affiche une valeur incorrecte", "log une erreur inutile"}  
**Piste** : {hypothèse sur la cause, si connue}  
**Lié à** : {autre bug, ADR, ou DEVLOG entry si pertinent}
```

---

## 🟡 Sévérité moyenne
*Comportement incorrect visible, sans perte de données ni blocage.*


---

## 🔵 Sévérité faible
*Cosmétique, log parasite, edge case très rare, UX légèrement dégradée.*


---

## ✅ Corrigés

```
### BUG-000 — Exemple de bug fermé
**Corrigé** : YYYY-MM-DD — commit abc1234
**Solution** : {ce qui a été fait}
```
