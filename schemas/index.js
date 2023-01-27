export const typeDefs = `#graphql
type Event {
  id:String,
  title: String
}
type User {
    id: String,
    displayName: String,
    password: String,
    photoUrl: String
}
type Query {
  events: [Event],
  event(eventId: String): Event
}

type Mutation {
    createUserByGoogle(name: String!, email: String!, password: String!, avatar: String!): User,

  }
`;
