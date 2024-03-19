"use strict";

/*---------------------------- */
/*  Utility functions          */
/* ----------------------------*/

function listen(event, selector, callback){
  return selector.addEventListener(event, callback);
}

function select(selector){
  return document.querySelector(selector);
}

/*---------------------------- */
/*  Variables                  */
/* ----------------------------*/

const currTime = select('.time');
const hour = select('.hourInput');
const minute = select('.minuteInput');
const set = select('.set');
const alarmTime = select('.target');
let newTime = new Date();
let unparsed = new Date();
newTime.setMinutes(newTime.getMinutes()-1);

const audio = new Audio('./assets/media/alarm.mp3');
audio.type = 'audio/mp3';

/*----------------------- */
/*  Main                  */
/* -----------------------*/

const options = {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
}

function displayTime(){
  unparsed = new Date();
  currTime.innerText = unparsed.toLocaleTimeString('en-ca', options);
  
}

function setAlarm(){
  newTime.setHours(hour.value);
  newTime.setMinutes(minute.value);
  // validation();
  displayAlarm(newTime);
}

function displayAlarm(time){
  alarmTime.innerText = time.toLocaleTimeString('en-ca', options).slice(0, 5);
}

function checkTime(){
  let realTime = `${unparsed.getHours()}${unparsed.getMinutes()}`;
  let setTime = `${newTime.getHours()}${newTime.getMinutes()}`;
  if(realTime === setTime)
    audio.play();
}

// function validation(){
//   if(isNumber(hour.value) && isNumber(minute.value)){

//   } else {

//   }
// }

displayTime();
setInterval(displayTime, 1000);


listen('click', set, () => {
  setAlarm();
  hour.value = "";
  minute.value = "";
  setInterval(checkTime, 1000);
});