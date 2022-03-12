import { getClient } from './getClient'

const getContributors = async (repoName: string) => {
  // https://api.github.com/repos/scala/scala/contributors?q=contributions&order=desc
  // https://stackoverflow.com/questions/48874412/github-api-how-to-get-the-top-contributors-sorted-for-a-given-repository
  // const url = `https://api.github.com/repos/${repoName}/contributors?q=contributions&order=desc`

  const client = getClient()

  const [owner, repo] = repoName.split('/')

  const { data: contributors } = await client.repos.listContributors({
    repo,
    owner,
  })

  return contributors
}

export { getContributors }
