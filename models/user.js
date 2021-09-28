const Model = require('./model');

class User extends Model {
    async registerUser(post) {
        this.query = this.mysql.format(`
                                        INSERT INTO users(first_name, last_name, email, password, created_at, updated_at)
                                        VALUES(?, ?, ?, ?, NOW(), NOW());`, [post.first_name, post.last_name, post.email, post.password]);
        this.db.query(this.query);
        return await this.loginUser(post);
   }

    async loginUser(post) {
        let result = await this.findEmail(post.email);
        return result;
    }

    findEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users WHERE email = ?;', [email], function(error, result) {
                if(error) throw error;
                resolve(result);
            });
        })
    }

    async validateRegistration(post) {
        this.errors = [];
        if(post.first_name == "") {
            this.errors.push("First name is required");
        }
        if(post.last_name == "") {
            this.errors.push("Last name is required");
        }
        if(post.email == "") {
            this.errors.push("Email address is required");
        } else {
            for(let i = 0; i < post.email.length; i++) {
                if(post.email[i] == "@") break;
                if(i == post.email.length - 1) {
                    this.errors.push("Not a valid email address");
                }
            }
            let account = await this.findEmail(post.email);
            if(account.length != 0) {
                this.errors.push("Email address already taken");
            }
        }
        if(post.password == "") {
            this.errors.push("Password is required");
        } else if(post.password.length < 6) {
            this.errors.push("Password must be 6 characters and above")
        }
        if(post.confirm_password == "") {
            this.errors.push("Confirm password is required");
        } 
        if(post.password != "" && post.confirm_password != "" && post.password != post.confirm_password) {
            this.errors.push("Password and confirm password do not match");
        }
        if(this.errors.length == 0) {
            return "valid_inputs";
        } else {
            return this.errors;
        }
    }

    async validateLogin(post) {
        this.errors = [];
        if(post.email == "") {
            this.errors.push("Email address is required");
        }
        if(post.password == "") {
            this.errors.push("Password is required");
        } 
        if(post.email != "" && post.password != "") {
           let findResult = await this.findEmail(post.email);
           if(findResult.length == 0 || findResult[0].email == post.email && findResult[0].password != post.password) {
               this.errors.push("Wrong credentials");
           }
        }

        if(this.errors.length == 0) {
            return "valid_inputs";
        } else {
            return this.errors;
        }
    }
}

module.exports = new User();