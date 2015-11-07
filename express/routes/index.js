var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
    if(req.session.user){
        req.session.error='已登录';
        return res.redirect('/');
    }
    res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next){
    if(req.body.username=="admin" && req.body.password == "admin"){
        req.session.user={username:"admin",password:"admin"};
        res.redirect('/home')
    }else{
        req.session.error = "用户名或密码不正确";
        res.redirect("/login");
    }
});

router.get('/logout', function(req, res, next){
    req.session.user = null;
    res.redirect('/');
});

router.get('/home', function(req, res, next){
    if(!req.session.user){
        req.session.error='未登录';
        return res.redirect('/login');
    }
    res.render("home", {title:'Home'});
});

module.exports = router;
