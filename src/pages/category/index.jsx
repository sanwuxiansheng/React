import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import MyButton from '../../components/my-button';
import { reqCategory, reqAddCategory } from '../../api';
import AddCategoryForm from './add-category-form';
import './index.less';

export default class Category extends Component {
  state = {
    categories: [], // 一级列表分类
    isShowAddCategory: false // 是否显示添加的品类
  };
  async componentDidMount() {
    const result = await reqCategory('0');
    if (result) {
      this.setState({
        categories: result
      });
    }
  };
  // 显示添加的品类
  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    })
  };
  // 隐藏添加的品类
  hideAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    })
  };
  // 添加品类函数
  addCategory = () => {
    console.log(this.addCategoryForm);
    const { form } = this.addCategoryForm.props;
    form.validateFields(async (errors, values) => {
      if (!errors) {
        // 没有报错说明验证通过
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result) {
          // 如果有返回值说明请求成功
          message.success('添加分类成功',1)
          // 清空输入框，清空表单
          form.resetFields(['parentId', 'categoryName'])
          /*
            如果是一级分类：就在一级分类列表中展示
            如果是二级分类：就在二级分类中展示，而一级分类是不需要的
           */
          const options = {
            isShowAddCategory: false
          };
          // 判断通过则说明是一级分类要在一级列表分类中展示
          if (result.parentId === '0') {
            options.categories = [...this.state.categories, result];
          }
          this.setState(options);
        } else {
          message.success('添加分类失败',1)
        }
      }
    })
  }

  render() {
    const { categories, isShowAddCategory } = this.state;
    // 表头内容
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        className: 'category-operation',
        dataIndex: 'money',
        render: text => {
          return <div>
            <MyButton>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
          </div>
        }
      },
    ];

    /*const data = [
      {
        key: '1',
        name: '勒布朗.詹姆斯',
        money: '￥300,000.00',
      },
      {
        key: '2',
        name: '安东尼.戴维斯',
        money: '￥1,256,000.00',
      },
      {
        key: '3',
        name: '凯瑞.欧文',
        money: '￥120,000.00',
      },
      {
        key: '4',
        name: '凯文.乐福',
        money: '￥120,000.00',
      },
    ];*/
    return <div>
      <Card title="一级列表分类" extra={<Button type='primary' onClick={this.showAddCategory}><Icon type="plus" />添加品类</Button>}>
        <Table
          columns={columns}
          dataSource={this.state.categories}
          bordered
          pagination={{
            pageSizeOptions: ['3','6','9','12'],
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 3
          }}
          rowKey="_id"
        />,
        <Modal
          title='添加分类'
          visible={isShowAddCategory}
          okText="确认"
          cancelText="取消"
          onCancel={this.hideAddCategory}
          onOk={this.addCategory}
        >
          <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/></Modal>
      </Card>
    </div>;
  }
}
