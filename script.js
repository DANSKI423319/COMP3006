var roomArray = new Array();
var computerArray = new Array();
var roomSelection;

//////////////////////////// JAVASCRIPT ////////////////////////////

// Add new room
function addNewRoom(_id) {
    var newRoom = {
        id: _id,
    }
    roomArray.push(newRoom);
    $('#roomList').append('<button id=\'btn' + _id + '\' class=\'btn-info\' style=\'margin: 3px;\'>' + _id + '</button>');
}

// Add new computer
function addNewPC(_id, _status, _notes, _roomid) {
    var newPC = {
        id: _id,
        status: _status,
        notes: _notes,
        roomid: _roomid,
    }

    computerArray.push(newPC);
}

// Get index of room
function returnRoomIndex(search) {
    for (var i = 0; i < roomArray.length; i++) {
        if (roomArray[i].id == search) {
            return i;
        }
    }
}

// GEt index of computer
function returnComputerIndex(search) {
    for (var i = 0; i < computerArray.length; i++) {
        if (computerArray[i].id == search) {
            return i;
        }
    }
}

// Load table
function loadTable() {
    $('#tblComputer').empty();
    for (i = 0; i < computerArray.length; i++) {
        if (computerArray[i].roomid == roomSelection) {
            addToTable(computerArray[i].id, computerArray[i].status, computerArray[i].notes)
        }
    }
}

// Add to a table
function addToTable(id, status, notes) {
    $('#tblComputer').append('<tr id=' + id + '><td>' + id + '</td><td>' + status + '</td><td>' + notes + '</td><td>'
        + '<button class=\'btn btn-warning\'>Edit</button>'
        + '<button  class=\'btn btn-danger\'>Remove</button>' + '</td></tr>');
}

// Click event for testing
function clickElement(element) {
    try {
        element.trigger('click');
    } catch (err) {
        var event = new MouseEvent('click', { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}

// Random number generator
function RandomNum() {
    var RandomNum = Math.random();
    var RefinedNum = Math.round(RandomNum * 10000);
    return RefinedNum;
}

function removeRoom() {

}

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
        loadTable();
    });

    // Room selection 
    $(document).on('click', '.btn-info', function () {
        roomSelection = ($(this).text());
        let tempIndex = returnRoomIndex(roomSelection);
        $('#btnComputerAdd').prop('disabled', false);
        $('#btnRoomRemove').prop('disabled', false);

        // Tell user which room is selected
        $('#txtRoomSel').html('Selected: ' + roomSelection + ', Index No. ' + tempIndex);

        // Populate table
        loadTable();
    });

    // Computer removal // Needs work
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
            loadTable();
        }
    });

    // Room Removal // Needs work
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
        loadTable();

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
