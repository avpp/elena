WorkManager = (function() {
  var instance;
  return function WorkManager_singletone() {
    if (instance)
      return instance;

    this.addToLastWork = function (t) {
      if (olw == null)
        return;
      var w = JSON.parse(localStorage.getItem(olw));
      w.tasks.push(t);
      localStorage.setItem(olw, JSON.stringify(w));
    }

    this.changeLastTaskInLastWork = function(t) {
      if (olw == null)
        return;
      var w = JSON.parse(localStorage.getItem(olw));
      w.tasks[w.tasks.length-1] = t;
      localStorage.setItem(olw, JSON.stringify(w));
    }

    this.addNewWork = function(tt_name, config) {
      if (olw != null)
        throw new Error("Last work not end.");
      if (config == null)
        config = {};
      w = {"name":tt_name, "start_at":Date.now(), "tasks":[], "config":config};
      localStorage.setItem(olw = lw = ("work_"+w.start_at.toString()), JSON.stringify(w));
    }

    this.endLastWork = function() {
      if (olw == null)
        return;
      var w = JSON.parse(localStorage.getItem(olw));
      w.end_at = Date.now();
      localStorage.setItem(olw, JSON.stringify(w));
      olw = null;
    }

    this.getLastWork = function(open) {
      if (open === undefined || open === null)
        open = true;
      if (open && (olw == null))
        return;
      return JSON.parse(localStorage.getItem(lw));
    }

    this.getAllWorks = function() {
      wl = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k.startsWith("work_"))
          wl.push(JSON.parse(localStorage.getItem(k)));
      }
      return wl.sort(function(a, b){return a.start_at - b.start_at});
    }

    this.removeWorkByStartTime = function(t) {
      localStorage.removeItem("work_"+t.toString());
    }
    
    var lw = this.getAllWorks().pop();
    var olw = lw;
    if (olw === undefined || olw === null)
      olw = null;
    else if (olw.end_at == undefined || olw.end_at == null)
      olw = "work_"+olw.start_at.toString();
    else
      olw = null;
  
    if (this && this.constructor === WorkManager_singletone) {
			instance = this;
		} else {
			return new WorkManager_singletone();
		}
  }
}());