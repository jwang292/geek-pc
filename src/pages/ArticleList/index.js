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
  Space,
  Tag,
} from 'antd'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constance'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import defaultImg from 'assets/images/defaultImage.png'
const { Option } = Select
export default class ArticleList extends Component {
  columns = [
    {
      title: 'Cover',

      render(data) {
        if (data.cover.type === 0) {
          //no image
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        } else {
          return (
            <img
              src={data.cover.images[0]}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        }
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'PostTime',
      dataIndex: 'pubdate',
    },
    {
      title: 'Read',
      dataIndex: 'read_count',
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count',
    },
    {
      title: 'Likes',
      dataIndex: 'like_count',
    },
    {
      title: 'Edit',
      dataIndex: 'age',
    },
  ]

  state = {
    channels: [],
    articles: {},
  }

  render() {
    const { results, total_count } = this.state.articles
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
        <Card title={`There is ${total_count}result`}>
          <Table dataSource={results} columns={this.columns} rowKey="id" />
        </Card>
      </div>
    )
  }
  componentDidMount() {
    this.getChannelsList()
    this.getArticlesList()
  }
  async getChannelsList() {
    const res = await getChannels()
    this.setState({ channels: res.data.channels })
  }

  async getArticlesList() {
    const res = await getArticles()
    console.log(res)
    this.setState({
      articles: res.data,
    })
  }
  onFinish = (values) => {
    console.log(values)
  }
  handleChange = () => {}
}
