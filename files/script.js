////////////////////////////// JQUERY //////////////////////////////

let functions = require("./functions");

$(document).ready(function () {

    // Add a room
    $('#btnRoomAdd').click(function () {
        let roomName = $('#txtRoom').val();
        let roomID;
        let invalid = false;

        if (roomName == '') {
            roomName = RandomNum();
            roomID = roomName;
            functions.addNewRoom(roomName);
        } else {
            // Validity check
            for (i = 0; i < roomArray.length; i++) {
                if (roomArray[i].name == roomName) {
                    invalid = true;
                    { break }
                }
            }
            if (invalid == false) {
                roomID = RandomNum();
                functions.addNewRoom(roomName);
            }
        }

        functions.nullify(true);
        functions.loadRooms();
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

        nullify(false);        
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
        nullify(true);
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

    $('#btnDeselect').click(function () {
        nullify(true);
    });

    // $(window).ready(function () {});

});

/////////////////////// MOCHA & CHAI TESTING ///////////////////////

suite('Testing Suite', function () {

    setup(function () {
        this.roomName = 'COMP3006';
        this.compID = 'D29PC';
        this.compStatus = 'Working';
        this.compNotes = 'N/a'
        this.compRoomName = 0;
    });

    teardown(function () {
        $('#roomList').empty();
        roomArray = [];
        $('#tblComputer').empty();
        computerArray = [];
    });

    test('Function Test: Add a room', function () {
        addNewRoom(this.roomName);
        let checker = roomArray[0].name;

        chai.assert.equal(checker, "COMP3006", 'Cannot find expected Room value:');
    });

    test('Function Test: Add a computer', function () {
        addNewRoom(this.roomName);
        addNewPC(this.compID, this.compStatus, this.compNotes, this.compRoomName);

        let checker = computerArray[0].id;
        chai.assert.equal(this.compID, checker, 'Cannot find expected PC ID');
    });

    test('UI Test: Add a room', function () {
        // Code goes here
        /*
        // - Test UI, inoperable -
        $('#txtRoom').val(this.roomName);
        clickElement($('#btnRoomAdd'));
        */  

        assert.equal("actual", "expected", "[Test not set up]");
    })

    test('UI Test: Add a computer', function () {
        // Code goes here
        assert.equal("actual", "expected", "[Test not set up]");
    })
});
