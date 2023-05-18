
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


renderEvent();
setBlockColor();

  });

  //Present date and time
var todayDate = dayjs().format("dddd, MMM DD, YYYY, h:mm A");
$("#currentDay").text(todayDate);


// Timeblock colors as time changes past/present/future
function setBlockColor() {

    timeblockID.each(function () {
    // Split it to display the time contained at the end of the ID, 
    calTimeBlock = $(this).attr('id').split('-')[1];
    console.log(time)
   

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
    
   
};

// Renders Events Pulled from Local Storage to DOM
function renderEvents() {
    for (let i = 0; i < timeArr.length; i++) { 
        $('[id^=timeblock-]').each(function (i, v) {
            $(v).val(localStorage.getItem(timeArr[i]));
        })
    }
};

// Triggers Click Handler for Save Buttons
saveBtn.on('click', saveButtonClickHandler);

// Save will active time and value storage
function saveButtonClickHandler(event) {
    // behave browser
    event.preventDefault();
    //time
     calEntryEventTime = $(this).attr('id').split('-')[1];
    //text value
    calEntryEventTxt = $(this).siblings('textarea[name^="timeblock"]').val().trim();
  //put in local storage
    storeEvents();
};

// Stores Time and Text Values to Local Storage where (Time = Key) and (User's Input Text = Value)
function storeEvents() {
    localStorage.setItem(calEntryEventTime, calEntryEventTxt);
};





