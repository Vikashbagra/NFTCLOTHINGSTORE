require('dotenv').config();
const express = require('express');
const mongoose = require('./database/dbconnection')
const UserSchema = require('./database/User_schema');
const bodyParser = require('body-parser')

const app = express();

const path = require('path');
const userSchema = require('./database/User_schema');
const Port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }));
// public folder static path setup 
const publicPath =  path.join(__dirname,"./public/style/");
const PublicImage =  path.join(__dirname,"./public/image/");

app.use(express.static(publicPath))
app.use(express.static(PublicImage))

// view engine setup 

app.set("view engine", "hbs");

app.get("/",(req,res)=>{
    res.render('index');
})

app.post('/', async (req, res) => {
    try {
      const newData = new UserSchema({
        email: req.body.email,
      });
      // Save the data to the database
      await newData.save();
  
      res.status(201).render("index");
    } catch (error) {
      console.error(error);
      res.status(500).render("index");
    }
  });

app.listen(Port,()=>{
    console.log(`Your server is started ${Port}`);
})