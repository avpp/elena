Answer = function(parent, descr) {
  if (!("value" in descr))
    descr.value = null;
  if (!("mark" in descr))
    descr.mark = 0;
  if (!("solve_time" in descr))
    descr.solve_time = -1;
  this.parent = parent;
  this.descr = descr;
  /*this.value = this.descr.value;
  this.solve_time = this.descr.solve_time;*/
  this.answer = function(v) {
    if (this.parent.status != "start")
      throw "Error! Can't answer. Status is not start";
    this.descr.value = v;
    var ans_moment = Date.now();
    this.descr.solve_time += ans_moment - this.parent.last_answer_moment;
    this.parent.change_last_answer_time(ans_moment);
    this.parent.save();
  }
  this.mark = function(v) {
    if (this.parent.status != "stop")
      throw "Error! Can't check non stopped work.";
    this.descr.mark = +v;
    this.parent.save();
  }
}