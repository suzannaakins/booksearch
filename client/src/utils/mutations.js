import gql from "graphql-tag";

//mutation to log in a user
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
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
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: String, $description: String, $title: String, $bookId: Int, $image: String, $link: String) {
   
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
      user {
        _id
        username
        bookCount
        savedBooks
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: Int) {
    removeBook(bookId: $bookId) {
        user {
        _id
        username
        bookCount
        savedBooks
      }
    }
  }
`;