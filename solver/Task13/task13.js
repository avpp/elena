Task13 = function(){
  this.generate_input = function(base) {
    base = $(base);
    base = $("<div id=\"task\"></div>").appendTo($(base));
    /* В системе хранится информация об N пользователях.
       Для каждого пользователя выделено  место под:
        * пароль, имеющий длину в Z символов и содержащий X различных символов.
          пароль кодируется посимвольно при этом каждый символ кодируется минимальным количеством бит.
        * дополнительная информация объёмом K бит/байт.
       Объём памяти, отводимый под хранение этой всей информации Q.
    */
    var p = $("<p></p>").appendTo(base);
    $("<span></span>").appendTo(p).text("В системе хранится информация об ");
    $("<input type=\"number\" name=\"N\"/>").appendTo(p).val("");
    $("<span></span>").appendTo(p).text(" пользователях.");
    p = $("<p></p>").appendTo(base);
    $("<span></span>").appendTo(p).text("Для каждого пользователя выделено одинаковое минимально возможное целое количество байт под:");
    var ul = $("<ul></ul>").appendTo(base);
    var li = $("<li></li>").appendTo(ul);
    $("<span></span>").appendTo(li).text("пароль, длиной");
    $("<input type=\"number\" name=\"Z\"/>").appendTo(li).val("");
    $("<span></span>").appendTo(li).text(" символов. Этот пароль может содержать ");
    $("<input type=\"number\" name=\"X\"/>").appendTo(li).val("");
    $("<span></span>").appendTo(li).text(" различных символов. Пароль кодируется посимвольно при этом каждый символ кодируется минимальным количеством бит.");
    var li = $("<li></li>").appendTo(ul);
    $("<span></span>").appendTo(li).text("дополнительная информация объёмом ");
    $("<input type=\"number\" name=\"K\"/>").appendTo(li).val(0);
    $("<span></span>").appendTo(li).text(" бит.");
    $("<button></button>").appendTo(li).text("Перевести в биты").click(function(){
      var e = $(this).parent().find("input[name=K]");
      e.val((+e.val())*8);
    });
    
    p = $("<p></p>").appendTo(base);
    $("<span></span>").appendTo(p).text("Объём памяти, отводимый под хранение этой всей информации ");
    $("<input type=\"number\" name=\"Q\"/>").appendTo(p).val("");
    $("<span></span>").appendTo(p).text(" байт.");
    var prepare = function(){
      var ans = {};
      ans.N = $(this).find("input[name=N]").val();
      ans.Z = $(this).find("input[name=Z]").val();
      ans.X = $(this).find("input[name=X]").val();
      ans.K = $(this).find("input[name=K]").val();
      ans.Q = $(this).find("input[name=Q]").val();
      var keys = Object.keys(ans);
      for (var i = 0; i < keys.length; i++)
        if (ans[keys[i]] && ans[keys[i]] != "")
          ans[keys[i]] = +ans[keys[i]];
        else
          ans[keys[i]] = null;
      return ans;
    }.bind(base);
    p = $("<p></p>").appendTo(base);
    $("<button></button>").appendTo(p).text("Вычислить").click(function(){
      var prep = prepare();
      console.log(prep);
      var cnt = 0;
      var null_k = null;
      var keys = Object.keys(prep);
      for (var i = 0; i < keys.length; i++ ) {
        if (prep[keys[i]] == null) {cnt++; null_k = keys[i];}
      }
      if (cnt == 0) {
        alert("Не известно, что считать");
        return;
      }
      if (cnt > 1) {
        alert("Слишком много неизвестных");
        return;
      }
      var result = 0;
      if (null_k != "X") {
        var g = 0;
        while (((prep.X-1) >> g) > 0) g++;
        prep.X = g;
      }
      switch(null_k) {
        case "N": {
          var tmp = prep.Z*prep.X + prep.K;
          if (tmp%8 == 0)
            tmp /= 8;
          else
            tmp = (tmp-tmp%8)/8 + 1;
          result = prep.Q*8/tmp;
        } break;
        case "Z": {
          result = ((prep.Q*8/prep.N) - prep.K)/prep.X;
        } break;
        case "X": {
          result = 1<<((((prep.Q*8/prep.N) - prep.K)/prep.Z)-1);
        } break;
        case "K": {
          result = (prep.Q*8/prep.N) - (prep.Z*prep.X);
        } break;
        case "Q": {
          var tmp = prep.Z*prep.X + prep.K;
          if (tmp%8 == 0)
            tmp /= 8;
          else
            tmp = (tmp-tmp%8)/8 + 1;
          result = tmp*prep.N;
        } break;
      }
      $(this).find("input[name="+null_k+"]").val(result);
    }.bind(base));
  };
};