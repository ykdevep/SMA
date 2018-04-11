import gql from 'graphql-tag';

export const myInitialQ = gql`
  query myInitialQ {
    myInitialQ {
      exercises {
        points
        omit
        errors
        howlers
        hits
      }
    }
  }
`;
