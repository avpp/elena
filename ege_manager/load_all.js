/*function load_module(module_name) {
  $.getJSON("modules/script_list.json", function(m_n, args, data, status, xhr){
    if (m_n in data)
      $.getScript("modules/"+data[m_n].path, function(f, args){
        if (f)
          eval(f).apply(undefined, args);
      }.bind(undefined, data[m_n].func, [].slice.call(args, 1)));
  }.bind(undefined, module_name, arguments));
}
(function autoload() {
  $.getJSON("modules/script_list.json", function(data, status, xhr){
    for (var i in data) {
      if (("autoload" in data[i]) && data[i].autoload)
        $.getScript("modules/"+data[i].path);
    }
  });
})();*/

Loader = function() {
  Script = function(data) {
    this.data = data;
    this.status = null;
    this.start_loading = function() {
      this.status = "loading";
    }
    this.loaded = function() {
      this.status = "loaded";
      for (var i in this.onloaded)
        if (typeof this.onloaded[i] == "function")
          this.onloaded[i].call(this);
    }
    this.onloaded = [];
    this.onload = function(cb) {
      if (this.status != "loaded")
        this.onloaded.push(cb);
      else
        cb.call(this);
    }
  }
  this.list = {};
  this.autoload = function(dir, list) {
    $.getJSON(dir+"/"+list, function(data, status, xhr){
      for (var i in data) {
        if (("type" in data[i]) && (data[i].type == "dir"))
          this.autoload(dir + "/" + data[i].path, data[i].list || "script_list.json");
        else {
          if (!this.list[i])
            this.list[i] = new Script(data[i]);
          this.list[i].start_loading();
          $.getScript(dir+"/"+data[i].path, function(index) {
            this.list[index].loaded();
          }.bind(this, i)).fail(function(a, b, c){
            console.log("Error while loading")
            console.log(b);
            console.log(a);
          });
        }
      }
    }.bind(this));
  };
  this.afterload = function(task, cb) {
    if (!this.list[task])
      this.list[task] = new Script();
    this.list[task].onload(cb);
  }
}