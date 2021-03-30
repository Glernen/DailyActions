// version v0.0.1
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync
const fs = require('fs')
const rp = require('request-promise')
const download = require('download')

// 公共变量
const cookie = process.env.WPLM_COOKIE
const pushplus = process.env.PUSH_PLUS_TOKEN

async function downFile () {
    // const url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js'
    const jsUrl = 'https://raw.githubusercontent.com/h455257166/My_Script/JSActionsScripts/jf2345.js'
    const tzUrl = 'https://raw.githubusercontent.com/h455257166/DailyActions/main/sendNotify.js'
    await download(jsUrl, './')
    await download(tzUrl, './')
}

async function changeFiele () {
   let content = await fs.readFileSync('./jf2345.js', 'utf8')
   content = content.replace(/var cookie = ''/, `var cookie = '${cookie}'`)
   console.log(`${cookie}`)
   await fs.writeFileSync( './jf2345.js', content, 'utf8')
}

async function sendNotify (text,desp) {
  console.log(text)
  console.log(desp)
  // const options ={
  //   uri:  `https://sc.ftqq.com/${serverJ}.send`,
  //   form: { text, desp },
  //   json: true,
  //   method: 'POST'
  // }
  // await rp.post(options).then(res=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })
}

async function start() {
  if (!cookie) {
    console.log('请填写 cookie 后在继续')
    return
  }
  // 下载最新代码
  await downFile();
  console.log('下载代码完毕')
  // 替换变量
  await changeFiele();
  console.log('替换变量完毕')
  // 执行
  await exec("node jf2345.js >> result.txt");
  console.log('执行完毕')

  if (pushplus) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    await sendNotify("2345签到" + new Date().toLocaleDateString(), content);
    console.log('发送结果完毕')
  }
}

start()