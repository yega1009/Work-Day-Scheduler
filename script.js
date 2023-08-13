// Use the jQuery document ready function to ensure the DOM is fully loaded before executing any JavaScript
$(function () {

  // Iterate through the element with class 'container-fluid' 
  $('.container-fluid').each(function () {
    // Loop from 9 to 17, representing work hours (9 AM to 5 PM, inclusive)
    for (var i = 9; i <= 17; i++) {
      // Use dayjs to format hours into readable strings
      var hourLabel = dayjs().hour(i).format('ha').toUpperCase();
      // Create a new time block for each hour
      var timeBlock = $(`
            <div id="hour-${i}" class="row time-block">
                <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
                <textarea class="col-8 col-md-10 description" rows="3"></textarea>
                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>
        `);
      // Append the newly created time block to the 'container-fluid' element
      $(this).append(timeBlock);
    }
  });

  // Add a click event listener to elements with class 'saveBtn'
  $('.saveBtn').on('click', function () {
    // Extract the hour information from the parent div's ID
    var hour = $(this).parent().attr('id').split('-')[1];
    // Get the text value from the sibling textarea with class 'description'
    var textValue = $(this).siblings('.description').val();

    // Store the textarea value in the browser's localStorage using the hour as the key
    localStorage.setItem(hour, textValue);
  })

  // Style each time block based on its relation to the current hour
  $('.time-block').each(function () {
    // Extract the hour from the time block's ID
    var hour = parseInt($(this).attr('id').split('-')[1]);
    // Get current hour
    var currentHour = parseInt(dayjs().format('H'));

    // Apply styling based on the time block's relation to the current hour
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }

    // Get stored data from localStorage for the current time block
    var textValue = localStorage.getItem(hour);
    // If data exists, fill textarea with the stored data
    if (textValue) {
      $(this).find('.description').val(textValue);
    }
  });

  // Display the current date at the top of the page
  var currentDay = dayjs().format('MMM D, YYYY');
  $('#currentDay').text(currentDay);
});
