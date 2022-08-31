import React, { Component } from 'react'
import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Button,
  Form,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PlusOutlined } from '@ant-design/icons'
import { baseURL } from 'utils/request'
import { addArticle } from 'api/article'
import { getArticleById } from 'api/article'
export default class ArticlePublish extends Component {
  state = {
    type: 1,
    fileList: [],
    showPreview: false,
    previewUrl: '',
    id: this.props.match.params.id,
  }
  formRef = React.createRef()
  render() {
    const { previewUrl, showPreview, id } = this.state
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? 'edit' : 'publish'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 1 }}
            wrapperCol={{ offset: 2 }}
            size="large"
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{ content: '', type: this.state.type }}
          >
            <Form.Item
              label="title"
              name="title"
              rules={[{ required: true, message: 'title cannot be null' }]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="enter the Article title"
              ></Input>
            </Form.Item>
            <Form.Item
              label="channel"
              name="channel_id"
              rules={[{ required: true, message: 'Channel cannot be null' }]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="picture" name="type" onChange={this.changeType}>
              <Radio.Group>
                <Radio value={1}>1 picture</Radio>
                <Radio value={3}>3 pictures</Radio>
                <Radio value={0}>no picture</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3 }}>
              {this.state.type !== 0 && (
                <Upload
                  listType="picture-card"
                  fileList={this.state.fileList}
                  action={`${baseURL}upload`}
                  name="image"
                  onChange={this.onChange}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {this.state.fileList.length < this.state.type && (
                    <PlusOutlined />
                  )}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="content"
              name="content"
              rules={[{ required: true, message: 'content cannot be null' }]}
            >
              <ReactQuill theme="snow" placeholder="enter content"></ReactQuill>
            </Form.Item>
            <Form.Item>
              <Space>
                {' '}
                <Button type="primary" htmlType="submit" size="large">
                  {id ? 'edit' : 'publish'}
                </Button>
                <Button type="primary" size="large" onClick={this.addDraft}>
                  saving to draft
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Modal //弹窗
          visible={showPreview}
          title="previewTitle"
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewUrl} />
        </Modal>
      </div>
    )
  }

  async componentDidMount() {
    if (this.state.id) {
      //发请求，获取文章信息
      const res = await getArticleById(this.state.id)
      const values = {
        ...res.data,
        type: res.data.cover.type,
      }
      //设置表单values
      this.formRef.current.setFieldsValue(values)
      const fileList = res.data.cover.images.map((item) => {
        return { url: item }
        //回显图片
      })
      this.setState({
        fileList,
      })
    }
  }

  async save(values, draft) {
    const { fileList, type } = this.state
    // if (fileList.length !== type) {
    //   return message.warn('the number of picture is wrong')
    // }
    const images = fileList.map((item) => {
      return item.url || item.response.data.url
    })
    await addArticle(
      {
        ...values,
        cover: {
          type,
          images,
        },
      },
      draft
    )
    message.success('add success')
    this.props.history.push('/home/list')
  }

  onFinish = async (values) => {
    // const { fileList, type } = this.state
    // if (fileList.length !== type) {
    //   return message.warn('the number of picture is wrong')
    // }
    // const images = fileList.map((item) => {
    //   return item.url || item.response.data.url
    // })
    // await addArticle({
    //   ...values,
    //   cover: {
    //     type,
    //     images,
    //   },
    // })
    this.save(values, false)
  }
  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    })
    // console.log(e.target.value)
  }
  onChange = ({ fileList }) => {
    this.setState({
      fileList,
    })
  }
  // 添加草稿
  addDraft = async () => {
    const values = await this.formRef.current.validateFields()
    this.save(values, true)
  }
  //上传前的校验
  beforeUpload = (file) => {
    if (file.size >= 1024 * 500) {
      message.warning('cannot more than 500kb')
      return Upload.LIST_IGNORE
    }
    // if(file.type==='image/png'||'image/jpeg')
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warning('only upload PNG OR JPEG')
      return Upload.LIST_IGNORE
    }
  }
  handlePreview = (file) => {
    const url = file.url || file.response.data.url
    this.setState({ showPreview: true, previewUrl: url })
  }
  handleCancel = () => {
    this.setState({ showPreview: false, previewUrl: '' })
  }
}
