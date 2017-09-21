function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var tar;
var star;
var innav = false;
var paths = null;
var tNames = null;
if($(window).width() < 825){
    document.getElementById("browsebtn").remove();
    document.getElementById("searchdiv").remove();
    document.getElementById("logbtn").remove();
    document.getElementById("accbtn").remove();
    document.getElementById("postbtn").remove();
}

window.onload = function(){
    if($(window).width() < 825){
        var dropdown = document.createElement('li');
        dropdown.innerHTML = "<a id='dropbtn'style='height: 40px;padding-left: 0;padding-right: 0' onclick='dropdown()'><i class='material-icons' style='font-size: 24px;float: left'>menu</i></a>";
        document.getElementById("before").appendChild(dropdown);
    }
    addLoader();
    $.ajax({
        type:"GET",
        url:'/SGetUser.php',
        success:function(resp){
            if(resp !== ""){
                if($(window).width() < 825){
                    var postli = document.createElement('li');
                    postli.style.width = "100%";
                    postli.innerHTML = "<a href='post.html' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left'><i class='material-icons' style='font-size: 24px;float: left;'>note_add</i></a>";
                    document.getElementById("navpane").appendChild(postli);
                    var accli = document.createElement('li');
                    accli.style.width = "100%";
                    accli.innerHTML = "<a id='accbtn' class='active' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'><i class='material-icons' style='font-size: 24px;float: left'>perm_identity</i>" + resp + "</a>";
                    document.getElementById("navpane").appendChild(accli);
                    var logli = document.createElement('li');
                    logli.style.width = "100%";
                    logli.innerHTML = "<a onclick='logout()' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'><i class='material-icons' style='font-size: 24px;float: left;'>power_settings_new</i></a>";
                    document.getElementById("navpane").appendChild(logli);
                }
                else document.getElementById("accbtn").innerHTML = "<a id='accbtn' class='active'  style='padding: 10px 8px'><i class='material-icons' style='font-size: 24px;float: left'>perm_identity</i><p id='accp'>" + resp + "</p></a>";
            }
            else window.location="http://photesto.space/home.html";
        }
    });
    $.ajax({
        type:"GET",
        url:'/SGetMTests.php',
        success:function(resp){
            removeLoader();
            var groups = resp.split('#');
            var tests = groups[0].split('^');
            paths = new Array(tests.length + groups[1].split('^').length);
            tNames = new Array(paths.length);
            if(tests.length > 1)document.getElementById("pplace").remove();
            for(var i = 0; i < tests.length - 1; i ++){
                var params = tests[tests.length - 2 - i].split('%');
                var names = params[4].split('$');
                paths[i] = names[0];
                tNames[i] = params[0];
                var type = "Test";
                if(params[8] === "quiz")type = "Quiz";
                if(params[8] === "assignment")type = "Assignment";
                if($(window).width() < 825){
                    var div = document.createElement('div');
                    div.id = "test" + i;
                    div.className = "test";
                    var string = "" +
                        "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + tests[tests.length - 2 - i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                        "<div class='testdata'>" +
                        "<div>" +
                        "<div id='tnamespot" + i + "' style='width:100%;height:28px'><li class='testlink' id='tname' style='font-size: 24px;width:calc(100% - 20px)' onclick='viewtest(\"" + tests[tests.length - 2 - i] + "\")'>" + params[0] + "</li></div>" +
                        "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                        "<label id='tclass' style='float:left;width:50%'>Grade: " + params[3] + "</label>" +
                        "<label id='tviews' style='float:left;width:50%;text-align:right'>" + params[6] + " Views</label>" +
                        "<label id='tclass' style='float:left;width:75%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis'>Subject/Class: " + params[1] + "</label>";
                    if(parseInt(params[7]) > 0)string += "<label id='trep' style='color: rgb(50, 255, 50);float:left;width:25%;text-align:right'>+" + params[7] + "</label><br>";
                    else if(parseInt(params[7]) < 0)string += "<label id='trep' style='color: rgb(255, 50, 50);float:left;width:25%;text-align:right'>" + params[7] + "</label><br>";
                    else string += "<label id='trep' style='float:left;width:25%;text-align:right'>" + params[7] + "</label><br>";
                    string += "<label id='tschool'>School: " + params[2] + "</label>" +
                        "<label id='tusr'>Posted by: " + params[5] + "</label>";
                    string += "</div></div>";
                    div.innerHTML = string;
                }
                else{
                    var div = document.createElement('div');
                    div.id = "test" + i;
                    div.className = "test";
                    var string = "" +
                        "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + tests[tests.length - 2 - i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                        "<div class='testdata'>" +
                        "<div style='float:left;max-width:75%'>" +
                        "<div id='tnamespot" + i + "'><li class='testlink' id='tname' style='font-size: 24px;' onclick='viewtest(\"" + tests[tests.length - 2 - i] + "\")'>" + params[0] + "</li></div><br><br>" +
                        "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                        "<label id='tclass'>Grade: " + params[3] + "</label>" +
                        "<label id='tclass'>Subject/Class: " + params[1] + "</label>" +
                        "<label id='tschool'>School: " + params[2] + "</label>" +
                        "<label id='tusr'>Posted by: " + params[5] + "</label>" +
                        "</div>" +
                        "<div style='float:right;width:25%'>" +
                        "<label><a id='tviews' style='text-align: right;font-size: 24px'>" + params[6] + " Views</a></label>";
                    if(parseInt(params[7]) > 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(50, 255, 50)'>+" + params[7] + "</a></label><br>";
                    else if(parseInt(params[7]) < 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(255, 50, 50)'>" + params[7] + "</a></label><br>";
                    else string += "<label><a id='trep' style='float: right;font-size: 24px;color: white'>" + params[7] + "</a></label><br>";
                    string += "</div></div>";
                    div.innerHTML = string;
                }
                document.getElementById("tests").appendChild(div);
                if($(window).width() > 824){
                    $("#tests").find("#test" + i).mouseenter($.proxy(showDel, null, i));
                    $("#tests").find("#test" + i).mouseleave($.proxy(removeDel, null, i));
                }
                else document.getElementById("tnamespot" + i).innerHTML += "<li class='ratebtn' id='del" + i + "' style='width:20px;margin:0;float:right;background-color:rgb(20,20,20);padding:2px 0'><d><i class='material-icons' style='font-size: 24px;float: left' onclick='deleteTest(" + i + ")'>delete_forever</i></d></li>";
            }
            var stests = groups[1].split('^');
            if(stests.length > 1)document.getElementById("splace").remove();
            for(var i = 0; i < stests.length - 1; i ++){
                var params = stests[stests.length - 2 - i].split('%');
                var names = params[4].split('$');
                paths[i + tests.length] = names[0];
                tNames[i + tests.length] = params[0];
                var type = "Test";
                if(params[8] === "quiz")type = "Quiz";
                if(params[8] === "assignment")type = "Assignment";
                if($(window).width() < 825){
                    var div = document.createElement('div');
                    div.id = "test" + (i + tests.length).toString();
                    div.className = "test";
                    var string = "" +
                        "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + stests[stests.length - 2 - i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                        "<div class='testdata'>" +
                        "<div>" +
                        "<div id='tnamespot" + (i + tests.length) + "' style='width:100%;height:28px'><li class='testlink' id='tname' style='font-size: 24px;width:calc(100% - 20px)' onclick='viewtest(\"" + stests[stests.length - 2 - i] + "\")'>" + params[0] + "</li></div>" +
                        "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                        "<label id='tclass'>Grade: " + params[3] + "</label>" +
                        "<label id='tclass'>Subject/Class: " + params[1] + "</label>" +
                        "<label id='tschool'>School: " + params[2] + "</label>" +
                        "<label id='tusr'>Posted by: " + params[5] + "</label>" +
                        "<label id='tviews'>" + params[6] + " Views</label>";
                    if(parseInt(params[7]) > 0)string += "<label id='trep' style='color: rgb(50, 255, 50)'>+" + params[7] + "</label><br>";
                    else if(parseInt(params[7]) < 0)string += "<label id='trep' style='color: rgb(255, 50, 50)'>" + params[7] + "</label><br>";
                    else string += "<label id='trep'>" + params[7] + "</label><br>";
                    string += "</div></div>";
                    div.innerHTML = string;
                }
                else{
                    var div = document.createElement('div');
                    div.id = "test" + (i + tests.length).toString();
                    div.className = "test";
                    var string = "" +
                        "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + stests[stests.length - 2 - i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                        "<div class='testdata'>" +
                        "<div style='float:left;max-width:75%'>" +
                        "<div id='tnamespot" + (i + tests.length) + "'><li class='testlink' id='tname' style='font-size: 24px;' onclick='viewtest(\"" + stests[stests.length - 2 - i] + "\")'>" + params[0] + "</li></div><br><br>" +
                        "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                        "<label id='tclass'>Grade: " + params[3] + "</label>" +
                        "<label id='tclass'>Subject/Class: " + params[1] + "</label>" +
                        "<label id='tschool'>School: " + params[2] + "</label>" +
                        "<label id='tusr'>Posted by: " + params[5] + "</label>" +
                        "</div>" +
                        "<div style='float:right;width:25%'>" +
                        "<label><a id='tviews' style='text-align: right;font-size: 24px'>" + params[6] + " Views</a></label>";
                    if(parseInt(params[7]) > 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(50, 255, 50)'>+" + params[7] + "</a></label><br>";
                    else if(parseInt(params[7]) < 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(255, 50, 50)'>" + params[7] + "</a></label><br>";
                    else string += "<label><a id='trep' style='float: right;font-size: 24px;color: white'>" + params[7] + "</a></label><br>";
                    string += "</div></div>";
                    div.innerHTML = string;
                }
                document.getElementById("stests").appendChild(div);
                if($(window).width() > 824){
                    $("#stests").find("#test" + (i + tests.length)).mouseenter($.proxy(showRem, null, (i + tests.length)));
                    $("#stests").find("#test" + (i + tests.length)).mouseleave($.proxy(removeRem, null, (i + tests.length)));
                }
                else document.getElementById("tnamespot" + (i + tests.length)).innerHTML += "<li class='ratebtn' id='del" + (i + tests.length) + "' style='width:20px;margin:0;float:right;background-color:rgb(20,20,20);padding:2px 0'><d><i class='material-icons' style='font-size: 24px;float: left' onclick='unsaveTest(" + (i + tests.length) + ")'>delete</i></d></li>";
            }
            fixfooter();
        }
    });
    document.getElementById("tests").style.width = "100%";
    document.getElementById("stests").style.width = "100%";
    showst();
};

function showDel(i){
    var delli = document.createElement('li');
    delli.className = "ratebtn";
    delli.id = "del" + i;
    delli.style.width = "20px";
    delli.style.margin = 0;
    delli.style.float = "left";
    delli.innerHTML = "<d><i class='material-icons' style='font-size: 24px;float: left' onclick='deleteTest(" + i + ")'>delete_forever</i></d>";
    document.getElementById("tnamespot" + i.toString()).appendChild(delli);
}

function removeDel(i){
    document.getElementById("del" + i.toString()).remove();
}

function showRem(i){
    var delli = document.createElement('li');
    delli.className = "ratebtn";
    delli.id = "del" + i;
    delli.style.width = "20px";
    delli.style.margin = 0;
    delli.style.float = "left";
    delli.innerHTML = "<d><i class='material-icons' style='font-size: 24px;float: left' onclick='unsaveTest(" + i + ")'>delete</i></d>";
    document.getElementById("tnamespot" + i.toString()).appendChild(delli);
}

function removeRem(i){
    document.getElementById("del" + i.toString()).remove();
}

function deleteTest(i){
    if(confirm("Are you sure you want to perminently delete '" + tNames[i] + "'?")){
        $.ajax({
            type:"POST",
            url:'/SDeleteTest.php',
            data:{tPath:paths[i]},
            success:function(resp){
                document.getElementById("test" + i.toString()).remove();
                for(var j = i + 1; j < paths.length; j ++){
                    if(paths[j] === paths[i])document.getElementById("test" + j.toString()).remove();
                }
            }
        });
    }
}

function unsaveTest(i){
    $.ajax({
        type:"POST",
        url:'/SUnsaveTest.php',
        data:{tPath:paths[i]},
        success:function(resp){
            document.getElementById("test" + i.toString()).remove();
        }
    });
}

function showst(){
    document.getElementById("tests").style.zIndex = "-1";
    document.getElementById("tests").style.opacity = "0";
    document.getElementById("tests").style.height = "0";
    document.getElementById("tests").style.overflow = "hidden";
    document.getElementById("ttab").style.backgroundColor = "rgb(20,20,20)";
    document.getElementById("stests").style.zIndex = "1";
    document.getElementById("stests").style.opacity = "1";
    document.getElementById("stests").style.height = "auto";
    document.getElementById("sttab").style.backgroundColor = "rgb(40,40,40)";
}

function showpt(){
    document.getElementById("stests").style.zIndex = "-1";
    document.getElementById("stests").style.opacity = "0";
    document.getElementById("stests").style.height = "0";
    document.getElementById("stests").style.overflow = "hidden";
    document.getElementById("sttab").style.backgroundColor = "rgb(20,20,20)";
    document.getElementById("tests").style.zIndex = "1";
    document.getElementById("tests").style.opacity = "1";
    document.getElementById("tests").style.height = "auto";
    document.getElementById("ttab").style.backgroundColor = "rgb(40,40,40)";
}

$(document).ready(function(){
    $('#search').keydown(function(event){
        if(event.key === "Enter" || event.key === "Return"){
            var searchString = document.getElementById("search").value;
            window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
        }
    });

});

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
        else document.getElementById("footer").style.top = "0";
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
