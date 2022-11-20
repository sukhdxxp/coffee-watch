import { gql, request } from "graphql-request";

const query = gql`
  query GetSuggestedTitles(
    $country: Country!
    $language: Language!
    $first: Int!
    $filter: TitleFilter
  ) {
    popularTitles(country: $country, first: $first, filter: $filter) {
      edges {
        node {
          ...SuggestedTitle
        }
      }
    }
  }
  fragment SuggestedTitle on MovieOrShow {
    id
    content(country: $country, language: $language) {
      title
      originalReleaseYear
    }
  }
`;

const getVariables = (title: string) => ({
  country: "US",
  language: "en",
  first: 4,
  filter: {
    searchQuery: title,
  },
});

type ResultItem = {
  id?: string;
  title?: string;
  releaseYear?: number;
};

export const searchTitle = async (title: string): Promise<any> => {
  const data = await request(
    "https://apis.justwatch.com/graphql",
    query,
    getVariables(title)
  );

  return parseData(data);
};

const parseData = (data: any) => {
  const watchItems = data.popularTitles.edges || [];
  return watchItems.map((item: any) => ({
    id: item.node.id as string,
    title: item.node.content.title as string,
    releaseYear: item.node.content.originalReleaseYear as number,
  })) as ResultItem[];
};
