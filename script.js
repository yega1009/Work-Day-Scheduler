// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function () {
    var hour = $(this).parent().attr('id').split('-')[1];
    var textValue = $(this).siblings('.description').val();

    localStorage.setItem(hour, textValue);
  })

  $('.container-fluid').each(function () {
    for (var i = 9; i <= 17; i++) {
      var hourLabel = dayjs().hour(i).format('ha').toUpperCase();
      var timeBlock = $(`
            <div id="hour-${i}" class="row time-block">
                <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
                <textarea class="col-8 col-md-10 description" rows="3"></textarea>
                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>
        `);

      $(this).append(timeBlock);
    }
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $('.time-block').each(function () {
    
    var hour = ($(this).attr('id').split('-')[1]);
    var currentHour = (dayjs().format('H'));

    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).removeClass('past');
      $(this).addClass('present');
    } else if (hour > currentHour) {
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $('.time-block').each(function () {
    var hour = $(this).attr('id').split('-')[1];
    var textValue = localStorage.getItem(hour);

    if (textValue) {
      $(this).find('.description').val(textValue);
    }
  })

  // TODO: Add code to display the current date in the header of the page.
  var currentDay = dayjs().format('MMM D, YYYY');
  $('#currentDay').text(currentDay);
});
