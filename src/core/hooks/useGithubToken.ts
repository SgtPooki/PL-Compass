import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const localStorageKey = 'githubToken'
let githubToken = localStorage.getItem(localStorageKey) ?? ''

let observers: Dispatch<SetStateAction<Readonly<string>>>[] = []

const setToken = (token: string) => {
  githubToken = token
  localStorage.setItem(localStorageKey, githubToken)

  observers.forEach((updateFn) => updateFn(githubToken))
}

const useGithubToken = () => {
  const [token, setLocalToken] = useState<Readonly<string>>(githubToken)

  useEffect(() => {
    observers.push(setLocalToken)

    setLocalToken(githubToken)

    return () => {
      observers = observers.filter((update) => update !== setLocalToken)
    }
  }, [])

  return { token, setToken }
}

export { useGithubToken }
