

song1 = "";
song2 = "";
scoreleft = 0;
status = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;


function preload() {

song1 = loadSound("High_Hopes.mp3");
song2 = loadSound("Rewrite the Stars");
}



function setup() {
    canvas = createCanvas( 600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet( video, modelLoaded);
    poseNet.on('pose' ,gotPoses);
}


function modelLoaded() {
    console.log('Posenet Is Initialized');
}


function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#03fce8");
    stroke("#03fce8");
    
    if(scoreleft > 0.2) {

        circle( leftWristX, leftWristY, 20);
        song1.stop();

        if(song2_status == false) {
            song2.play();
            document.getElementById("song2").innerHTML = "Playing Rewrite The Stars";
        }
        
    }

}


function playsound() {

    song.play();
    song.setVolume(1);
    song.rate(1);
}



function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log( "rightWristX = " + rightWristX + "rightWristY = " + rightWristY );

        scoreleft = result[0].pose.keypoint[9].score;
        console.log("scoreleft = " + scoreleft);
    }

}




