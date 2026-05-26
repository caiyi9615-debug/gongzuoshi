小蔡同学文档工作室 - 定金收款码动画版

新增：
1. 客户提交订单后自动生成专属进度链接，不需要自己复制订单号。
2. 订单页显示微信收款码、支付宝收款码和定金金额。
3. 客户付款后可以提交付款备注。
4. 后台可以确认定金、修改状态、填写顾客可见进度说明。
5. 前台、订单页、后台都有轻微动画和按钮悬停效果。

部署：
解压后上传替换 GitHub 仓库中的：
public/
server.js
package.json
README.txt

Render 会自动重新部署。

后台：/admin
默认密码：123456
建议在 Render 环境变量设置 ADMIN_PASSWORD。


修复说明：
已修复首页提交按钮点击无反应的问题，原因是 name 字段与浏览器 window.name 冲突。现在改为 document.getElementById 获取表单数据，并加入提交中提示。


再次修复说明：
1. 提交按钮改为明确 onclick="submitOrder()"，不再依赖表单 submit 默认事件。
2. 修复 name 字段可能冲突的问题。
3. 增加“正在提交”提示。
4. 增加后端错误显示，方便判断 Render 是否部署成功。
5. 如果仍提交失败，请确认访问的是 Render 的 onrender.com 地址，不是 GitHub Pages 地址。
