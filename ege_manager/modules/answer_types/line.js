if (! AnswerTypes)
  var AnswerTypes = {};
AnswerTypes.line = {
  "solve": function(where, ans, active) {
    where = $(where);
    var ans_place = $("<div></div>").appendTo(where).addClass("form-inline");
    ans_place.data("answer", ans);
    $("<br/>").appendTo(ans_place);
    $("<label></label>").appendTo(ans_place).text("Вопрос №"+ans.descr.name+" ");
    $("<span>&nbsp;&nbsp;&nbsp;</span>").appendTo(ans_place);
    $("<input type=\"text\"/>").appendTo(ans_place).addClass("form-control").val(ans.descr.value).on("input", function(){
      $(this).find("a").click();
    }.bind(ans_place));
    $("<span></span>").appendTo(ans_place).html("&nbsp&nbsp&nbsp");
    if (active)
      $("<a></a>").appendTo(ans_place).addClass("btn btn-success").text("Ответить").click(function(){
        var ans = $(this).find("input:text").val();
        $(this).data("answer").answer(ans);
      }.bind(ans_place));
    else
      ans_place.find("input").attr("disabled", true);
  },
  "check": function(where, ans) {
    where = $(where);
    var ans_place = $("<div></div>").appendTo(where).addClass("form-inline");
    ans_place.data("answer", ans);
    $("<br/>").appendTo(ans_place);
    $("<label></label>").appendTo(ans_place).text("Ответ на вопрос №"+ans.descr.name+": ");
    $("<span>&nbsp;&nbsp;&nbsp;</span>").appendTo(ans_place);
    $("<input type=\"text\"/>").appendTo(ans_place).addClass("form-control").val(ans.descr.value).attr("disabled", true);
    $("<span>&nbsp;&nbsp;&nbsp;</span>").appendTo(ans_place);
    var mark_input = $("<input type=\"range\"/>").appendTo(ans_place).addClass("form-control").val(ans.descr.mark);
    $("<span></span>").appendTo(ans_place).html("&nbsp;&nbsp;&nbsp;");
    mark_input.attr("min", 0);
    mark_input.attr("max", ans.descr.max_mark);
    mark_input.val(ans.descr.mark);
    var show_mark = $("<span></span>").appendTo(ans_place);
    mark_input.on("input", function(sm){
      sm.text($(this).val().toString() + "/" + $(this).parent().data("answer").descr.max_mark.toString());
      $(this).parent().data("answer").mark($(this).val());
    }.bind(mark_input, show_mark));
    mark_input.trigger("input");
  }
}