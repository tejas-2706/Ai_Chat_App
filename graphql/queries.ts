import { gql } from "@apollo/client"

export const GET_USER = gql`
query User($id: ID!) {
    user(id: $id) {
        id,
        name,
        email,
        conversations {
            id,
            title,
            user
        }
    }
}
`

export const GET_USERS = gql`
query Users {
    users {
        id,
        name,
        email,
        conversations {
            id,
            title,
            user
        }
    }
}
`

// by convo id get one convoersation
export const GET_CONVERSATION = gql` 
query Conversation($conversationId: ID!) {
  conversation(id: $conversationId) {
    id
    title
    chats {
      id
      role
      content
      createdAt
    }
  }
}
`

// all convo by userid
export const GET_CONVERSATIONS = gql`
query Conversations($userId: ID!) {
  conversations(userId: $userId) {
    id
    title
    chats {
      id
      content
      createdAt
    }
  }
}
`