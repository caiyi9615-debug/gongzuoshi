const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ordersPath = path.join(__dirname, "orders.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  try { return JSON.parse(fs.readFileSync(ordersPath, "utf-8")); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), "utf-8");
}

app.post("/api/orders", (req, res) => {
  const { name, contact, service, deadline, details } = req.body;
  if (!name || !contact || !service || !details) {
    return res.status(400).json({ success: false, message: "缺少必填信息" });
  }
  const orders = readOrders();
  const newOrder = {
    id: Date.now(), name, contact, service,
    deadline: deadline || "未填写", details,
    createdAt: new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  res.json({ success: true, message: "提交成功", order: newOrder });
});

app.get("/api/orders", (req, res) => res.json(readOrders()));

app.listen(PORT, () => {
  console.log(`小蔡同学文档工作室后端已启动：http://localhost:${PORT}`);
});
