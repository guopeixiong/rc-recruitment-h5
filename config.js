// 应用全局配置
module.exports = {
  baseUrl: 'http://192.168.5.225:18080',
  // baseUrl: 'http://localhost:8080',
  // 应用信息
  appInfo: {
    // 应用名称
    name: "rc-recruitment",
    // 应用版本
    version: "0.0.1",
    // 应用logo
    logo: "/static/logo.png",
    rc_name: "/static/rc-name.png",
    // 官方网站
    site_url: "https://ruangchaung.com",
    // 政策协议
    agreements: [{
        title: "隐私政策",
        url: "https://ruoyi.vip/protocol.html"
      },
      {
        title: "用户服务协议",
        url: "https://ruoyi.vip/protocol.html"
      }
    ]
  }
}
