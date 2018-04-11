import gql from 'graphql-tag';

export const loginUser = gql`
  mutation signinUser($user: AuthProviderSigninData) {
    signinUser(user: $user) {
      token
    }
  }
`;

export const updateProfile = gql`
  mutation profileUser($user: AuthProviderProfileData) {
    profileUser(user: $user) {
       token
    }
  }
`;

export const currentUser = gql`
  mutation currentUser($token: String) {
    currentUser(token: $token) {
      firstname
      lastname
      birthdate
    }
  }
`;

export const signupUser = gql`
  mutation signupUser($user: AuthProviderSignupData) {
    signupUser(user: $user) {
      token
    }
  }
`;

export const addUser = gql`
  mutation addUser($user: userData) {
    addUser(user: $user) {
      firstname
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($user: userData, $id: String) {
    updateUser(user: $user, id: $id) {
      firstname
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: String) {
    deleteUser(id: $id) {
      text
    }
  }
`;
