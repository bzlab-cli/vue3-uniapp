const ci = require('miniprogram-ci')
const fs = require('fs')
const projectConfig = require('../project.config.json')
const dayjs = require('dayjs')
const argvs = JSON.parse(process.env.npm_config_argv).original

function getEnv() {
  let env = 'develop'
  argvs.some(argv => {
    if (argv.includes('--mode')) {
      const result = argv.split('=')
      if (result) {
        const [, envTag] = result
        env = envTag
        return true
      }
    }
    return false
  })
  return env
}

function getBranch() {
  let env = getEnv()
  const obj = {
    deploy: 'test',
    prod: 'master'
  }
  return obj[env]
}

function getRobot() {
  let env = getEnv()
  const obj = {
    deploy: 1,
    prod: 2
  }
  return obj[env]
}

function getRobotName() {
  let env = getEnv()
  const obj = {
    deploy: '测试机器人',
    prod: '生产机器人'
  }
  return obj[env]
}

async function upload() {
  let pkg = fs.readFileSync('./package.json').toString()
  let curName = JSON.parse(pkg).name
  let curVersion = JSON.parse(pkg).version
  let random = dayjs().format('HHmmss')
  const [major, minor] = curVersion.split('.')

  const version = `${major}.${minor}.${random}`
  const versionDesc = `类型：${curName}${getRobotName()}\r\n版本：${version}\r\n分支: ${getBranch()}`
  console.log('versionDesc', versionDesc)

  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: './dist/build/mp-weixin/',
    privateKeyPath: './ci-private.key',
    ignores: ['node_modules/**/*']
  })

  try {
    await ci.upload({
      project,
      version,
      desc: versionDesc,
      robot: getRobot(),
      setting: {
        es7: true,
        minify: true,
        autoPrefixWXSS: true
      }
    })
  } catch (error) {
    throw error
  }
}

upload()
