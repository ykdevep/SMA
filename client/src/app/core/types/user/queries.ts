import gql from 'graphql-tag';

export const myInitialQ = gql`
  query myInitialQ {
    myInitialQ {
      exercises {
        points
      }
    }
  }
`;

export const currentUser = gql`
  query currentUser {
    currentUser {
      firstname
      lastname
      birthdate
    }
  }
`;

export const users = gql`
  query users {
    users {
      _id
      firstname
      lastname
      email
      birthdate
      roles
    }
  }
`;

export const user = gql`
  query user($id: String) {
    user(id: $id) {
      firstname
      lastname
      password
      email
      birthdate
      roles
    }
  }
`;
