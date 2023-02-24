const mysql = require('mysql2');
const Sequelize = require("sequelize");

 
const seq = new Sequelize("demo2", "root", "fdsjforuewjdlksf@%*#$redskf43242", {
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql",   //数据库类型
    "pool":{  //数据库连接池
        "max":20,  //最大连接对象的个数
        "min":5,  //最小连接对象的个数
        "idle":1000  //最长等待时间，单位为毫秒
    }
});
 
// 测试数据库连接
// seq
//     .authenticate()
//     .then(() => {
//         console.log("数据库链接成功");
//     })
//     .catch((err) => {
//         console.log("数据库链接失败", err);
//     });
module.exports = seq;