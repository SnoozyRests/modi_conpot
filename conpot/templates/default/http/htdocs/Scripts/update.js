$(window).load(function() {
  if ($("#dynamic_link_on").length == 0) return;
  if (url_to_update == "0") return;

  if (window == top.server_frame) {
    do_update();
  } else {
    $('<iframe id="server_frame" name="server_frame" style="width:0;height:0;top:0px;left:-2000px;position:absolute" src="/ClientArea/Dummy.mwsl"></iframe>').appendTo(document.body);
    update_on();
  }
});

var update_rate = 0;

function start_update() {
  var timer_running = 0;

  function call_update() {
    timer_running = 0;
    if (!update_rate) return;
    frames.server_frame.location.href=url_to_update;
  }

  if (update_rate && !timer_running) {
    timer_running = 1;
    setTimeout(call_update, update_rate);
  }
}

function do_update() {
  if (!parent.update_interval) return;
  top.doUpdate = 1;

  $("iframe").each(function(){
    var parent_id = this.id;
    $(".updatable[id]", $(this).contents()).each(function(){
      try { $("#"+this.id, parent.$("iframe#"+parent_id).contents()).html(this.innerHTML); } catch(e) { }
    });
  });

  $(".updatable[id]").each(function(){ parent.$("#"+this.id).html(this.innerHTML); });

  top.doUpdate = 0;
  parent.start_update();
}

function update_on() {
  $("td.Title_Area_ReloadIcon > span").hide();
  $("#dynamic_link_on").show();
  update_rate = parent.update_interval;
  start_update();
}

function update_off() {
  $("td.Title_Area_ReloadIcon > span").hide();
  $("#dynamic_link_off").show();
  update_rate = 0;
}
