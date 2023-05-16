//Present date and time
var currentDateEL = $("#currentDate");
var currentDate;
var currentTime;

//Button
var saveBtn = $(".saveBtn");

//block coloration
var calTimeblock;
var timeblockID =$("textarea[id*='timeblock']");
var timerInterval;

//local storage 
var calEntryEventTime;
var calEntryEventText;
var timeArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];


//sitewide date and events
$(function init() {

  headerDateTime(); 
  renderEvent();
  setBlockColor();

  });

// Timeblock colors as time changes past/present/future
function setBlockColor() {

    timeblockID.each(function () {
    // Split it to display the time contained at the end of the ID, 
    calTimeBlock = $(this).attr('id').split('-')[1];
    // And convert it to a Moment.js format, then an integer
    calTimeBlock = parseInt(moment(calTimeBlock, 'H').format('H'));
    // Get Moment.js Time & format identically
    currentTime = parseInt(moment().format('H'));

//if/else setup for time+block rotation
if (currentTime < calTimeBlock) {
    $(this).removeClass('past present');
    $(this).addClass('future');
} else if (currentTime === calTimeBlock) {
    $(this).removeClass('past future');
    $(this).addClass('present');
} else if (currentTime > calTimeBlock) {
    $(this).removeClass('present future');
    $(this).addClass('past');
} else {
    console.log("Refresh the page and try again");
}
 })
 
};

//  Date/Time and block update minute to minute
function setIntervalOnMinute() {
    var currentDateSeconds = new Date().getSeconds();
    if (currentDateSeconds == 0) {
        setInterval(currentMomentDate, 60000);
        setInterval(setBGColors, 60000);
    } else {
        setTimeout(function () {
            setIntervalOnMinute();
        }, (60 - currentDateSeconds) * 1000);
    }
    currentMomentDate();
    setBGColors();
    setIntervalOnMinute();
};
//current date and time
function rightNow() {
    currentDate = moment().format('dddd, LL');
    currentDateEl.text(currentDate);
};



