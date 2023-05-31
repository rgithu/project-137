objects = [];
status1 = "";

function preload(){

}

function setup(){
    
    canvas = createCanvas(450 , 330);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelLoaded(){
    console.log("model Loaded.");
    video.loop();
    status1=true;
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video , 0 , 50 , 450  , 330);
    if(status1 != ""){
        objectDetector.detect(video , gotResult);
        for(i = 0 ; i < objects.length ; i++ ){
            document.getElementById("status").innerHTML = "Status : Objects Detected ";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects = "+objects.length;

            fill("#0703fc");
            noFill();
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%" ,objects[i].x + 15, objects[i].y +15);
            rect(objects[i].x , object[i].y , objects[i].width , objects[i].height);
            stroke("#0703fc");
        }
    }
}