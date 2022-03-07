// Type queries into this side of the screen, and you will
// see intelligent typeaheads aware of the current GraphQL type schema,
// live syntax, and validation errors highlighted within the text.

// We'll get you started with a simple query showing your username!
// query SearchMostTop10Star($queryString: String!, $number_of_repos:Int!, $after: String) {
//   search(query: $queryString, type: REPOSITORY, first: $number_of_repos, after:$after) {
//     repositoryCount
//     pageInfo {
//       endCursor
//       startCursor
//     }
//     edges {
//       node {
//         ... on Repository {
//           name
//           url
//           description
// //         shortDescriptionHTML
//           repositoryTopics(first: 12) {nodes {topic {name}}}
//           primaryLanguage {name}
//           languages(first: 3) { nodes {name} }
//           releases {totalCount}
//           forkCount
//           pullRequests {totalCount}
//           stargazers {totalCount}
//           issues {totalCount}
//           createdAt
//           pushedAt
//           updatedAt
//         }
//       }
//     }
//   }
// }

export {}
