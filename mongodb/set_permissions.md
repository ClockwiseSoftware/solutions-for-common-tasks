#Настройка аутентификации в MongoDB 
##Все операции были проделаны в Linux Mint 17.1 64-bit  и версии монго 2.4.9

### 1. Идем в конфиг монго и включаем опцию auth=true


**bash**

    sudo vim /etc/mongodb.conf

меняем #auth=true на auth=true

### 2. Перезапускаем монго сервис

**bash**

    sudo service mongodb restart

### 3. Подключаемся к Монго и создаем пользователя admin

**bash**

    mongo
    > use admin;
    > db.addUser({
        "user" : "admin",
        "pwd": "123456",
        "roles" : [ 
            "read", 
            "readWrite", 
            "dbAdmin", 
            "userAdmin", 
            "clusterAdmin", 
            "readAnyDatabase", 
            "readWriteAnyDatabase", 
            "userAdminAnyDatabase", 
            "dbAdminAnyDatabase"
            ]
        });

### 4. Далее мы создаем пользователя - админа конкретной базы данных

эту операцию уже можно делать при помощи robomongo

**bash**

    > db.auth('admin', '123456'); //авторизируемся
    > use somedatabase;
    > db.addUser({
        "user" : "somedatabase_admin",
        "pwd": "123456",
        "roles" : [ 
            "read", 
            "readWrite", 
            "dbAdmin", 
            "userAdmin", 
            "clusterAdmin", 
            "readAnyDatabase", 
            "readWriteAnyDatabase", 
            "userAdminAnyDatabase", 
            "dbAdminAnyDatabase"
            ]
        });

### Всё, на этом настрока могно закончилась

#Настройка Mongoose c использованием аутентификации 

**NodeJS**

*app.js*

    var mongoose = require('mongoose');
    var config = require('./config');
    
    
    var dbcred = {
        protocol: 'mongodb://',
        host: config.db.host,
        dbname: config.db.dbname,
        user: config.db.user,
        pass: config.db.pass,
        port: config.db.port
    };
    
    var dbCredBuilded = [
        dbcred.protocol, dbcred.user, ':', dbcred.pass,
        '@', dbcred.host, ':', dbcred.port, '/', dbcred.dbname
    ].join('');
    
    mongoose.connect(dbCredBuilded);
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
     console.log('database connected');
    });

*config.js*

    var env = 'development';
    var config = {
        env: env,
        server: {
            port: 3000
        },
        db: {
            host: 'localhost',
            dbname: 'somedatabase_probuction',
            user: 'somedatabase_admin_probuction',
            pass: '123456',
            port: 27017
        }
    };
    
    switch (config.env) {
        case 'development':
            config.server.port = 3000;
            config.db = {
                host: 'localhost',
                dbname: 'somedatabase_probuction',
                user: 'somedatabase_admin',
                pass: '123456',
                port: 27017
            };
            break;
        case 'production':
            config.server.port = 3010;
            break;
        case 'testing':
            config.server.port = 3011;
            break;
    }
    
    
    module.exports = config;
