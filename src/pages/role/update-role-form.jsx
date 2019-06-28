import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import menuList from '../../config/menu-config';
import PropType from 'prop-types';
const Item = Form.Item;
const { TreeNode } = Tree;


class UpdateRoleForm extends Component {
  static propTypes = {
    name: PropType.string.isRequired
  };
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  };
  
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };
  
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: this.props.name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            // onExpand={this.onExpand}
            // expandedKeys={this.state.expandedKeys}
            // autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            // onSelect={this.onSelect}
            // selectedKeys={this.state.selectedKeys}
            defaultExpandAll={true}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm);