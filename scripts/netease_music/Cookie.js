/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
//注：github action用户cookie填写到Settings-Secrets里面，新增NETEASE_COOKIE，多个账号的cookie使用`&`隔开或者换行
let CookiesAll = [
  '',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
  '',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断github action里面是否有京东ck
if (process.env.NETEASE_COOKIE) {
  if (process.env.NETEASE_COOKIE.indexOf('&') > -1) {
    console.log(`您的cookie选择的是用&隔开\n`)
    CookiesAll = process.env.NETEASE_COOKIE.split('&');
  } else if (process.env.NETEASE_COOKIE.indexOf('\n') > -1) {
    console.log(`您的cookie选择的是用换行隔开\n`)
    CookiesAll = process.env.NETEASE_COOKIE.split('\n');
  } else {
    CookiesAll = [process.env.NETEASE_COOKIE];
  }
}
CookiesAll = [...new Set(CookiesAll.filter(item => item !== "" && item !== null && item !== undefined))]
console.log(`\n====================共有${CookiesAll.length}个网易云账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
for (let i = 0; i < CookiesAll.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieNum' + index] = CookiesAll[i].trim();
}
