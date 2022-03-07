import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Header } from './components/Header'
import { GithubRibbon } from './components/GithubRibbon/GithubRibbon'

function App() {
  return (
    <div className="App">
      <GithubRibbon />
      {/* <header className="App-header">
        <a href="https://github.com/sgtpooki/PL-Compass">
          <img
            loading="lazy"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
            className="attachment-full size-full jetpack-lazy-image"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
            data-lazy-src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149&is-pending-load=1"
            srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          <noscript>
            <img
              loading="lazy"
              width="149"
              height="149"
              src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
              className="attachment-full size-full"
              alt="Fork me on GitHub"
              data-recalc-dims="1"
            />
          </noscript>
        </a>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header />
      <a href="https://github.com/sgtpooki/PL-Compass">
        <img
          loading="lazy"
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
          className="attachment-full size-full jetpack-lazy-image"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
          data-lazy-src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149&is-pending-load=1"
          srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
        <noscript>
          <img
            loading="lazy"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
            className="attachment-full size-full"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
          />
        </noscript>
      </a>
    </div>
  )
}

export default App
