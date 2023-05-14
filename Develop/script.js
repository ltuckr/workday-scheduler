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



  