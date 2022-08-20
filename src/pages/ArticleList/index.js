import React, { Component } from 'react'
import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
} from 'antd'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constance'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
const { Option } = Select
export default class ArticleList extends Component {
  state = {
    channels: [],
  }
  dataSource = [
    {
      key: '1',
      name: 'this.data.results.title',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]
  columns = [
    {
      title: 'Picture',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Titel',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Posttime',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'read',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Comments',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Likes',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Edit',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  render() {
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home"> Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>ArticleList</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="status" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Channel" name="channel_id">
              <Select
                style={{ width: 200 }}
                placeholder="select channel"
                onChange={this.handleChange}
              >
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item lable="date" name="">
              <DatePicker.RangePicker></DatePicker.RangePicker>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Select
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="There is xxx result">
          <Table dataSource={this.dataSource} columns={this.columns} />
        </Card>
      </div>
    )
  }
  async componentDidMount() {
    this.getChannelsList()
    this.getArticlesList()
  }
  async getChannelsList() {
    const res = await getChannels()
    this.setState({ channels: res.data.channels })
  }

  async getArticlesList() {
    const res = await getArticles()
    this.setState({
      articles: res.data,
    })
  }
  onFinish = (values) => {
    console.log(values)
  }
  handleChange = () => {}
}
