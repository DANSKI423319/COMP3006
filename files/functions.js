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

module.exports.addNewRoom = addNewRoom;

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

module.exports.addNewPC = addNewPC;

// Update room
function updateRoom(_search, _newName) {
    for (i = 0; i < roomArray.length; i++) {
        if (roomArray[i].name == _search) {

            // Update computers in rooms
            for (j = 0; j < computerArray.length; j++) {
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

module.exports.updateRoom = updateRoom;


// Get index of room
function returnRoomIndex(_search) {
    for (var i = 0; i < roomArray.length; i++) {
        if (roomArray[i].name == _search) {
            return i;
        }
    }
}

module.exports.returnRoomIndex = returnRoomIndex;

// Get index of computer
function returnComputerIndex(_search) {
    for (var i = 0; i < computerArray.length; i++) {
        if (computerArray[i].id == _search) {
            return i;
        }
    }
}

module.exports.returnComputerIndex = returnComputerIndex;

// Load room table
function loadRooms() {
    $('#tblRoom').empty();
    for (i = 0; i < roomArray.length; i++) {
        addToRoomTable(roomArray[i].name);
    }
}

module.exports.loadRooms = loadRooms;


// Load computer table
function loadComputers() {
    $('#tblComputer').empty();
    for (i = 0; i < computerArray.length; i++) {
        if (computerArray[i].roomName == roomSelection) {
            addToComputerTable(computerArray[i].id, computerArray[i].status, computerArray[i].notes)
        }
    }
}

module.exports.loadComputers = loadComputers;


// Add to computer table
function addToComputerTable(_id, _status, _notes) {
    $('#tblComputer').append('<tr id=' + _id + '><td>' + _id + '</td><td>' + _status + '</td><td>' + _notes + '</td><td>'
        + '<button class=\'btn btn-warning\'>Edit</button>'
        + '<button  class=\'btn btn-danger\'>Remove</button>' + '</td></tr>');
}

module.exports.addToComputerTable = addToComputerTable;


// Add to room table
function addToRoomTable(_roomName) {
    $('#tblRoom').append('<button id=\'btn' + _roomName + '\' class=\'btn-info\' style=\'margin: 3px;\'>' + _roomName + '</button>')
}

module.exports.addToRoomTable = addToRoomTable;

// Click event for testing
function clickElement(_element) {
    try {
        _element.trigger('click');
    } catch (err) {
        var event = new MouseEvent('click', { view: window, cancelable: true, bubbles: true });
        _element.dispatchEvent(event);
    }
}

module.exports.clickElement = clickElement;

// Random number generator
function RandomNum() {
    var RandomNum = Math.random();
    var num = Math.round(RandomNum * 100);
    return num;
}

module.exports.RandomNum = RandomNum;


// Clean forms
function nullify(_boolean) {    
    $('#txtRoomUpdate').attr('disabled', true);
    $('#btnComputerAdd').attr('disabled', true);
    $('#txtRoom').val(null);
    $('#txtRoomUpdate').val(null);
    $('#txtComputerID').val(null);
    $('#txtComputerNotes').val(null);
    if (_boolean == true) {
        $('#txtRoomSel').html(null);
    }
}

module.exports.nullify = nullify;

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