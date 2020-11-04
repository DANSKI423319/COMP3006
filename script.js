$(document).ready(function () {

    var roomID = 0;
    var roomArray = new Array();

    // Add a room
    $("#btnCheck").click(function () {
        roomID++;
        let newRoomName = $("#txtRoom").val();

        if (newRoomName == "") {
            newRoomName = RandomNum();
        } else {
            roomArray.push(newRoomName);
            console.log(roomArray.length);
        }

        $("#listBtns").append("<button id='btn" + roomID + "' class='btn btn-info'"
            + "style='margin: 3px;'>" + newRoomName + "</button>");
    });

    // Random number generator
    function RandomNum() {
        var RandomNum = Math.random();
        var RefinedNum = Math.round(RandomNum * 10000);
        return RefinedNum;
    }

});