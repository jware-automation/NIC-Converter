const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods : ["POST", "GET"],
        credentials :true
    }
)); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "000001",  
    database : "nicuser"
})

//User Registration

app.post('/nicuser', (req, res) => {
    const sql = "INSERT INTO nicuser.users (`name`, `email`, `password` ) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]

    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

// For Authincator

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: ""});
    } else{
        jwt.verify(token, "jsontoken-key", (err, decoded) => {
            if(err){
                return res.json({Message: "Authincation Error"});
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/Home', verifyUser, (req, res) => {
  return res.json({Status: "Success", name : req.name})
})

//User Login

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM nicuser.users WHERE `email` = ? AND `password` = ? ";


    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({name}, "jsontoken-key", {expiresIn: "1d"});
            res.cookie('token', token);
            return res.json("Success");
        }else{
            return res.json("Failed");
        }
    })
})


//Nic to Birthday and Gender

app.post('/calculate', (req, res) => {
    const nic  = req.body.nic;
  
     if (nic.length !== 10 && nic.length !== 12) {
      return res.status(400).json({ error: 'Invalid NIC NO' });
     }
  
    let dayText = 0;
    let year = '';
    let month = '';
    let day = '';
    let gender = '';
  
     if (nic.length === 10 && (/^\d+$/.test(nic.substr(0, 9)))) {
      year = '19' + nic.substr(0, 2);
      dayText = parseInt(nic.substr(2, 3));
     }else if (nic.length === 12 && (/^\d{12}$/.test(nic))){
      year = nic.substr(0, 4);
      dayText = parseInt(nic.substr(4, 3));
     }

  
    if (dayText > 500) {
      gender = 'Female';
      dayText -= 500;
    } else {
      gender = 'Male';
    }
  
    if (dayText < 1 || dayText > 366) {
      return res.status(400).json({ error: 'Invalid NIC NO' });
    }


    // Define an array of month names
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Define the number of days in each month
    var daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    var remainingDays = dayText;
    var monthIndex = 0;

    // Iterate through the months until we find the correct one
    while (remainingDays > daysInMonth[monthIndex]) {
        remainingDays -= daysInMonth[monthIndex];
        monthIndex++;
    }

    // Get the month and date
    month = monthNames[monthIndex];
    day = remainingDays;

    //send the gender, month, and date as the response

    res.json({ gender,year, month, day });
    
  });
  



app.listen(5001, () => {
    console.log("listening")
})