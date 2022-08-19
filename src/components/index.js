import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
import { Redirect } from 'react-router-dom'
export default class AuthRoute extends Component {
  render() {
    //... rest: 解构的剩余参数
    const { component: Component, ...rest } = this.props //props  通过AuthRoute 传来的参数

    return (
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            // console.log(props)
            //。。。props 是route里的参数 包括 history
            return <Component {...props} /> // REACT要求首字母大写，1.重命名component ： 为大写字母的。2.jsx里导入
          } else {
            return (
              //页面跳转到登录页面，需要保存当前页面，已方便登陆后放回当前页。用state {from} 属性获得
              <Redirect
                to={{
                  pathname: '/login',
                  // search : '?props.location.pathname'
                  state: { from: props.location.pathname },
                }}
              />
            )
          }
        }}
      ></Route>
    ) //把props 传了过来
  }
}
