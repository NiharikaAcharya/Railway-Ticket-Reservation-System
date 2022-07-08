const e = require("connect-flash");

module.exports = function(app, passport) {

//index
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

//login
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs');
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

        res.redirect('/');
    });

//signup
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs');
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

//profile
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.user);
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

// logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


//admin



app.get('/admin',function(req, res) {
	res.render('admin_login.ejs');
});

app.get('/adminprofile', function(req, res) {
    res.render('admin_profile.ejs', {tit : 'ADMIN LOGIN' });
});

	app.get('/adminpage',function(req, res) {
		var db=req.con;
		res.render('admin_profile.ejs');
	});

	// app.post('/admin', passport.authenticate('local-login', {
	// 	successRedirect : '/adminprofile', // redirect to the secure profile section
	// 	failureRedirect : '/admin', // redirect back to the signup page if there is an error
	// 	failureFlash : true // allow flash messages
	// }),
	// function(req, res) {
	// 	console.log("hello");
	
	// 	// if (req.body.remember) {
	// 	//   req.session.cookie.maxAge = 1000 * 60 * 3;
	// 	// } else {
	// 	//   req.session.cookie.expires = false;
	// 	// }
	// res.redirect('/');
	// });

	app.post('/adminlogin', function(req,res) {
        var db=req.con;
		secret = req.body.code;

		db.query("select * from admin where username=?",[req.body.username],function(err,rows){
			var password = rows[0].password;
			var Id = rows[0].ID;
			console.log(password);
			console.log(Id);
			var enteredPassword = req.body.password;
			var enteredID = req.body.userid;
			console.log(enteredPassword);
			console.log(enteredID);
			if(secret === process.env.SECRET_CODE && password === enteredPassword && Id === enteredID){
				res.redirect('/adminprofile');
		
			}else{
				res.redirect('/admin');
			
		}
		});

			
			

		
    //     successRedirect : '/adminprofile', // redirect to the secure profile section
    //     failureRedirect : '/admin', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }),
    // function(req, res) {
    //     console.log("hello");

        // if (req.body.remember) {
        //   req.session.cookie.maxAge = 1000 * 60 * 3;
        // } else {
        //   req.session.cookie.expires = false;
        // }

});




	app.get('/addtrain',function(req, res) {
		res.render('addtrain.ejs');
   });

	app.post('/addtrain',function(req, res) {
		 res.render('addtrain.ejs');
	});

	app.post('/listtrain',function(req, res) {
				var db=req.con;
				var x=(req.body.date).split('-');
				var date1=x[2]+"-"+x[1]+"-"+x[0];
				console.log(date1);
				var data={source:req.body.src,destination:req.body.dest,date:date1};
				console.log(data);
				railway.trainBetweenStations(data.source,data.destination,data.date, function (err, res1) {
				 	if(err)
				 		{console.log("asd");}
				 	res.render('admintrainlist.ejs',{data:res1,date:req.body.date,from:data.source,to:data.destination});
				});
		
			});
		
			app.post('/addtrtbl',function(req, res) {
				var db=req.con;
				var data={ trainnumber:req.body.tno, trainname:req.body.tname,date:req.body.tdate, from:req.body.tfrom, to :req.body.tto,seats:180, date:req.body.tdate,fare:req.body.tfare,travelFee:req.body.tcfee,insurance:req.body.ttip,time:req.body.ttime};
				console.log(data);
				db.query("select * from train where train_number = ? and date = ? ",[data.trainnumber,data.date],function(err,rows){
					db.query("select * from train where start = ? and end =? and date =? ",[data.from,data.to,data.date],function(err,rows){
					if(rows.length!==0)
					{
						console.log("train is already present");
						var data = "train is already present";
						// var query="INSERT INTO train (train_number,train_name,date,start,end) values (?,?,?,?,?)";
						// db.query(query,[data.trainnumber,data.trainname,data.date,data.from,data.to],function(err,rows){
						// 	if(err)
						// 		console.log(err);
						// 	else
						// 	{
						// 		db.query("INSERT INTO train (train_number,train_name,date,start,end) values (?,?,?,?,?)",[data.trainnumber,data.trainname,data.date,data.from,data.to],function(err,rows){
						// 		if(err)
						// 			console.log(err)
						// 		else
						// 			res.render('admin_profile.ejs',{msg:"train added"});
						// 		});
						// 	}
		
		
						// });
						res.render('admin_profile.ejs',{msg:data});
					
					}});
					//else
					if(rows.length===0){
						db.query("INSERT INTO train (train_number,train_name,date,start,end) values (?,?,?,?,?)",[data.trainnumber,data.trainname,data.date,data.from,data.to],function(err,rows){
								if(err)
									console.log(err)
								else{
									console.log("success one");
									db.query("INSERT INTO fare (ticket_fare,convenience_fee,travel_insurance_premium,start,end,Timings) values (?,?,?,?,?,?)",[data.fare,data.travelFee,data.insurance,data.from,data.to,data.time],function(err,rows){
										if(err)
											console.log(err)
										else{
											console.log("success two");
											res.render('addtrain.ejs',{msg:""});
										}
										});
									// res.render('addtrain.ejs',{msg:"train added"});
								}
							});
								//});
					}
				});
				});
			//});
		
		
			app.post('/getchart',function(req, res) {
				var data = {};
				res.render('chart.ejs',{user:req.user,data : data});
			});
		
		
			app.post('/chart',function(req, res) {
				var sql = {trainno : req.body.trainno,date:req.body.date};
				var db=req.con;
				db.query("select * from ticket where train_number=? and date_journey=?",[sql.trainno,sql.date],function(err,rows){
					 
					 	 res.render('chart.ejs',{user:req.user,data:rows});
				});
			});
			
		






	//===============================
	///train search==================
	//===============================

	app.post('/searchtrain',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var source_arr=[];
		var dest_arr=[];
		var todayDate = new Date().toISOString().slice(0, 10);
		var sql = {
				src: req.body.source,
				destination: req.body.destination,
				date: req.body.date,
				time: req.body.time
			  };

		// 	  db.query("select * from ticket where status = ? and date_journey < ?",["CONFIRMED",todayDate],function(err,rows){
		// 		var seatsToAdd = rows.seat_number;
		// 		console.log(seatsToAdd);
		// 		db.query("select seats from train where train_number = ?",[rows.train_number],function(err,rows){
		// 			console.log(rows);
		// 		db.query("update train set seats = ? where train_number = ?",[(rows.seats+seatsToAdd), rows.train_number ],function(err,rows){
		// 			if(err)
		// 			   console.log(err);
		// 			   else
		// 			   console.log("success");
		// 		});
		// 	});
		// });	
		// var yesterday = todayDate.setDate(todayDate.getDate() - 1); 
		// var yesterday = new Date(todayDate - 864e5);
		var sDate = new Date(todayDate).getDate();
		var sMonth = new Date(todayDate).getMonth();
		var sYear = new Date(todayDate).getFullYear();
		var alteredDate = sDate - 1;
	
		var yesterday=sYear+"-"+(sMonth+1)+"-"+alteredDate;
	
		
		console.log(todayDate);
		console.log(sDate);
		console.log(sMonth);
		console.log(sYear);
		console.log(alteredDate);
				console.log(yesterday);
	
		db.query("select seat_number,train_number,date_journey from ticket where start=? and end = ? and status = ? and date_journey=?",[sql.src,sql.destination,"CONFIRMED",yesterday],function(err,rows){
			if(err){
				console.log(err);
			}
			for(var i=0;i<rows.length;i++){
				console.log(rows[i].seat_number);
				console.log(rows[i].train_number);
				console.log(rows[i].date_journey);
				var trSeatNum = rows[i].seat_number;
				var trNumber = rows[i].train_number;
				var trDate =rows[i].date_journey ;
				// var yesterday = new Date(trDate - 864e5).toISOString().slice(0, 10);
				// console.log(yesterday);

				db.query("select * from train where train_number=? and date=?",[trNumber,trDate],function(err,rows){
					var seats= parseInt(rows[0].seats);
				
	seats=seats+parseInt(trSeatNum);
	db.query("update train set seats = ?  where train_number= ? and date = ?",[seats,trNumber,trDate]);
				});
			
// 						db.query("select * from ticket where train_number = ?",[rows[i].train_number],function(err,rows){
// 			var x=rows.length;
// 			console.log(x);
// 			db.query("select * from train where train_number=? and date=?",[data.trainno,data.date],function(err,rows){
// 				var seats= parseInt(rows[0].seats);
			
// seats=seats+x;
// 			});
	//	});
			}
			
		});



			//   db.query("select seat_number,train_number from ticket where date_journey >= ?",[todayDate],function(err,rows){
			// 	// console.log(rows);
			// 	// console.log("inside ticket and search train");
			// 	var Seats = 180;
			// 	for(var i=0;i<rows.length;i++){
			// 		var addSeats = Seats - parseInt(rows[i].seat_number);
			// 		Seats = addSeats;
			// 		var trainNum = rows[i].train_number;
			// 		// console.log(rows[i].seat_number);
			// 		// console.log(rows[i].train_number);
			// 		db.query("update train set seats = ? where train_number = ?",[addSeats, trainNum ],function(err,rows){
			// 			if(err)
			// 			   console.log(err);
			// 		});
			// 	}
				
			// 					});
			  if(sql.date>=todayDate){
		
				var query="select * from train where start = ? and end = ? and train.date= ?";
				var queryData=[sql.src,sql.destination,sql.date];
db.query("select Timings from fare where start = ? and end =?",[sql.src,sql.destination],function(err,rows){
	console.log(rows);
var Timing = rows;
var availTimings = [];

while(availTimings.length > 0) {
    availTimings.pop();
}
				var today = new Date();
				var h = today.getHours();
				var m = today.getMinutes();
				for(i=0;i<Timing.length;i++){
					console.log(Timing[i].Timings);
					var avialTime = Timing[i].Timings.split(":");
					var hr = avialTime[0];
					var min = avialTime[1];
					if((hr>h && min>m || hr>h && min<m) && todayDate===sql.date){
availTimings.push(Timing[i]);
					}
				}
console.log(Timing);
// });
				db.query(query, queryData, function (err, rows) {
					if(err)
						console.log(err);
					else{
						if(availTimings.length===0){
							res.render('train_list.ejs', {user : req.user,data:rows,date:sql.date,Time:Timing, msg : "" });
						
						}else
						{
							res.render('train_list.ejs', {user : req.user,data:rows,date:sql.date,Time:availTimings, msg : "" });
						
						}
					
							
						
						
					}
				
					
					});	
				});
			  }else{
				res.render('profile.ejs', {user : req.user, msg : "IMPROPER DATE" });
			  }
				// var query="select * from train where start = ? and end = ? and train.date= ?";
				// var queryData=[sql.src,sql.destination,sql.date,sql.time];

				// db.query(query, queryData, function (err, rows) {
				// 	if(err)
				// 		console.log(err);
				// 	else
					
				// 		res.render('train_list.ejs', {user : req.user,data:rows,date:sql.date, msg : "" });
				// });
			
		


	});


	app.post('/booktrain',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var data = { train : req.body.tno, date:req.body.tdate,time:req.body.time,
				from : req.body.tfrom, to : req.body.tto, seats : req.body.tseat, nofseats : req.body.nofseats };

		var tst = parseInt(data.seats);
		var sst = parseInt(data.nofseats);


		if(sst <= tst)
			res.render('passenger.ejs',{data : data, user: req.user});
		else
			console.log("No Seats Available");

	});

	app.post('/confirmbooking',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var data = { train : req.body.tnumber, name:req.body.pass_name,age : req.body.pass_age, gender : req.body.gender,  email : req.body.pass_email,mobile : req.body.pass_mobile, date : req.body.tdate,time: req.body.ttime ,nofseats : req.body.tseats };
        

		db.query("select * from train where train_number = ? and date=?",[data.train,data.date], function(err, rows) {

			var datetime = new Date();
   			var pdate=datetime.toISOString().slice(0,10);
   			var x = Date.now();
			   var uid = req.user.id;

   			var PNR=(((rows[0].start).substring(0,3)+(rows[0].end).substring(0,3)).toUpperCase()+x).substring(0,15);
   			var traindetails = { pnr : PNR,number : rows[0].train_number,name : rows[0].train_nam ,from : rows[0].start , to : rows[0].end, seats : rows[0].seats };
	
var insertQuery3 = "INSERT INTO ticket (PNR,id,train_number,seat_number,date_booking,date_journey,start,end,ticket_fare,status,Timings) values(?,?,?,?,?,?,?,?,?,?,?)";
// db.query(insertQuery3,[PNR,uid,rows[0].train_number,data.nofseats,pdate,data.date,rows[0].start,rows[0].end,ticFare,"CONFIRMED",data.time],function(err){
// if(err){
// 	console.log(err);
// }     });      

db.query("SELECT * FROM fare WHERE start=? and end=? and Timings=?",[traindetails.from,traindetails.to,data.time], function(err, rows) {
	console.log(rows);
 if (err)
 {
	 console.log(err);
 }
 else
 {
	 console.log("hello");
	 var nof = parseInt(data.nofseats);
	 var conFee = parseInt(rows[0].convenience_fee);
	 var preInsurance = parseInt(rows[0].travel_insurance_premium);
	 var fare = parseInt(rows[0].ticket_fare);
	 ticFare = (fare+(fare*preInsurance)+conFee)*nof;
	 console.log(ticFare);
	 db.query(insertQuery3,[PNR,uid,traindetails.number,data.nofseats,pdate,data.date,rows[0].start,rows[0].end,ticFare,"CONFIRMED",data.time],function(err){
		if(err){
			console.log(err);
		}else{
			var nof = parseInt(data.nofseats);
			var remseats = parseInt(traindetails.seats);
			var seatarray = [];
			for(var i=0;i<nof;i++)
			{
				console.log("ticket_seat");
				db.query("insert into ticket_seat(PNR,seat_number,Timings) values (?,?,?)",[PNR,remseats,data.time]);
				remseats--;
			}

			 db.query("update train set seats = ? where train_number = ? and date = ?",[remseats, traindetails.number , data.date],function(err,rows){
			 if(err)
				console.log(err);
			else
				res.render('ticketconfirmed.ejs',{data : data, traindata : traindetails ,user: req.user});

			 });
		}     });   
	//  db.query("insert fare set ticket_fare = ? WHERE start=? and end=? and Timings=?",[ticFare, traindetails.from,traindetails.to,data.time],function(err,rows){
	// 	 if(err)
	// 	   { console.log(err);
	// 	 }else{
	// 		console.log("success");
	// 	 }
	//  }
	//  );
	 
 }
});


					// db.query(insertQuery3,[PNR,uid,rows[0].train_number,data.nofseats,pdate,data.date,rows[0].start,rows[0].end,ticFare,"CONFIRMED",data.time],function(err,rows){

					// var nof = parseInt(data.nofseats);
					// var remseats = parseInt(traindetails.seats);
					// var seatarray = [];
					// for(var i=0;i<nof;i++)
					// {
					// 	console.log("ticket_seat");
					// 	db.query("insert into ticket_seat(PNR,seat_number,Timings) values (?,?,?)",[PNR,remseats,data.time]);
					// 	remseats--;
					// }

					//  db.query("update train set seats = ? where train_number = ? and date = ?",[remseats, traindetails.number , data.date],function(err,rows){
					//  if(err)
					// 	console.log(err);
					// else
					// 	res.render('ticketconfirmed.ejs',{data : data, traindata : traindetails ,user: req.user});

					//  });
				// });
		});

	});

	app.post('/userdetails',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var qur = db.query("SELECT * FROM users WHERE username=?",[req.user.username], function(err, rows) {
			if (err)
			{
				console.log(err);
			}
			else
			{
						console.log(rows);
						res.render('userdetails.ejs', {user : req.user,data : rows });
			}
		});

	});


	app.post('/pastticket',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var userInfo = req.user;

		var name=req.user.id;
		var presentdate=new Date();

		db.query("select * from ticket where id=? ",[name],function(err,rows){
			res.render('mybooking.ejs',{user : req.user,id:userInfo, data : rows});
		});

	});

	app.post('/cancelledticket',function(req, res) {
		console.log(req.user);
		var db = req.con;
		var userInfo = req.user;

		var name=req.user.id;
		var presentdate=new Date();

		// db.query("select seat_number,train_number from ticket where date_journey >= ?",[todayDate],function(err,rows){
		// 	// console.log(rows);
		// 	// console.log("inside ticket and search train");
		// 	var Seats = 180;
		// 	for(var i=0;i<rows.length;i++){
		// 		var addSeats = Seats - parseInt(rows[i].seat_number);
		// 		Seats = addSeats;
		// 		var trainNum = rows[i].train_number;
		// 		// console.log(rows[i].seat_number);
		// 		// console.log(rows[i].train_number);
		// 		db.query("update train set seats = ? where train_number = ?",[addSeats, trainNum ],function(err,rows){
		// 			if(err)
		// 			   console.log(err);
		// 		});
		// 	}
			
		// 					});


		db.query("select * from ticket where id=? and status = ?",[name,"CANCELLED"],function(err,rows){
		// 	for(var i=0;i<rows.length;i++){
		// 		var seatsToAdd = rows[i].seat_number;
		// 		console.log(seatsToAdd);
		// 		db.query("select seats from train where train_number = ?",[rows[i].train_number],function(err,rows){
		// 	console.log(rows[i].seats);
		// 	// db.query("update train set seats = ? where train_number = ?",[(rows.seats+seatsToAdd),rows.train_number],function(err,rows){
		// 	// 	if(err)
		// 	// 	   console.log(err);
		// 	// 	   else
		// 	// 	   console.log("success");
		// 	// });
		// });
		// 	}
		
			res.render('mybooking.ejs',{user : req.user,id:userInfo,  data : rows});
		// });
	});

	});


	app.post('/pnrenquiry',function(req, res) {
		var data = {};
		var time = "00:00";
		res.render('pnr.ejs',{user:req.user,timings:time,data : data});
	});

	app.post('/pnr',function(req, res) {
		var sql = {pnr : req.body.pnr};
	
		var db=req.con;
		db.query("select * from ticket_seat where PNR = ?",[sql.pnr],function(err,rows){
			
			 var seat_data = "";
			
			 for(var i=0;i<rows.length;i++)
			 
			 	seat_data=seat_data+rows[i].seat_number+"   ";
			 console.log(seat_data);
			 console.log(rows);
			 var time = rows[0].Timings;
			 console.log(time);

			 db.query("select * from users inner join ticket on users.id = ticket.id where ticket.PNR=?",[sql.pnr],function(err,rows){
				 
			res.render('pnr.ejs',{user:req.user,data : rows,timings:time, seats:seat_data});
		});
		});

	});

	app.post('/cancelticket',function(req, res) {
		var data = {};
		res.render('cancel.ejs',{user:req.user,data : data});
	});

	app.post('/cancel',function(req, res) {
		var sql = {pnr : req.body.pnr};
		var db=req.con;
		
	

		db.query("select * from ticket where PNR = ?",[sql.pnr],function(err,rows){
			 var seat_data = "";
			 for(var i=0;i<rows.length;i++)
			 	seat_data=seat_data+rows[i].seat_number+"  ";
			 console.log(seat_data);

			 db.query("select * from users inner join ticket on users.id = ticket.id where ticket.PNR=?",[sql.pnr],function(err,rows){
		
			res.render('cancel.ejs',{user:req.user,data : rows, seats:seat_data});
		     });
		});
	});

	app.post('/cancel1',function(req, res) {
		var y=new Date(req.body.date);
		var data = {pnr : req.body.pnr , trainno : req.body.trainno , date : y};
		var db=req.con;
		

		db.query("select * from ticket_seat where PNR = ?",[data.pnr],function(err,rows){
			var x=rows.length;
			console.log(x);
			db.query("select * from train where train_number=? and date=?",[data.trainno,data.date],function(err,rows){
				var seats= parseInt(rows[0].seats);
			
seats=seats+x;

			
			
				console.log(seats);

				db.query("update train set seats = ?  where train_number= ? and date = ?",[seats,data.trainno,data.date]);
				db.query("update ticket set status = ? where PNR = ?",["CANCELLED",data.pnr],function(err,rows){
					res.render("cancel.ejs",{user : req.user,data:{}});
				});
			});
		});
	});

  app.post('/updatedetails',function(req, res) {
    console.log(req.user);
		var db = req.con;
		var qur = db.query("SELECT * FROM users WHERE username=?",[req.user.username], function(err, rows) {
			if (err)
			{
				console.log(err);
			}
			else
			{
						console.log(rows);
						res.render('updatedetails.ejs', {user : req.user, data : rows });
			}
		});
	});

  app.post('/update',function(req, res) {
    console.log(req.user);
		var db = req.con;

    var details= { gender: req.body.gender, country: req.body.country, nationality : req.body.nationality, email: req.body.email, phnumber: req.body.phnumber, dob: req.body.dateofbirth, occupation: req.body.occupation, address : req.body.address , city : req.body.city , district : req.body.district , state : req.body.state};
    console.log(details);
                   
     db.query("update users set email=?,phnumber=?,dob=?, occupation=?,address=?,city=?,district=?,state=? where username=?",[details.email,details.phnumber,details.dob,details.occupation,details.address,details.city,details.district,details.state,req.user.username],function(err,rows){
       if(err)
        console.log(err);
      else
       	res.render('profile.ejs',{user : req.user});


     });
	});


};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    
    res.redirect('/');
    }
