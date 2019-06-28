import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
// export const reqLogin = (data) => ajax('/login', data, 'POST');
// 请求参数3-4个以上使用
// export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');
// 请求参数1-2个使用
/**
 * 请求登录函数
 * username 用户名
 * password 密码
 * {返回值一定成功状态promise（请求成功里面有数据，请求失败里面没有）}
 */
 // 请求登录函数
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');
 // 请求验证用户信息
export const reqValidateUserInfo = (id) => ajax('/validate/user',{id}, 'POST');
// 请求天气
export const reqWeather = function() {
  let cancel = null;
  const promise = new Promise((resolve, reject) => {
    cancel = jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, {} ,function (err, data) {
      if (!err) {
        const { weather, dayPictureUrl } = data.results[0].weather_data[0];
        resolve({
          dayPictureUrl,
          weather
        })
      } else {
          message.error('请求天气失败，请重新刷新试试~');
          resolve()
      }
    });
  });
  return {
    promise,
    cancel
  }
};

// 请求Category一级列表分类
export const reqCategory =  (parentId) => ajax('/manage/category/list', {parentId});
// 添加一级列表分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST');
// 修改列表分类名称
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax('/manage/category/update',{categoryId, categoryName}, 'POST');
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});
// 添加商品请求
export const reqAddProduct = ({ name, desc, price, categoryId, pCategoryId, detail}) => ajax('/manage/product/add', {name, desc, price, categoryId, pCategoryId, detail}, 'POST');

export const reqUpdataProduct = ({name, desc, price, categoryId, pCategoryId, detail, _id}) => ajax('/manage/product/update', {name, desc, price, categoryId, pCategoryId, detail, _id}, 'POST');

export const reqDeleteProductImg = (name, id) => ajax('/manage/img/delete', {name, id}, 'POST');
export const reqSearchProduct = ({searchType, searchContent, pageSize, pageNum}) => ajax('/manage/product/search', {[searchType]: searchContent, pageSize, pageNum});

// 请求商品状态
export const reqUpdateProductStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST');

// 请求权限数据
export const reqGetRoles = () => ajax('/manage/role/list');
// 添加角色
export const reqAddRole = (name) => ajax('/manage/role/add', {name}, 'POST');