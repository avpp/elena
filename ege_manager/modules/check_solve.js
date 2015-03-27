function check_solve(header, content_area, solver){
  if (solver.status != "stop") {
    alert("Вы не можете проверить незаконченную работу");
    show_solver(header, content_area, solver);
    return;
  }
  header = $(header);
  header.text("Проверка работы \"" + solver.comment + "\"");
  content_area = $(content_area);
  content_area.empty();
  
  var solve_area = $("<div></div>").appendTo(content_area);
  solver.show(solve_area, "check");
  $("</br>").appendTo(content_area);
  $("<a></a>").appendTo(content_area).text("Завершить проверку").addClass("btn btn-success").click(function(h, ca, s){
    loader.afterload("show_result", function(header, solver){
      show_result(h, this, solver);
    }.bind(ca, h, s))
  }.bind(undefined, header, content_area, solver));
}