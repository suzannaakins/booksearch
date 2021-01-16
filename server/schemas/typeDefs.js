// import the GQL tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: int 
        savedBooks: [Book]
    }

    type Book {
        bookId: Int
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
   
   type Query {
       me: User
       users: [User]
       user(username: String!): User
   }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, title: String, bookId: Int, image: String, link: String): User
        removeBook(bookId: Int): User
    }

    
`;

//export the typeDefs

module.exports = typeDefs;

