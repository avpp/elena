function addToLastWork(t) {
  wl = $.cookie("workList");
  if (wl == null || wl == undefined)
    return;
  wl = JSON.parse(wl);
  wl[wl.length-1].tasks.push(t);
  $.cookie("workList", JSON.stringify(wl));
}

function changeLastTaskInLastWork(t) {
  wl = $.cookie("workList");
  if (wl == null || wl == undefined)
    return;
  wl = JSON.parse(wl);
  wl[wl.length-1].tasks[wl[wl.length-1].tasks.length-1] = t;
  $.cookie("workList", JSON.stringify(wl));
}

function addNewWork(tt_name, config) {
  wl = $.cookie("workList");
  if (wl == null || wl == undefined)
    wl = [];
  else
    wl = JSON.parse(wl);
  if (config == null)
    config = {};
  w = {"name":tt_name, "start_at":Date.now(), "tasks":[], "config":config};
  wl.push(w);
  $.cookie("workList", JSON.stringify(wl));
}

function endLastWork() {
  wl = $.cookie("workList");
  if (wl == null || wl == undefined)
    return;
  wl = JSON.parse(wl);
  wl[wl.length-1].end_at=Date.now();
  $.cookie("workList", JSON.stringify(wl));
}

function getLastWork() {
  wl = $.cookie("workList");
  if (wl == null || wl == undefined)
    return null;
  wl = JSON.parse(wl);
  return wl[wl.length-1];
}