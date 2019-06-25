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
