function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var tstring = "";
var rstring = "";
var sstring = "";
var innav = false;
var inadvo = false;
if($(window).width() < 1026){
    document.getElementById("sroptions").remove();
    document.getElementById("tests").style.maxWidth = "100%";
    if($(window).width() < 825){
        document.getElementById("browsebtn").remove();
        document.getElementById("searchdiv").remove();
    }
}

window.onload = function(){
    if($(window).width() < 825){
        var dropdown = document.createElement('li');
        dropdown.innerHTML = "<a id='dropbtn'style='height: 40px;padding-left: 0;padding-right: 0' onclick='dropdown()'><i class='material-icons' style='font-size: 24px;float: left'>menu</i></a>";
        document.getElementById("before").appendChild(dropdown);
        var info = document.createElement('li');
        info.innerHTML = "<a id='advobtn' style='height: 40px;padding-left: 0;padding-right: 0' onclick='advo()'><i class='material-icons' style='font-size: 24px;float: left'>settings</i></a>";
        document.getElementById("next").appendChild(info);
    }
    else if($(window).width() < 1026){
        var advo = document.createElement('li');
        advo.style.float = "right";
        advo.innerHTML = "<a id='advobtn' style='padding: 10px 8px' onclick='advo()'><i class='material-icons' style='font-size: 24px;float: left'>settings</i></a>";
        document.getElementById("next").appendChild(advo);
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
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var searchString = vars[0].split("=")[1];
    searchString = searchString.replace(/_/g, " ");
    document.title = "Search: " + searchString;
    addLoader();
    $.ajax({
        type:"GET",
        url:'/SSearch.php',
        data:{search:searchString, results:25},
        success:function(resp){
            if(resp === "F"){
                document.getElementById("title").innerHTML = "Your Search Must Only Contain Letters, Numbers, Or Spaces";
                sstring = "";
            }
            else if(resp === ""){
                document.getElementById("title").innerHTML = "No Results Found For '" + searchString + "'";
                while(document.getElementById("tests").hasChildNodes()){
                    document.getElementById("tests").removeChild(document.getElementById("tests").lastChild);
                }
            }
            else{
                if(searchString === "")document.getElementById("title").innerHTML = "All Tests";
                else document.getElementById("title").innerHTML = "Search Results For '" + searchString + "'";
                sstring = searchString;
                tstring = resp;
                rstring = resp;
                sortRel();
            }
            fixfooter();
            removeLoader();
        },error:function(xhr){
            removeLoader();
            alert(xhr.responseText);
            document.getElementById("title").innerHTML = "Your Search Must Only Contain Letters, Numbers, Or Spaces";
            sstring = "";
        }
    });
};

$(document).ready(function(){

    $('#search').keydown(function(event){
        if(event.key === "Enter" || event.key === "Return"){
            var searchString = document.getElementById("search").value;
            window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
        }
    });

});

function filter(){
    if($(window).width() < 1026)advo();
    var sortby = document.getElementById("sortby").value;
    var results = document.getElementById("results").value;
    if(results !== "25"){
        addLoader();
        $.ajax({
            type:"GET",
            url:'/SSearch.php',
            data:{search:sstring, results:results},
            success:function(resp){
                if(resp === "F")document.getElementById("title").innerHTML = "Your Search Must Only Contain Letters, Numbers, Or Spaces";
                else{
                    tstring = resp;
                    rstring = resp;
                }
                if(sortby === "Relevance")sortRel();
                else if(sortby === "Reputation")sortRep();
                else sortViews();
                removeLoader();
            }
        });
    }
    else{
        if(sortby === "Relevance")sortRel();
        else if(sortby === "Reputation")sortRep();
        else sortViews();
    }
}

function loadTests(){
    while(document.getElementById("tests").hasChildNodes()){
        document.getElementById("tests").removeChild(document.getElementById("tests").lastChild);
    }
    var tests = tstring.split('^');
    for(var i = 0; i < tests.length - 1; i ++){
        var params = tests[i].split('%');
        var names = params[4].split('$');
        var type = "Test";
        if(params[8] === "quiz")type = "Quiz";
        if(params[8] === "assignment")type = "Assignment"
        if($(window).width() < 825){
            var div = document.createElement('div');
            div.id = "test";
            div.style.top = "50%";
            div.style.transform = "translate(0%, -50%);";
            var string = "" +
                "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + tests[i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                "<div class='testdata'>" +
                "<div>" +
                "<li class='testlink' id='tname' style='font-size: 24px;text-align:center' onclick='viewtest(\"" + tests[i] + "\")'>" + params[0] + "</li>" +
                "<label id='ttype' class='pointer' style='text-align:center'><a>" + type + "</a></label>" +
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
            div.id = "test";
            div.style.top = "50%";
            div.style.transform = "translate(0%, -50%);";
            var string = "" +
                "<div class='testicon' id='testpic" + i.toString() + "' onclick='viewtest(\"" + tests[i] + "\")' style='background-image: url(\"http://www.i.photesto.space/icn/" + names[0] + ".png\")'></div>" +
                "<div class='testdata'>" +
                "<div style='float: left;width:75%'>" +
                "<li class='testlink' id='tname' style='font-size: 24px;' onclick='viewtest(\"" + tests[i] + "\")'>" + params[0] + "</li><br><br>" +
                "<label id='ttype' class='pointer'><a>" + type + "</a></label>" +
                "<label id='tclass'>Grade: " + params[3] + "</label>" +
                "<label id='tclass'>Subject/Class: " + params[1] + "</label>" +
                "<label id='tschool'>School: " + params[2] + "</label>" +
                "<label id='tusr'>Posted by: " + params[5] + "</label>" +
                "</div>" +
                "<div style='float: right;width:25%'>" +
                "<label><a id='tviews' style='text-align: right;font-size: 24px'>" + params[6] + " Views</a></label>";
            if(parseInt(params[7]) > 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(50, 255, 50)'>+" + params[7] + "</a></label><br>";
            else if(parseInt(params[7]) < 0)string += "<label><a id='trep' style='float: right;font-size: 24px;color: rgb(255, 50, 50)'>" + params[7] + "</a></label><br>";
            else string += "<label><a id='trep' style='float: right;font-size: 24px;color: white'>" + params[7] + "</a></label><br>";
            string += "</div></div>";
            div.innerHTML = string;
        }
        document.getElementById("tests").appendChild(div);
    }
}

function sortRel(){
    tstring = rstring;
    loadTests();
}

function sortViews(){
    var newtstring = "";
    var tests = tstring.split('^');
    for(var i = 0; i < tests.length - 2; i ++){
        if(parseInt(tests[i].split('%')[6]) < parseInt(tests[i + 1].split('%')[6])){
            var h = tests[i];
            tests[i] = tests[i + 1];
            tests[i + 1] = h;
            for(var j = i; j > 0; j --){
                if(parseInt(tests[j].split('%')[6]) < parseInt(tests[j - 1].split('%')[6]))break;
                else{
                    var h = tests[j];
                    tests[j] = tests[j - 1];
                    tests[j - 1] = h;
                }
            }
        }
    }
    for(var i = 0; i < tests.length - 1; i ++)
        newtstring += tests[i] + "^";
    tstring = newtstring;
    loadTests();
}

function sortRep(){
    var newtstring = "";
    var tests = tstring.split('^');
    for(var i = 0; i < tests.length - 2; i ++){
        if(parseInt(tests[i].split('%')[7]) < parseInt(tests[i + 1].split('%')[7])){
            var h = tests[i];
            tests[i] = tests[i + 1];
            tests[i + 1] = h;
            for(var j = i; j > 0; j --){
                if(parseInt(tests[j].split('%')[7]) < parseInt(tests[j - 1].split('%')[7]))break;
                else{
                    var h = tests[j];
                    tests[j] = tests[j - 1];
                    tests[j - 1] = h;
                }
            }
        }
    }
    for(var i = 0; i < tests.length - 1; i ++)
        newtstring += tests[i] + "^";
    tstring = newtstring;
    loadTests();
}

function viewtest(test){
    localStorage.setItem("viewedtest", test);
    window.location="http://photesto.space/viewtest.html?t=" + test.split('%')[4].split('$')[0];
}

function dropdown(){
    if(inadvo)advo();
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

function advo(){
    if(innav)dropdown();
    if(inadvo){
        $("#advopane").animate({
            'marginRight' : "-=100%"
        });
        inadvo = false;
    }
    else{
        $("#advopane").animate({
            'marginRight' : "+=100%"
        });
        inadvo = true;
    }
}

function search(){
    if($(window).width() > 824)var searchString = document.getElementById("search").value;
    else var searchString = document.getElementById("navsearch").value;
    window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
}

function advs(){
    if($(window).width() < 1026)advo();
    addLoader();
    $.ajax({
        type:"GET",
        url:'/SAdvSearch.php',
        data:{pname:document.getElementById("pname").value, pclass:document.getElementById("pclass").value, pschool:document.getElementById("pschool").value, pgrade:document.getElementById("pgrade").value, ptype:$('input[name="ptype"]:checked').val(), results:50},
        success:function(resp){
            if(resp === "F"){
                document.getElementById("title").innerHTML = "Your Search Must Only Contain Letters, Numbers, Or Spaces";
                sstring = "";
            }
            else if(resp === ""){
                document.getElementById("title").innerHTML = "No Results Found";
                while(document.getElementById("tests").hasChildNodes()){
                    document.getElementById("tests").removeChild(document.getElementById("tests").lastChild);
                }
            }
            else{
                document.getElementById("title").innerHTML = "Advanced Search Results";
                tstring = resp;
                rstring = resp;
                sortRel();
            }
            fixfooter();
            removeLoader();
        },error:function(xhr){
            removeLoader();
            alert(xhr);
            document.getElementById("title").innerHTML = "Your Search Must Only Contain Letters, Numbers, Or Spaces";
            sstring = "";
        }
    });
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
