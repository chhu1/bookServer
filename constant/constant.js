var constant = {
    noSessionApis: {
        '/user/register.do': true,
        '/user/login.do': true
    },
    reqDomain: 'http://localhost:8001',
    errorMsg: {
        10000: '用户已经失效',
        10001: '邮箱格式错误',
        10002: '密码长度错误',
        10003: '用户已经存在',
        20000: '服务器错误'
    }
};
module.exports = constant;
