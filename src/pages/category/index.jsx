import React, {Component} from 'react';
import {Card, Button, Icon, Table, Modal, message} from 'antd';

import MyButton from '../../components/my-button';
import {reqCategory, reqAddCategory, reqUpdateCategoryName} from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name';
import './index.less';

export default class Category extends Component {
  state = {
    categories: [], // 一级列表分类
    subCategories: [], // 二级分类列表
    isShowSubCategories: false, //是否显示二级分类列表
    isShowAddCategory: false, // 是否显示添加的品类
    isShowUpdateCategoryName: false, // 是否显示修改分类名称
    loading: true // 是否显示loading
  };
  category = {};

  componentDidMount() {
    this.fetchCategories('0')
  };

  fetchCategories = async (parentId) => {
    this.setState({
      loading: true
    });
    const result = await reqCategory(parentId);
    if (result) {
      if ( parentId === '0' ) {
        this.setState({
          categories: result,
        })
      } else {
        this.setState({
          subCategories: result,
          isShowSubCategories: true
        })
      }
    };
    this.setState({
      loading: false
    })
  };

  // 显示添加的品类
  /*showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    })
  };*/
  // 隐藏添加的品类
  /*hideAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    })
  };*/
  // 添加品类函数
  addCategory = () => {
    // console.log(this.addCategoryForm);
    const {form} = this.addCategoryForm.props;
    form.validateFields(async (errors, values) => {
      if (!errors) {
        // 没有报错说明验证通过
        const {parentId, categoryName} = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result) {
          // 如果有返回值说明请求成功
          message.success('添加分类成功', 1)
          // 清空输入框，清空表单
          form.resetFields(['parentId', 'categoryName'])
          /*
            如果是一级分类：就在一级分类列表中展示
            如果是二级分类：就在二级分类中展示，而一级分类是不需要的
                          当前显示的是一级分类是不需要的展示
                          当前显示的是二级分类，还需要满足添加分类的一级分类和当前显示的一级分类一致，才显示，否则不显示
           */
          const options = {
            isShowAddCategory: false
          };
          const { isShowSubCategories } = this.state;
          // 判断通过则说明是一级分类要在一级列表分类中展示
          if (result.parentId === '0') {
            options.categories = [...this.state.categories, result];
          } else if ( isShowSubCategories && result.parentId === this.parentCategory._id) {
            options.subCategories = [...this.state.subCategories, result]
          }
          this.setState(options);
        } else {
          message.success('添加分类失败', 1)
        };

      };

    });
  };
  // 显示和隐藏切换
  toggleDisplay = (stateName, stateValue) => {
    return () => {
      this.setState({
        [stateName]: stateValue
      })
    }
  };
  // 显示修改分类名称
  /*showUpdateCategoryName = () => {
    this.setState({isShowUpdateCategoryName: true})
  };*/
  // 隐藏修改分类名称
  hideUpdateCategoryName = () => {
    // 清空表单项的值
    this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
    // 隐藏对话框
    this.setState({isShowUpdateCategoryName: false})
  };
  saveCategory = (category) => {
    return () => {
      this.category = category;
      this.setState({
        isShowUpdateCategoryName: true
      })
    }
  };
  updateCategoryName = () => {
    const {form} = this.updateCategoryNameForm.props;
    form.validateFields(async (err, values) => {
      // 检验表单数据
      if (!err) {
        const {categoryName} = values;
        const categoryId = this.category._id;
        // 验证通过就发送请求
        const result = await reqUpdateCategoryName(categoryId, categoryName);
        if (result) {
          const { parentId } = this.category;
          let categoryData = this.state.categories;
          let stateName = 'categories';

          if ( parentId !== '0') {
            // 进来了说明是二级分类
            categoryData = this.state.subCategories;
            stateName = 'subCategories';
          }
          const categories = categoryData.map((category) => {
            let {_id, name, parentId} = category;
            // 找到对应id的category，修改分类名称
            if (_id === categoryId) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            }
            // 没有修改过的数据直接返回
            return category
          });
          // 清空表单项的值 隐藏对话框
          form.resetFields(['categoryName']);
          message.success('更新分类名称成功~', 2);
          this.setState({
            isShowUpdateCategoryName: false,
            [stateName]: categories
          })
        };

      }
    });
  };
  // 查看二级分类
  showSubCategory = (category) => {
    return async () => {
      this.parentCategory = category
      this.fetchCategories(category._id);
    }
  };
  goBack = () => {
    this.setState({
      isShowSubCategories: false
    })
  };
  render() {
    const {
      categories,
      isShowAddCategory,
      isShowUpdateCategoryName,
      subCategories,
      isShowSubCategories,
      loading
    } = this.state;
    // 表头内容
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        className: 'category-operation',
        // dataIndex: 'money',
        render: (category) => {
          return (<div>
            <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
            {
              isShowSubCategories ? null : <MyButton onClick={this.showSubCategory(category)}>查看其子品类</MyButton>
            }
          </div>)
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
    // console.log(this.category);
    return <Card
      title={ isShowSubCategories ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"></Icon>&nbsp;{this.parentCategory.name}</div> : "一级列表分类"}
                 extra={<Button type='primary' onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon
                   type="plus"/>添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={isShowSubCategories ? subCategories : categories}
        bordered
        pagination={{
          pageSizeOptions: ['3', '6', '9', '12'],
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: 3
        }}
        rowKey="_id"
        loading={loading}
      />,
      <Modal
        title='添加分类'
        visible={isShowAddCategory}
        okText="确认"
        cancelText="取消"
        onCancel={this.toggleDisplay('isShowAddCategory', false)}
        onOk={this.addCategory}
      >
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>
      <Modal
        title='修改分类名称'
        visible={isShowUpdateCategoryName}
        okText="确认"
        cancelText="取消"
        onCancel={this.hideUpdateCategoryName}
        onOk={this.updateCategoryName}
        width={300}
      >
        <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
      </Modal>
    </Card>;
  }
}
