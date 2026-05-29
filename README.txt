小蔡同学文档工作室 - 邮箱 + 补尾款交付版

新增功能：
1. 前台表单新增“邮箱（选填）”。
2. 后台可查看和修改客户邮箱。
3. 后台可填写订单总金额，系统自动计算尾款 = 总金额 - 定金。
4. 订单状态新增：
   - 待补尾款
   - 待确认尾款
   - 尾款已确认
   - 已交付
5. 顾客订单页新增“补尾款”区域。
6. 顾客补尾款后可提交尾款付款备注。
7. 后台确认尾款后，顾客页才显示交付链接/交付说明。
8. 后台可填写交付链接和交付说明。

部署：
解压后上传替换 GitHub 仓库中的：
public/
server.js
package.json
README.txt

Render 自动重新部署后，打开网站 Ctrl+F5 强制刷新。

新增：示例展示 + 明晰收费标准 + 数据存储
1. 首页新增服务示例板块。
2. 首页新增收费标准板块。
3. 新增 siteContent.json 保存服务、示例、价格。
4. 新增 /admin-content 内容管理后台，可用后台密码登录后编辑 JSON。
5. 部署后访问：
   / 前台
   /admin 订单后台
   /admin-content 内容管理后台
   /track 顾客查询页


稳定修正版说明：
1. 已检查 server.js 语法。
2. 已确认 /api/orders 能返回 []。
3. 已确认 /api/site-content 能读取示例和收费标准数据。
4. 已确认 Render 监听端口使用 0.0.0.0。
5. 订单后台右下角新增“内容管理”入口，也可直接访问 /admin-content。

新增：项目详情页 + 图片链接案例版
1. 首页服务卡片新增“查看详情与价目表”。
2. 新增 /service/:slug 项目详情页。
3. 每个项目详情页包含：
   - 服务介绍
   - 常见流程
   - 案例展示
   - 案例图片链接
   - 详细价目表
   - 注意事项
4. 新增 /admin-content 内容管理后台。
5. 后台可以通过修改 siteContent.json 的 image 字段自由添加案例图片链接。
6. 上传时需要包含：
   public/
   server.js
   package.json
   README.txt
   siteContent.json


本次修复：
1. 修复 Render 报错：Identifier 'contentPath' has already been declared。
2. 已删除重复的 siteContent 内容接口声明。
3. 已通过 node --check 检查 server.js 语法。
4. 保留项目详情页 /service/:slug、内容管理 /admin-content 和图片链接案例功能。

本次修改：新增“网站制作”服务分类（/service/web-service），按给别人做网站的标准说明静态展示页、带后台网站、完整接单系统，并明确服务器/域名/数据库等第三方费用由客户承担。
