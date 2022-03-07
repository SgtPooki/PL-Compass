import { graphql } from '@octokit/graphql'

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env['GITHUB_PAT']}`,
  },
})

;(async () => {
  const { repository } = await graphqlWithAuth(`
  {
    repository(owner: "octokit", name: "graphql.js") {
      issues(last: 3) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`)

  // # Type queries into this side of the screen, and you will
  // # see intelligent typeaheads aware of the current GraphQL type schema,
  // # live syntax, and validation errors highlighted within the text.

  // # We'll get you started with a simple query showing your username!
  // query {
  //   search(query: "owner:ipfs", type: REPOSITORY, first:10) {
  //     repositoryCount
  //     edges {
  //       node {
  //         __typename
  //       }
  //     }
  //   }
  // }

  // {
  //   search(query: "language:JavaScript stars:>10000", type: REPOSITORY, first: 10) {
  //     repositoryCount
  //     edges {
  //       node {
  //         ... on Repository {
  //           name
  //           descriptionHTML
  //           stargazers {
  //             totalCount
  //           }
  //           forks {
  //             totalCount
  //           }
  //           updatedAt
  //         }
  //       }
  //     }
  //   }
  // }

  // # Type queries into this side of the screen, and you will
  // # see intelligent typeaheads aware of the current GraphQL type schema,
  // # live syntax, and validation errors highlighted within the text.

  // # We'll get you started with a simple query showing your username!
  // query SearchMostTop10Star($queryString: String!, $number_of_repos:Int!) {
  //   search(query: $queryString, type: REPOSITORY, first: $number_of_repos) {
  //     repositoryCount
  //     edges {
  //       node {
  //         ... on Repository {
  //           name
  //           url
  //           description
  // #         shortDescriptionHTML
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

  // QueryVariables
  // {
  //   "queryString": "language:JavaScript stars:>10000",
  //   "number_of_repos": 3
  // }

  console.log(JSON.stringify(repository))
})()
