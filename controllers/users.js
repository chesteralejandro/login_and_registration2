const user = require('../models/user');
let errors = [];

class Users {

    index(req, res) {
        if(req.session.user) {
            res.redirect('/homepage');
        } else {
            res.render('index', {'errors': errors});
        }
    }

    viewHomepage(req, res) {
        if(req.session.user) {
            errors = [];
            res.render('homepage', {'user': req.session.user[0]});
        } else {
            res.redirect('/')
        }
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/')
    }

    async login(req, res) {
        // user.loginUser(req, res);
        console.log(req.body);
        let result = await user.validateLogin(req.body);
        if(result == "valid_inputs") {
            req.session.user = await user.loginUser(req.body);
            res.redirect('/homepage');
        } else {
            errors = result;
            res.redirect('/');
        }     
    }

    async register(req, res) {
        let result = await user.validateRegistration(req.body);
        if(result == "valid_inputs") {
            req.session.user = await user.registerUser(req.body);
            res.redirect('/homepage');
        } else {
            errors = result;
            res.redirect('/');
        }
    }
    
}

module.exports = new Users();