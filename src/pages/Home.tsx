import { RepositoriesTable } from '../components/RepositoriesTable'

import { ErrorBoundary } from '../components/ErrorBoundary'
const Home = () => (
  <>
    <h1>Home</h1>
    <div>Repositories</div>
    <ErrorBoundary>
      <RepositoriesTable />
    </ErrorBoundary>
  </>
)

export { Home }
