import React, { Component } from 'react';
import { Card, Icon, Form, Input, Button, Cascader, InputNumber } from 'antd';
import {reqCategory} from '../../../api';

import RichTextEditor from './rich-text-editor';

import './index.less';

const {Item} = Form;
export default class SaveUpdate extends Component {

  state = {
    options: [],
  };

  // 发送请求、请求一级分类数据
  async componentDidMount() {
    const result = await reqCategory('0');
    if (result) {
      this.setState({
        options: result.map((item) => {
          return {
            value: item._id,
            label: item.name,
            isLeaf: false,
          }
        })
      })
    }
  }

  loadData = async selectedOptions => {

    // 获取数组中的最后一项数据
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // console.log(targetOption);
    // 是否显示loading图
    targetOption.loading = true;
    // 发送请求 点击一级分类数据请求二级分类数据并显示
    const result = await reqCategory(targetOption.value);
    if (result) {
      // 数据请求成功取消loading图的显示
      targetOption.loading = false;
      targetOption.children = result.map((item) => {
        return {
          label: item.name,
          value: item._id,
        }
      });
      // 因为页面重新发生变化所以需要更新状态
      this.setState({
        options: [...this.state.options],
      })
    }
  };
  addProduct = (e) => {
    e.preventDefault()
  };
  goProduct = () => {
    this.props.history.push('/product/index')
  };
  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const {options} = this.state;
    return <Card title={<div className='product-title'><Icon type='arrow-left' className='arrow-icon' onClick={this.goProduct}/><span>添加商品</span></div>}>
      <Form {...formItemLayout} onSubmit={this.addProduct}>
        <Item label='商品名称'>
          <Input placeholder='请输入商品名称'/>
        </Item>
        <Item label='商品描述'>
          <Input placeholder='请输入商品描述'/>
        </Item>
        <Item label='请选择分类' wrapperCol={{span:5}}>
          <Cascader
            options={options}
            loadData={this.loadData}
            changeOnSelect
          />
        </Item>
        <Item label='商品价格'>
          <InputNumber
            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/￥\s?|(,*)/g, '')}
            className='input-number'
          />
        </Item>
        <Item label='商品详情'></Item>
        <Item wrapperCol={{span:20}}>
          <RichTextEditor/>

          <Button type='primary' className='submit-button' htmlType='submit'>提交</Button>
        </Item>
      </Form>
    </Card>;
  }
}