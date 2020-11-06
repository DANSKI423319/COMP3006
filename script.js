$(document).ready(function () {

    var roomID;
    var roomArray = new Array();

    // Add a room
    $("#btnAddRoom").click(function () {
        roomID++;
        let roomName = $("#txtRoom").val();
        var invalid = false;

        if (roomName == "") {
            roomName = RandomNum();
            roomArray.push(roomName);
            addNewRoom(roomID, roomName);
            $("#txtRoom").val("");

        } else {

            // Valid entry check
            for (i = 0; i < roomArray.length; i++) {
                if (roomArray[i] == roomName) {
                    invalid = true;
                    $("#txtRoom").val("");
                    { break }
                }
            }

            // Valid entry
            if (invalid == false) {
                roomArray.push(roomName);
                addNewRoom(roomID, roomName);
                $("#txtRoom").val("");
            }
        }
    });

    // Room selection identifier
    $(document).on("click", ".btn-info", function () {
        let txtTemp = ($(this).text());
        indexTemp = returnRoomIndex(txtTemp);

        // Tell user if something is wrong
        if (indexTemp == "undefined") {
            indexTemp = "ERROR";
        }

        $("#txtRoomSel1").html("Selected: " + txtTemp + ", Index No. " + indexTemp);
        $("#txtRoomSel2").html("Selected: " + txtTemp + ", Index No. " + indexTemp);
    });

    // Random number generator
    function RandomNum() {
        var RandomNum = Math.random();
        var RefinedNum = Math.round(RandomNum * 10000);
        return RefinedNum;
    }

    // Add new room
    function addNewRoom(id, name) {
        $("#listBtns").append("<button id=\"btn" + id + "\" class=\"btn-info\" style=\"margin: 3px;\">" + name + "</button>");
    }

    // Get index of room
    function returnRoomIndex(name) {
        for (var i = 0; i < roomArray.length; i++) {
            if (name == roomArray[i]) {
                return i;
            }
        }
    }

});