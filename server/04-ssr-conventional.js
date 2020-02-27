//node代码
const path = require('path')
const fs = require('fs')

//[1] 导入express
const express = require('express')
// 0 导入Vue用于声明vue实例
const Vue = require('vue')

//[2] 创建express实例
const server = express()
// 2. 获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()



//[5] 中间件处理 favicon.ico
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

//[4] 编写路由处理不同url的请求
server.get('*', async function (req, res) {
  // 3. 用渲染器渲染vue实例
  console.log(req.url);

  /**
   * 传统的web开发 ssr
   * 服务器端动态路由
   * 
   */
  //解析模板名称 /index
  const template = req.url.slice(1) || 'index'

  //加载模板
  const buffer = fs.readFileSync(path.join(__dirname, `${template}.html`))


  // 1. 创建vue实例
  const app = new Vue({
    template: buffer.toString(), //转为为模板字符串
    data() {
      return { msg: 'vue ssr' }
    }
  })

  try {
    const html = await renderer.renderToString(app)
    res.send(html)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }

})

//[3] 监听一个端口
server.listen(80, () => {
  console.log('server running!')
})