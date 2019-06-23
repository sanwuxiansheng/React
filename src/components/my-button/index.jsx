import React from 'react';
import './index.less';
export default function MyButton(props) {
  // 组件内包含的内容会挂载到组件的 props.children 所以可以像下面這樣寫
  return <button className="my-button" {...props}/>
}