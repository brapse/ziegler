var Controller = require('./index').Controller;

var control = new(Controller)(10); // 10 executions per second
var last = new(Date)().getTime();
control.on('tick', function () {
    var now = new(Date)().getTime();
    console.log('speed: ', 1000/(now - last));
    last = now

    control.update()
});

control.start()

setTimeout(function () {
    console.log('Starting Ramp!');
    control.ramp(10,1, 10000,10);
}, 5000);
