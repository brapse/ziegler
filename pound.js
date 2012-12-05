var utils = require('util'),
    EventEmitter = require('events').EventEmitter;

var Controller = function (speed, k_p, k_i, k_d) {
    // speed = executions per second
    EventEmitter.apply(this);
    this.speed = speed;

    this.k_p = k_p || 1;
    this.k_i = k_i || 0;
    this.k_d = k_d || 0;

    this.sumError = 0;
    this.lastError = 0;
    this.lastTime = 0;
};

utils.inherits(Controller, EventEmitter);

Controller.prototype.update = function () {
    var duration = new(Date)().getTime() - this.lastTime;

    //target duration in milleseconds
    var target = 1000 / this.speed;

    var error = Math.abs(duration - target);
    this.sumError = this.sumError + error;
    var dError = error - this.lastError;
    this.lastError = error;

    var delay = (this.k_p*error) + (this.k_i * this.sumError) + (this.k_d * dError);

    var that = this;
    console.log('Error:', error);
    console.log('dError', dError);
    console.log('Delay:', delay);
    console.log('Duration:', duration);
    setTimeout(function () {
        that.lastTime = new(Date)().getTime();
        that.emit('tick');
    }, delay);
}

Controller.prototype.start = function () {
    this.lastTime = new(Date)().getTime();

    this.emit('tick');
};


var control = new(Controller)(20);
var last = new(Date)().getTime();
control.on('tick', function (rate) {
    var now = new(Date)().getTime();
    console.log('tick', now - last);
    last = now

    control.update()
});

control.start()
