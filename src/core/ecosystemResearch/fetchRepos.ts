import { filter } from 'lodash'
import { cachedFetch } from '../cachedFetch'
import { getContributors } from '../github/getContributors'
import { addGlobalRepos } from '../hooks/useRepos'

const ecosystemDashboardDomains = [
  'ecosystem-dashboard.com', //ipfs
  'filecoin.ecosystem-dashboard.com', //filecoin
  'libp2p.ecosystem-dashboard.com', //libp2p
]
const urlsToWalk: string[] = []
// const buildUrls = () => {
// const urls: string[] = []
ecosystemDashboardDomains.forEach((domain) => {
  urlsToWalk.push(`https://${domain}/repositories.json?order=desc&sort=score`)
  // TODO: Uncomment when we can differentiate between core/collab/community repos across all orgs
  // urls.push(`https://${domain}/collabs/repositories`)
  // urls.push(`https://${domain}/community/repositories`)
})

//   return urlsToWalk
// }
// const urls = [
//   'https://ecosystem-research.herokuapp.com/repositories',
//   'https://ecosystem-research.herokuapp.com/collabs/repositories',
//   'https://ecosystem-research.herokuapp.com/community/repositories',
//   // https://filecoin.ecosystem-dashboard.com/repositories
//   //https://libp2p.ecosystem-dashboard.com/repositories
// ]

// https://ecosystem-research.herokuapp.com/collabs/repositories?page=1&per_page=20

// Filter out ipfs-inactive repos.. these are archived and inactive repos that are no longer maintained.

const walkUrl = async (url: URL, page = 1, per_page = 20) => {
  if (url.searchParams.has('page')) {
    page = Number(url.searchParams.get('page'))
  } else {
    url.searchParams.set('page', page.toString())
  }

  if (url.searchParams.has('per_page')) {
    per_page = Number(url.searchParams.get('per_page')) ?? per_page
  } else {
    url.searchParams.set('per_page', per_page.toString())
  }

  const result = await cachedFetch(url.toString())
  const repos: EcosystemResearch.Repository[] = await result.json()

  if (!result.ok) {
    console.error(result.status, result.statusText)
    throw new Error(result.statusText)
  }
  for await (const repo of repos) {
    repo.contributors = getContributors(repo.full_name)
    repo.contributors.then((contributors) => {
      // Ensure the promise object goes away when it is done, so synchronous filtering will work
      repo.contributors = contributors
    })
  }

  if (repos.length === per_page) {
    // full content, check next page
    const newUrl = new URL(url.toString())
    newUrl.searchParams.set('page', (page + 1).toString())

    urlsToWalk.push(newUrl.toString())
  }

  return repos
}

const fetchRepos = async () => {
  let url: string | undefined = urlsToWalk.shift() as unknown as string
  while (url != null) {
    addGlobalRepos(await walkUrl(new URL(`${url}`)))

    url = urlsToWalk.shift()
  }
}

export { fetchRepos }
