import { message } from 'antd';
import axios from 'axios';
export default function ajax(url, data = {}, method = 'GET') {
  // 初始化参数
  let reqParams = data;
  // 将请求方式所传入的参数全部统一转换成小写
  // 大写axios不认识会报错
  method = method.toLowerCase();
  // 如果请求方式为get则将data数据改为对象{ params: data }
  if ( method === 'get') {
    reqParams = {
      params: data
    }
  };
  return axios[method](url, reqParams)
    .then((res) => {
      const data = res.data;
      if ( data.status === 0) {
        // 请求成功 返回成功的数据 因为请求是异步代码当最开始没有值的时候所以需要返回一个{}防止对象点的方式报错
        return data.data || {}
      }else {
        // 全局提示错误
        message.error(data.msg,2);
      }
    })
    .catch((err) => {
      // 一般是网络问题和服务器内部问题
      message.error('网络出现异常，请重新刷新~',2)
    })
}