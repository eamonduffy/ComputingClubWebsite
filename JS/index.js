var indexApp = angular.module('indexApp', []);
indexApp.controller('indexController', ['$scope', function($scope) {
  $scope.general = [
  {"header":"General Info", "content":"The Quinnipiac Computing Club hosts various events to promote programming at Quinnipiac. These range from social events to programming competitons."},
  ];
  $scope.board = [
  {"header":"E-board", "content":"The current E-board members are:", "president": "Ryan Hanlon", "vice": "Kyle Gorman", "other":"Eamon Duffy"},
  ];
  $scope.meeting = [
  {"header":"Meeting Info", "content":"We meet every Tuesday in CCE030 at 9:30pm."},
  ];
  $scope.contacts = [
  {"header":"Contacts", "content":"We can be reached on Tuesday in CCE030 at 9:30pm or by email at totallyarealemail@quinnipiac.edu"},
  ];
  $scope.classSelected = 1;
  $scope.displayedArr = $scope.general;


  $scope.selectClass = function(classSelected){
    $scope.classSelected = classSelected;
    $scope.displayedArr = classSelected == 1 ? $scope.general : classSelected == 2 ? $scope.board : classSelected == 3 ? $scope.meeting : $scope.contacts;
  }

}]);

function editEvent(event) {
  $('#event-modal input[name="event-index"]').val(event ? event.id : '');
  $('#event-modal input[name="event-name"]').val(event ? event.name : '');
  $('#event-modal input[name="event-location"]').val(event ? event.location : '');
  $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
  $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
  $('#event-modal').modal();
}

function deleteEvent(event) {
  var dataSource = $('#calendar').data('calendar').getDataSource();

  for(var i in dataSource) {
    if(dataSource[i].id == event.id) {
      dataSource.splice(i, 1);
      break;
    }
  }

  $('#calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
  var event = {
    id: $('#event-modal input[name="event-index"]').val(),
    name: $('#event-modal input[name="event-name"]').val(),
    location: $('#event-modal input[name="event-location"]').val(),
    startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
    endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
  }

  var dataSource = $('#calendar').data('calendar').getDataSource();

  if(event.id) {
    for(var i in dataSource) {
      if(dataSource[i].id == event.id) {
        dataSource[i].name = event.name;
        dataSource[i].location = event.location;
        dataSource[i].startDate = event.startDate;
        dataSource[i].endDate = event.endDate;
      }
    }
  }
  else
  {
    var newId = 0;
    for(var i in dataSource) {
      if(dataSource[i].id > newId) {
        newId = dataSource[i].id;
      }
    }

    newId++;
    event.id = newId;

    dataSource.push(event);
  }

  $('#calendar').data('calendar').setDataSource(dataSource);
  $('#event-modal').modal('hide');
}

$(function() {
  var currentYear = new Date().getFullYear();

  $('#calendar').calendar({
    enableContextMenu: true,
    enableRangeSelection: true,
    contextMenuItems:[
      {
        text: 'Update',
        click: editEvent
      },
      {
        text: 'Delete',
        click: deleteEvent
      }
    ],
    selectRange: function(e) {
      editEvent({ startDate: e.startDate, endDate: e.endDate });
    },
    mouseOnDay: function(e) {
      if(e.events.length > 0) {
        var content = '';

        for(var i in e.events) {
          content += '<div class="event-tooltip-content">'
          + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
          + '<div class="event-location">' + e.events[i].location + '</div>'
          + '</div>';
        }

        $(e.element).popover({
          trigger: 'manual',
          container: 'body',
          html:true,
          content: content
        });

        $(e.element).popover('show');
      }
    },
    mouseOutDay: function(e) {
      if(e.events.length > 0) {
        $(e.element).popover('hide');
      }
    },
    dayContextMenu: function(e) {
      $(e.element).popover('hide');
    },
    dataSource: [
      {
        id: 0,
        name: 'Hackathon',
        location: 'CCE030.',
        startDate: new Date(currentYear, 11, 3),
        endDate: new Date(currentYear, 11, 3)
      },
      {
        id: 1,
        name: 'Final Study Session',
        location: 'CCE030',
        startDate: new Date(currentYear,  11, 10),
        endDate: new Date(currentYear, 11, 10)
      },
      {
        id: 2,
        name: 'Winter Break',
        location: 'Home!',
        startDate: new Date(currentYear, 11, 16),
        endDate: new Date(currentYear, 11, 31)
      },
    ]
  });

  $('#save-event').click(function() {
    saveEvent();
  });
});

//displays only the current month
$('#calendar').calendar({
  renderEnd: function (e)
  { var currentMonth = new Date().getMonth();
    $('#calendar .month-container').each(function (idx, el) {
      if (idx < currentMonth) {
        $(this).css("display", "none");
      } if (idx > currentMonth + 2) {
        $(this).css("display", "none");
      }
    });
document.getElementsByClassName("calendar-header panel panel-default")[0].innerHTML = '<table><th class="prev"><span class="glyphicon glyphicon-chevron-left"></span></th><th class="year-title year-neighbor2 hidden-sm hidden-xs">Oct</th><th class="year-title year-neighbor hidden-xs">Nov</th><th class="year-title">Dec</th><th class="year-title year-neighbor hidden-xs">Jan</th><th class="year-title year-neighbor2 hidden-sm hidden-xs">Feb</th><th class="next"><span class="glyphicon glyphicon-chevron-right"></span></th></table>';
  }
});
