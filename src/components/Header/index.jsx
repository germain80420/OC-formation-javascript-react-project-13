import { NavLink, useNavigate } from "react-router-dom"

import logo from "../../assets/argentBankLogo.png"
import "./header.css"
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from "react-redux"
import { logout, sessionTimeOut } from "../../redux/actions/authActions.jsx"
import { useEffect, useState } from "react"

function Header() {
  const userData = useSelector((state) => state.user.userData)
  const isConnected = useSelector((state) => state.auth.isConnected)
  const [inactiveTime, setInactiveTime] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isConnected)
      document.onmousemove = (e) => {
        setInactiveTime(0)
      }
  })

  useEffect(() => {
    const timerDeconnexion = setInterval(() => {
      if (isConnected)
        setInactiveTime((prevInactiveTime) => prevInactiveTime + 1)
    }, 1000)

    return () => {
      // Nettoyer le timer lors du démontage du composant
      clearInterval(timerDeconnexion)
    }
  }, [isConnected]) // Le tableau vide signifie que cet effet ne dépend d'aucune valeur et ne doit s'exécuter qu'une seule fois au montage du composant

  useEffect(() => {
    console.log(inactiveTime)
    // Vous pouvez ajouter ici la logique pour déconnecter l'utilisateur après une certaine période d'inactivité
  }, [inactiveTime])
  useEffect(() => {
    if (inactiveTime > 10) {
      dispatch(sessionTimeOut())
      navigate("/session_time_out")
    }
  }, [dispatch, navigate, inactiveTime])

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
