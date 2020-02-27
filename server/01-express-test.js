//node代码

//1 导入express
const express = require('express')

//2 创建express实例
const server = express()

//4 编写路由处理不同url的请求
server.get('/', (req, res) => {
  res.send('<strong>hello world</strong>')
  //res.json({ 'name': 'xiaoyan' })
})

//3 监听一个端口
server.listen(80, () => {
  console.log('server running!')
})