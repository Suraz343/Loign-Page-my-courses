const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();
app.use(express.static("public"));//for the website to load css and bootstrap features.
app.use(bodyParser.urlencoded({extended: true}));



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName =req.body.lname;
    const email = req.body.email;
    console.log(firstName,lastName,email);

    const data={
        members: [
            {
               email_address: email,
               status:"subscribed",
               merge_fields:{
                FNAME:firstName,
                LNAME:lastName
               }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/1a50ec5647";
    const options={
        method:"POST",
        auth:"suraj:faa52f1e1ca4c3dfc21ad8fef0a1feb2-us14"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");

        }
        else{
            res.send("sorry something went wrong. Please try again");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

})

// {
//     "email_address": "$user_email",
//     "status": "subscribed",
//     "merge_fields": {
//       "FNAME": "$user_fname",
//       "LNAME": "$user_lname"
//     }
//   }
// apikey=9821bba56a8227f87d04f71dabdc34d6-us14
// 1a50ec5647
//77b2c4aaaf7c7b8e0f77554d7a156f4b-us14
//1a50ec5647
