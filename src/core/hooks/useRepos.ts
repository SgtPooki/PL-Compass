import { uniqBy } from 'lodash'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { fetchRepos } from '../ecosystemResearch/fetchRepos'

let singletonRepos: EcosystemResearch.Repository[] = []
let observers: Dispatch<
  SetStateAction<Readonly<EcosystemResearch.Repository[]>>
>[] = []
let started = false

const addGlobalRepos = (repos: EcosystemResearch.Repository[]) => {
  singletonRepos = uniqBy(singletonRepos.concat(...repos), 'full_name')
  observers.forEach((updateFn) => updateFn(singletonRepos))
}
const setGlobalRepos = (repos: EcosystemResearch.Repository[]) => {
  singletonRepos = repos
  observers.forEach((updateFn) => updateFn(singletonRepos))
}

const replaceRepo = (newRepo: EcosystemResearch.Repository) => {
  const index = singletonRepos.findIndex(
    (repo) => repo.full_name === newRepo.full_name
  )
  singletonRepos.splice(index, 1, newRepo)
  observers.forEach((updateFn) => updateFn(singletonRepos))
}

const useRepos = () => {
  if (!started) {
    started = true
    fetchRepos()
  }
  const [repos, setRepos] =
    useState<Readonly<EcosystemResearch.Repository[]>>(singletonRepos)

  useEffect(() => {
    observers.push(setRepos)

    setRepos(singletonRepos)

    return () => {
      observers = observers.filter((update) => update !== setRepos)
    }
  }, [])

  return { repos }
}

export { useRepos, addGlobalRepos, setGlobalRepos, replaceRepo }
