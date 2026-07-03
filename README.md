# 中国专利公布公告 - 反爬Cookie采集

爬取 [中国专利公布公告](http://epub.cnipa.gov.cn/) 网站，通过补环境（Browser Fingerprinting）方案绕过反爬机制，自动生成并携带有效 Cookie 访问页面。

## 项目结构

```
├── main.py        # Python 主入口：请求页面、解析加密JS、调用 execjs 生成 Cookie
├── main.js        # Node.js 执行脚本：加载环境模拟和加密代码，提取 Cookie 值
├── env.js         # 浏览器环境模拟（window/document/navigator/location 等）
└── js_code.js     # 目标网站动态加密 JS 代码（由 main.py 自动生成）
```

## 运行方式

```bash
pip install requests lxml PyExecJS
python main.py
```

## 工作原理

1. **main.py** 请求 `http://epub.cnipa.gov.cn/` 首页，解析 HTML 获取：
   - `<meta id="K5MK4FPPNWrv">` 中的加密参数 `content`
   - 页面内嵌的加密 JS 代码
   - 远程解密 JS 文件的 URL
2. 将加密代码与解密代码合并写入 `js_code.js`
3. 通过 `execjs` 调用 `main.js`，在 Node.js 补环境后执行目标网站的 JS 代码
4. 目标 JS 代码在模拟的浏览器环境中计算出 Cookie（`NOh8RTWx6K2dT`）
5. 将 Cookie 写入 session，携带访问 `/Index` 页面获取数据

## 关键点

- **env.js** 模拟了完整的浏览器 DOM/BOM 环境，包括 `document`、`navigator`、`location`、`localStorage`、`Canvas`、`XMLHttpRequest` 等
- 目标网站的加密逻辑会动态检测浏览器环境，`env.js` 中的 mock 对象需要与网站预期一致（如特定 meta 节点的 `content` 值、script 标签的 `r="m"` 属性等）
