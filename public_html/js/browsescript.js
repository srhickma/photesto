function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var innav = false;
var hrv = 0;
var mvv = 0;
var newv = 0;
var hrlen = 0;
var mvlen = 0;
var newlen = 0;
var lashrm = 0;
var lasmvm = 0;
var lasnewm = 0;
var hrlim = false;
var mvlim = false;
var newlim = false;

window.onload = function(){
  addLoader();
  $('#search').keydown(function(event){
    if(event.key === "Enter" || event.key === "Return"){
      var searchString = document.getElementById("search").value;
        window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
    }
  });
  $.ajax({
      type:"GET",
      url:'/SGetBTests.php',
      success:function(resp){
          removeLoader();
          var groups = resp.split('#');
          var hrtests = groups[0].split('^');
          hrlen = hrtests.length;
          for(var i = 0; i < hrtests.length - 1; i ++){
              var params = hrtests[i].split('%');
              var names = params[4].split('$');
              var type = "Test";
              if(params[8] === "quiz")type = "Quiz";
              if(params[8] === "assignment")type = "Assignment";
              var div = document.createElement('div');
              div.id = "hrbtframe" + i;
              div.className = "btframe";
              if($(window).width() > 824)div.style.left = (382 * i) + "px";
              else div.style.left = (($(window).width() - 15) * i) + "px";
              div.name = "ts" + i;
              div.innerHTML = "" +
                "<div class='btimage' id='btimage" + i + "' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                "<div class='btdiv'>" +
                  "<div class='vertcentered'>" +
                    "<div class='tnamespot'><li class='testselectorli' id='tname" + i + "' style='font-size:24px;width:100%'>" + params[0] + "</li></div>" +
                    "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                    "<label id='tgrade' class='pointer'>Grade: " + params[3] + "</label>" +
                    "<label id='tclass' class='pointer'>Subject/Class: " + params[1] + "</label>" +
                    "<label id='tschool' class='pointer'>School: " + params[2] + "</label>" +
                  "</div>" +
                "</div>";
              document.getElementById("hrtests").appendChild(div);
              $("#hrtests").find("#hrbtframe" + i).click($.proxy(viewtest, null, hrtests[i]));
              while($("#tname" + i).outerHeight() > $("#tname" + i).parent().outerHeight()){
                  $("#tname" + i).text(function(index, text){
                      return text.replace(/\W*\s(\S)*$/, '...');
                  });
              }
          }
          var mvtests = groups[1].split('^');
          mvlen = mvtests.length;
          for(var i = 0; i < mvtests.length - 1; i ++){
              j = i + hrtests.length;
              var params = mvtests[i].split('%');
              var names = params[4].split('$');
              var type = "Test";
              if(params[8] === "quiz")type = "Quiz";
              if(params[8] === "assignment")type = "Assignment";
              var div = document.createElement('div');
              div.id = "mvbtframe" + i;
              div.className = "btframe";
              if($(window).width() > 824)div.style.left = (382 * i) + "px";
              else div.style.left = (($(window).width() - 15) * i) + "px";
              div.name = "ts" + i;
              div.innerHTML = "" +
                  "<div class='btimage' id='btimage" + i + "' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                "<div class='btdiv'>" +
                  "<div class='vertcentered'>" +
                  "<div class='tnamespot'><li class='testselectorli' id='tname" + j + "' style='font-size: 24px;width:100%'>" + params[0] + "</li></div>" +
                    "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                    "<label id='tgrade' class='pointer'>Grade: " + params[3] + "</label>" +
                    "<label id='tclass' class='pointer'>Subject/Class: " + params[1] + "</label>" +
                    "<label id='tschool' class='pointer'>School: " + params[2] + "</label>" +
                  "</div>" +
                "</div>";
              document.getElementById("mvtests").appendChild(div);
              $("#mvtests").find("#mvbtframe" + i).click($.proxy(viewtest, null, mvtests[i]));
              while($("#tname" + j).outerHeight() > $("#tname" + j).parent().outerHeight()){
                  $("#tname" + j).text(function(index, text){
                      return text.replace(/\W*\s(\S)*$/, '...');
                  });
              }
          }
          var newtests = groups[2].split('^');
          newlen = newtests.length;
          for(var i = 0; i < newtests.length - 1; i ++){
              j = i + hrtests.length + mvtests.length;
              var params = newtests[i].split('%');
              var names = params[4].split('$');
              var type = "Test";
              if(params[8] === "quiz")type = "Quiz";
              if(params[8] === "assignment")type = "Assignment";
              var div = document.createElement('div');
              div.id = "newbtframe" + i;
              div.className = "btframe";
              if($(window).width() > 824)div.style.left = (382 * i) + "px";
              else div.style.left = (($(window).width() - 15) * i) + "px";
              div.name = "ts" + i;
              div.innerHTML = "" +
                  "<div class='btimage' id='btimage" + i + "' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                "<div class='btdiv'>" +
                  "<div class='vertcentered'>" +
                  "<div class='tnamespot'><li class='testselectorli' id='tname" + j + "' style='font-size: 24px;width:100%'>" + params[0] + "</li></div>" +
                    "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                    "<label id='tgrade' class='pointer'>Grade: " + params[3] + "</label>" +
                    "<label id='tclass' class='pointer'>Subject/Class: " + params[1] + "</label>" +
                    "<label id='tschool' class='pointer'>School: " + params[2] + "</label>" +
                  "</div>" +
                "</div>";
              document.getElementById("newtests").appendChild(div);
              $("#newtests").find("#newbtframe" + i).click($.proxy(viewtest, null, newtests[i]));
              while($("#tname" + j).outerHeight() > $("#tname" + j).parent().outerHeight()){
                  $("#tname" + j).text(function(index, text){
                      return text.replace(/\W*\s(\S)*$/, '...');
                  });
              }
          }
      }
  });
  if($(window).width() < 825){
    document.getElementById("browsebtn").remove();
    document.getElementById("searchdiv").remove();
    var dropdown = document.createElement('li');
    dropdown.innerHTML = "<a id='dropbtn'style='height: 40px;padding-left: 0;padding-right: 0' onclick='dropdown()'><i class='material-icons' style='font-size: 24px;float: left'>menu</i></a>";
    document.getElementById("before").appendChild(dropdown);
  }
  $.ajax({
    type:"GET",
    url:'/SGetUser.php',
    success:function(resp){
      if(resp !== ""){
        if($(window).width() > 824){
            var postli = document.createElement('li');
            postli.innerHTML = "<a href='post.html' style='height: 40px;'><i class='material-icons' style='font-size: 24px;float: left;'>note_add</i></a>";
            document.getElementById("navbar").appendChild(postli);
            var logli = document.createElement('li');
            logli.style.float = "right";
            logli.innerHTML = "<a onclick='logout()' style='height: 40px;cursor: pointer'><i class='material-icons' style='font-size: 24px;float: left;'>power_settings_new</i></a>";
            document.getElementById("next").appendChild(logli);
            var accli = document.createElement('li');
            accli.style.float = "right";
            accli.innerHTML = "<a id='accbtn' href='account.html' style='padding: 10px 8px'><i class='material-icons' style='font-size: 24px;float: left'>perm_identity</i><p id='accp'>" + resp + "</p></a>";
            document.getElementById("next").appendChild(accli);
        }
        else{
          var postli = document.createElement('li');
          postli.style.width = "100%";
          postli.innerHTML = "<a href='post.html' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left'><i class='material-icons' style='font-size: 24px;float: left;'>note_add</i></a>";
          document.getElementById("navpane").appendChild(postli);
          var accli = document.createElement('li');
          accli.style.width = "100%";
          accli.innerHTML = "<a id='accbtn' href='account.html' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'><i class='material-icons' style='font-size: 24px;float: left'>perm_identity</i>" + resp + "</a>";
          document.getElementById("navpane").appendChild(accli);
          var logli = document.createElement('li');
          logli.style.width = "100%";
          logli.innerHTML = "<a onclick='logout()' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'><i class='material-icons' style='font-size: 24px;float: left;'>power_settings_new</i></a>";
          document.getElementById("navpane").appendChild(logli);
        }
      }
      else{
        if($(window).width() > 824){
          var sinli = document.createElement('li');
          sinli.style.float = "right";
          sinli.innerHTML = "<a id='accbtn' href='login.html' style='padding: 10px 8px'><p style='margin: 2px 0'>Sign In</p></a>";
          document.getElementById("next").appendChild(sinli);
        }
        else{
          var sinli = document.createElement('li');
          sinli.style.width = "100%";
          sinli.innerHTML = "<a id='accbtn' href='login.html' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'>Sign In</a>";
          document.getElementById("navpane").appendChild(sinli);
        }
      }
    }
  });
    fixfooter();
};

function hrback(){
  if(hrv > 0){
    if($(window).width() < 825)lashrm = $(window).width() - 15;
    for(var i = 0; i < hrlen; i ++){
      $("#hrbtframe" + i).animate({
        'left' : "+=" + lashrm + "px"
      });
    }
    hrv --;
    lashrm = 382;
    hrlim = false;
  }
}

function hrnext(){
  if(hrv < hrlen - 2 && $("#hrbtframe" + (hrlen - 2)).position().left + 366 > $("#hrtests").width() && !hrlim){
    var amt = 382;
    if($(window).width() < 825)amt = $(window).width() - 15;
    else{
      hrlim = true;
      if($("#hrbtframe" + (hrlen - 2)).position().left < $("#hrtests").width() && $(window).width() > 824)amt = $("#hrbtframe" + (hrlen - 2)).position().left + 366 - $("#hrtests").width();
    }
    for(var i = 0; i < hrlen; i ++){
      $("#hrbtframe" + i).animate({
        'left' : "-=" + amt + "px"
      },{complete: function(){
        hrlim = false;
      }});
    }
    hrv ++;
    lashrm = amt;
  }
}

function mvback(){
  if(mvv > 0){
    if($(window).width() < 825)lasmvm = $(window).width() - 15;
    for(var i = 0; i < mvlen; i ++){
      $("#mvbtframe" + i).animate({
        'left' : "+=" + lasmvm + "px"
      });
    }
    mvv --;
    lasmvm = 382;
    mvlim = false;
  }
}

function mvnext(){
  if(mvv < mvlen - 2 && $("#mvbtframe" + (mvlen - 2)).position().left + 366 > $("#hrtests").width() && !mvlim){
    var amt = 382;
    if($(window).width() < 825)amt = $(window).width() - 15;
    else{
      mvlim = true;
      if($("#mvbtframe" + (mvlen - 2)).position().left < $("#hrtests").width() && $(window).width() > 824)amt = $("#mvbtframe" + (mvlen - 2)).position().left + 366 - $("#hrtests").width();
    }
    for(var i = 0; i < mvlen; i ++){
      $("#mvbtframe" + i).animate({
        'left' : "-=" + amt + "px"
      },{complete: function(){
        mvlim = false;
      }});
    }
    mvv ++;
    lasmvm = amt;
  }
}

function newback(){
  if(newv > 0){
    if($(window).width() < 825)lasnewm = $(window).width() - 15;
    for(var i = 0; i < newlen; i ++){
      $("#newbtframe" + i).animate({
        'left' : "+=" + lasnewm + "px"
      });
    }
    newv --;
    lasnewm = 382;
    newlim = false;
  }
}

function newnext(){
  if(newv < newlen - 2 && $("#newbtframe" + (newlen - 2)).position().left + 366 > $("#hrtests").width() && !newlim){
    var amt = 382;
    if($(window).width() < 825)amt = $(window).width() - 15;
    else{
      newlim = true;
      if($("#newbtframe" + (newlen - 2)).position().left < $("#hrtests").width() && $(window).width() > 824)amt = $("#newbtframe" + (newlen - 2)).position().left + 366 - $("#hrtests").width();
    }
    for(var i = 0; i < newlen; i ++){
      $("#newbtframe" + i).animate({
        'left' : "-=" + amt + "px"
      },{complete: function(){
        newlim = false;
      }});
    }
    newv ++;
    lasnewm = amt;
  }
}

function dropdown(){
  if(innav){
    $("#navpane").animate({
        'marginLeft' : "-=100%"
    });
    innav = false;
    document.getElementById("dropbtn").style.backgroundColor = "#333";
  }
  else{
    $("#navpane").animate({
        'marginLeft' : "+=100%"
    });
    innav = true;
    document.getElementById("dropbtn").style.backgroundColor = "#3090C7";
  }
}

function search(){
    if($(window).width() > 824)var searchString = document.getElementById("search").value;
    else var searchString = document.getElementById("navsearch").value;
    window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
}

function viewtest(test){
    localStorage.setItem("viewedtest", test);
    window.location="http://photesto.space/viewtest.html?t=" + test.split('%')[4].split('$')[0];
}

function fixfooter(){
    if($(window).width() > 824){
        if($("#scrollareanp").get(0).scrollHeight === $("#scrollareanp").get(0).clientHeight){
            document.getElementById("footer").style.position = "relative";
            document.getElementById("footer").style.top = "calc(100% - " + ($(".body").height() + 54) + "px)";
        }
    }
}

function logout(){
    $.ajax({
        type:"GET",
        url:'/SSetUser.php',
        success:function(){
            window.location="http://photesto.space/login.html";
        }
    });
}

function home(){
    window.location="http://photesto.space/home.html";
}
