import { gql, request } from "graphql-request";

import { COUNTRIES_LIST } from "./countries";
import { ApiResponse } from "./types";

const query = gql`
  query GetTitleOffers(
    $nodeId: ID!
    $country: Country!
    $language: Language!
    $filterFlatrate: OfferFilter!
    $filterBuy: OfferFilter!
    $filterRent: OfferFilter!
    $filterFree: OfferFilter!
    $platform: Platform! = WEB
  ) {
    node(id: $nodeId) {
      ... on MovieOrShowOrSeasonOrEpisode {
        offerCount(country: $country, platform: $platform)
        flatrate: offers(
          country: $country
          platform: $platform
          filter: $filterFlatrate
        ) {
          ...TitleOffer
        }
        buy: offers(
          country: $country
          platform: $platform
          filter: $filterBuy
        ) {
          ...TitleOffer
        }
        rent: offers(
          country: $country
          platform: $platform
          filter: $filterRent
        ) {
          ...TitleOffer
        }
        free: offers(
          country: $country
          platform: $platform
          filter: $filterFree
        ) {
          ...TitleOffer
        }
      }
    }
  }
  fragment TitleOffer on Offer {
    presentationType
    monetizationType
    retailPrice(language: $language)
    retailPriceValue
    currency
    type
    package {
      packageId
      clearName
    }
  }
`;

const getVariables = (titleId: string, country: string) => ({
  platform: "WEB",
  nodeId: titleId,
  country,
  language: "en",
  filterBuy: {
    monetizationTypes: ["BUY"],
    bestOnly: true,
  },
  filterFlatrate: {
    monetizationTypes: ["FLATRATE", "FLATRATE_AND_BUY", "ADS", "FREE"],
    bestOnly: true,
  },
  filterRent: {
    monetizationTypes: ["RENT"],
    bestOnly: true,
  },
  filterFree: {
    monetizationTypes: ["ADS", "FREE"],
    bestOnly: true,
  },
});

export const fetchTitleOffers = async (
  titleId: string,
  country: string
): Promise<unknown> => {
  const data = await request(
    "https://apis.justwatch.com/graphql",
    query,
    getVariables(titleId, country)
  );
  return {
    ...data,
    country,
  };
};

export const fetchTitleOffersForAllCountries = async (titleId: string) => {
  const titleOffersPromise = COUNTRIES_LIST.map(async (country) =>
    fetchTitleOffers(titleId, country)
  );

  const response = await Promise.allSettled(titleOffersPromise);
  const data = response as ApiResponse[];
  return parseData(data);
};

const parseData = (data: ApiResponse[] = []) => {
  return data.reduce((parsedData, dataItem) => {
    if (dataItem.status === "fulfilled") {
      const country = dataItem.value?.country || "UNKNOWN";
      const nodes = dataItem.value?.node.flatrate || [];
      const services = nodes.map((node) => node.package.clearName);
      parsedData.push({
        country: country,
        countryIcon: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`,
        services: services.join(", "),
      });
    }
    return parsedData.filter((item: any) => item.services);
  }, [] as any);
};
