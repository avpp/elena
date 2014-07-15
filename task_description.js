function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TaskDescription(param, config) {
  if (typeof param == "string")
    TaskDescription.define(param);
  if (config == null || config == undefined)
    this.config = {};
  else
    this.config = config;
}

TaskDescription.define = function(data) {
  eval(data);
}