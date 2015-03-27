function show_solver(header, content_area, solver) {
  header = $(header);
  header.text("Пройти тест \"" + solver.comment + "\"");
  content_area = $(content_area);
  content_area.empty();
  var back_btn = $("<a></a>").appendTo(content_area).addClass("btn btn-default").text("Назад");
  back_btn.click(function(h, ca, s){
    choose_year_and_subject(h, ca, s);
  }.bind(back_btn, header, content_area, solver));
  $("<span>&nbsp;&nbsp;&nbsp;</span>").appendTo(content_area);
  var start_btn = $("<a></a>").appendTo(content_area).addClass("btn btn-success").text((solver.status == "pause")? "Продолжить" : "Начать");
  
  start_btn.click(function(solver, bb){
    if (solver.status == "stop")
      return;
    if (solver.status == "pause" || solver.status == "init"){
      solver.start();
      this.text("Приостановить");
    } else if (solver.status == "start"){
      solver.pause();
      this.text("Продолжить");
    }
    solver.show();
    back_btn.attr("disabled", solver.status != "pause");
  }.bind(start_btn, solver, back_btn));
  
  var ans_area = $("<div></div>").appendTo(content_area);
  
  $("<br/>").appendTo(content_area);
  var stop_btn = $("<a></a>").appendTo(content_area).addClass("btn btn-danger").text("Завершить работу");
  stop_btn.click(function(solver, start_btn, back_btn, h ,ca){
    if (solver.status == "stop")
      return;
    solver.stop();
    solver.show();
    start_btn.hide();
    back_btn.attr("disabled", false);
    $(this).hide();
    check_solve(h, ca, solver);
  }.bind(stop_btn, solver, start_btn, back_btn, header, content_area));
  
  if (solver.status == "stop") {
    start_btn.hide();
    stop_btn.hide();
  }
  
  solver.show(ans_area);
  
  var time_div = $("<div></div>").appendTo(content_area);
  time_div.addClass("alert alert-success");
  time_div.css({position:"fixed", right:0, top:0, width:"150px"});
  time_div.text("Время: ");
  time_div.attr("timer", setInterval(function(s){
    t = new Date(s.total_solve_time + ((s.last_answer_moment)?Date.now() - s.last_answer_moment : 0));
    $(this).text("Время: " + ("00" + t.getUTCHours()).slice(-2) + ":" + ("00" + t.getUTCMinutes()).slice(-2) + ":" + ("00" + t.getUTCSeconds()).slice(-2));
    var timer = $(this).attr("timer");
    if (!this.parent().size()){
      clearInterval(timer);
    }
  }.bind(time_div, solver), 500));
}