import { gql } from 'apollo-boost';
export const getDataQuery = gql`
{
    quizViewer {
        categories
    }
}
`;
