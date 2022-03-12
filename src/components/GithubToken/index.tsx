import { useState } from 'react'
import { useGithubToken } from '../../core/hooks/useGithubToken'

const GithubToken = () => {
  const { token, setToken } = useGithubToken()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGithubTokenChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setToken(event.target.value)
  }

  const [expanded, setExpanded] = useState(false)

  const toggle = () => setExpanded((currentState) => !currentState)

  let help = (
    <a
      style={{ cursor: 'pointer' }}
      className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
      onClick={toggle}
    >
      help?
    </a>
  )
  if (expanded) {
    help = (
      <>
        <span className="b f6">If all contributors don't load for you:</span>
        <ul className="i f7 list">
          <li>
            1. go create a{' '}
            <a href="https://github.com/settings/tokens/new">
              personal authentication token on GitHub
            </a>{' '}
            with <b>at least</b>{' '}
            <span className="span code red">public_repo</span> permissions.
          </li>
          <li>2. Enter it above.</li>
          <li>3. Then refresh the page.</li>
        </ul>
        <a
          style={{ cursor: 'pointer' }}
          className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
          onClick={toggle}
        >
          Close help
        </a>
      </>
    )
  }
  return (
    <div className="f6 w-50 mw8 center tl">
      <label htmlFor="githubToken">Github Token: </label>
      <input
        name="githubToken"
        type="text"
        value={token}
        onChange={onGithubTokenChange}
      />
      <div className="wa tl">{help}</div>
    </div>
  )
}

export { GithubToken }
