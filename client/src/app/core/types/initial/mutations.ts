import gql from 'graphql-tag';

export const saveInitial = gql`
  mutation saveInitial($initial: InitialInput) {
    saveInitial(initial: $initial) {
      exercises {
        points
      }
    }
  }
`;

