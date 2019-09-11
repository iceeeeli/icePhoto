//vue.connfig.js
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          //目标api地址‘
          target: 'http://localhost:3000/api/', 
          //将主机标头的原点更改为目标url
          changeOrigin: true,
          //代理websockets
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
  };