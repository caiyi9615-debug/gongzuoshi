const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";
const ADMIN_TOKEN = crypto.createHash("sha256").update(ADMIN_PASSWORD).digest("hex");
const ordersPath = path.join(__dirname, "orders.json");

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

function readOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
  } catch (error) {
    return [];
  }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), "utf-8");
}

function nowCN() {
  return new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, message: "未登录或密码错误" });
  }
  next();
}

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.post("/api/orders", (req, res) => {
  const { name, contact, service, deadline, details } = req.body;

  if (!name || !contact || !service || !details) {
    return res.status(400).json({
      success: false,
      message: "缺少必填信息"
    });
  }

  const orders = readOrders();

  const newOrder = {
    id: Date.now(),
    name: String(name).trim(),
    contact: String(contact).trim(),
    service: String(service).trim(),
    deadline: deadline ? String(deadline).trim() : "未填写",
    details: String(details).trim(),
    status: "new",
    price: "",
    note: "",
    createdAt: nowCN(),
    updatedAt: ""
  };

  orders.unshift(newOrder);
  saveOrders(orders);

  res.json({
    success: true,
    message: "提交成功",
    order: newOrder
  });
});

app.get("/api/orders", (req, res) => {
  const orders = readOrders();
  res.json(orders);
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: ADMIN_TOKEN });
  }
  res.status(401).json({ success: false, message: "后台密码错误" });
});

app.get("/api/admin/orders", requireAdmin, (req, res) => {
  res.json(readOrders());
});

app.patch("/api/admin/orders/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const allowedStatuses = ["new", "contacted", "quoted", "paid", "doing", "done", "cancel"];

  const orders = readOrders();
  const order = orders.find(item => item.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: "未找到订单" });
  }

  const editableFields = ["name", "contact", "service", "deadline", "details", "status", "price", "note"];
  for (const field of editableFields) {
    if (req.body[field] !== undefined) {
      if (field === "status" && !allowedStatuses.includes(req.body[field])) {
        return res.status(400).json({ success: false, message: "状态不正确" });
      }
      order[field] = String(req.body[field]).trim();
    }
  }

  order.updatedAt = nowCN();
  saveOrders(orders);

  res.json({ success: true, order });
});

app.delete("/api/admin/orders/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const orders = readOrders();
  const nextOrders = orders.filter(item => item.id !== id);

  if (nextOrders.length === orders.length) {
    return res.status(404).json({ success: false, message: "未找到订单" });
  }

  saveOrders(nextOrders);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`小蔡同学文档工作室已启动：http://localhost:${PORT}`);
  console.log(`后台地址：http://localhost:${PORT}/admin`);
});
