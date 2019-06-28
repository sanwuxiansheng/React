import React, { Component } from 'react';
import MyButton from "../../../components/my-button";
import {Card, Button, Icon, Table, Select, Input, message} from "antd";
import {reqProducts} from '../../../api';
import './index.less';
import {reqSearchProduct} from "../../../api";
const { Option } = Select;
export default class Index extends Component {
  state = {
    products: [], // 商品管理数据
    isLoading: true, // 是否显示loading图
    total: 0,
    searchType: 'productName',
    searchContent: '',
    pageNum: 1,
    pageSize: 3
  };
  componentDidMount() {
    this.getProducts(1, 3)
  };

  getProducts = async (pageNum, pageSize) => {
    this.setState({
      loading: true
    });
    const { searchContent, searchType } = this.state;
    let promise = null;
    if (this.isSearch && searchContent) {
      promise = reqSearchProduct({
        searchType, searchContent, pageSize, pageNum
      })
    } else {
      promise = reqProducts(pageNum, pageSize);
    }
    const result = await promise;
    if (result) {
      this.setState({
        total: result.total,
        products: result.list,
        isLoading: false,
        pageNum,
        pageSize
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
  // 收集搜索框数据
  handleChange = (stateName) => {
    return (e) => {
      // console.log(e);
      let value = '';
      if (stateName === 'searchType') {
        value = e; // 根据商品名称
      } else {
        value = e.target.value; // 根据商品描述
        // console.log(value);
        if (!value) this.isSearch = false;
      }
      // console.log(value); // value就是输入框中输入的值
      this.setState({
        [stateName]: value
      })
    }
  };
  // 收集搜索框中内容后发送请求
  searchProduct = async () => {
    // 收集数据
    // console.log('出发了');
    const { searchContent, pageSize, pageNum } = this.state;
    // console.log(searchContent, pageSize, pageNum );
    if (searchContent) {
      // 判断通过发送请求请求数据
      this.isSearch = true;
      this.getProducts(pageNum, pageSize);

    } else {
      message.warn('请输入搜索内容~', 2);
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
        <Select defaultValue = "productName" onChange={this.handleChange('searchType')}>
          <Option key={0} value="productName">根据商品名称</Option>
          <Option key={1} value="productDesc">根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" className='search-input' onChange={this.handleChange('searchContent')}/>
        <Button type="primary" onClick={this.searchProduct}>搜索</Button>
      </div>
    }
      extra={<Button type="primary" onClick={this.showAddProduct}><Icon type='plus'/>添加产品</Button>}
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