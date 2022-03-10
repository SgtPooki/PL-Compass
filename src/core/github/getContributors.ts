import { cachedFetch } from '../cachedFetch'

const getContributors = async (
  repoName: string
): Promise<GitHub.RepoContributor[]> => {
  // https://api.github.com/repos/scala/scala/contributors?q=contributions&order=desc
  // https://stackoverflow.com/questions/48874412/github-api-how-to-get-the-top-contributors-sorted-for-a-given-repository
  const url = `https://api.github.com/repos/${repoName}/contributors?q=contributions&order=desc`

  const response = await cachedFetch(url)

  const json: GitHub.RepoContributor[] = await response.json()

  return json
}

export { getContributors }
