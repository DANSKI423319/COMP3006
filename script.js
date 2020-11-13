var roomArray = new Array();
var computerArray = new Array();
var roomSel;

//////////////////////////// JAVASCRIPT ////////////////////////////

// Random number generator
function RandomNum() {
    var RandomNum = Math.random();
    var RefinedNum = Math.round(RandomNum * 10000);
    return RefinedNum;
}

// Add new room
function addNewRoom(id, name) {
    var newRoom = {
        id: id,
        name: name,
    }

    roomArray.push(newRoom);
    $("#listBtns").append("<button id=\"btn" + id + "\" class=\"btn-info\" style=\"margin: 3px;\">" + name + "</button>");
}

// Add new computer
function addNewPC(id, status, notes, roomid) {
    var newPC = {
        id: id,
        status: status,
        notes: notes,
        roomid: roomid,
    }

    computerArray.push(newPC);
}

// Get index of room
function returnRoomIndex(name) {
    for (var i = 0; i < roomArray.length; i++) {
        if (name == roomArray[i].name) {
            return i;
        }
    }
}

// Load table
function loadTable() {
    $("#tblComputer").empty();
    for (i = 0; i < computerArray.length; i++) {
        if (computerArray[i].roomid == roomSel) {
            addToTable(computerArray[i].id, computerArray[i].status, computerArray[i].notes)
        }
    }
}

// Add to a table
function addToTable(entry1, entry2, entry3) {
    $("#tblComputer").append("<tr><td>" + entry1 + "</td><td>"
        + entry2 + "</td><td>" + entry3 + "</td></tr>");
}

// Click event for testing
function clickElement(element) {
    try {
        element.trigger("click");
    } catch (err) {
        var event = new MouseEvent("click", { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}

////////////////////////////// JQUERY //////////////////////////////

$(document).ready(function () {

    // Add a room
    $("#btnAddRoom").click(function () {
        let roomID = computerArray.length;
        let roomName = $("#txtRoom").val();
        let invalid = false;

        if (roomName == "") {
            roomName = RandomNum();
            addNewRoom(roomID, roomName);
            $("#txtRoom").val("");
        } else {
            // Valid entry check
            for (i = 0; i < roomArray.length; i++) {
                if (roomArray[i].name == roomName) {
                    invalid = true;
                    $("#txtRoom").val("");
                    { break }
                }
            }

            // Valid entry
            if (invalid == false) {
                addNewRoom(roomID, roomName);
                $("#txtRoom").val("");
            }
        }
    });

    // Add a computer
    $("#btnAddComputer").click(function () {
        let tempID = $("#comInputID").val();
        let tempStatus = $("#comInputStatus").val();
        let tempNotes = $("#comInputNotes").val();
        let tempRoomID = roomSel;

        if (tempID == "") { tempID = RandomNum(); }

        // Add a check loop for duplicate IDs here... 
        // ...

        addNewPC(tempID, tempStatus, tempNotes, tempRoomID);

        // Populate table
        loadTable();
    });

    // Room selection 
    $(document).on("click", ".btn-info", function () {
        let txtTemp = ($(this).text());
        roomSel = returnRoomIndex(txtTemp);
        $("#btnAddComputer").prop("disabled", false);

        // Tell user which room is selected
        $("#txtRoomSel1").html("Selected: " + txtTemp + ", Index No. " + roomSel);
        $("#txtRoomSel2").html("Selected: " + txtTemp + ", Index No. " + roomSel);

        // Populate table
        loadTable();
    });

    // $(window).ready(function () {} );
    
});

/////////////////////// MOCHA & CHAI TESTING ///////////////////////

suite("Testing Suite", function () {

    setup(function () {
        this.roomName = "Room 4";
        this.roomID = computerArray.length;
        this.pcID = "D29PC";
        this.pcStatus = "Working";
        this.notes = "N/a"
        this.pcRoomID = 0;
    });

    teardown(function () {
        $("#listBtns").empty();
        roomArray = [];
        $("#tblComputer").empty();
        computerArray = [];
    });

    test("Add a room", function () {
        addNewRoom(this.roomID, this.roomName);

        /*
        - Test UI, inoperable -
        $("txtRoom").val(this.roomName); 
        clickElement($("#btnAddRoom"));
        */

        let checker = $("#btn0").html();
        chai.assert.equal(this.roomName, checker, "Cannot find expected Room value");
    });

    test("Add a computer", function () {
        addNewRoom(this.roomID, this.roomName);
        addNewPC(this.pcID, this.pcStatus, this.pcNotes, this.pcRoomID);

        let checker = computerArray[0].id;
        chai.assert.equal(this.pcID, checker, "Cannot find expected PC ID");
    });
});
