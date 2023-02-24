const Sequelize =require('sequelize')
const MySequesize = require('../config/dbconfig');  //导入创建的sequelize对象
//创建StudentModel模型，该模型对应的表名是student
var StudentModel = MySequesize.define('users',{
    sid:{
        type:Sequelize.INTEGER,  //表示属性的数据类型
        field:'s_id',   //属性对应的列名,若不定义field则表中的列名(sid)就是属性名
        primaryKey:true,  //表示主键
        autoIncrement:true  //表示主键自增
    },
    sname:{
        type:Sequelize.STRING(50),
        field: 's_name',
        allowNull:false,   //表示当前列是否允许为空，false表示该列不能为空
        //unique:true    //表示该列的值必须唯一
    },
    sgender:{
        type:Sequelize.STRING(4),
        field:'s_gender',
        allowNull: false
    },
    sbirthday:{
        type:Sequelize.DATE,
        field:'s_birthday',
        allowNull:false
    },
    saddress:{
        type:Sequelize.STRING(100),
        field:'s_address',
        allowNull:false
    },
    sage:{
        type:Sequelize.INTEGER,
        field:'s_age',
        allowNull:false
    }
},{
    freezeTableName:true, //true表示使用给定的表名，false表示模型名后加s作为表名
    timestamps:false  //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
})
//同步数据库，force的值为false，表若存在则先删除后创建，force的值为true表示表若存在则不创建
var users = StudentModel.sync({force:false});
 
module.exports = StudentModel;