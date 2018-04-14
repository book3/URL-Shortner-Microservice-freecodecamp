global.globalString = "This can be accessed anywhere!";
var express= require('express');

var app=express();

app.set('view engine','ejs');

app.get('/',function(req,res){
  var data = {"item": "http://"+req.host};

  res.render('index',{data});
});


app.get('/new/:name(*)',function(req,res,next){

  //if(!'https://'+req.params.name) console.log("valid");
  global=req.params;

  var {name}=req.params;

  var expression=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex=expression;
  if(regex.test(name)===true){


    var data={
    "original_url": req.params.name,
    "short_url": "http://"+req.host+"/short_ur"
    }
    res.json(data);
  }

  else{
    res.json({
      "error": "error"
    });
  }

});

app.get('/short_ur',function(req,res){
  var a=global.name;
  res.redirect(a);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
