var socket = io.connect('http://localhost:3000');

$(function(){

  Pomodoro = function(){

    this.pomodoro_length = 0.25 * 60;

    this.$time = $('time');
    this.timer = new Timer(this.pomodoro_length);
    this.$time.html(this.timer.toString());

    $('#start').click((function(e){

      this.start();

    }).bind(this));
    $('#stop').click((function(e){

      this.stop();

    }).bind(this));
  }

  Pomodoro.prototype.start = function(){
    console.log('pom start');
    socket.emit('blink:red');
    $('body').css('background', 'rgb(229,66,77)');
    on_decrement = (function(timer){
      this.$time.html(timer.toString());
    }).bind(this);
    on_complete = (function(timer){
      socket.emit('blink:green');
      $('body').attr('style', '');
      $('body').css('background', 'rgb(100, 184, 82)');
    }).bind(this);
    this.timer.start(on_decrement, on_complete);
  }
  Pomodoro.prototype.stop = function(){
    console.log('pom stop');
    this.timer.stop();
  }

  var Timer = function(init){

    switch (typeof init){
      case 'string':
        break;
      case 'number':
        // convert minutes to milliseconds
        this.init_time = init;
        break;
      default:
        break;
    }
    this.reset();

  }
  Timer.prototype.start = function(on_decrement, on_complete){
    this.on_complete = on_complete;
    this.ticker = setInterval(function(){
      this.decrement();
      on_decrement(this);
    }.bind(this), 1000);
  }
  Timer.prototype.stop = function(){
    clearInterval(this.ticker);
  }
  Timer.prototype.reset = function(){
    return this.time = this.init_time;
  }
  Timer.prototype.decrement = function(){
    --this.time;
    if (this.time <= 0) {
      this.stop();
      this.on_finish();
    }
    return this.time;
  }
  Timer.prototype.on_finish = function(){
    this.on_complete(this);
  }
  Timer.prototype.print = function(time){

    var minutes = (time % 60);
    if (minutes < 10) minutes = '0' + minutes;

    return parseInt(time / 60).toString() + ':' + minutes;
  }
  Timer.prototype.toString = function(){
    return this.print(this.time);
  }

  POM = new Pomodoro();

});
