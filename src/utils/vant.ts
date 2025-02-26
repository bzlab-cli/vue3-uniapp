/*
 * @Author: jrucker
 * @Description:
 * @Date: 2024/09/02 11:05:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/09/14 17:32:57
 */

import path from 'path'
import fs from 'fs'
import lodash from 'lodash'
import stripJsonComments from 'strip-json-comments'

let defaultCopy = ['common', 'wxs', 'mixins']

const deepFindUsingComponents = jsonPath => {
  let jsonFilePath
  if (jsonPath.indexOf('/wxcomponents/') !== -1) {
    jsonFilePath = path.resolve(
      process.env.UNI_INPUT_DIR as string,
      `${jsonPath.replace('/wxcomponents/', '../node_modules/')}.json`
    )
  } else {
    jsonFilePath = path.resolve(
      process.env.UNI_INPUT_DIR as string,
      `${jsonPath.replace('../', '../node_modules/@vant/weapp/dist/')}.json`
    )
  }
  let pagesJson = {} as any
  try {
    pagesJson = JSON.parse(stripJsonComments(fs.readFileSync(jsonFilePath, 'utf8')))
  } catch (error) {
    // TODO
  }
  let usingComponents = pagesJson.usingComponents || {}
  if (pagesJson.usingComponents) {
    const _deepUsingComponentsPathArr = Object.values(pagesJson.usingComponents) || []
    for (let index = 0; index < _deepUsingComponentsPathArr.length; index++) {
      const obj = _deepUsingComponentsPathArr[index]
      usingComponents = {
        ...usingComponents,
        ...deepFindUsingComponents(obj)
      }
    }
  }
  return usingComponents
}

export default () => {
  const jsonFilePath = path.resolve(process.env.UNI_INPUT_DIR as string, 'pages.json')
  const pagesJson = JSON.parse(stripJsonComments(fs.readFileSync(jsonFilePath, 'utf8')))
  let allUsingComponents = {}
  for (let index = 0; index < pagesJson.pages.length; index++) {
    allUsingComponents = {
      ...allUsingComponents,
      ...lodash.get(pagesJson.pages[index], 'style.usingComponents')
    }
  }
  allUsingComponents = {
    ...allUsingComponents,
    ...lodash.get(pagesJson, 'globalStyle.usingComponents', {})
  }
  const allUsingComponentsPathArr = Object.values(allUsingComponents)
  for (let index = 0; index < allUsingComponentsPathArr.length; index++) {
    allUsingComponents = {
      ...deepFindUsingComponents(allUsingComponentsPathArr[index]),
      ...allUsingComponents
    }
  }
  defaultCopy = defaultCopy.concat(Object.keys(allUsingComponents))
  return Array.from(defaultCopy, item => {
    return item.replace('van-', '')
  })
}
