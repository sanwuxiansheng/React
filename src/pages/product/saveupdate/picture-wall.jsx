import React, { Component } from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import {reqDeleteProductImg} from "../../../api";

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 预览图的显示或者隐藏
    previewImage: '', // 预览图
    fileList: this.props.imgs.map((img, index) => {
      return {
        uid: -index,
        name: img,
        status: 'done',
        url: `http://localhost:5000/upload/${img}`,
      }
    })
  };
 // 点击取消预览
  handleCancel = () => this.setState({ previewVisible: false });
 // 点击预览按钮
  handlePreview = async file => {

    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 上传图片
  handleChange = async ({ file, fileList }) => {
    // console.log(file);
    if (file.status === 'uploading') {
      // 图片上传中
    } else if (file.status === 'done') {
      // 图片上传成功
      fileList[fileList.length - 1].name = file.response.data.name;
      fileList[fileList.length - 1].url = file.response.data.url;
      message.success('上传图片成功~', 2);
    } else if (file.status === 'error') {
      // 图片上传失败
      message.error('上传图片失败~', 2);
    } else {
      // 删除图片
      // 发送请求获取上传的图片数据并进行删除
      const id = this.props.id;
      // console.log(id);
      // const name = (file.response && file.response.data.name) || file.name;
      const name = file.name;
      // console.log(name);
      const result = await reqDeleteProductImg(name, id);
      if (result) {
        message.success('删除图片成功~', 2);
      }
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
           // 上传图片的地址
          action="/manage/img/upload"
          listType="picture-card"
          // 展示的图片文件列表
          fileList={fileList}
          // 点击预览的回调函数
          onPreview={this.handlePreview}
          // 点击上传或者删除的回调函数
          onChange={this.handleChange}
          // 请求参数
          data={{
            id: this.props.id
          }}
          name="image"
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
