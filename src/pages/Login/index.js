import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import logo from 'assets/images/logo.png'
import './index.scss'
import { login } from 'api/user'
// import request from 'utils/request'
export default class Login extends Component {
  render() {
    return (
      <div className="loginDiv">
        <Card className="loginCard">
          <img className="loginlogo" src={logo} alt="" />
          <Form
            size="large"
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: 'enter a phone number',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: 'format is wrong',
                },
              ]}
            >
              <Input placeholder="enter your phone number" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="code"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  message: 'enter a number',
                  validateTrigger: 'onBlur',
                },
                {
                  pattern: /^\d{6}$/,
                  message: 'wrong format',
                },
              ]}
            >
              <Input placeholder="enter password" autoComplete="off" />
            </Form.Item>
            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  validator(value) {
                    if (value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(
                        new Error('please read the conditon')
                      )
                    }
                  },
                },
              ]}
            >
              <Checkbox>I Agree</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  // onFinish = async ({ mobile, code }) => {
  //   const res = await request({
  //     method: 'POST',
  //     url: '/authorizations',
  //     data: {
  //       mobile,
  //       code,
  //     },
  //   })
  //   console.log(res)
  // }
  onFinish = async ({ mobile, code }) => {
    try {
      const res = await login(mobile, code)
      console.log(res)

      message.success('successful login', 1, () => {
        localStorage.setItem('token', res.data.token)

        console.log(typeof this.props.history)
        this.props.history.push('/home')
      })
    } catch (error) {
      message.warning(error.response.data.message, 1)
    }
  }
}
