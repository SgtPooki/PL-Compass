declare module 'orbit-db'

declare module '@dutu/rate-limiter'

declare interface RateLimiter {
  awaitTokens: (count: number) => Promise<void>
}

declare namespace GitHub {
  type Endpoints = import('@octokit/types').Endpoints

  type RepoContributor = GetResponseDataTypeFromEndpointMethod<
    Endpoints['GET /repos/{owner}/{repo}/contributors']
  >

  type RateLimit = GetResponseDataTypeFromEndpointMethod<
    Endpoints['GET /rate_limit']
  >
}

declare namespace EcosystemResearch {
  interface Repository {
    contributors: RepoContributor[] | Promise<RepoContributor[]>
    archived: boolean
    changelog_path: null
    code_of_conduct_path: null
    contributing_path: null
    created_at: Date //"2020-06-16T13:55:55.000Z"
    default_branch: string //"master"
    description: string //"Integrated Deployment Repository of SIH2020 Knowledge Management Project. See the main Repository at https://github.com/mbcse/SIH2020KMP_Hexa-Techies"
    direct_internal_dependency_package_ids: number[] //[2098]
    discovered: boolean //false
    etag: JSON //"\"f914d017470597f329f79e04135596b00851cbaed0fc0cb9429a5729dc8b2ae7\""
    first_added_internal_deps: Date //"2020-07-29T19:02:18.000Z"
    fork: boolean //false
    forks_count: number //2
    full_name: string //"mbcse/SIH2020"
    github_id: number //272722075
    id: number //52429
    indirect_internal_dependency_package_ids: number[] //(17) [656, 2100, 2122, 2133, 2134, 2202, 2492, 2493, 2658, 2798, 2800, 2803, 2804, 2806, 3091, 3092, 3292]
    keyword_matches: null
    language: string //"HTML"
    last_events_sync_at: Date //"2022-03-03T11:53:57.258Z"
    last_internal_dep_removed: null
    last_sync_at: Date //"2022-02-28T04:50:43.170Z"
    latest_commit_sha: string //"752c4bbb0690640671708148b25d0745f7ae5bbd"
    latest_dependency_mine: Date //"2021-10-17T20:52:04.251Z"
    license_path: null
    open_issues_count: number //3
    org: string //"mbcse"
    pushed_at: Date //"2021-10-11T17:20:42.000Z"
    readme_path: string //"README.md"
    score: number //2
    size: number //84814
    sol_files: boolean //false
    stargazers_count: number //1
    subscribers_count: number //2
    topics: string[] //(5) ['airport-licensing', 'blockchain', 'ethereum', 'nodejs', 'ocr']
    triage: boolean //false
    updated_at: Date //"2022-02-28T04:50:43.183Z"
  }

  interface ContributorIssue {
    id: number //325773
    title: string //'fix: Check total connections opened.'
    body: string | null // null
    state: string //'closed'
    number: number // 39
    html_url: string // 'https://github.com/web3-storage/ipfs-elastic-provider-bitswap-peer/pull/39'
    comments_count: number //0
    user: string //'ShogunPanda'
    repo_full_name: string // 'web3-storage/ipfs-elastic-provider-bitswap-peer'
    closed_at: Date // '2022-03-09T09:36:31.000Z'
    created_at: Date // '2022-03-09T09:36:28.000Z'
    updated_at: Date // '2022-03-09T09:36:59.000Z'
    org: string // 'web3-storage'
    collabs: unknown[] // []
    milestone_name: null
    milestone_id: null
    labels: unknown[] // []
    locked: boolean // false
    merged_at: Date // '2022-03-09T09:36:31.000Z'
    draft: boolean // false
    first_response_at: null
    response_time: null
    github_id: number // 1163701341
    last_synced_at: Date // '2022-03-09T23:18:36.498Z'
    board_ids: unknown[] // []
    review_time: null
    review_requested_at: null
  }

  interface ContributorDetails {
    events: null
    issues: ContributorIssue[]
  }
}
