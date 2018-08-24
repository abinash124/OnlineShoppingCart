var passport=require('passport');
var User= require('../Models/user');
var LocalStrategy=require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);

});

passport.deserializeUser(function(id,done){
   User.findById(id,function (err,user) {
       done(err,user);
       
   });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'password',
    passReqToCallback: true
}, function(req,email,password,done){
    //Email and password validation
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    var errors=req.validationErrors();
    if(errors){
        var messages=[];
        errors.forEach(function(error){
           messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));//returns validation message to view
    }
    //if no error sign the user in by storing them in database
    User.findOne({'email':email}, function (err,user) {
        if (err){
            return done(err);
        }
        if(user){
            return done(null,false,{message: 'Email already exists'});
        }
        var newUser=new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.save(function (err,result) {
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });
    });
}));
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'password',
    passReqToCallback: true

},function(req,email,password,done){
        req.checkBody('email','Invalid Email').notEmpty().isEmail();
        req.checkBody('password','Invalid Password').notEmpty();
        var errors=req.validationErrors();
        if(errors){
            var messages=[];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages));//returns validation message to view
        }
        User.findOne({'email':email}, function (err,user) {
            if (err){
                return done(err);
            }
            if(!user){
                return done(null,false,{message: 'Account with that email does not exist'});
            }
            if(!user.validPassowrd(password)){
                return done(null,false,{message: 'Incorrect password.'});
            }
            return done(null, user);
        })

    }
    ));
