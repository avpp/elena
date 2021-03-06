﻿Task23 = function(){
  this.generate_input = function(base) {
    base = $(base);
    base = $("<div id=\"task\"></div>").appendTo($(base));
    
    $("<p></p>").appendTo(base).text("Найти количество решений системы логических уравнений:");
    var control_btns = $("<div></div>").appendTo(base);
    $("<button></button>").appendTo(control_btns).text("Очистить всё").click(function(){
      if (confirm("Вы уверены, что хотите очистить поле ввода?"))
        $(this).parents("div#task").find("textarea").val("");
    });
    $("<button></button>").appendTo(control_btns).text("Деактивировать").data("active", true).click(function(){
      var r = null;
      $(this).data("active", r = !$(this).data("active"));
      var ta = $($(this).parents("div#task").find("textarea"));
      $(this).text((r)?"Деактивировать":"Активировать");
      if (!r) {
        ta.attr("disabled", true);
      } else {
        ta.removeAttr("disabled");
      }
    });
    
    var copy_control = $("<table></table>").appendTo(base);
    var tr = $("<tr></tr>").appendTo(copy_control);
    var td = $("<td></td>").appendTo(tr);
    $("<label></label>").appendTo(td).text("Копировать строку № ");
    var td = $("<td></td>").appendTo(tr);
    $("<input name=\"s_num\" type=\"number\" min=1></input>").appendTo(td).val("1");
    tr = $("<tr></tr>").appendTo(copy_control);
    td = $("<td></td>").appendTo(tr);
    $("<label></label>").appendTo(td).text(" со сдвигом на ");
    td = $("<td></td>").appendTo(tr);
    $("<input name=\"shift\" type=\"number\" min=-50 max=50></input>").appendTo(td).val("1");
    tr = $("<tr></tr>").appendTo(copy_control);
    td = $("<td></td>").appendTo(tr);
    $("<input type=\"radio\" name=\"shift_type\" checked></input>").appendTo(td).val("char");
    $("<label></label>").appendTo(td).text("названия /");
    td = $("<td></td>").appendTo(tr);
    $("<input type=\"radio\" name=\"shift_type\"></input>").appendTo(td).val("num");
    $("<label></label>").appendTo(td).text("номера ");
    tr = $("<tr></tr>").appendTo(copy_control);
    td = $("<td></td>").appendTo(tr);
    $("<input name=\"copy\" type=\"number\" min=1></input>").appendTo(td).val("1");
    $("<label></label>").appendTo(td).text(" раз(а).");
    td = $("<td></td>").appendTo(tr);
    $("<button></button>").appendTo(td).text("Применить").click(function(){
      var p = $(this).parents("table");
      var s_num = +p.find("input[name=s_num]").val();
      var shift = +p.find("input[name=shift]").val();
      var copy = +p.find("input[name=copy]").val();
      var type = p.find("input:checked").val();
      
      var text_el = p.parents("div#task").find("textarea")
      var text = text_el.val();
      var lines = text.split(/[\n\r]+/).filter(function(e){return e});
      if (s_num > lines.length) {
        alert("Нет такой строки.");
        return;
      }
      var line = lines[s_num-1];
      for (var i = 0; i < copy; i++) {
        line = line.replace(/([A-Za-z_]+)([0-9]*)/g, function(type, shift, str, text_part, num_part, offset, s){
          if (type=="char") {
            var old_char = text_part.charCodeAt(0);
            var start_d = "a", stop_d = "z";
            if (text_part.charAt(0) > "A".charAt(0) && text_part.charAt(0) < "Z".charAt(0)) {
              start_d = "A"; stop_d = "Z";
            } else if (text_part.charAt(0).toString() == "_")
              start_d = stop_d = "_";
            var delta = (stop_d.charCodeAt(0) - start_d.charCodeAt(0) + 1);
            var newChar = String.fromCharCode(start_d.charCodeAt(0) + ((delta + shift + old_char - start_d.charCodeAt(0)) % delta));
            return newChar + text_part.substr(1) + num_part;
          } else {
            var num = 0;
            if (num_part != "")
              num = +num_part;
            num = (num + shift + 100) % 100;
            return text_part + num.toString();
          }
        }.bind(this,type, shift));
        text_el.val(text_el.val() + "\n" + line);
      }
    });
    $("<button></button>").appendTo(base).text("<---").click(function(){
      var el = $(this).parents("div#task").find("textarea");
      var s = el.selection('getPos').start;
      if (s > 0) {
        el.selection('setPos', {start: s-1, end: s});
        el.selection('replace', {text: ""});
      }
    });
    
    $("<br>").appendTo(base);
    var input = $("<textarea rows=5 cols=50></textarea>").appendTo(base);
    var input_to_area = function(){
      var el = $($(this).parents("div#task").find("textarea").first());
      var value = $(this).data("helper");
      el.selection('insert', {text: value});
      var new_pos = (el.selection('getPos').start+value.length);
      el.selection('setPos', {start: new_pos, end: new_pos});
      return false;
    }
    /*input helper*/
    var input_helper = $("<div></div>").appendTo(base);
    $("<button></button>").appendTo(input_helper).text("(").addClass("input-helper").data("helper", "(");
    $("<button></button>").appendTo(input_helper).text(")").addClass("input-helper").data("helper", ")");
    $("<button></button>").appendTo(input_helper).text("False, 0").addClass("input-helper").data("helper", "0");
    $("<button></button>").appendTo(input_helper).text("True, 1").addClass("input-helper").data("helper", "1");
    $("<button></button>").appendTo(input_helper).text("New line").addClass("input-helper").data("helper", "\n");
    $("<br>").appendTo(input_helper);
    $("<button></button>").appendTo(input_helper).text("And, *, &, /\\").addClass("input-helper").data("helper", "/\\");
    $("<button></button>").appendTo(input_helper).text("Or, +, |, \\/").addClass("input-helper").data("helper", "\\/");
    $("<button></button>").appendTo(input_helper).text("Not, !, ¬").addClass("input-helper").data("helper", "-");
    $("<br>").appendTo(input_helper);
    $("<button></button>").appendTo(input_helper).text("Conseq, ->, =>").addClass("input-helper").data("helper", "->");
    $("<button></button>").appendTo(input_helper).text("Equal, =, ==").addClass("input-helper").data("helper", "=");
    $("<br>").appendTo(input_helper);
    $("<label></label>").appendTo(input_helper).text("Переменные: ");
    $("<br>").appendTo(input_helper);
    $("<button></button>").appendTo(input_helper).text("Предыдущая").click(function(){
      var el = $(this).next();
      var v = el.val();
      if (v[0].toString() == "a")
        v = "z";
      else
        v = String.fromCharCode(v.charCodeAt(0)-1);
      el.val(v);
      el.change();
    });
    var v_input = $("<input type=\"text\" size=4></input>").appendTo(input_helper).val("x").change(function(){
      var el = $(this).next().next();
      el.empty();
      for (var i = 1; i <= 10; i++) {
        $("<button></button>").appendTo(el).text($(this).val().toString() + i).addClass("input-helper").data("helper", $(this).val().toString() + i).click(input_to_area);
        if (i % 5 == 0)
          $("<br>").appendTo(el);
      }
    });
    $("<button></button>").appendTo(input_helper).text("Следующая").click(function(){
      var el = $(this).prev();
      var v = el.val();
      if (v[0].toString() == "z")
        v = "a";
      else
        v = String.fromCharCode(v.charCodeAt(0)+1);
      el.val(v);
      el.change();
    });
    $("<div></div>").appendTo(input_helper);
    
    $("button.input-helper").click(input_to_area);
    v_input.change();
    /*answer*/
    var solve_btn = $("<button></button>").appendTo(base).text("Решить");
    solve_btn.click(function(task)
    {
      var ans = task.solve($(this).parent().find("textarea").val());
      $(this).parent().find("span#answer:last").text("Ответ: " + ans);
      return false;
    }.bind(solve_btn, this));
    $("<br>").appendTo(base);
    var answer = $("<span id=\"answer\"></span>").appendTo(base).text("Ответ: ");
  };
  this.solve = function(text) {
    var p = new Parser();
    var r = p.solve(text);
    if (r < 0)
      return p.error_text;
    return r;
  };
};