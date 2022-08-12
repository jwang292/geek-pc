import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">login</Link>
        <Link to="/home">home</Link>
      </div>

      {/* 配置route 规则 'Switch are replaced by Routes in V6' */}
      {/* Replace component with element in v6 */}
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App
