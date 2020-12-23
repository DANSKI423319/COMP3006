///// JAVASCRIPT /////

function clickElement(element) {
    try {
        element.trigger("click");
    } catch (err) {
        var event = new MouseEvent("click", { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}

/// M&C TEST SUITE ///
/*
*   To be continued...
* 
suite("Desk Manager Suite", function () {

    setup(function () {

    });

    teardown(function () {

    });


    test("...", function () {

    });

});
*/
