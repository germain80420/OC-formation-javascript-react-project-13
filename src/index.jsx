import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import "./index.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import { store, persistor } from "./redux/store.jsx"
import { Provider } from "react-redux"
import Profile from "./pages/Profile/index.jsx"
import { PersistGate } from "redux-persist/integration/react"
import SessionTimeOut from "./pages/SessionTimeOut/index.jsx"

const container = document.getElementById("root")
const root = createRoot(container)
const router = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/session_time_out" element={<SessionTimeOut />} />
      </Routes>
      <Footer />
    </Router>
  )
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {router()}
        </PersistGate>
      ) : (
        router()
      )}
    </Provider>
  </React.StrictMode>,
)
