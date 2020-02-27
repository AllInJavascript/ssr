//node代码

//[1] 导入express
const express = require('express')
const Vue = require('vue')

//[2] 创建express实例
const server = express()
// 2. 获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

//[4] 编写路由处理不同url的请求
server.get('/', (req, res) => {
  //res.send('<strong>hello world</strong>')
  //res.json({ 'name': 'xiaoyan' })

  // 1. 创建vue实例
  const app = new Vue({
    template: '<div @click="onClick">{{msg}}</div>',
    data() {
      return { msg: 'vue ssr' }
    },
    methods: {
      onClick() {
        console.log('do something');

      }
    },
  })
  // 3. 用渲染器渲染vue实例
  renderer.renderToString(app).then(html => {
    //console.log(html)
    res.send(html)
  }).catch(err => {
    res.status(500)
    res.send('Internal Server Error, 500!')
    //console.log(err)
  })
})

//[3] 监听一个端口
server.listen(80, () => {
  console.log('server running!')
})