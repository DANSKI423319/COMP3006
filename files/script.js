///// JAVASCRIPT /////

// Lock or Unlock update form
function blockType(bool) {
    $("#txtId").attr("disabled", bool);
    $("#txtName1").attr("disabled", bool);
    $("#txtName2").attr("disabled", bool);
    $("#txtStatus").attr("disabled", bool);
    $("#txtNotes").attr("disabled", bool);
    $("#txtRoom").attr("disabled", bool);
    $("#btnUpdate").attr("disabled", bool);
}

function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}

/////// JQUERY ///////

let url = "localhost:9000/dc"

$(document).ready(function () {
    // Get PC information (update form)
    $(".getPC").click(function () {
        let row = $(this).closest("tr");
        let id = row.find("#id").text();
        let pcName = row.find("#name").text();
        let pcStatus = row.find("#status").text();
        let pcNotes = row.find("#notes").text();
        let pcRoom = row.find("#room").text();

        blockType(false);

        $("#txtSearch").val(id);
        $("#txtName1").val(pcName);
        $("#txtName2").val(pcName);
        $("#txtStatus").val(pcStatus);
        $("#txtNotes").val(pcNotes);
        $("#txtRoom").val(pcRoom);
        $("#txtRemove").val(id);
    });

    // Insert form validation
    $(".insertForm").submit(function (f) {
        let name = $("#inputName").val();
        let notes = $("#inputNotes").val();
        let room = $("#inputRoom").val();

        if (name == "") {
            f.preventDefault();
            $("#errorMsg").html("Please name your computer");
        } else if (notes == "") {
            $("#inputNotes").val("...");
        } else if (room == "") {
            $("#inputRoom").val("0");
        } else {
            window.location.replace(url);
            $("#errorMsg").html("Action Success");
        }
    });

    // Update form validation
    $(".updateForm").submit(function (f) {
        let name1 = $("#txtName1").val();
        let name2 = $("#txtName2").val();
        let notes = $("#txtNotes").val();
        let room = $("txtRoom").val();

        if (name1 == "") {
            f.preventDefault();
            $("#errorMsg").html("Please do note remove text in the red box");
        } else if (name2 == "") {
            f.preventDefault();
            $("#errorMsg").html("Please enter a new value");
        } else if (notes == "") {
            $("#txtNotes").val("...");
        } else if (room == "") {
            $("#txtRoom").val("0");
        } else {
            $("#errorMsg").html("Action Success");
        }
    });
});

$(window).ready(function () {
    //var element = document.getElementById('btnComputerAdd');
    //clickElement(element);
});
