/*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize(); */


var flag_b = 0; //To keep an accout of what has been bought and what hasn't.
var bufferList = ["salt", "sugar"]; //To keep account of all the products being added
//on instance from the server, get the value from the server and add it inside the dom.
$(document).ready(function () {
    recievedevent("Start");
    $('#NewThings').on("swiperight", 'div', function () {
        //alert("here");
        $(this).remove();
        flag_b = 1; //Bought it , remove it
    });
    $('#NewThings').on("swipeleft", 'div', function () {
        $(this).remove();
        //alert("Workin");
        flag_b = 0; //Not bought ,save it for later
        alert("Going to save it for later, Thanks!");
    });


/********************************************************************* Call from server *************************************************/

    function recievedevent(id) {
        $.ajax({
            //url:"http://localhost:3000",
            url: "https://secure-anchorage-4352.herokuapp.com/bitval",
            type: 'GET',
            success: recall
        })
    }

    function recievedevent1(id) {
        $.ajax({
            //url:"http://localhost:3000",
            url: "https://secure-anchorage-4352.herokuapp.com/number",
            type: 'GET',
            success: recall1
        })
    }

    function recall(data) {

        if (data == "0") {
            //call server 
            console.log("New Value");

            setTimeout(function () {
                recievedevent1("Start");
            }, 5000);

        } else {
            console.log("Repeated Value");
            setTimeout(function () {
                recievedevent("again");
            }, 5000);

        }
    }

    function recall1(data1) {
        if (data1 != "none") {
            //add to the DOM
            console.log(data1);
            document.getElementById("NewThings").innerHTML += " <div class=\"row\">" + "<div class=\"col-sm-4\">" + "</div><div class=\"col-sm-4 swipable\">" + "<button class=\"btn-danger\">" + data1 + "</button>" + "</div>" + "<div class=\"col-sm-4\">" + "</div></div> ";

            setTimeout(function () {
                recievedevent("Start");
            }, 5000);

        } else {
            //check for the event again. 
            setTimeout(function () {
                recievedevent("Start");
            }, 5000);
        }
    }








    /*
    function recall(data) { // Set a dirty bit on the server and check from that, it will only then make it easy to work with. Let's see about that next time.
        //alert('checking');
        //console.log('checking');
        var count = 0;
    /*    if (data != "none") { // Something has been updated    
            //console.log(data);
            //console.log(bufferList.length);
            var productValue = data;
            
            
            for (i = 0; i < bufferList.length; i++) {

                if (data == bufferList[i]) {
                    //stop counting
                    console.log("exists", data);
                    count =+1;
                    console.log (count.value);
                } else {
                    //console.log(data);
                    bufferList += productValue;
                    document.getElementById("NewThings").innerHTML += " <div class=\"row\">" + "<div class=\"col-sm-4\">" + "</div><div class=\"col-sm-4 swipable\">" + "<button type=\"button\" class=\"btn btn-danger\">" + productValue + "</button>" + "</div>" + "<div class=\"col-sm-4\">" + "</div></div> ";

                } 
            }


            recievedevent('again');
        } else { //No updates on the server, check again.
            receivedevent('again');
            console.log('nothing here');
        } 
    }
*/

});