'use strict';

// create angular app
var app = angular.module("EventsApp", []);

// view event overview controller
app.controller("EventController", function($scope)) {
$scope.event = {
  events: [{
      name: 'Event 1',
      description: 'Description of Event',
      time: 'Last updated now',
      location: 'CCE-030',
      image:
    },
    {
      name: 'Event 2',
      description: 'Description of Event',
      time: 'Last updated now',
      location: 'CCE-030',
      image:
    }
  ]
};

$scope.viewEvent = function() {

}
});
