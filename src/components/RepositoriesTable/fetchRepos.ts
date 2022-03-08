const urls = [
  'https://ecosystem-research.herokuapp.com/repositories',
  'https://ecosystem-research.herokuapp.com/collabs/repositories',
  'https://ecosystem-research.herokuapp.com/community/repositories',
  // filesystem.ecosystem-research.com
  //libp2p.ecosystem-research.com
]

// https://ecosystem-research.herokuapp.com/collabs/repositories?page=1&per_page=20

import fetchPonyFill from 'fetch-ponyfill'

const { fetch } = fetchPonyFill()

const walkUrl = async (url: URL, page: number, per_page = 20) => {
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
  for await (const url of urls) {
    repos.push(...(await walkUrl(new URL(`${url}.json`), 100)))
  }

  return repos
}

export { fetchRepos }
