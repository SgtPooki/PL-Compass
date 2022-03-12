import { useGithubToken } from '../../core/hooks/useGithubToken'

const GithubToken = () => {
  const { token, setToken } = useGithubToken()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGithubTokenChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setToken(event.target.value)
  }
  return (
    <>
      <label htmlFor="githubToken">Github Token: </label>
      <input
        name="githubToken"
        type="text"
        value={token}
        onChange={onGithubTokenChange}
      />
    </>
  )
}

export { GithubToken }
