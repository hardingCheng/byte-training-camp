(async () => {
    const mysql = require('mysql2/promise');
    // 连接配置
    const cfg = {
        host: "localhost",
        user: "root",
        password: "123456", // 修改为你的密码
        database: "hardingcheng" // 请确保数据库存在
    };
    // 创建连接
    const connection = await mysql.createConnection(cfg);


    // 创建表
    const create_sql = `CREATE TABLE IF NOT EXISTS test (
                    id INT NOT NULL AUTO_INCREMENT,
                    message VARCHAR(45) NULL,
                    PRIMARY KEY (id))`;
    const insert_sql = `INSERT INTO test(message) VALUES(?)`;
    const select_sql = `SELECT * FROM test`;

    // 操作数据库
    let ret = await connection.execute(create_sql);
    console.log('create:', ret)
    ret = await connection.execute(insert_sql, ['abc']);
    console.log('insert:', ret)
    const [rows, fields] = await connection.execute(select_sql);
    console.log('select:', rows)

})()



https://www.sequelize.com.cn/


(async () => {
    const Sequelize = require("sequelize");

    // 建立连接
    const sequelize = new Sequelize("hardingcheng", "root", "123456", {
        host: "localhost",
        dialect: "mysql",  //方言
        operatorsAliases: false
    });

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isFloat: { msg: "价格字段请输入数字" },
                min: { args: [0], msg: "价格字段必须大于0" }
            }
        },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 },

    },
        {
            timestamps: false,
            getterMethods: {
                amount() {
                    return this.getDataValue("stock") + "kg";
                }
            },
            setterMethods: {
                amount(val) {
                    const idx = val.indexOf('kg');
                    const v = val.slice(0, idx);
                    this.setDataValue('stock', v);
                }
            }
        });

    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉', '芒果', '椰子']; // 热带水果
        return tropicFruits.includes(name) ? '热带水果' : '其他水果';
    };
    Fruit.prototype.totalPrice = function (count) {
        return (this.price * count).toFixed(2);
    };

    ['香蕉', '草莓'].forEach(f => console.log(f + '是' + Fruit.classify(f)));

    let ret = await Fruit.sync()

    ret = await Fruit.create({
        name: "香蕉",
        price: 3.5
    })
    console.log('create', ret)
    ret = await Fruit.findAll()

    // 使用实例方法
    Fruit.findAll().then(fruits => {
        const [f1] = fruits;
        console.log(`${f1.totalPrice(5)}`);      
    });

    ret = await Fruit.findAll({
        offset: 3,
        limit: 3,
    })
    console.log('ret:', JSON.stringify(ret))
;
})()


