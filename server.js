const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')



app.get("/",function(req,res)
{

  res.sendFile(__dirname+"/index.html");
})




app.post("/",function(req,res)
{
const dis_id =req.body.district_id;
const date_status=req.body.date;
var url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+dis_id+'&date='+date_status
axios.get(url).then(function(response){
  const total_center=response.data.sessions.length;
  var total_sessions=[];
  var name_center=[];
  var address_center=[];
  var dis_center=[];
  var state_name=[];
  var pin_center=[];
  var fee_type=[];
  var min_age=[];
  var vaccine_name=[];
  var avail_dose1=[];
  var avail_dose2=[];
  for(var i=0;i<total_center;i++)
  {
    name_center[i]=response.data.sessions[i].name;
    address_center[i]=response.data.sessions[i].address;
    dis_center[i]=response.data.sessions[i].district_name;
    state_name[i]=response.data.sessions[i].state_name;
    pin_center[i]=response.data.sessions[i].pincode;
    fee_type[i]=response.data.sessions[i].fee_type;
    vaccine_name[i]=response.data.sessions[i].vaccine;
    min_age[i]=response.data.sessions[i].min_age_limit;
    avail_dose1[i]=response.data.sessions[i].available_capacity_dose1;
    avail_dose2[i]=response.data.sessions[i].available_capacity_dose2;

  }

  res.render('list',{
  dateprovided: date_status,
  totalnumberofcenters: total_center,
  nameinej:name_center,
  addressinej: address_center,
  districtinej: dis_center,
  stateinej : state_name,
  pininej : pin_center,
  feetypeinej: fee_type,
  totalnumberofsessions: total_sessions,
  vaccinenameinej: vaccine_name,
  dose1inej: avail_dose1,
  dose2inej: avail_dose2,
  minageinej: min_age
 }
  );
  })


  })



//FOUND THE console.error
//The problem is my code is not able to parser
//data in situation when large data is to be
//called.the solution to the problem i found
//is to use something called streams
//actually this parse will scrape whole data in a single go
//but with the help of stream we may use chunk data to
//increase the capacity of the json
//used axios instead of https and everything
//was okay.



 app.listen(3000,function(req,res){
   console.log("Server started at port 3000");
 })
