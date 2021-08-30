'use strict';

const axios = require('axios');
const Drink=require('../module/drinksModule')


let getData=(req,res)=>{
   axios.get(process.env.baseUrl).then(resp=>{
          let data=resp.data.drinks.map(drink=>{
              return new Drink(drink)
          })
      res.json(data)
   })
}

module.exports=getData;