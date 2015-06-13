Task12 = function(){
  this.generate_input = function(base) {
    base = $(base);
    base = $("<div id=\"task\"></div>").appendTo($(base));
    $("<p></p>").appendTo(base).text("Имеется IP адрес узла и маска/IP адрес сети. Вычислить оставшуюся составляющую.");
    var t = $("<table></table>").appendTo(base);
    var row_names = ["IP адрес узла", "Маска", "IP адрес сети"];
    for (var i = 0; i < 3; i++) {
      var row = $("<tr></tr>").appendTo(t).data("line", i);
      $("<td></td>").appendTo(row).text(row_names[i]);
      for (var j = 0; j < 4; j++) {
        var td = $("<td></td>").appendTo(row);
        $("<input type=\"number\" min=0 max=255></input>").appendTo(td).val(0).attr("byte", j);
      }
    }
    $("<button></button>").appendTo(base).text("Вычислить адрес сети").click(function(t) {
      var ip_addr = t.find("tr").first();
      var mask = t.find("tr").first().next();
      var ip_net = t.find("tr").last();
      for (var i = 0; i < 4; i++) {
        var ip_byte = ip_addr.find("input[byte="+i.toString()+"]").val();
        var mask_byte = mask.find("input[byte="+i.toString()+"]").val();
        if (ip_byte && mask_byte && ip_byte != "" && mask_byte != "") {
          var res = (+ip_byte) & (+mask_byte);
          ip_net.find("input[byte="+i.toString()+"]").val(res);
        }
      }
    }.bind(undefined, t));
    $("<button></button>").appendTo(base).text("Вычислить маску").click(function(t) {
      var ip_addr = t.find("tr").first();
      var mask = t.find("tr").first().next();
      var ip_net = t.find("tr").last();
      var result = 0xFFFFFFFF;
      var total_ip = 0;
      var total_net = 0;
      for (var i = 0; i < 4; i++) {
        var ip_byte = ip_addr.find("input[byte="+i.toString()+"]").val();
        var ip_net_byte = ip_net.find("input[byte="+i.toString()+"]").val();
        if (ip_byte && ip_byte != "")
          ip_byte = (+ip_byte);
        else
          ip_byte = 0;
        if (ip_net_byte && ip_net_byte != "")
          ip_net_byte = (+ip_net_byte);
        else
          ip_net_byte = 0;
        
        total_ip = (total_ip << 8) | (ip_byte & 255);
        total_net = (total_net << 8) | (ip_net_byte & 255);
      }
      var answer = 0;
      for (; answer != -1; answer = (answer>>1)|(0x80000000)) {
        if ((total_ip & answer) == total_net)
          break;
      }
      if ((total_ip & answer) != total_net)
        return;
      for (var i = 3; i >= 0; i--) {
        mask.find("input[byte="+i.toString()+"]").val((answer>>(8*(3-i))) & 0xFF);
      }
    }.bind(undefined, t));
  };
  this.solve = function(text) {
    var p = new Parser();
    var r = p.solve(text);
    if (r < 0)
      return p.error_text;
    return r;
  };
};