const {createProxyMiddleware} = request ('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware(["/api", , "/otherApi"], { target: "https://youtube-codegymm.herokuapp.com/api" })
  );
};