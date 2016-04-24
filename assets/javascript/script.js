$(document).ready(function() {

  tasks = [];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  htmlTask = function(task) {
    var html = "<div class='row tasks-list-item'> <div class='col-xs-12'> <div class='checkbox'><label><input class='check-input' type='checkbox' id='" + task.id + " '> " + task.title + "</label><span>" + task.completed + "</span></div></div></div>";
    return html;
  };

  htmlDate = function() {
    var date = new Date();
    var day = date.getDay();
    var html = "<p>" + date.getDate() + "</p>" + "<span> " + days[day] + " </span>";
    return html;
  };

  var d = new Date();
  document.getElementById("full-date").innerHTML = d.toDateString();

  taskData = function() {
    var url = 'http://jsonplaceholder.typicode.com/todos';
    var data = $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response) {
      tasks = response;
      main();

      // Iterate through the list
      // $('.check-input').each(function(checkbox) {
      //   $(checkbox).prop('checked', true);
      // });

      // Event for checking all tasks
      $('.tasks-list').on('click', '.check-input', function() {
        $(this).prop('checked', true);
        var index = $(this).attr('id') - 1;
        tasks[index].completed = true;
        main();
      });

    });
  };

  main = function() {
    var done = 0;
    var progress = 0;
    var incomplete = 0;


    var htmlTasks = [];
    $('.tasks-list').html('');
    $('#progress').html('');
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].completed !== true) {
        htmlTasks.push(htmlTask(tasks[i]));
      }
    }
    $('.tasks-list').html(htmlTasks.join(""));

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === true) {
        done += 1;
      } else {
        incomplete += 1;
      }
    }
    console.log('completed: ', done);
    console.log('incomplete: ', incomplete);

    progress = Math.floor((done / 200) * 100);

    console.log('progress: ', progress);

    $('#progress').html(progress);
    $('#date').html(htmlDate());
    $('#progress-line').text(done + " out of " + tasks.length + " tasks");
  };

  taskData();
});


// List of todos:
// 1. GET data
// 2. Create html functions
// 3. Loop through data
// 4. Inject results into each container


// Watch for events (example click)
// Rerender (Steps 2 through 4)
