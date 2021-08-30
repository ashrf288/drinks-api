const express = require('express');

const app=express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config()
app.use(cors())
const getData=require('./controllesers/contorollers')
const {addUser,addDrink,deleteDrink,updateDrink,getDrinks} =require('./controllesers/db')
app.use(express.json())



app.get('/',getData);
app.get('/user/:email',getDrinks);
app.post('/add-user/:email',addUser);
app.post('/add-drink/:email',addDrink);
app.delete('/delete-drink/:id',deleteDrink);
app.put('/update-drink/:id',updateDrink);








app.listen(process.env.PORT,console.log(`listinig on port ${process.env.PORT}`))