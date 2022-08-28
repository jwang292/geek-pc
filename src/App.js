import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
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
          <Redirect exact from="/" to="/home"></Redirect>{' '}
          {/* 解决已启动项目显示3000 而不是登录页问题 . redirect 必须放在switch 里面用*/}
          <AuthRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
