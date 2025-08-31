import { gql } from "@apollo/client";

export const ADD_CONVERSATION = gql`
  mutation AddConversation($userId: ID!, $title: String!) {
    addConversation(userId: $userId, title: $title) {
      id
      title
      user {
        id
        name
        email
      }
    }
  }
`;

export const UPDATE_CONVERSATION = gql`
  mutation updateConversation($updateConversationId: ID!, $title: String!) {
    updateConversation(id: $updateConversationId, title: $title) {
        id
        title
    }
}
`

export const DELETE_CONVERSATION = gql`
mutation deleteConversation($deleteConversationId: ID!) {
  deleteConversation(id: $deleteConversationId) {
    id
    title
    user {
      id
      name
      email
    }
  }
}`