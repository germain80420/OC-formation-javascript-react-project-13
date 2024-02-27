import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginFailed, loginSuccess } from "../../redux/actions/authActions.jsx"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./form.css"
const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/
  return regex.test(email)
}
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/
  return regex.test(password)
}
function Form() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEmail(document.getElementById("username").value)
    setPassword(document.getElementById("password").value)
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email adress")
      return
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Invalid password")
      return
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        const data = await response.json()

        const token = data.body.token
        dispatch(loginSuccess(token))
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe))
        navigate("/profile")
      } else {
        const error = "Incorrect email/password"
        dispatch(loginFailed(error))
      }
    } catch (error) {
    }
  }

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button">Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  )
}

export default Form
