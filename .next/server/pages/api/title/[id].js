"use strict";
(() => {
var exports = {};
exports.id = 631;
exports.ids = [631];
exports.modules = {

/***/ 805:
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ 836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(805);
;// CONCATENATED MODULE: ./lib/countries.ts
const COUNTRIES_LIST = [
    "US",
    "NL",
    "DE",
    "IN",
    "GB",
    "AU",
    "SG",
    "FR",
    "AR",
    "BR"
];

;// CONCATENATED MODULE: ./lib/title.ts


const query = external_graphql_request_.gql`
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
const getVariables = (titleId, country)=>({
        platform: "WEB",
        nodeId: titleId,
        country,
        language: "en",
        filterBuy: {
            monetizationTypes: [
                "BUY"
            ],
            bestOnly: true
        },
        filterFlatrate: {
            monetizationTypes: [
                "FLATRATE",
                "FLATRATE_AND_BUY",
                "ADS",
                "FREE"
            ],
            bestOnly: true
        },
        filterRent: {
            monetizationTypes: [
                "RENT"
            ],
            bestOnly: true
        },
        filterFree: {
            monetizationTypes: [
                "ADS",
                "FREE"
            ],
            bestOnly: true
        }
    });
const fetchTitleOffers = async (titleId, country)=>{
    const data = await (0,external_graphql_request_.request)("https://apis.justwatch.com/graphql", query, getVariables(titleId, country));
    return {
        ...data,
        country
    };
};
const fetchTitleOffersForAllCountries = async (titleId)=>{
    const titleOffersPromise = COUNTRIES_LIST.map(async (country)=>fetchTitleOffers(titleId, country));
    const response = await Promise.allSettled(titleOffersPromise);
    const data = response;
    return parseData(data);
};
const parseData = (data = [])=>{
    return data.reduce((parsedData, dataItem)=>{
        if (dataItem.status === "fulfilled") {
            const country = dataItem.value?.country || "UNKNOWN";
            const nodes = dataItem.value?.node.flatrate || [];
            const nodeRows = nodes.map((node)=>({
                    ...node,
                    country: country,
                    countryIcon: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`
                }));
            parsedData.push(...nodeRows);
        }
        return parsedData;
    }, []);
};

;// CONCATENATED MODULE: ./pages/api/title/[id].ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function handler(req, res) {
    const { query: { id  }  } = req;
    const data = await fetchTitleOffersForAllCountries(id);
    res.status(200).json({
        data
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(836));
module.exports = __webpack_exports__;

})();