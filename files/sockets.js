$(document).ready(function () {

    $(function () {
        let socket = io("https://desk-manager.herokuapp.com");
        // let socket = io('localhost:9000');

        var dt = new Date();
        var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

        socket.on('confirm connection', function (msg) {
            $('#messages').append('<li>' + time.fontcolor('GREEN') + ': ' + msg + '</li>');
        });

        socket.on('response', function (msg) {
            $('#messages').append('<li>' + time.fontcolor('GREEN') + ': ' + msg + '</li>');
        });

        socket.on('connected users', function (data) {
            $('#txtUserCount').append("");
            $('#txtUserCount').append(data.clientCount + ' user(s) connected');
        });

        socket.emit('request', 'Connection complete');
    });
});