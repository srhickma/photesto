function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var innav = false;
if($(window).width() < 825)document.getElementById("browsebtn").remove();

window.onload = function(){
    if($(window).width() < 825){
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
  	                sinli.innerHTML = "<a id='accbtn' class='active' style='padding: 10px 8px'><p style='margin: 2px 0'>Sign In<p></a>";
    	    	        document.getElementById("next").appendChild(sinli);
                }
      		      else{
                    var sinli = document.createElement('li');
                    sinli.style.width = "100%";
                    sinli.innerHTML = "<a id='accbtn' class='active' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left;text-align: left'>Sign In</a>";
                    document.getElementById("navpane").appendChild(sinli);
          		  }
            }
        }
    });
    fixfooter();
};

$(document).ready(function(){

    $('#loginb').click(function(event){
        addLoader();
        var usr = document.loginform.usr.value;
        var pwd = document.loginform.pwd.value;
        event.preventDefault();
        $.ajax({
            type:"POST",
            url:'/SLogin.php',
            data:{usr:usr, pwd:pwd},
            success:function(resp){
                removeLoader();
                if(resp === "S")window.location="http://photesto.space/home.html";
                else if(resp === "F"){
                    $(".abt").remove();
                    document.getElementById("loginm").innerHTML = "Incorrect username and/or password";
                    var btn = document.createElement('Label');
                    btn.id = 'fpbtn';
                    btn.className = "abt";
                    btn.innerHTML = "Forgot Password?";
                    document.getElementById("loginform").appendChild(btn);
                }
                else document.getElementById("loginm").innerHTML = resp;
                document.getElementById("loginm").style.color = "red";
                if(resp === "Your account has not been verified"){
                    $(".abt").remove();
                    var btn = document.createElement('Label');
                    btn.id = 'verifybtn';
                    btn.className = "abt";
                    btn.innerHTML = "Verify Your Account";
                    document.getElementById("loginform").appendChild(btn);
                }
            }
        });
    });

    $('#signupb').click(function(event){
        var usr = document.signupform.suusr.value;
        var pwd = document.signupform.supwd.value;
        var pwdc = document.signupform.supwdc.value;
        var email = document.signupform.suemail.value;
        event.preventDefault();
        addLoader();
        $.ajax({
            type:"POST",
            url:'/SSignUp.php',
            data:{suusr:usr, supwd:pwd, supwdc:pwdc, suemail:email},
            success:function(resp){
                removeLoader();
                if(resp === "S")window.location="http://photesto.space/verification.html";
                else{
                    document.getElementById("signupm").innerHTML = resp;
                    document.getElementById("signupm").style.color = "red";
                }
            }
        });
    });

    $('#hsearch').keydown(function(event){
        if(event.key === "Enter" || event.key ==="Return"){
            var searchString = document.getElementById("hsearch").value;
            window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
        }
    });

});

$(document).bind('DOMSubtreeModified', function(){

    $('#verifybtn').click(function(event){
        event.preventDefault();
        window.location="http://photesto.space/verification.html";
    });

    $('#fpbtn').click(function(event){
        event.preventDefault();
        window.location="http://photesto.space/forgotpass.html";
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
    var searchString = document.getElementById("navsearch").value;
    window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
}

function hsearch(){
    var searchString = document.getElementById("hsearch").value;
    window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
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
