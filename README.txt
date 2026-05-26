小蔡同学文档工作室 - 带后端版本

一、这个项目有什么
1. public/index.html：前端网站页面，已经加入服务细分、价格表、下单表单。
2. server.js：Node.js + Express 后端。
3. orders.json：用户提交需求后，会自动生成这个文件保存订单。
4. package.json：项目依赖和启动命令。

二、本地怎么运行
1. 电脑先安装 Node.js。
2. 打开命令行，进入这个文件夹。
3. 输入：npm install
4. 再输入：npm start
5. 浏览器打开：http://localhost:3000

三、怎么查看别人提交的需求
1. 打开项目里的 orders.json 文件。
2. 或者访问：http://localhost:3000/api/orders

四、重要说明
1. GitHub Pages 只能放静态网页，不能运行这个后端。
2. 如果只上传到 GitHub Pages，网站能看，但下单表单不能真正提交。
3. 要让表单真正可用，需要把整个项目部署到可以运行 Node.js 的平台。

五、联系方式已写入网站
微信：17781762502
QQ：2241037918
邮箱：2241037918@qq.com
