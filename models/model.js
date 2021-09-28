class Model {
    constructor() {
        this.mysql = require('mysql');
        this.db = this.mysql.createConnection({
            'host': 'localhost',
            'user': 'root',
            'password': 'root101',
            'database': 'express_login_registration',
            'port': 3308
        });

        this.db.connect(function(err) {
            if(err) throw err;
        });
    }

    endConnection() {
        this.db.end();
    }
}

module.exports = Model;