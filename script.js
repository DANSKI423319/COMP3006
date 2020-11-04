$(document).ready(function () {

    var roomID;
    var roomArray = new Array();

    // Add a room
    $("#btnAddRoom").click(function () {
        roomID++;
        let newRoomName = $("#txtRoom").val();

        if (newRoomName == "") {
            newRoomName = RandomNum();
            roomArray.push(newRoomName);
            console.log(roomArray);
        } else {
            roomArray.push(newRoomName);
            console.log(roomArray);
        }

        $("#listBtns").append("<button id='btn" + roomID + "'class='btn-info' style='margin: 3px;'>" + newRoomName + "</button>");
    });

    // Room selector
    $(document).on("click", ".btn-info", function() {
        let txtTemp = ($(this).text());
        let indexTemp = roomArray.indexOf(txtTemp);

        // If input is not manually entered, gets 'bugged' when looking for an index
        if (indexTemp == -1) {
            indexTemp = "ERROR"
        } 

        $("#txtRoomSel").html("Selected: " + txtTemp + ", Index No. " + indexTemp);
    });

    // Random number generator
    function RandomNum() {
        var RandomNum = Math.random();
        var RefinedNum = Math.round(RandomNum * 10000);
        return RefinedNum;
    }

});