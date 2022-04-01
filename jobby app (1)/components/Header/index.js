import {AiFillHome} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <ul className="responsive-content">
        <Link to="/">
          <li>
            <AiFillHome className="nav-button" />
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <BsFillBriefcaseFill className="nav-button" />
          </li>
        </Link>
        <button
          type="button"
          className="mobile-view-logout-button"
          onClick={onClickLogout}
        >
          <li>
            <FiLogOut className="nav-button" />
          </li>
        </button>
      </ul>

      <ul className="desk-top-view-container">
        <Link to="/" className="header-link-item">
          <li className="nav-heading">Home</li>
        </Link>
        <Link to="/jobs" className="header-link-item">
          <li className="nav-heading">Jobs</li>
        </Link>
      </ul>

      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
