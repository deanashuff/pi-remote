// Set the current tab via CSS
var setTab = function(tab) {
  if (!tab) { return; }
  var ltab = tab.toLowerCase();
  var btn = $("#tabBar li a[href='#" + ltab + "']");
  $("#tabBar li").removeClass("active");
  btn.parents("li").addClass("active");
  $(".remote-screen:not(.always)").addClass("hidden");
  $("#"+ltab).removeClass("hidden");
  document.title = "Remote - "+tab;
  localStorage.setItem('tab', tab);
};

var changeTab = function(event) {
  event.preventDefault()
  var tab = $(this).text().trim();
  setTab(tab);
};

$("#tabBar a").bind("click touchstart",changeTab)

// Handler for all anchors/buttons
var submitButton = function(event) {
  var $this = $(this);
  $this.addClass("active");
  $.ajax({
    url: $(this).attr("href"),
    timeout: 3000,
    error: function(xhr, status, thrown) {
        alert(status);
    }
  }).done(function(data) {
	console.log(data);
	console.log($this);
	$this.removeClass("active");
  });
  event.preventDefault()
  return false;
};

var pr = {};
pr.timer = null;
pr.reset = function () {
  if (pr.timer) {
    clearInterval(pr.timer);
    pr.timer = null;
  }
}
$("#timer_button").click(function() {
  pr.reset();
  function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
  }
  var start = + new Date();
  pr.timer = setInterval(function() {
    var now = + new Date();
    var diff = Math.round((now - start)/1000);
    if (diff > 300) {
      diff = 0;
      pr.reset();
    }
    var mins = Math.floor(diff/60);
    var secs = diff % 60;
    $("#timer").text(pad(mins,2)+':'+pad(secs,2));
  }, 1000);
});

/**
 * Converts :hover CSS to :active CSS on mobile devices.
 * Otherwise, when tapping a button on a mobile device, the button stays in
 * the :hover state until the button is pressed. 
 *
 * Inspired by: https://gist.github.com/rcmachado/7303143
 * @author  Michael Vartan <michael@mvartan.com>
 * @version 1.0 
 * @date    2014-12-20
 */
function hoverTouchUnstick() {
  // Check if the device supports touch events
  if('ontouchstart' in document.documentElement) {
    // Loop through each stylesheet
    for(var sheetIndex = document.styleSheets.length - 1; sheetIndex >= 0; sheetIndex--) {
      var sheet = document.styleSheets[sheetIndex];
      // Verify if cssRules exists in sheet
      try { rules = sheet.cssRules; }
      catch { rules = false; }
      if(rules) {
        // Loop through each rule in sheet
        for(var ruleIndex = sheet.cssRules.length - 1; ruleIndex >= 0; ruleIndex--) {
          var rule = sheet.cssRules[ruleIndex];
          // Verify rule has selector text
          if(rule.selectorText) {
            // Replace hover psuedo-class with active psuedo-class
            rule.selectorText = rule.selectorText.replace(":hover", ":active");
          }
        }
      }
    }
  }
}
hoverTouchUnstick();

/*
var sendKey = function(remote_name, key_name) {
  document.body.style.opacity = "0.5";

  $.ajax({
    url: "/send/"+remote_name+"/"+key_name,
  }).done(function(data) {
    console.log(data);
    document.body.style.opacity="1"
  });  
}

$("#type").bind('change input',function(event) {
  var $this = $(this);
  var text = this.value;
  var deviceName = "vizio";
  //console.log("\""+text+"\"")
  $this.val("");
  var placeHolderText = $this.attr("placeholder");
  if(placeHolderText === "Type here") placeHolderText = "";
  if(text === "") text = " ";
  $this.removeClass("text-center").addClass("text-right")
  if(placeHolderText.length>30)
    placeHolderText = placeHolderText.substring(1);
  $this.attr("placeholder",placeHolderText+text)
  if(text.length>0) {
    switch(text) {
      case " ":
        text = "SPACE";
        deviceName = "vizio_2";
        break;
      case ".":
        text = "DOT";
        break;
      case "/":
        text = "SLASH";
        break;
    }
    sendKey(deviceName, text.toUpperCase())
  }

  //console.log(text)
})
$("#type").bind('keyup', function(event) {
  var keyName = "";
  $type = $("#type");
  placeHolderText = $type.attr("placeholder");
  switch(event.which) {
    case 8:
      keyName = "BACKSPACE";
      if(placeHolderText.length>0)
        $type.attr("placeholder", placeHolderText.substr(0,placeHolderText.length-1));
      break;
    case 13:
      keyName = "ENTER";
      $type.attr("placeholder", "");
      break;

    default: return;
  }
  sendKey("vizio", keyName);
})
*/
setTimeout(function () {
  setTab(localStorage.getItem('tab'));
  window.scrollTo(0, 1);
  $(".remote-screen a").click(submitButton);
}, 1);
