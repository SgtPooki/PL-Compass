import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="db dt-l w-100 border-box pa3 ph5-l">
    <Link
      className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
      to="home"
      title="Home"
    >
      <h2 className="ma0 montserrat aqua">PL-Compass</h2>
    </Link>
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <Link
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        to="stats"
        title="Stats"
      >
        Stats
      </Link>
      <Link
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        to="search"
        title="Search"
      >
        Search
      </Link>
      <Link
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        to="about"
        title="About"
      >
        About
      </Link>
      <Link to="stats">test link</Link>
    </div>
  </nav>
)

export { Header }
