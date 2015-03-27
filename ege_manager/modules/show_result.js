function show_result(header, content_area, solver) {
  header = $(header);
  header.text("Результаты теста \"" + solver.comment + "\"");
  content_area = $(content_area);
  content_area.empty();
  var back_btn = $("<a></a>").appendTo(content_area).addClass("btn btn-default").text("Назад");
  back_btn.click(function(h, ca, s){
    choose_year_and_subject(h, ca, s);
  }.bind(back_btn, header, content_area, solver));
  $("<br/><br/>").appendTo(content_area);
  var total_div = $("<div></div>").appendTo(content_area);
  $("<label></label>").appendTo(total_div).text("Результат выполнения теса: ");
  var total = {max_mark: 0, mark: 0}
  solver.answers.forEach(function(a){this.max_mark += (a.descr.max_mark || 0); this.mark += (a.descr.mark || 0);}.bind(total));
  $("<span>&nbsp;&nbsp;</span>").appendTo(total_div);
  $("<span></span>").appendTo(total_div).text(total.mark.toString() + "/" + total.max_mark.toString());
  
  var stat_table = $("<table></table>").appendTo(content_area).addClass("table");
  var stat_table_h = $("<thead></thead>").appendTo(stat_table);
  var hrow = $("<tr></tr>").appendTo(stat_table_h);
  $("<th></th>").appendTo(hrow).text("№");
  $("<th></th>").appendTo(hrow).text("Результат");
  $("<th></th>").appendTo(hrow).text("Потраченное время");
  var stat_table_b = $("<tbody></tbody>").appendTo(stat_table);
  
  solver.answers.forEach(function(a){
    var row = $("<tr></tr>").appendTo($(this));
    $("<td></td>").appendTo(row).text(a.descr.name);
    $("<td></td>").appendTo(row).text(""+a.descr.mark+"/"+a.descr.max_mark).addClass((a.descr.mark == 0)?"danger":(a.descr.mark==a.descr.max_mark)?"success":"warning");
    var st = new Date(a.descr.solve_time);
    var et = new Date(a.descr.est_time*1000);
    $("<td></td>").appendTo(row).text((a.descr.solve_time < 0)?"Не решался":(""+(st.getUTCHours()*60 + st.getUTCMinutes()) + ":" + String("00"+st.getUTCSeconds()).slice(-2) + "/" + (et.getUTCHours()*60 + et.getUTCMinutes()) + ":" + String("00"+et.getUTCSeconds()).slice(-2))).addClass((a.descr.solve_time < 0)?"info":(a.descr.solve_time <= a.descr.est_time*1000)?"success":"warning");
  }.bind(stat_table_b));

}