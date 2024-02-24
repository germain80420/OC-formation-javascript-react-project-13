import { NavLink, useNavigate } from "react-router-dom"

import logo from "../../assets/argentBankLogo.png"
import "./header.css"
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/actions/authActions.jsx"
function Header() {
  const userData = useSelector((state) => state.user.userData)
  const isConnected = useSelector((state) => state.auth.isConnected)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())

    navigate("/")
  }
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="user-connexion">
        {!isConnected ? (
          <>
            {" "}
            <NavLink className="main-nav-item" to="/login">
              <FontAwesomeIcon icon={faUserCircle} />
              Sign In
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              {userData.firstname}
            </NavLink>
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOut} />
              Sign out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
export default Header
