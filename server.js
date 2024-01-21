const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var path = require('path');
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');


//Used to get the styles folder
app.use('/static', express.static(path.join(__dirname, '/public')));

//Used to get the images folder
app.use('/visual', express.static(path.join(__dirname, "/media")));

//Used to get the script folder
app.use('/visual', express.static(path.join(__dirname, "/public")));

//Used to parse the data in the body
app.use(bodyParser.urlencoded({
    extended: true
}));


//Fighter Object to be used for the Fighter Creation.
let fighterObject = undefined;

//Use to contain all the objects that will be posted to the front end.
let frontEndObject = undefined;

//Function to use the gender and determine which image to use for avatar.
function getImage(genderChoice){
    var imageLink = (genderChoice == 'Male') ? 
    '/visual/images/maleAvatar.jpg' : 
    '/visual/images/femaleavatar.png';
    return {avimage: imageLink};
}

//***************Striking Styles(Start) ************************/

let strikingStyle = {};

function getStrikingStyle(strikingName){
    if(strikingName == 'Boxing'){
        return boxingStyle;
    }
    return (strikingName == 'Kickboxing') ? kickboxingStyle : muayThaiStyle;
}

const boxingStyle = {
    titlecard1: 'Head Movement',
    titlecard2: 'Hand Combination',
    titlecard3: 'Counters',
    strikeimage1: '/visual/images/styles/BoxingHeadMovement.gif',
    strikeimage2: '/visual/images/styles/BoxingCrispMovement1.gif',
    strikeimage3: '/visual/images/styles/BoxingCounter.gif',
    strikedescription1: 'Head movement is one of the benefits of boxing. Use head movement to evade strikes and stay in the pocket.',
    strikedescription2: 'Fluid, crisp and fast hand/punch combinations will have the opponents overwhelmed thus leading to a knockout.',
    strikedescription3: 'Use head movement to evade strikes can open counter opportunities that can surprise the opponent.'
}

const kickboxingStyle = {
    titlecard1: 'Devasting Kicks',
    titlecard2: 'Punch/Kick Combination',
    titlecard3: 'Unpredictable',
    strikeimage1: '/visual/images/styles/Kickboxingkicks.gif',
    strikeimage2: '/visual/images/styles/KickboxingCombo1.gif',
    strikeimage3: '/visual/images/styles/KickboxingSpinningShit.gif',
    strikedescription1: 'Kicks are a heavy part of kickboxing. It can be used to break down the opponent.',
    strikedescription2: 'Mixing up punching & kicking can keep the opponent guessing.',
    strikedescription3: 'Kickboxing has a wide array of unpredictable techniques, like spinning kicks.'
}

const muayThaiStyle = {
    titlecard1: 'Elbow',
    titlecard2: 'Leg Kicks',
    titlecard3: 'Clinch',
    strikeimage1: '/visual/images/styles/MuayThaiElbow.gif',
    strikeimage2: '/visual/images/styles/MuayThaiLegKick.gif',
    strikeimage3: '/visual/images/styles/MuayThaiClinch.gif',
    strikedescription1: 'Use elbows to not only cut the opponent but it can powerful enough to knock them out as well.',
    strikedescription2: 'Leg kicks are used to break down the opponent and can minimize their movements, speed or power.',
    strikedescription3: 'Clinch can be utitilize to control the opponent. A wide array of strikes can be thrown in this position.'
}

//***************Striking Styles(End) ************************/

//***************Grappling Styles(Start) ************************/

let grapplingStyle = {};


function getGrapplingStyle(grapplingName){
    if(grapplingName == 'BJJ'){
        return bjjStyle;
    }
    return (grapplingName == 'Judo') ? judoStyle : wrestlingStyle;
}

const bjjStyle = {
    titlecard4: 'Control',
    titlecard5: 'Submissions',
    titlecard6: 'Submission Chain',
    grappleimage1: '/visual/images/styles/BJJ1.gif',
    grappleimage2: '/visual/images/styles/RearNakedGif.gif',
    grappleimage3: '/visual/images/styles/BJJChain.gif',
    grappledescription1: 'Can control opponents movements with Brazilian Jiu Jitsu, can use that to drain and submit them.',
    grappledescription2: 'Use BJJ to perform devastating techniques refer to as submissions. The opponent has the option to submit or suffer the consequences.',
    grappledescription3: 'Chain different submissions to keep the opponent guessing and catching them off guard.'
}

const judoStyle = {
    titlecard4: 'Trips/Throws',
    titlecard5: 'Momentum Reversal',
    titlecard6: 'Crushing Submisssions',
    grappleimage1: '/visual/images/styles/JudoThrow1.gif',
    grappleimage2: '/visual/images/styles/JudoThrow2.gif',
    grappleimage3: '/visual/images/styles/JudoSub.gif',
    grappledescription1: 'Judo has cool and powerful trips/throws to get the opponent off their base and on the mat that can leave them winded.',
    grappledescription2: 'Stop opponents momentum or use it against them with Judo. This can stop the opponent from attacking any further.',
    grappledescription3: 'Once on the mat Judo can be used to perform crushing submissions such as Triangle Chokes & Armbars.'
}

const wrestlingStyle = {
    titlecard4: 'Takedowns',
    titlecard5: 'Control',
    titlecard6: 'Devastating Ground & Pound',
    grappleimage1: '/visual/images/styles/WrestlingTakedown.gif',
    grappleimage2: '/visual/images/styles/WrestlingTakedown2.gif',
    grappleimage3: '/visual/images/styles/WrestlingGNP.gif',
    grappledescription1: 'Able to use takedowns to put the opponent on the mat or even possibly knock them out. Change the level of the fight.',
    grappledescription2: 'Use wrestling to dictate where the fight takes place. Can also be used to control the opponent movements.',
    grappledescription3: 'On the ground can perform strong strikes known as ground & pound. This can overwhelm the opponent and crush their will.'
}

//***************Grappling Styles(End) ************************/


//Link to the home page
app.get('/', (req, res) => {
    console.log('IndexPage');
    res.sendFile(__dirname + "/pages/index.html");
})

//Link to the fighter creation page
app.get('/fightercreationview', (req, res) => {
    console.log('Fighter Creation Page');
    res.sendFile(__dirname + '/pages/createafighter.html');
})

//Link to clear the front end object
app.get('/clearobject', (req, res) => {
    frontEndObject = undefined
    return res.redirect('/fightercreationview');
})

//Link to the store page
app.get('/storeview', (req, res) => {
    console.log('Store Page');
    res.sendFile(__dirname + '/pages/store.html');
})

//Link to the about page
app.get('/aboutview', (req, res) => {
    console.log('About Page');
    res.sendFile(__dirname + '/pages/about.html');
})

//Link to post the fighter info and assign the information to an object
app.post('/createfighterinfo', (req, res) => {
    fighterObject = req.body;
    strikingStyle = getStrikingStyle(fighterObject.striking);
    grapplingStyle = getGrapplingStyle(fighterObject.grappling);
    let image = getImage(fighterObject.genderChoice);
    frontEndObject = Object.assign(fighterObject, strikingStyle, grapplingStyle, image);
    res.redirect('/resultview');
})

//Link to the result page displaying the fighter information provided
app.get('/resultview', (req, res) => {
    if(typeof frontEndObject !== 'undefined'){
        return res.render('resultpage', frontEndObject);
    }
     res.redirect('/fightercreationview');
})

app.listen(3001);