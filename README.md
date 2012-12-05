Ziegler
=======

PID controller EventEmitter for node.js

Use Case
--------
Say you have some procedure that you want to execute 10 times per second
but executing the procedure itself will take a variable amount of time.
Ziegler will measure every execution time and schedule another one
with a delay that will achieve the right number of executions per
second.


Example
-------

```Javascript
var control = new(Controller)(10); // 10 executions per second
var last = new(Date)().getTime();
control.on('tick', function () {
    var now = new(Date)().getTime();
    console.log('tick', now - last);
    last = now

    control.update()
});

control.start()
```
