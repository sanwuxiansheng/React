import React, { Component } from 'react';
import { Card, Button, Icon, Table  } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategory } from '../../api';
import './index.less';

export default class Category extends Component {
  state = {
    categories: [],
  };
  async componentDidMount() {
    const result = await reqCategory('0');
    if (result) {
      this.setState({
        categories: result
      });
    }
  }

  render() {
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
      <Card title="一级列表分类" extra={<Button type='primary'><Icon type="plus" />添加品类</Button>}>
        <Table
          columns={columns}
          dataSource={this.state.categories}
          bordered
          pagination={{
            pageSizeOptions: [3,6,9,12],
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 3
          }}
        />,
      </Card>
    </div>;
  }
}
