const express=require('express');
const fs=require('fs');/*file system*/
const crypto=require("crypto");
const session=require('express-session');


app=express();

app.set("view engine", "ejs");


app.use(session({ // aici se creeaza proprietatea session a requestului (pot folosi req.session)
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
  }));





app.use("/resurse", express.static(__dirname+"/resurse"));

app.use(express.urlencoded({extended:true}));

app.get(["/","/index"], function(req,res){
    res.render("pagini/index", {utilizator:req.session.utilizator});
});


caleJson=__dirname+"/resurse/json/useri.json";
app.post("/inregistrare", function(req, res){
    console.log(req.body);
    if(fs.existsSync(caleJson)){
        textFisier=fs.readFileSync(caleJson).toString("utf8");
        console.log(textFisier);
        obUseri=JSON.parse(textFisier);/* convertesc stringul in ob*/
    }
    else{
        obUseri={useri:[]};
    }
    req.body.parola=crypto.scryptSync(req.body.parola, "parola criptare", 32).toString("hex");
    console.log(req.body);
    obUseri.useri.push(req.body);
    fs.writeFileSync(caleJson, JSON.stringify(obUseri));

    res.render("pagini/inregistrare", {raspuns: "ok"});
});

/* pt a loga userul*/
app.post("/login", function(req, res){
    console.log(req.body);
    if(fs.existsSync(caleJson)){
        textFisier=fs.readFileSync(caleJson).toString("utf8");
        obUseri=JSON.parse(textFisier);/* convertesc stringul in ob*/
    }
    else{
        obUseri={useri:[]};
    }
    req.body.parola=crypto.scryptSync(req.body.parola, "parola criptare", 32).toString("hex");
    
    for(let user of obUseri.useri){
        if(user.username==req.body.username && user.parola==req.body.parola){
            console.log("Gasit");
            req.session.utilizator=user;
        }
    }

    res.render("pagini/index", {utilizator:req.session.utilizator});
});




app.get("/ceva", function(req,  res){
    res.send("altceva");
});

app.get("/logout", function(req,  res){
    req.session.destroy();
    res.render("pagini/logout");
});


app.get("/*", function(req, res){
    res.render("pagini"+req.url, {utilizator:req.session.utilizator}, function(err, rezultatRandare){
        if(err)
            res.render("pagini/404", {utilizator:req.session.utilizator});
        else
            res.send(rezultatRandare);
    });
});




app.listen(8081);

console.log("Serverul a pornit!");