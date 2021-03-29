/*
2345王牌联盟
JavaScript自学中……
初学代码，写的十分难看。希望大佬指教，万分感谢。
作者:h455257166;
脚本地址:
更新时间:
本脚本仅适用于[2345王牌联盟]签到;
兼容Nodejs,把获取的Cookie填入[WPLM_COOKIE]，多账号用"@"分开


//不会使用github action运行该脚本 (T T)


=====================================Loon================================
[Script]
cron "3 10 * * *" script-path=https://raw.githubusercontent.com/h455257166/My_Script/JSActionsScripts/jf2345.js,tag=2345王牌联盟

*/

const $ = new Env('2345王牌联盟');
let cookiesArr = [], cookie = '', message;//用户cookie值
var nowhours = $.time('HH')
var todayDate = $.time('yyyy-MM-dd')
const notify = $.isNode() ? require('./sendNotify') : '';


// 定义cookie环境变量：WPLM_COOKIE
if (!$.isNode() && cookie.indexOf('@') == -1){
    cookiesArr.push(cookie)
} 

if ($.isNode()) {
    //判断环境变量中cookie的写入方式
    if (process.env.WPLM_COOKIE && process.env.WPLM_COOKIE.indexOf('@') > -1) {
        cookie = process.env.WPLM_COOKIE.split('@')
        console.log(`\n您Cookie书写方式是用"@"隔开\n`)
    }
    else if (process.env.WPLM_COOKIE && process.env.WPLM_COOKIE.indexOf('\n') > -1) {
        cookie = process.env.WPLM_COOKIE.split('\n')
        console.log(`\n您Cookie书写方式是用换行隔开\n`)
    }
    else if(process.env.WPLM_COOKIE) {
        cookie = process.env.WPLM_COOKIE.split('@')
        console.log(`\n您填写了一个Cookie\n`)
    }
    //获取cookie给cookiesArr数组
    Object.keys(cookie).forEach((item) => {cookiesArr.push(cookie[item])}); 
}



!(async() => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先抓取2345王牌联盟的cookie')
        return
    }
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
    console.log(`============ 共 ${cookiesArr.length}个 账号 ============ `)
    for (let i = 0; i < cookiesArr.length; i++){
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            message = '';
            $.index = i + 1;
            console.log(`\n======================== 开始【2345王牌联盟 [账号 ${$.index}] 的任务】 ======================== \n`)
            message += `2345王牌联盟 [账号${$.index}] \n `
            await CheckIn();
            await TaskList();
            await ProfitReport();
            await entry();
            await showMsg();
        }
      }
    if ($.isNode() && message) {
    await notify.sendNotify(`${$.name}`, `${message}`,)
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function showMsg() {
  return new Promise(resolve => {
    $.msg($.name, '', `${message}`);
    resolve()
  })
}


function PostUrl(api,body){
    return {
        url:'https://jifen.2345.com/appv4/'+ api ,
        headers:{
            'Cookie':cookie,
            'Host': 'jifen.2345.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; COL-AL10 Build/HUAWEICOL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 package/com.shouji2345 versionName/4.5.9 versionCode/459 WangPai,WangPaiBrowser,Android',
            'token': '8c028b154341dda188577f800ed8be8a',
            // 'Referer': 'https://jifen.2345.com/wph5/index/earn-daily?from=jifenDetail',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'X-Requested-With': 'com.shouji2345',       
        },
        body:body
    }
}

function GetUrl(api){
    return {
        url:'https://jifen.2345.com/appv4/'+ api ,
        headers:{
            'Cookie':cookie,
            'Host': 'jifen.2345.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; COL-AL10 Build/HUAWEICOL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 package/com.shouji2345 versionName/4.5.9 versionCode/459 WangPai,WangPaiBrowser,Android',
            'token': '8c028b154341dda188577f800ed8be8a',
            // 'Referer': 'https://jifen.2345.com/wph5/index/earn-daily?from=jifenDetail',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'X-Requested-With': 'com.shouji2345',       
            'EagleEye-SessionID': 'FpkhembFq2zcX5p0q9qOfX4tLU0m',
            'EagleEye-TraceID': '27544986161676594847310011c5d2',
            'EagleEye-pAppName': 'ex7bpuz2yw@888acb9d041c5d2',
 
        },
    }
}


function params(obj) {
  let result = '';
  let item;
  for (item in obj) {
    if (obj[item] && String(obj[item])) {
      result += `&${item}=${obj[item]}`;
    }
  }
  if (result) {
    result = '?' + result.slice(1);
  }
  return result;
}

    // "link": {
    //   "lotteryHistory": "https://jifen.2345.com/appv4/SignDraw/my",
    //   "checkInRank": "https://jifen.2345.com/appv4/checkIn/rankList",
    //   "lastAwardList": "https://jifen.2345.com/appv4/SignDraw/index"
    // },

// 十周年活动4.18结束
// https://jifen.2345.com/wph5/credit/index?isFullScreen=1&tiezi

// #2345APP端签到请求
async function CheckIn() {
  return new Promise(resolve => {
    $.get(GetUrl('checkIn/index'),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            test = $.toStr(data);
            if(data.status == "200"){
                console.log(`\n[每日签到] 请求信息：${data.message} `)
                console.log(`[每日签到] 签到日期：${data.data.currDate} | 已连续签到：${data.data.continueCheckIn}天  获得积分：${data.data.awardScore}  获得经验值：${data.data.awardExp}`)
                message += `[每日签到] ${data.data.currDate}  \n[每日签到] 已连续签到：${data.data.continueCheckIn}天  获得积分：${data.data.awardScore}  获得经验值：${data.data.awardExp}\n`
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

// 任务列表
// https://jifen.2345.com/appv4/Task/List
async function TaskList() {
  return new Promise(resolve => {
    $.get(GetUrl(`Task/List`),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            test = $.toStr(data);            
            if (test.indexOf('taskWeekList') > -1){
                console.log(`\n[每周任务] 请求信息：${data.message} `)
                Weektask = data.data.taskWeekList
                for (var i in Weektask) {
                    if (Weektask[i].status == '2'){                        
                        console.log(`[每周任务] ${Weektask[i].name} 已完成 可以去${Weektask[i].statusDesc} id：${Weektask[i].id} `)
                        datacode = {'reward_id' : Weektask[i].id}
                        console.log(`${$.toStr(datacode)}`)
                        reward(datacode)
                    }
                }
            }
            //十周年抽奖，活动到4月18日结束
            if (test.indexOf('goldInfo') > -1){
                console.log(`\n[周年任务] 请求信息：${data.message} `)
                goldvalue = data.data.goldInfo//金币数据页面
                goldnum = goldvalue.info.gold//现在拥有的金币数量 
                goldtist = goldvalue.list//金币收取列表
                for (var i in goldtist) {
                    if (goldtist[i].bubbleType == '1'){
                        datacode = {'id' : goldtist[i].id,'gold_num':goldtist[i].num}
                        // console.log(`${$.toStr(datacode)}`)
                        console.log(`[周年任务] 可领取金币 id:${goldtist[i].id} gold_num:${goldtist[i].num}`)
                        goldreward(datacode)
                    }
                }
            }

        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//周任务奖励领取
async function reward(datacode) {
  return new Promise(resolve => {
    $.post(GetUrl(`task/reward`,$.toStr(datacode)),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            // test = $.toStr(data);
            // console.log(`\n${test}`)
            if(data.status == "200"){
                rewarddata = data.data
                console.log(`[奖励领取] 请求信息：${data.message} `)
                console.log(`[奖励领取] ${data.data.product} ${data.data.title} ${data.data.score}积分`)
                message += `[周任务奖励] 完成${data.data.product} ${data.data.title} ${data.data.score}积分\n`
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}


//周年庆奖励领取
async function goldreward(datacode) {
  return new Promise(resolve => {
    $.get(GetUrl(`Decennial/ReceiveGold`,$.toStr(datacode)),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            test = $.toStr(data);
            console.log(`[周年庆奖励] 请求信息：${test}`)
            if(data.code == "200"){
                console.log(`[周年庆奖励] 请求信息：${data.msg} ${data.tips}`)
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}


// 今日，利润报告 完成
// https://jifen.2345.com/appv4/ProfitReport/Index
// https://jifen.2345.com/appv4/ProfitReport/Trend?queryDate=2021-03-26&type=1
async function ProfitReport() {
  return new Promise(resolve => {
    queryMonthValue = $.time('yyyy-MM-dd')
    // console.log(`\n${queryMonthValue}`)
    var obj = {
        queryDate: `${queryMonthValue}`,
        type: '1',
    }
    $.get(GetUrl(`ProfitReport/Trend${params(obj)}`),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            // test = $.toStr(data);
            // console.log(`\n${test}`)
            if(data.status == "200"){
                trenddata = data.data.trend.data
                console.log(`\n[利润报告] 请求信息：${data.message} `)
                console.log(`[利润报告] ${trenddata[6]["date"]}获得积分：${trenddata[6]["score"]} | ${trenddata[6]["rmb"]} 元`)
                message += `[利润报告] ${trenddata[6]["date"]}获得积分：${trenddata[6]["score"]} | ${trenddata[6]["rmb"]} 元\n`
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}


// 积分统计 完成
// https://jifen.2345.com/appv4/jifen/entry?type=1&queryMonth=2021-03 
async function entry() {
  return new Promise(resolve => {
    queryMonthValue = $.time('yyyy-MM')
    // console.log(`\n${queryMonthValue}`)
    var obj = {
        queryDate: `${queryMonthValue}`,
        type: '1',
    }
    $.get(GetUrl(`jifen/entry${params(obj)}`),(err, resp, data) => {
      try {
        if (err) {
            console.log(`${err}`)
        }else{
            data = $.toObj(data);
            // test = $.toStr(data);
            // console.log(`\n${test}`)
            uscorejf = data.data.userScore.uscore.jifen//可用积分
            uscorermb = data.data.userScore.uscore.yuan//可用人民币
            depositsjf = data.data.userScore.deposits.jifen//已存积分
            depositsrmb = data.data.userScore.deposits.yuan//已存人民币
            Scorermb = uscorermb + depositsrmb
            console.log(`\n[积分统计] 请求信息：${data.message} `)
            console.log(`[积分统计] 当前账户，可用积分：${uscorejf}，已存积分：${depositsjf}`)
            console.log(`[积分统计] 当前账户，可提现金额：${Scorermb}`)
            message += `[积分统计] 当前账户，可用积分：${uscorejf}，已存积分：${depositsjf}\n`
            message += `[积分统计] 当前账户，可提现金额：${Scorermb}\n`
            // if(data.status == "200"){
            //     console.log(`请求信息：${data.message} 签到日期：${data.data.currDate} | 已连续签到：${data.data.continueCheckIn}天  获得积分：${data.data.awardScore}  获得经验值：${data.data.awardExp}`)
            //     message += `签到日期：${data.data.currDate} | 已连续签到：${data.data.continueCheckIn}天  获得积分：${data.data.awardScore}  获得经验值：${data.data.awardExp}\n`
            // }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}



function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
