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
    
    var lw = this.getAllWorks();
    if (lw.length === 0)
      lw = null;
    else {
      lw = "work_" + lw[lw.length-1].start_at.toString();
    }
    var olw = lw;
    if (olw != null)
      if (!(olw.end_at === null || olw.end_at === undefined))
        olw = null;
  
    if (this && this.constructor === WorkManager_singletone) {
			instance = this;
		} else {
			return new WorkManager_singletone();
		}
  }
}());