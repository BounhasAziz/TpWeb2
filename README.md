# TP2 Web - Gestionnaire de CVs

API GraphQL en TypeScript (GraphQL Yoga) pour la gestion de CVs avec relations vers `User` et `Skill`.

## Prerequis

- Node.js (18+ recommande)
- npm

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

Mode developpement (reload automatique):

```bash
npm run dev
```

Serveur GraphQL:

- http://localhost:4000/graphql

## Build

```bash
npm run build
```

## Structure

- `src/schema/typeDefs.ts`: schema GraphQL (types, inputs, queries, mutations)
- `src/data/db.ts`: base relationnelle fictive (users, cvs, skills, cvSkills)
- `src/context/context.ts`: injection du context
- `src/resolvers/query/cvQueries.ts`: `cvs`, `cv(id)`
- `src/resolvers/types/cvTypeResolvers.ts`: relations `Cv.user`, `Cv.skills`
- `src/resolvers/mutation/cvMutations.ts`: `createCv`, `updateCv`, `deleteCv`

## Queries

### Recuperer tous les CVs

```graphql
query {
  cvs {
    id
    name
    age
    job
    user {
      id
      name
      role
    }
    skills {
      id
      designation
    }
  }
}
```

### Recuperer un CV par ID

```graphql
query {
  cv(id: "101") {
    id
    name
    user {
      name
    }
    skills {
      designation
    }
  }
}
```

## Mutations

### Ajouter un CV

```graphql
mutation {
  createCv(
    input: {
      name: "Mobile Dev"
      age: 26
      job: "Developer"
      userId: "1"
      skillIds: ["1", "3", "5"]
    }
  ) {
    id
    name
    user {
      name
    }
    skills {
      designation
    }
  }
}
```

### Modifier un CV

```graphql
mutation {
  updateCv(
    id: "101"
    input: { age: 29, job: "Tech Lead", skillIds: ["1", "2", "3"] }
  ) {
    id
    age
    job
    user {
      name
    }
    skills {
      designation
    }
  }
}
```

### Supprimer un CV

```graphql
mutation {
  deleteCv(id: "101")
}
```

## Validations implementees

- `createCv`: verifie l'existence de `userId`
- `createCv`: verifie l'existence de tous les `skillIds`
- `updateCv`: verifie l'existence du CV cible
- `updateCv`: verifie `userId` et `skillIds` s'ils sont fournis
- `deleteCv`: supprime le CV et ses liens `cvSkills`
