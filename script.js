var roomArray = new Array();
var computerArray = new Array();
var roomSelection;

//////////////////////////// JAVASCRIPT ////////////////////////////

// Add room
function addNewRoom(_name) {
    var newRoom = {
        name: _name,
    }
    roomArray.push(newRoom);
}

// Add computer
function addNewPC(_id, _status, _notes, _roomName) {
    var newPC = {
        id: _id,
        status: _status,
        notes: _notes,
        roomName: _roomName,
    }

    computerArray.push(newPC);
}

// Update room
function updateRoom(_search, _newName) {
    for (i = 0; i < roomArray.length; i++) {
        if (roomArray[i].name == _search) {

            // Update computers in rooms
            for(j = 0; j < computerArray.length; j++) {
                if (computerArray[j].roomName == _search) {
                    computerArray[j].roomName = _newName;
                }
            }

            // Assign new name
            roomArray[i].name = _newName;

            // Set new values
            let searchid = "#btn" + _search;
            let newid = 'btn' + _newName;
            $(searchid).attr('id', newid);
            $(searchid).html(_newName);

            // Reload table
            loadRooms();
            { break }
        }
    }
}

// Get index of room
function returnRoomIndex(_search) {
    for (var i = 0; i < roomArray.length; i++) {
        if (roomArray[i].name == _search) {
            return i;
        }
    }
}

// Get index of computer
function returnComputerIndex(_search) {
    for (var i = 0; i < computerArray.length; i++) {
        if (computerArray[i].id == _search) {
            return i;
        }
    }
}

// Load room table
function loadRooms() {
    $('#tblRoom').empty();
    for (i = 0; i < roomArray.length; i++) {
        addToRoomTable(roomArray[i].name);
    }
}

// Load computer table
function loadComputers() {
    $('#tblComputer').empty();
    for (i = 0; i < computerArray.length; i++) {
        if (computerArray[i].roomName == roomSelection) {
            addToComputerTable(computerArray[i].id, computerArray[i].status, computerArray[i].notes)
        }
    }
}

// Add to computer table
function addToComputerTable(_id, _status, _notes) {
    $('#tblComputer').append('<tr id=' + _id + '><td>' + _id + '</td><td>' + _status + '</td><td>' + _notes + '</td><td>'
        + '<button class=\'btn btn-warning\'>Edit</button>'
        + '<button  class=\'btn btn-danger\'>Remove</button>' + '</td></tr>');
}

// Add to room table
function addToRoomTable(_roomName) {
    $('#tblRoom').append('<button id=\'btn' + _roomName + '\' class=\'btn-info\' style=\'margin: 3px;\'>' + _roomName + '</button>')
}

// Click event for testing
function clickElement(_element) {
    try {
        _element.trigger('click');
    } catch (err) {
        var event = new MouseEvent('click', { view: window, cancelable: true, bubbles: true });
        _element.dispatchEvent(event);
    }
}

// Random number generator
function RandomNum() {
    var RandomNum = Math.random();
    var num = Math.round(RandomNum * 10000);
    return num;
}

/*
function removeComputer(row, col) {
    for (i = 0; i < computerArray.length; i++) {
        if (computerArray[i].id == col) {
            computerArray.splice(i, i);
            { break }
        }
    }
    $(row).remove();
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}
*/

////////////////////////////// JQUERY //////////////////////////////

$(document).ready(function () {

    // Add a room
    $('#btnRoomAdd').click(function () {
        let roomName = $('#txtRoom').val();
        let roomID;
        let invalid = false;

        if (roomName == '') {
            roomName = RandomNum();
            roomID = roomName;
            addNewRoom(roomName);
            $('#txtRoom').val('');
        } else {
            // Validity check
            for (i = 0; i < roomArray.length; i++) {
                if (roomArray[i].name == roomName) {
                    invalid = true;
                    $('#txtRoom').val('');
                    { break }
                }
            }
            if (invalid == false) {
                roomID = RandomNum();
                addNewRoom(roomName);
                $('#txtRoom').val('');
            }
        }

        loadRooms();
    });

    // Add a computer
    $('#btnComputerAdd').click(function () {
        let tempID = $('#txtComputerID').val();
        let tempStatus = $('#txtComputerStatus').val();
        let tempNotes = $('#txtComputerNotes').val();
        let tempRoomID = roomSelection;
        let invalid = false;

        if (tempID == '') {
            tempID = RandomNum();
            addNewPC(tempID, tempStatus, tempNotes, tempRoomID);
            $('#comInputID').val('');
        } else {
            // Validity check
            for (i = 0; i < computerArray.length; i++) {
                if (computerArray[i].id == tempID) {
                    invalid = true;
                    $('#comInputID').val('');
                    { break }
                }
            }
            if (invalid == false) {
                addNewPC(tempID, tempStatus, tempNotes, tempRoomID);
                $('#comInputID').val('');
            }
        }

        // Reload table
        loadComputers();
    });

    // Room selection 
    $(document).on('click', '.btn-info', function () {
        roomSelection = ($(this).text());
        let tempIndex = returnRoomIndex(roomSelection);
        $('#btnComputerAdd').prop('disabled', false);
        $('#btnRoomRemove').prop('disabled', false);
        $('#txtRoomUpdate').attr('disabled', false);

        // Tell user which room is selected
        $('#txtRoomSel').html('Selected: ' + roomSelection + ', Index No. ' + tempIndex);

        // Populate table
        loadComputers();
    });

    // Room update
    $('#btnRoomUpdate').click(function () {
        let text = $('#txtRoomUpdate').val();
        updateRoom(roomSelection, text);
    });

    // Computer removal // DELAYED
    $(document).on('click', '.btn-danger', function () {
        // Clarifies to only activate within the table
        if ($(this).text() == "Remove") {
            let col = ($(this).closest('tr').find('td:eq(0)').text());
            let row = "#" + ($(this).closest('tr').attr('id'));
            console.log(col);

            // METHOD 1
            /////////////
            // for (i = 0; i < computerArray.length; i++) {
            //     if (computerArray[i].id == col) {
            //         computerArray.splice(i, i);
            //     }
            // }

            // METHOD 2
            /////////////
            // let index = returnComputerIndex(col);
            // let removed = computerArray.splice(index, index);
            // console.log(computerArray);
            // console.log(removed);

            // Current Bug Problem:
            /////////////////////////
            // When using splice, it collapses the array objects above the selection
            // aswell, can't find a fix at the moment

            $(row).remove();
            loadComputers();
        }
    });

    // Room Removal // DELAYED
    $('#btnRoomRemove').click(function () {
        let tempTxt = "#btn" + roomSelection;
        console.log(tempTxt);

        // First, empty computer array of any computers in that room
        for (i = 0; i < computerArray.length; i++) {
            if (computerArray[i].roomid == roomSelection) {
                computerArray.splice(i, i);
            }
        }

        $(tempTxt).remove();
        loadComputers();

        // Second, remove room that has no computers in it
    });

    // $(window).ready(function () {});

});

/////////////////////// MOCHA & CHAI TESTING ///////////////////////

suite('Testing Suite', function () {

    setup(function () {
        this.roomID = "Room 4";
        this.pcID = 'D29PC';
        this.pcStatus = 'Working';
        this.notes = 'N/a'
        this.pcRoomID = 0;
    });

    teardown(function () {
        $('#roomList').empty();
        roomArray = [];
        $('#tblComputer').empty();
        computerArray = [];
    });

    test('Add a room', function () {
        addNewRoom(this.roomID);

        /*
        - Test UI, inoperable -
        $('txtRoom').val(this.roomName); 
        clickElement($('#btnAddRoom'));
        */

        let checker = $('#btn0').html();
        chai.assert.equal(this.roomName, checker, 'Cannot find expected Room value');
    });

    test('Add a computer', function () {
        addNewRoom(this.roomID);
        addNewPC(this.pcID, this.pcStatus, this.pcNotes, this.pcRoomID);

        let checker = computerArray[0].id;
        chai.assert.equal(this.pcID, checker, 'Cannot find expected PC ID');
    });
});
