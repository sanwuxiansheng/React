const USER_TIME = 'USER_TIME';
const USER_KEY = 'USER_KEY'
const EXPIRES_TIME = 1000 * 3600 * 24 * 7;
export const getItem = function () {
  const START_TIME = localStorage.getItem(USER_TIME);
  if (Date.now() - START_TIME > EXPIRES_TIME) {
    // 登录时间过期需要清除掉存储的用户
    removeItem();
    return {};
  }
  // 没有过期
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const setItem = function (data) {
  // 将用户第一次登录的时间记录下来
  localStorage.setItem(USER_TIME, Date.now());
  // 将用户数据存储起来，因为localStorage存储的是字符串，所以需要将数据转为JSON模式的字符串
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const removeItem = function () {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_TIME);
};