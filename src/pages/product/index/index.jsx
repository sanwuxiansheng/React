import React, { Component } from 'react';
import MyButton from "../../../components/my-button";
import { Card, Button, Icon, Table, Select, Input } from "antd";
import {reqProducts} from '../../../api';
import './index.less';
const { Option } = Select;
export default class Index extends Component {
  state = {
    products: [], // 商品管理数据
    isLoading: true, // 是否显示loading图
    total: 0
  };
  componentDidMount() {
    this.getProducts(1, 3)
  };

  getProducts = async (pageNum, pageSize) => {
    this.setState({
      loading: true
    });
    const result = await reqProducts(pageNum, pageSize);
    if (result) {
      this.setState({
        total: result.total,
        products: result.list,
        isLoading: false
      })
    }
  };
  showAddProduct = () => {
    this.props.history.push('/product/saveupdate')
  };
  showUpdateProduct = (product) => {
    return () => {
      this.props.history.push('/product/saveupdate', product)
    }
  };
  render() {
    const { products, isLoading, total } = this.state;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        className: 'product-status',
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return status === 1
            ? <div>已下架&nbsp;&nbsp;&nbsp;<Button type='primary'>上架</Button></div>
            : <div>在售中&nbsp;&nbsp;&nbsp;<Button type='primary'>下架</Button></div>
        }
      },
      {
        className: 'product-status',
        title: '操作',
        render: (product) => {
          return <div>
            <MyButton onClick={this.showUpdateProduct(product)}>详情</MyButton>
            <MyButton onClick={this.showUpdateProduct(product)}>修改</MyButton>
          </div>
        }
      },
    ];
    return <Card
    title={
      <div>
        <Select defaultValue = {0}>
          <Option key={0} value={0}>根据商品名称</Option>
          <Option key={1} value={1}>根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" className='search-input'/>
        <Button type="primary">搜索</Button>
      </div>
    }
      extra={<Button type="primary" onClick={this.showAddProduct}><Icon type='plus'></Icon>添加产品</Button>}
    >
      <Table
        columns={columns}
        dataSource={products}
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          total,
          onChange: this.getProducts,
          onShowSizeChange: this.getProducts
        }}
        rowKey='_id'
        loading={isLoading}
      />
    </Card>
  }
}