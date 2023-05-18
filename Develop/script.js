// Button
var saveBtn = $(".saveBtn");

// Block coloration
var calTimeBlock;
var timeblockID = $("textarea[id*='timeblock']");
var timerInterval;

// Local storage
var calEntryEventTime;
var calEntryEventTxt;
var timeArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

// Sitewide date and events
$(function init() {
  renderEvents();
  setBlockColor();
});

// Present date and time
var todayDate = dayjs().format("dddd, MMM DD, YYYY, h:mm A");
$("#currentDay").text(todayDate);

// Timeblock colors as time changes past/present/future
function setBlockColor() {
  var currentTime = dayjs().hour()

  $(timeblockID).each(function () {
    var calTimeBlock = parseInt($(this).attr("id").split("timeblock-")[1]);

    if (currentTime < calTimeBlock) {
      $(this).removeClass("past present").addClass("future");
    } else if (currentTime === calTimeBlock) {
      $(this).removeClass("past future").addClass("present");
    } else if (currentTime > calTimeBlock) {
      $(this).removeClass("present future").addClass("past");
    } else {
      console.log("Refresh the page and try again");
    }
  });
}

// Date/Time and block update minute to minute
function setIntervalOnMinute() {
  var currentDateSeconds = new Date().getSeconds();
  if (currentDateSeconds == 0) {
    setInterval(currentMomentDate, 60000);
    setInterval(setBlockColor, 60000);
  } else {
    setTimeout(function () {
      setIntervalOnMinute();
    }, (60 - currentDateSeconds) * 1000);
  }
}

// Renders Events Pulled from Local Storage to DOM
function renderEvents() {
  for (let i = 0; i < timeArr.length; i++) {
    $('[id^=timeblock-]').each(function (i, v) {
      $(v).val(localStorage.getItem(timeArr[i]));
    });
  }
}

// Triggers Click Handler for Save Buttons
saveBtn.on("click", saveButtonClickHandler);

// Save will activate time and value storage
function saveButtonClickHandler(event) {
  event.preventDefault();
  calEntryEventTime = $(this).attr("id").split("-")[1];
  calEntryEventTxt = $(this).siblings('textarea[name^="timeblock"]').val().trim();
  storeEvents();
}

// Stores Time and Text Values to Local Storage 
function storeEvents() {
  localStorage.setItem(calEntryEventTime, calEntryEventTxt);
}