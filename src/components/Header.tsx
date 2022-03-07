const Header = () => (
  <nav className="db dt-l w-100 border-box pa3 ph5-l">
    <a
      className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
      href="#"
      title="Home"
    >
      <h2 className="ma0 montserrat aqua">PL-Compass</h2>
    </a>
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <a
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        href="#"
        title="Stats"
      >
        Stats
      </a>
      <a
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        href="#"
        title="Search"
      >
        Search
      </a>
      <a
        className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
        href="#"
        title="About"
      >
        About
      </a>
    </div>
  </nav>
)

export { Header }
