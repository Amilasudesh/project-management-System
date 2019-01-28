const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//   const passport = require('passport');
const multer = require('multer');
const url = 'mongodb://localhost:27017/auth'

const router = express.Router();


const archiUser = require('./archi_modle');
const archileave = require('./leave');
  
//set storage engine

   const storage = multer.diskStorage({
       destination: function(req,file,cb){
          cb(null,'./upload')},
       filename: function(req,file,cb){
          cb(null,Date.now()+'-'+file.originalname );            
     }

   });




//Init Upload

const upload = multer({
    storage:storage

}).single('file');


router.post('/image', (req, res)=> { 
   upload(req, res,(err)=>{
        if(err){
            console.log(err); 
        }else{
            res.json({
                success:true,
                message:'image uploaded'
            });
        }
        

   })
});




router.post('/fileupload', (req, res)=> {                    //data ekk insert kirima

    const newproject = new archiUser({
        name: req.body.name,
        diagram: req.body.diagram

        
    });



  //return res.json( newproject );
      console.log(newproject);


       archiUser.savetask(newproject,(err,archiUser)=>{             //data save karai
          if(err){
            res.json({state:false,msg:"data not insert"});
          }
          if(archiUser){
            res.json({state:true,msg:"data  insert"});
          }
        });                
 });


router.get('/viewtask', async(req, res)=> {                 // insert kala data okkoma view kirima
   const view = await archiUser.find();
     res.send(view);

 });


router.post('/leave', (req, res)=> {

    const newleave = new archileave({
        name: req.body.name,
        reason: req.body.reason,
        date: req.body.date
        
    });

    console.log(newleave);
    //return res.json( newleave );

    archileave.saveleave(newleave,(err,archileave)=>{             //data save karai
        if(err){
          res.json({state:false,msg:"data not insert"});
        }
        if(archileave){
          res.json({state:true,msg:"data  insert"});
        }
      });                
});

router.get('/viewleave', async(req, res)=> {                 // insert kala data okkoma view kirima
    const viewleave = await archileave.find();
      res.send(viewleave);
 });      



 // test

router.get('/', function(req, res) {
    res.send('hello');
});



 module.exports = router;





 