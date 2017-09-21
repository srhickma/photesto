function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var viewed = 0;
var names = null;
var paths = null;
var goodRate = true;
var goodSave = true;
var params = null;
var lin = true;
var innav = false;
var ininfo = false;
var inzoom = false;
var zoomlvl = 1;
var sliding = false;
if($(window).width() < 825){
    document.getElementById("browsebtn").remove();
    document.getElementById("searchdiv").remove();
    document.getElementById("tinfo").remove();
}

window.onload = function(){
    if($(window).width() < 825){
        var dropdown = document.createElement('li');
        dropdown.innerHTML = "<a id='dropbtn' style='height: 40px;padding-left: 0;padding-right: 0' onclick='dropdown()'><i class='material-icons' style='font-size: 24px;float: left'>menu</i></a>";
        document.getElementById("before").appendChild(dropdown);
        var info = document.createElement('li');
        info.innerHTML = "<a id='infobtn' style='height: 40px;padding-left: 0;padding-right: 0' onclick='info()'><i class='material-icons' style='font-size: 24px;float: left'>info_outline</i></a>";
        document.getElementById("next").appendChild(info);
    }
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var testS = vars[0].split("=")[1];
    var test = localStorage.getItem("viewedtest");
    if(test === null && testS === null)window.location="http://photesto.space/home.html";
    else if(test === null || (test.split('%')[4].split('$')[0] !== testS && testS !== null)){
        $.ajax({
            type:"GET",
            url:'/SGetTest.php',
            data:{path:testS},
            success:function(resp){
                if(resp !== "")init(resp);
                else window.location="http://photesto.space/home.html";
            }
        });
    }
    else init(test);
};

function init(test){
    params = test.split('%');
    names = params[4].split('$');
    paths = new Array(names.length);
    var type = "Test: ";
    if(params[8] === "quiz")type = "Quiz: ";
    if(params[8] === "assignment")type = "Assignment: "
    document.title = type + params[0];
    document.getElementById("tname").innerHTML = type + params[0] + " <lk id='savebtn' onclick='saveTest()'>Save</lk>";
    document.getElementById("tclass").innerHTML += params[1];
    document.getElementById("tschool").innerHTML += params[2];
    document.getElementById("tgrade").innerHTML += params[3];
    document.getElementById("tusr").innerHTML += params[5];
    document.getElementById("tviews").innerHTML = params[6] + " Views";
    if(names.length < 2)document.getElementById("nextbtn").style.opacity = "0";
    document.getElementById("backbtn").style.opacity = "0";
    updateRating(params[7]);
    $.ajax({
        type:"GET",
        url:'/SGetUser.php',
        success:function(resp){
            if(resp !== ""){
                document.getElementById("rdnbtn").style.opacity = "1";
                document.getElementById("rupbtn").style.opacity = "1";
                document.getElementById("savebtn").style.opacity = "1";
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
                $.ajax({
                    type:"GET",
                    url:'/SRateSave.php',
                    data:{path:names[0]},
                    success:function(r){
                        if(r.split(' ')[0] === "1")goodRate = true;
                        else{
                            goodRate = false;
                            document.getElementById("rupbtn").style.opacity = "0.25";
                            document.getElementById("rdnbtn").style.opacity = "0.25";
                        }
                        if(r.split(' ')[1] === "1")goodSave = true;
                        else{
                            goodSave = false;
                            document.getElementById("savebtn").remove();
                            document.getElementById("tname").innerHTML += "  <em>Saved</em>";
                        }
                    }
                });
            }
            else{
                document.getElementById("rdnbtn").remove();
                document.getElementById("rupbtn").remove();
                document.getElementById("savebtn").remove();
                if($(window).width() > 824){
                    var sinli = document.createElement('li');
      	            sinli.style.float = "right";
      	            sinli.innerHTML = "<a href='login.html' style='padding: 10px 8px'><p style='margin: 2px 0;'>Sign In</p></a>";
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
    document.getElementById("innerimage0").style.backgroundImage = 'url(\"http://www.i.photesto.space/lrg/' + names[0] + '$0.png\")';
    for(var i = 1; i < parseInt(names[1]); i ++){
        var div = document.createElement('div');
        div.id = "testslides" + i;
        div.className = "testslides";
        div.style.left = "100%";
        div.name = "ts" + i;
        div.innerHTML = "" +
            "<div id='testslide" + i + "' class='testslide' onmouseover='createZoom(event)' onmousemove='moveZoom(event)' onmouseout='removeZoom()' onclick='zoom(event)'>" +
            "<div id='innerimage" + i + "' class='innerimage'></div>" +
            "</div>";
        document.getElementById("scrollareanp").appendChild(div);
        document.getElementById("innerimage" + i).style.backgroundImage = 'url(\"http://www.i.photesto.space/lrg/' + names[0] + "$" + i.toString() + '.png")';
    }
    $.ajax({
        type:"POST",
        url:'/SView.php',
        data:{path:names[0]}
    });
}

$(document).ready(function(){

    $('#search').keydown(function(event){
        if(event.key === "Enter" || event.key === "Return"){
            var searchString = document.getElementById("search").value;
            window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
        }
    });

});


function back(){
    if(inzoom)removeZoom();
    if(viewed === 1)document.getElementById("backbtn").style.opacity = "0";
    if(viewed > 0 && !sliding){
        document.getElementById("nextbtn").style.opacity = "1";
        $("#testslides" + viewed).animate({
            'left' : "+=100%"
        });
        viewed --;
        $("#testslides" + viewed).animate({
            'left' : "+=100%"
        },{complete: function(){
            sliding = false;
        }});
        sliding = true;
    }
}

function next(){
    if(inzoom)removeZoom();
    if(parseInt(names[1]) === viewed + 2)document.getElementById("nextbtn").style.opacity = "0";
    if(parseInt(names[1]) > viewed + 1 && !sliding){
        document.getElementById("backbtn").style.opacity = "1";
        $("#testslides" + viewed).animate({
            'left' : "-=100%"
        });
        viewed ++;
        $("#testslides" + viewed).animate({
            'left' : "-=100%"
        },{complete: function(){
            sliding = false;
        }});
        sliding = true;
    }
}

function zoom(event){
    if($(window).width() > 824){
        if(inzoom)removeZoom();
        else{
            inzoom = true;
            zoomlvl = 2;
            document.getElementById("innerimage" + viewed).style.width = "200%";
            document.getElementById("innerimage" + viewed).style.height = "200%";
            document.getElementById("testslides" + viewed).style.cursor = "zoom-out";
            moveZoom(event);
        }
    }
}

function moveZoom(event){
    if($(window).width() > 824 && inzoom){
        var offset = $("#testslide" + viewed).offset();
        document.getElementById("innerimage" + viewed).style.top = "-" + (event.pageY - offset.top) + "px";
        document.getElementById("innerimage" + viewed).style.left = "-" + (event.pageX - offset.left) + "px";
    }
}

function removeZoom(){
    inzoom = false;
    document.getElementById("innerimage" + viewed).style.width = "100%";
    document.getElementById("innerimage" + viewed).style.height = "100%";
    document.getElementById("innerimage" + viewed).style.top = "0";
    document.getElementById("innerimage" + viewed).style.left = "0";
    document.getElementById("testslides" + viewed).style.cursor = "zoom-in";
}

function upvote(){
    if(goodRate){
        updateRating(parseInt(params[7]) + 1);
        goodRate = false;
        document.getElementById("rupbtn").style.opacity = "0.25";
        document.getElementById("rdnbtn").style.opacity = "0.25";
        $.ajax({
            type:"POST",
            url:'/SRateTest.php',
            data:{path:names[0], rate:"1"},
            success:function(resp){
                updateRating(parseInt(params[7]));
                if(resp === "F")document.getElementById("ratemsg").innerHTML = "You have already rated this test";
                else if(resp !== "")updateRating(resp);
            }
        });
    }
}

function downvote(){
    if(goodRate){
        updateRating(parseInt(params[7]) - 1);
        goodRate = false;
        document.getElementById("rupbtn").style.opacity = "0.25";
        document.getElementById("rdnbtn").style.opacity = "0.25";
        $.ajax({
            type:"POST",
            url:'/SRateTest.php',
            data:{path:names[0], rate:'-1'},
            success:function(resp){
                updateRating(parseInt(params[7]));
                if(resp === "F"){
                    document.getElementById("ratemsg").innerHTML = "You have already rated this test";
                }
                else if(resp !== ""){
                    updateRating(resp);
                }
            }
        });
    }
}

function updateRating(resp){
    document.getElementById("trep").innerHTML = resp;
    if(parseInt(resp.toString()) > 0){
        document.getElementById("trep").innerHTML = "+" + resp;
        document.getElementById("trep").style.color = "rgb(50, 255, 50)";
    }
    else if(parseInt(resp.toString()) < 0)document.getElementById("trep").style.color = "rgb(255, 50, 50)";
    else document.getElementById("trep").style.color = "white";
}

function saveTest(){
    if(goodSave){
        $.ajax({
            type:"POST",
            url:'/SSaveTest.php',
            data:{path:names[0]},
            success:function(r){
                if(r === "S"){
                    document.getElementById("savebtn").remove();
                    document.getElementById("tname").innerHTML += "  <em>Saved</em>";
                }
            }
        });
    }
}

function dropdown(){
    if(ininfo)info();
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

function info(){
    if(innav)dropdown();
    if(ininfo){
        $("#infopane").animate({
            'marginTop' : "-=200%"
        });
        ininfo = false;
    }
    else{
        $("#infopane").animate({
            'marginTop' : "+=200%"
        });
        ininfo = true;
    }
}

function search(){
    if($(window).width() > 824)var searchString = document.getElementById("search").value;
    else var searchString = document.getElementById("navsearch").value;
    window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
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
