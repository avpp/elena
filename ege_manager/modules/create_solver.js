function create_solver(header, content_area, year, subject, comment) {
  header = $(header);
  header.text("Создание нового шаблна");
  content_area = $(content_area);
  content_area.empty();
  content_area.text("Загрузка");
  
  $.getJSON("subjects/"+year+"/"+subject+".json", function(h, y, s, c, data, status, xhr){
    var solver = new Solver(data, y, s, c);
    loader.afterload("show_solver", function(header, solver){
      show_solver(h, this, solver);
    }.bind(this, h, solver))
  }.bind(content_area, header, year, subject, comment));
}