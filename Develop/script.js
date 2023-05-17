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

  //current date and time
function rightNow() {
    currentDate = moment().format('dddd, LL');
    currentDateEl.text(currentDate);
};

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

// When Save Button Clicked, Pulls Corresponding Time and Date Values
function saveButtonClickHandler(event) {
    // Keeps Form from Sending
    event.preventDefault();
    // Sets Value to Time Associated with Clicked Save Button
    calEntryEventTime = $(this).attr('id').split('-')[1];
    // Sets Value to the User's Input Text
    calEntryEventTxt = $(this).siblings('textarea[name^="timeblock"]').val().trim();
    // Calls Function to Store in Local Storage
    storeEvents();
};

// Stores Time and Text Values to Local Storage where (Time = Key) and (User's Input Text = Value)
function storeEvents() {
    localStorage.setItem(calEntryEventTime, calEntryEventTxt);
};




