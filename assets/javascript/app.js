$(document).ready(function() {
  console.log("oh hey whatsup guys");
  console.log("hope you had a great labor day");
  console.log("here's my shit");
  console.log("honestly had a difficult time converting the time on this one so ++ alex for the help");
  console.log("anyway here we go!");
// Initialize Firebase
    var config = {
      apiKey: "AIzaSyCdQyUnB-bXWS7-jZqw47fVc8wK5nrqivw",
      authDomain: "trainscheduler-106a4.firebaseapp.com",
      databaseURL: "https://trainscheduler-106a4.firebaseio.com",
      projectId: "trainscheduler-106a4",
      storageBucket: "trainscheduler-106a4.appspot.com",
      messagingSenderId: "243359231679"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //initialize variables
    var currentTime = moment();
    var trainName = "";
    var destination = "";
    var firstScheduledTime = "";
    var frequency = "";

    console.log("the current time is " + currentTime);
    console.log("...wait that don't make sense...");
    console.log("let me make some tweaks...");
    console.log(currentTime.format("hh:mm A"));
    console.log("there we go");
    console.log("go ahead and add that train schedule son!");

    $("#form-trainName").blur(function() {
      if ($("#form-trainName").val().trim() == "") {
      } else {
        trainName = $("#form-trainName").val().trim();
        console.log("aww look at chya boi, adding train names and such");
        console.log("couldn't have come up with a better name than " + trainName + "?");
      }
    });

    $("#form-destination").blur(function() {
      if ($("#form-destination").val().trim() == "") {
      } else {
        destination = $("#form-destination").val().trim();
        console.log(destination + " is probably a lot cooler than Phoenix right now.");
      }
    });
     
    $("#form-firstTime").blur(function() {
      if ($("#form-firstTime").val().trim() == "") {
      } else {
        console.log("You sure you typed " + $("#form-firstTime").val().trim() + " correctly?");
      }
    });

    $("#form-frequency").blur(function() {
      if ($("#form-frequency").val().trim() == "") {
      } else {
        console.log("I love the way you type");
      }
    });

    //Capture Button Click
    $("#submit-trainSchedule").on("click", function() {
      event.preventDefault();

      //prepend current day date to first time hours and minutes
      console.log("OOOOOO YOU SHOULD NOT HAVE PUSHED THAT BUTTON!");
      console.log("---The Browser Is Calculating Your Input---");
      console.log("detonate");
      console.log("Your inputs are as follows: ");

      console.log("Train Name: " + trainName);
      console.log("Destination: " + destination);
      firstScheduledTime = moment($("#form-firstTime").val().trim(), "hh:mm").format("X");
      console.log("FirstTrainTime: " + firstScheduledTime);
      console.log("shit it happened again...");
      console.log("Here we go");
      console.log("FirstTrainTime: " + moment.unix(firstScheduledTime).format("hh:mm A"));
      frequency = $("#form-frequency").val().trim();
      console.log("Frequency: " + frequency);

      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstScheduledTime: firstScheduledTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      console.log("These values have now been added to the database :O");
      console.log("Dang you're good");

      $("form").trigger("reset");
    });

    //Retrieve train
    database.ref().on("child_added", function(childSnapshot) {
      //Log everything
      /*console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);*/

      //convert the times
        //diff between current time and first train time
        //remainder from diff/frequency = minutes to next train


        // //convert firstTime into Unix Time
        // var momentFirstScheduledTime = childSnapshot.val().firstScheduledTime;
        // var nextArrival = momentFirstScheduledTime;

        // //calculate nextArrival
        // while (nextArrival <= currentTime) {
        //   nextArrival = moment().add(frequency, 'm');
        //   console.log("h");
        // }

        // console.log("current time: " + currentTime.format("MM/DD/YYYY/hh:mm"));
        // console.log("FirstTime: " + moment.unix(momentFirstScheduledTime).format("MM/DD/YYYY/hh:mm"));
        // /*console.log("Next Arrival" + nextArrival.format("MM/DD/YYYY/hh:mm"));*/

        // //calculate minutes away
        // var minutesAway = currentTime.diff(nextArrival, "minutes");
        // console.log("Minutes Away " + minutesAway);
        console.log("--------------------------------");
        var tFrequency = childSnapshot.val().frequency;
        console.log("tFrequency: " + tFrequency);
        var tFirstTime = childSnapshot.val().firstScheduledTime;
        console.log("tFirstTime: " + tFirstTime);
        var firstTimeConverted = moment(tFirstTime, "hh:mm").subtract(1, "years");
        console.log("firstTimeConverted: " + firstTimeConverted);
        var currentTime = moment();
        console.log("Current Time: " + currentTime);
        var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in Time: " + diffTime);
        var tRemainder = diffTime % tFrequency;
        console.log("tRemainder: " + tRemainder);
        var minutesAway = tFrequency - tRemainder;
        console.log("Minutes Away: " + minutesAway);
        var nextTrain = moment().add(minutesAway, "minutes"); 
        var nextArrival = moment(nextTrain).format("hh:mm A");
        console.log("nextArrival: " + nextArrival);

      //append to the train schedule list
      $("#list-trainSchedule").append("<tr><td>"
       + childSnapshot.val().trainName + "</td><td>"
       + childSnapshot.val().destination + "</td><td>"
       + childSnapshot.val().frequency + "</td><td>"
       + nextArrival + "</td><td>"
       + minutesAway + "</td></tr>")
    }, function(errorObject) {
      console.log("errors handled: " + errorObject.code);
    });
});