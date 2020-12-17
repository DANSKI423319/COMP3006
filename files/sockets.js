$(document).ready(function () {

    $(function () {
        let socket = io("http://localhost:9000");

        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ":" + dt.getMilliseconds();

        socket.on("confirm connection", function (msg) {
            $("#messages").append("<li>" + time.fontcolor("GREEN") + msg + "</li>");
        });

        socket.on("response", function (msg) {
            $("#messages").append("<li>" + time.fontcolor("GREEN") + msg + "</li>");
        });

        socket.emit("request", "Finished connection test");
    });

});