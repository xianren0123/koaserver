const mysql = require('mysql');
const config = require('../../../config/config.json');
// 配置数据库
const db = mysql.createConnection(config);
db.connect();
const User = {
    findOne: async (userName) => {
        return new Promise((resolve,reject)=>{
            let sql = "select * from userinfo where USER_CODE = '";
            sql += userName + "' or MOBILEPHONE='"+userName+"'";
            db.query(sql, (err, data) => {
                if (err) return console.log(err.message);
                if (data.length === 0) return console.log('获取失败');
                resolve(data[0]);
            }) 
        })
    }
}

module.exports = User