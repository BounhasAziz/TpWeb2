export const typeDefs = `
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type Skill {
    id: ID!
    designation: String!
  }

  type Cv {
    id: ID!
    name: String!
    age: Int!
    job: String!
    user: User
    skills: [Skill!]!
  }

  type Query {
    cvs: [Cv!]!
    cv(id: ID!): Cv
  }

  input CreateCvInput {
    name: String!
    age: Int!
    job: String!
    userId: ID!
    skillIds: [ID!]!
  }

  input UpdateCvInput {
    name: String
    age: Int
    job: String
    userId: ID
    skillIds: [ID!]
  }

  type Mutation {
    createCv(input: CreateCvInput!): Cv!
    updateCv(id: ID!, input: UpdateCvInput!): Cv!
    deleteCv(id: ID!): Boolean!
  }

  type Subscription {
    cvChanged: Cv!
  }
`;
