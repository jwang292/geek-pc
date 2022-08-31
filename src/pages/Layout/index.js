import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { removeToken } from 'utils/storage'
import { getUserInfo } from 'api/user'
const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    profile: {},
    selectedKey: this.props.location.pathname,
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="Are you sure to logout"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> logout
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                // 如果默认高亮用defaultSelectedKey ,会变就用selectedKey
                selectedKeys={[this.state.selectedKey]}
                style={{
                  height: '100vh',
                  borderRight: 0,
                }}
                theme="dark"
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home"> Home</Link>
                </Menu.Item>
                <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                  <Link to="/home/list"> Article List</Link>
                </Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                  <Link to="/home/publish"> Article Publish</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px', overflow: 'scroll' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route
                    // add Route
                    exact
                    path="/home/publish"
                    component={ArticlePublish}
                    key="add"
                  ></Route>
                  <Route
                    path="/home/publish/:id"
                    component={ArticlePublish}
                    key="edit"
                  >
                    {/* edit route  */}
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
  //组件更新的hook function  (包括router 变化)
  componentDidUpdate(prevProps) {
    //判断是否是URL地址变化，否则死循环
    // prevProps :上一次的props
    let pathname = this.props.location.pathname
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (pathname.startsWith('/home/publish')) {
        pathname = '/home/publish'
      }
      this.setState({
        selectedKey: pathname,
      })
    }
  }

  async componentDidMount() {
    const res = await getUserInfo()
    this.setState({
      profile: res.data,
    })
  }
  onConfirm = () => {
    removeToken()
    this.props.history.push('/login')
    message.success('success logout', 1)
  }
}
