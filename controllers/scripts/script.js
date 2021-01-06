///// JAVASCRIPT /////

// Lock or Unlock update form
function disableInputs(bool) {

    $("#txtSearch").attr("disabled", bool);
    $("#txtName").attr("disabled", bool);
    $("#txtStatus").attr("disabled", bool);
    $("#txtNotes").attr("disabled", bool);
    $("#txtRoom").attr("disabled", bool);
    $("#btnUpdate").attr("disabled", bool);
    $("#cbRemove").attr("disabled", bool);

}

// Clicky element for UI tests, not used?
function clickElement(element) {
    try {
        element.trigger("click");
    } catch (err) {
        var event = new MouseEvent("click", { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}

/////// JQUERY ///////

$(document).ready(function () {

    // Get PC information (update form)
    $(".getPC").click(function () {

        let row = $(this).closest("tr");
        let id = row.find("#id").text();

        let pcName = row.find("#name").text();
        let pcStatus = row.find("#status").text();
        let pcNotes = row.find("#notes").text();
        let pcRoom = row.find("#room").text();

        disableInputs(false);

        $("#txtSearch").val(id);
        $("#txtName").val(pcName);
        $("#txtStatus").val(pcStatus);
        $("#txtNotes").val(pcNotes);
        $("#txtRoom").val(pcRoom);
        $("#txtRemove").val(id);
        $("#txtRemoveName").val(pcName);

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
            $("#inputRoom").val("Storage");
        } else {
            // ...
        }

    });

    // Update form validation
    $(".updateForm").submit(function (f) {

        let name = $("#txtName").val();
        let notes = $("#txtNotes").val();
        let room = $("txtRoom").val();

        if (name == "") {
            f.preventDefault();
            $("#errorMsg").html("ERROR: Please give your PC a name");
        } else if (notes == "") {
            $("#txtNotes").val("...");
        } else if (room == "") {
            $("#txtRoom").val("0");
        } else {
            // $("#errorMsg").html("Action Success");
        }

    });

    // Search bar for table
    $("#search").on("keyup", function () {

        var value = $(this).val().toLowerCase();

        $("#tblComputers tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });

    // Checbox
    $("#cbRemove").click(function () {

        if($(this).prop("checked") == true) {
            $("#btnRemove").attr("disabled", false);
            $("#txtRemove").attr("disabled", false);
        } else if ($(this).prop("checked") == false) {
            $("#btnRemove").attr("disabled", true);
            $("#txtRemove").attr("disabled", true);
        };

    });
    
});

$(window).ready(function () {
    //var element = document.getElementById('btnComputerAdd');
    //clickElement(element);
});
