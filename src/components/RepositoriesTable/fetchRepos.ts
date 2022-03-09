const ecosystemDashboardDomains = [
  'ecosystem-dashboard.com',
  'filecoin.ecosystem-dashboard.com',
  'libp2p.ecosystem-dashboard.com',
]

const buildUrls = () => {
  const urls: string[] = []
  ecosystemDashboardDomains.forEach((domain) => {
    urls.push(`https://${domain}/repositories`)
    urls.push(`https://${domain}/collabs/repositories`)
    urls.push(`https://${domain}/community/repositories`)
  })

  return urls
}
// const urls = [
//   'https://ecosystem-research.herokuapp.com/repositories',
//   'https://ecosystem-research.herokuapp.com/collabs/repositories',
//   'https://ecosystem-research.herokuapp.com/community/repositories',
//   // https://filecoin.ecosystem-dashboard.com/repositories
//   //https://libp2p.ecosystem-dashboard.com/repositories
// ]

// https://ecosystem-research.herokuapp.com/collabs/repositories?page=1&per_page=20

// Filter out ipfs-inactive repos.. these are archived and inactive repos that are no longer maintained.
import fetchPonyFill from 'fetch-ponyfill'

const { fetch } = fetchPonyFill()

const walkUrl = async (url: URL, page = 1, per_page = 20) => {
  // const url = new URL(repoUrl)
  // let page = 1
  if (url.searchParams.has('page')) {
    if (page !== Number(url.searchParams.get('page'))) {
      url.searchParams.set('page', page.toString())
    }
    page = Number(url.searchParams.get('page'))
  } else {
    url.searchParams.set('page', page.toString())
  }

  if (url.searchParams.has('per_page')) {
    per_page = Number(url.searchParams.get('per_page'))
  } else {
    url.searchParams.set('per_page', per_page.toString())
  }

  const result = await fetch(url.toString())
  const repos: EcosystemResearch.Repository[] = await result.json()

  if (!result.ok) {
    console.error(result.status, result.statusText)
    throw new Error(result.statusText)
  }
  return repos
}

const fetchRepos = async () => {
  const repos: EcosystemResearch.Repository[] = []
  for await (const url of buildUrls()) {
    const reposRaw = await walkUrl(new URL(`${url}.json?order=desc&sort=score`))

    repos.push(
      ...reposRaw.map((r) => ({
        ...r,
        github_url: `https://github.com/${r.full_name}`,
        org_url: `https://github.com/${r.org}`,
      }))
    )
  }

  return repos
}

export { fetchRepos }
