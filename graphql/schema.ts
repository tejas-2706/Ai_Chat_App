import gql from "graphql-tag";
export const typeDefs = gql`
scalar Json

type User {
  id: ID!
  name: String
  email: String
  conversations: [Conversation!]!
}

type Conversation {
  id: ID!
  title: String
  chats: [Chat!]!
  user: User!
}

type Chat {
  id: ID!
  role: Role!
  content: String!
  metadata: Json
  createdAt: String!
}

enum Role {
  User
  Assistant
}

# reading the data
type Query {
  user(id:ID!): User
  users: [User!]!
  conversation(id: ID!) : Conversation
  conversations(userId: ID!): [Conversation!]!
  chat(id: ID!): Chat
  chats(conversationId: ID!): [Chat!]!
}

# Creating/adding the data
type Mutation {
  addConversation(userId: ID! , title: String): Conversation!
  updateConversation(id: ID!, title: String) : Conversation
  deleteConversation(id: ID!): Conversation
  addChat(conversationId: ID!, role: Role!, content: String!, metadata: Json): Chat!
  deleteChat(id: ID!): Chat
}
`


