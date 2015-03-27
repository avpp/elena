Solver = function(descr, year, subject, comment) {
  this.year = ("year" in descr)? descr.year : year;
  this.subject = ("subject" in descr)? descr.subject : subject;
  this.comment = ("comment" in descr)? descr.comment : comment;
  this.create_date = ("create_date" in descr)? descr.create_date : Date.now();
  if (typeof descr != "object")
    throw "Error type! "+(typeof descr)+" instead object!";
  this.last_answer_moment = null;
  this.answers = [];
  for (var i in descr.answers) {
    this.answers.push(new Answer(this, descr.answers[i]));
  }
  this.status = ("status" in descr) ? ((descr.status == "start") ? "pause" : descr.status) : "init";
  this.total_solve_time = ("total_solve_time" in descr) ? descr.total_solve_time : 0;
  this.change_last_answer_time = function(moment) {
    this.total_solve_time += moment - this.last_answer_moment;
    this.last_answer_moment = moment;
  }
  this.start = function() {
    if (this.status == "stop")
      throw "Error! status is stop";
    this.last_answer_moment = Date.now();
    this.status = "start";
    this.save();
  }
  this.pause = function() {
    if (this.status == "stop")
      throw "Error! status is stop";
    this.status = "pause";
    if (this.last_answer_moment)
      this.total_solve_time += (Date.now() - this.last_answer_moment);
    this.last_answer_moment = null;
    this.save();
  }
  this.stop = function() {
    this.status = "stop";
    if (this.last_answer_moment)
      this.total_solve_time += (Date.now() - this.last_answer_moment);
    this.last_answer_moment = null;
    this.save();
  }
  this.last_show = null;
  this.show = function(area, goal) {
    if (typeof goal == "undefined")
      goal = "solve";
    if (typeof area == "undefined")
      area = this.last_show;
    if (area == null)
      throw "Can't show on null!"
    this.last_show = area;
    area = $(area);
    area.empty();
    for (var i in this.answers) {
      if ((this.answers[i].descr.type in AnswerTypes) && (typeof AnswerTypes[this.answers[i].descr.type][goal] == "function"))
        AnswerTypes[this.answers[i].descr.type][goal](area, this.answers[i], this.status == "start");
    }
  }
  this.get_key = function(){
    return this.year.toString() + "_" + this.subject.toString() + "_" + this.create_date.toString();
  }
  this.save = function() {
    var key = this.get_key();
    var v = {};
    v.status = this.status;
    v.create_date = this.create_date;
    v.total_solve_time = this.total_solve_time;
    v.comment = this.comment;
    v.answers = []
    for (var i in this.answers) {
      v.answers.push(this.answers[i].descr);
    }
    localStorage.setItem(key, JSON.stringify(v));
  }
}
Solver.load = function(k) {
  ks = k.split("_");
  return new Solver(JSON.parse(localStorage.getItem(k)), +ks[0], ks[1]);
}