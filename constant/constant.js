var constant = {
    noTokenApis: {
        '/user/register.do': true,
        '/user/login.do': true
    },
    reqDomain: '*',
    tokenString: 'simpleApiToken',
    errorMsg: {
        10000: '用户已经失效',
        10001: '邮箱格式错误',
        10002: '密码长度错误',
        10003: '用户已经存在',
        10004: '用户名或密码错误',
        10005: '分页参数错误',
        10006: '添加书本参数错误',
        20000: '服务器错误'
    }
};
module.exports = constant;
