import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from 'pages/Layout'
import Login from 'pages/Login'
import AuthRoute from 'components'
import history from 'utils/history'
function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">login</Link>
        <Link to="/home">home</Link>
        <Button type="primary">Primary Button</Button> */}

        {/* 配置route 规则 'Switch are replaced by Routes in V6' */}
        {/* Replace component with element in v6 */}
        <Switch>
          <AuthRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
