import Account from "../../components/Account/index.jsx"
import { useEffect } from "react"
import { userProfile } from "../../redux/actions/userActions.jsx"
import "./profile.css"
import { useSelector, useDispatch } from "react-redux"
import User from "../../components/User/index.jsx"
import { useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)
  console.log(token)
  const userData = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.ok) {
          const data = await response.json()
          const userData = {
            createdAt: data.body.createdAt,
            updatedAt: data.body.updatedAt,
            id: data.body.id,
            email: data.body.email,
            firstname: data.body.firstName,
            lastname: data.body.lastName,
            username: data.body.userName,
          }

          dispatch(userProfile(userData))
        } else {
          navigate("/")
        }
      } catch (error) {
        console.error(error)
        navigate("/")
      }
    }
    if (token) {
      fetchData()
    } else {
      navigate("/")
    }
  }, [dispatch, token, navigate])

  return (
    <main className="main bg-dark">
      <User />
      <h2 className="sr-only">Accounts</h2>
      <Account
        title={"Argent Bank Checking (x8349)"}
        amount={"2,082.79"}
        amountDescription={"Available Balance"}
        showLink={true}
      />
      <Account
        title={"Argent Bank Savings (x6712)"}
        amount={"10,928.42"}
        amountDescription={"Available Balance"}
        showLink={true}
      />
      <Account
        title={"Argent Bank Credit Card (x8349)"}
        amount={"184.30"}
        amountDescription={"Current Balance"}
        showLink={true}
      />
    </main>
  )
}

export default Profile
