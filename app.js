///including packages
var express=require("express");
var request=require("request");
var bodyParser=require("body-parser")
var app=express();
var mongoose=require("mongoose");

//Requirements
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//Database structuring
var campSchema= new mongoose.Schema({
	name:String,image:String,description:String,location:String
});
var Campground= mongoose.model("Campground",campSchema);

app.get("/",function(req,res){
	res.render("landing");
});

Campground.create({
	name:"Schitsjsdj",
	image:"https://images.unsplash.com/photo-1526835770424-ca853b54cecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
	location:"Cosa Rica"
});

//Display all Campgrounds
app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,campgrounds){
		if(err){
			alert("Something Went Wrong!!");
			console.log(err);
		}else{
			res.render("campgrounds",{campGrounds:campgrounds});
		}
	});
	
});

//Add New Campground
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var location=req.body.location;
	var newCampground={name:name,image:image,description:description,location:location};
	Campground.create(newCampground,function(err,campground){
		if(err){
			alert("Something Went Wrong");
		}else{
			console.log("New Campground Added");
		}
	});
	res.redirect("/campgrounds");
	
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.get("/tovisit",function(req,res){
	res.render("tovisit");
});

app.get("*",function(req,res){
	res.render("nofound.ejs");
});




app.listen(100, function() {
    console.log('YelpCamp Has Started');
});
