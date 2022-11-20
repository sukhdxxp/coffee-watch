"use strict";
(() => {
var exports = {};
exports.id = 964;
exports.ids = [964];
exports.modules = {

/***/ 5805:
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(5805);
;// CONCATENATED MODULE: ./lib/search.ts

const query = external_graphql_request_.gql`
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
const getVariables = (title)=>({
        country: "US",
        language: "en",
        first: 4,
        filter: {
            searchQuery: title
        }
    });
const searchTitle = async (title)=>{
    const data = await (0,external_graphql_request_.request)("https://apis.justwatch.com/graphql", query, getVariables(title));
    return parseData(data);
};
const parseData = (data)=>{
    const watchItems = data.popularTitles.edges || [];
    return watchItems.map((item)=>({
            id: item.node.id,
            title: item.node.content.title,
            releaseYear: item.node.content.originalReleaseYear
        }));
};

;// CONCATENATED MODULE: ./pages/api/titles.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function handler(req, res) {
    const { query: { search  }  } = req;
    const searchTerm = search;
    const data = await searchTitle(searchTerm);
    res.status(200).json({
        data
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(680));
module.exports = __webpack_exports__;

})();