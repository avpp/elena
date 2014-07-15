function amount_of_num(s) {
  var cnt = 0;
  var a1 = s.split(",");
  for (var i = 0; i < a1.length; i++) {
    var a2 = a1[i].split("-");
    if (a2.length == 1)
      cnt++;
    else
      cnt += Math.abs(parseInt(a2[1]) - parseInt(a2[0]))+1;
  }
  return cnt;
}

function get_by_num(s, n) {
  n = (n % amount_of_num(s)) + 1;
  var cnt = 0;
  var a1 = s.split(",");
  for (var i = 0; i < a1.length; i++) {
    var a2 = a1[i].split("-");
    if (a2.length == 1)
    {
      cnt++;
      if (n == cnt)
        return parseInt(a2[0]);
    }
    else
    {
      cnt += Math.abs(parseInt(a2[1]) - parseInt(a2[0]))+1;
      if (n <= cnt)
      {
        d = cnt - n;
        return (Math.max(parseInt(a2[0]), parseInt(a2[1])) - d);
      }
    }
  }
  return parseInt(a1[0]);
}

this.prototype.configuration = function() {
  this.config = {};
  r = prompt("Введите ограничение для значений числа", "1-10000");
  if (!(r == "" || r == null)) {
    this.config["n"]=r;
  }
  r = prompt("Введите ограничение для основания исходного числа", "2-36");
  if (!(r == "" || r == null)) {
    this.config["o1"]=r;
  }
  r = prompt("Введите ограничение для основания конечного числа", "2-36");
  if (!(r == "" || r == null)) {
    this.config["o2"]=r;
  }
  return this.config;
}

this.prototype.gen_task = function() {
  o1 = o2 = 0;
  if (this.config["o1"] == null || this.config["o1"] == undefined)
    o1 = random(2, 36);
  else {
    n_o1 = random(1, amount_of_num(this.config["o1"]));
    o1 = get_by_num(this.config["o1"], n_o1);
  }
  
  if (o1 < 2 || o1 > 36)
    o1 = 2;
  
  if (this.config["o2"] == null || this.config["o2"] == undefined)
    do
      o2 = random(2, 36);
    while (o1 == o2);
  else {
    a_o2 = amount_of_num(this.config["o2"]);
    if (a_o2 == 1)
      o2 = get_by_num(this.config["o2"], 1)
    else {
      do {
        n_o2 = random(1, a_o2);
        o2 = get_by_num(this.config["o2"], n_o2);
      }
      while (o1 == o2);
    }
  }
  if (o2 < 2 || o2 > 36)
    o2 = 2;
  
  if (this.config["n"] == null || this.config["n"] == undefined)
    n1 = random(1, 10000);
  else {
    n1_n = random(1, amount_of_num(this.config["n"]));
    n1 = get_by_num(this.config["n"], n1_n);
  }
  if (n1 < 1)
    n1 = random(1, 10000);
  return {"o1":o1, "o2":o2, "n1":n1};
}

this.prototype.gen_form = function(t) {
  el = document.createElement("div");
  el.id = t.o1.toString() + t.o2.toString() + t.n1.toString();
  tsk_el = document.createElement("div");
  tsk_el.innerHTML = "Определите основание позиционный системы счисления";
  n1_el = document.createElement("span");
  n1_el.innerHTML = t.n1.toString(t.o1);
  o1_el = document.createElement("sub");
  o1_el.innerHTML = t.o1.toString();
  n2_el = document.createElement("span");
  n2_el.innerHTML = t.n1.toString(t.o2);
  
  eq_el = document.createElement("span");
  eq_el.innerHTML = " = ";
  
  ans_el = document.createElement("input");
  ans_el.id = "answer";
  ans_el.type = "text";
  
  sub_ans = document.createElement("sub");
  sub_ans.appendChild(ans_el);
  
  el.appendChild(tsk_el);
  el.appendChild(n1_el);
  el.appendChild(o1_el);
  el.appendChild(eq_el);
  el.appendChild(n2_el);
  el.appendChild(sub_ans);
  
  return el;
}

this.prototype.get_ans_from_form = function(task, form) {
  task.answer = $("#"+form.id+" #answer").val();
  return task;
}

this.prototype.check = function (task) {
  rslt=parseInt(task.answer, 10);
  return parseInt(task.n1.toString(task.o2), rslt) == task.n1;
}

this.prototype.get_table_header = function() {
  el = document.createElement("tr");
  c = document.createElement("th");
  c.innerHTML = "Исходное задание";
  el.appendChild(c);
  c = document.createElement("th");
  c.innerHTML = "Ваш ответ";
  el.appendChild(c);
  c = document.createElement("th");
  c.innerHTML = "Правильное решение";
  el.appendChild(c);
  c = document.createElement("th");
  c.innerHTML = "Результат";
  el.appendChild(c);
  return el;
}

this.prototype.get_task_table_view = function(task) {
  el = document.createElement("tr");
  c = document.createElement("td");
  c.innerHTML = task.n1.toString(task.o1) + "<sub>" + task.o1 + "</sub> = " + task.n1.toString(task.o2) + "<sub>?</sub>";
  el.appendChild(c);
  c = document.createElement("td");
  c.innerHTML = task.answer;
  el.appendChild(c);
  c = document.createElement("td");
  c.innerHTML = task.o2;
  el.appendChild(c);
  c = document.createElement("td");
  c.innerHTML = (task.result)?"Верно":"Не верно";
  el.appendChild(c);
  return el;
}

