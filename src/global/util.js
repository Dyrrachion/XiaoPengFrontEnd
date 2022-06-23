//获取cookie
export function getCookie(name) {
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  let arr = document.cookie.match(reg);
  if (arr)
    return (arr[2]);
  else
    return null;
}

//设置cookie，增加到vue实例方便全局调用
export function setCookie (c_name, value, expireDays) {
  const exDate = new Date();
  exDate.setDate(exDate.getDate() + expireDays);
  document.cookie = c_name + "=" + escape(value) + ((expireDays == null) ? "" : ";expires=" + exDate.toUTCString());
}

//删除cookie
export function delCookie (name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const currentVal = getCookie(name);
  if (currentVal != null)
    document.cookie = name + "=" + currentVal + ";expires=" + exp.toUTCString();
}
