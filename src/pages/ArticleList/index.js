import React, { Component } from 'react'
import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Button,
  // Select,
  DatePicker,
  Table,
  Space,
  Tag,
  Modal,
  message,
} from 'antd'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constance'
// import { getChannels } from 'api/channel'
import { delArticle, getArticles } from 'api/article'
import defaultImg from 'assets/images/defaultImage.png'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Channel from 'components/Channel'
// const { Option } = Select
const { confirm } = Modal
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
      dataIndex: 'status', // == data.status
      render(status) {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
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
      render: (data) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => this.handleEdit(data.id)}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => this.handleDel(data.id)}
            ></Button>
          </Space>
        )
      },
    },
  ]
  //用于查询文章列表的参数
  reqParams = {
    page: 1,
    per_page: 10,
  }
  state = {
    articles: {},
  }

  render() {
    const { results, total_count, per_page, page } = this.state.articles
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
              <Channel></Channel>
              {/* <Select
                style={{ width: 200 }}
                placeholder="select channel"
                onChange={this.handleChange}
              >
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select> */}
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
          <Table
            dataSource={results}
            columns={this.columns}
            rowKey="id"
            pagination={{
              position: ['bottomCenter'],
              total: total_count,
              pageSize: per_page,
              current: page,
              onChange: this.onChange,
            }} //加分页
          />
        </Card>
      </div>
    )
  }
  componentDidMount() {
    // this.getChannelsList()
    this.getArticlesList()
  }
  // async getChannelsList() {
  //   const res = await getChannels()
  //   this.setState({ channels: res.data.channels })
  // }

  async getArticlesList() {
    const res = await getArticles(this.reqParams)
    // console.log(res)
    this.setState({
      articles: res.data,
    })
  }
  onFinish = (values) => {
    console.log(values)
    if (values.status !== -1) {
      this.reqParams.status = values.status
    } else {
      //选了全部
      delete this.reqParams.status
    }
    if (values.channel_id !== undefined) {
      this.reqParams.channel_id = values.channel_id
    } else {
      delete this.reqParams.channel_id
    }
    if (values.date) {
      this.reqParams.begin_pubdate = values.date[0]
        .startOf('day')
        .format('YYYY-MM-DD')
      this.reqParams.end_pubdate = values.date[1]
        .endOf('day')
        .format('YYYY-MM-DD')
    } else {
      delete this.reqParams.begin_pubdate
      delete this.reqParams.end_pubdate
    }
    //重置页码为1
    this.reqParams.page = 1
    //重新发送请求
    this.getArticlesList()
  }
  onChange = (page, pageSize) => {
    this.reqParams.page = page
    this.reqParams.per_page = pageSize
    this.getArticlesList() //用新数据发请求
  }
  handleDel = (id) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to Delete',

      onOk: async () => {
        //发送请求，删除
        await delArticle(id)
        this.getArticlesList()
        message.success('delete success')
      },
    })
  }
  handleEdit = (id) => {
    this.props.history.push(`/home/publish/${id}`)
  }
}
