import gql from "graphql-tag";

//mutation to log in a user
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

//mutation to create a new user through the signup form page
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($Book: savedBook) {
    saveBook(Book: $Book) {
      _id
      username
      title
      savedBooks {
        bookId
        author
        description
        link
        image 
    }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: Int) {
    deleteBook(bookId: $bookId) {
        user {
        _id
        username
        bookCount
        savedBooks
      }
    }
  }
`;