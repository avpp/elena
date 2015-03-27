function choose_year_and_subject(header, content_area, solver){
  header = $(header);
  header.text("Выбор предмета");
  content_area = $(content_area);
  content_area.empty();
  var input_area = $("<div></div>").appendTo(content_area).addClass("form-group");
  var year_input = $("<p></p>").appendTo(input_area);
  $("<label></label>").appendTo(year_input).text("Выберите интересующий Вас год:");
  $("<br/>").appendTo(year_input);
  var choose_year = $("<select></select>").appendTo(year_input);
  choose_year.id = "year";
  choose_year.addClass("form-control");
  
  var subj_input = $("<p></p>").appendTo(input_area);
  $("<label></label>").appendTo(subj_input).text("Выберите интересующий Вас предмет:");
  $("<br/>").appendTo(subj_input);
  choose_subj = $("<select></select>").appendTo(subj_input);
  choose_subj.id = "subj";
  choose_subj.addClass("form-control");
  
  var exist_list = $("<div></div>").appendTo(input_area);
  
  choose_subj.change(function(cy, el_area){
    el_area = $(el_area);
    el_area.empty();
    var table = $("<table></table>").appendTo(el_area).addClass("table");
    var thead = $("<thead></thead>").appendTo(table);
    $("<th></th>").appendTo(thead).text("Время создания");
    $("<th></th>").appendTo(thead).text("Комментарий");
    $("<th colspan=3></th>").appendTo(thead).text("Действия");
    $("<th></th>").appendTo(thead).text("Удалить");
    var tbody = $("<tbody></tbody>").appendTo(table);
    var subj = $(this).val();
    var year = $(cy).val();
    var key_array = [];
    for (var i = 0; i < localStorage.length; i++) {
      key_array.push(localStorage.key(i));
    }
    key_array = key_array.sort().reverse();
    for (var i = 0; i < key_array.length; i++) {
      var k = key_array[i];
      if (k.startsWith(year.toString()+"_"+subj.toString()+"_")) {
        var s = Solver.load(k);
        if (s.status != "stop")
          s.pause();
        var row = $("<tr></tr>").appendTo(tbody);
        row.data("solver", s);
        $("<td></td>").appendTo(row).text((new Date(s.create_date)).toLocaleString());
        $("<td></td>").appendTo(row).text(s.comment);
        var continue_btn = $("<a></a>").appendTo($("<td></td>").appendTo(row)).text("Продолжить").addClass("btn btn-info").click(function(h, c, s){
          loader.afterload("show_solver", function(header, solver){
            show_solver(h, this, solver);
          }.bind(c, h, s))
        }.bind(undefined, header, content_area, s));
        if (s.status == "stop")
          continue_btn.hide();
        var show_result_btn = $("<a></a>").appendTo($("<td></td>").appendTo(row)).text("Результаты").addClass("btn btn-success").click(function(h, c, s) {
          loader.afterload("show_result", function(header, solver){
            show_result(h, this, solver);
          }.bind(c, h, s))
        }.bind(undefined, header, content_area, s));
        var check_btn = $("<a></a>").appendTo($("<td></td>").appendTo(row)).text("Проверить").addClass("btn btn-warning").click(function(h, c, s){
          loader.afterload("check_solve", function(header, solver){
            check_solve(h, this, solver);
          }.bind(c, h, s))
        }.bind(undefined, header, content_area, s));
        if (s.status != "stop") {
          check_btn.hide();
          show_result_btn.hide();
        }
        $("<a></a>").appendTo($("<td></td>").appendTo(row)).text("Удалить").addClass("btn btn-danger").click( function(){
          if (!confirm("Вы уверены, что хотите удалить данный тест?"))
            return;
          var r = $(this).parent().parent();
          localStorage.removeItem(r.data("solver").get_key());
          r.remove();
        });
      }
    }
  }.bind(choose_subj, choose_year, exist_list));
  $("<label></label>").appendTo(input_area).text("Комментарий: ");
  $("<span>&nbsp;&nbsp;</span>").appendTo(input_area);
  var comment_input = $("<input type=\"text\"/>").appendTo(input_area).addClass("inline-control");
  $("<span>&nbsp;&nbsp;&nbsp;</span>").appendTo(input_area);
  var next_btn = $("<a></a>").appendTo(input_area);
  next_btn.text("Новый тест");
  next_btn.addClass("btn btn-success");
  next_btn.click(function(header, cy, cs, ci){
    if (ci.val() == "") {
      alert("Укажите комментарий к создаваемому тесту.");
      return;
    }
    loader.afterload("create_solver", function(header, cy, cs, ci){
      create_solver(header, this, cy, cs, ci);
    }.bind(content_area, header, cy.val(), cs.val(), ci.val()));
  }.bind(content_area, header, choose_year, choose_subj, comment_input));
  
  choose_year.change(function(cs, s){
    cs.empty();
    var subjs = this.find("option[value="+this.val()+"]").data("subjs");
    for (var i = 0; i < subjs.length; i++) {
      var curS = $("<option></option>").appendTo(cs);
      curS.text(subjs[i].name);
      curS.val(subjs[i].code);
    }
    if ((typeof s != "undefined") && ("subject" in s))
      cs.val(s.subject)
    cs.change();
  }.bind(choose_year, choose_subj, solver));
  
  $.getJSON("subjects/list.json", function(cy, s, data, status, xhr){
    for(var i = 0; i < data.length; i++) {
      var curY = $("<option></option>").appendTo(cy);
      curY.text(data[i].name);
      curY.val(data[i].year);
      curY.data("subjs", data[i].subjs);
    }
    var now = new Date();
    var sy = now.getFullYear();
    if (now.getMonth() > 8) {
      sy++;
    }
    if ((typeof s != "undefined") && ("year" in s))
      sy = s.year
    cy.val(sy);
    cy.change();
  }.bind(undefined, choose_year, solver));
};