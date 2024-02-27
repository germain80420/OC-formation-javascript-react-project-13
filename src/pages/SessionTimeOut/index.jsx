import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./sessionTimeOut.css"

function SessionTimeOut() {
  const navigate = useNavigate()
  const reconnexion = () => {
    navigate("/login")
  }
  const isSessionTimeOut = useSelector((state) => state.auth.isSessionTimeOut)
  useEffect(() => {
    if (!isSessionTimeOut) navigate("/")
  }, [isSessionTimeOut, navigate])
  return (
    <main className="main bg-dark">
      <div className="infos">
        <h1>VOUS AVEZ ÉTÉ DÉCONNECTÉ</h1>
        <p>
          Vous êtes resté inactif trop longtemps, par soucis de sécurité nous
          vous avons deconnecté
        </p>
        <button onClick={reconnexion}>ME RECONNECTER</button>
      </div>
    </main>
  )
}
export default SessionTimeOut
