const LocalStrategy   = require('passport-local').Strategy;
const mysql = require('mysql');
// const bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myschema"
});

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        con.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

//signup

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
         //check already user exist or not 

            con.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                   
					var uniq = new Date().getTime().toString()
					
                    var newUserMysql = {
						id:uniq.substring(0, 8),
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var details= { gender: req.body.gender, country: req.body.country, nationality : req.body.nationality, email: req.body.email, phnumber: req.body.phnumber, dob: req.body.dateofbirth, occupation: req.body.occupation, address : req.body.address , city : req.body.city , district : req.body.district , state : req.body.state};
					console.log(newUserMysql);
                    var insertQuery = "INSERT INTO users ( id,username,password, gender,country,nationality,email,phnumber,dob,occupation,address,city,district,state) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                    con.query(insertQuery,[newUserMysql.id,newUserMysql.username, newUserMysql.password,details.gender,details.country,details.nationality,details.email,details.phnumber,details.dob,details.occupation,details.address,details.city,details.district,details.state],function(err, rows) {

                        
						//console.log(rows);
						//newUserMysql.id = rows.insertId;
			            //console.log(newUserMysql);
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            con.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );


    // passport.use(
    //     'admin-login',
    //     new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'username',
    //         passwordField : 'password',
    //         passReqToCallback : true // allows us to pass back the entire request to the callback
    //     },
    //     function(req, username, password, done) { // callback with email and password from our form
    //     console.log("asdasfasf");
    //         con.query("SELECT * FROM admin WHERE username = ?",[username], function(err, rows){
    //             if (err)
    //                 return done(err);
    //             if (!rows.length) {
    //             	console.log("NO USER ADMIN");
    //                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    //             }

    //             // if the user is found but the password is wrong
    //             if (!bcrypt.compareSync(password, rows[0].password))
    //             console.log("areyyyyyyy ");
    //                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

    //             // all is well, return successful user
    //             console.log("USER ADMIN");
    //             return done(null, rows[0]);
    //         });
    //     })
    // );
};
