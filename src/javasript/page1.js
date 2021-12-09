let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvas_parent = document.querySelector(".canvas-parent");

let parent_height = canvas_parent.clientHeight;
let parent_width = canvas_parent.clientWidth;

canvas_height = parent_height;
canvas_width = parent_width;

context.textAlign = "cennter";
context.textBaseline = "middle";
context.fillText("Click in this area", canvas_height / 2, canvas_width / 2);

let start = document.getElementById("start");
let time_text = document.getElementById("time-text");

let GameStatus = {
  STOP: 1,
  START: 2,
};

let status1 = GameStatus.STOP;

function get_random_time(max) {
  let result = Math.floor(Math.random() * Math.floor(max)) + 1;
  result = result * 1000;
  console.log(result);
  return result;
}

function end_game() {
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  canvas.style.background = "rgb(237,255,172)";
  start.innerHTML = "Start Test";
  status1 = GameStatus.STOP;
}

function timeout1_function(time) {
  timeout1 = setTimeout(function () {
    canvas.style.background = "rgb(78,197,78)";
    let date1 = new Date();
    time_now = date1.getTime();

    canvas.addEventListener("click", function () {
      let date2 = new Date();
      time_later = date2.getTime();
      play_time = time_later - time_now;
      time_text.innerHTML = play_time + " ms";
    });
  }, time);
}

function timeout2_function(time) {
  timeout2 = setTimeout(function () {
    end_game();
  }, time);
}

function start_game() {
  let change_time = get_random_time(8);
  let end_time = change_time + 5000;
  status1 = GameStatus.START;
  canvas.style.background = "rgb(206,63,63)";
  timeout1_function(change_time);
  timeout2_function(end_time);
}

start.addEventListener("click", function () {
  if (status1 === GameStatus.START) {
    end_game();
  } else {
    this.innerHTML = "Stop Test";
    start_game();
  }
});

canvas.addEventListener("click", function () {
  end_game();
});
