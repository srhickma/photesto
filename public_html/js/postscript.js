function addLoader(){var d = document.createElement('div');d.id = "loader";d.innerHTML = "<img id='loaderbar' src='ajax-loader.gif' alt='Searching'/>";document.getElementsByTagName("BODY")[0].appendChild(d);}
function removeLoader(){var d = document.getElementById("loader");d.parentNode.removeChild(d);}
var images = 0;
var tar;
var innav = false;
if($(window).width() < 825){
  document.getElementById("browsebtn").remove();
  document.getElementById("searchdiv").remove();
  document.getElementById("logbtn").remove();
  document.getElementById("accbtn").remove();
  document.getElementById("postbtn").remove();
}

$(document).ready(function(){
    $("#postform").submit(function(event){
        event.preventDefault();
        var good = true;
        if(document.getElementById("pname").value === ""){
            document.getElementById("pname").style.color = 'rgba(207,16,32,1)';
            document.getElementById("pnamemsg").innerHTML = "Please enter the test name";
            good = false;
        }
        else{
            document.getElementById("pname").style.color = 'rgba(0,142,198,1)';
            document.getElementById("pnamemsg").innerHTML = "✔";
        }
        if(document.getElementById("pclass").value === ""){
            document.getElementById("pclass").style.color = 'rgba(207,16,32,1)';
            document.getElementById("pclassmsg").innerHTML = "Please enter a class";
            good = false;
        }
        else{
            document.getElementById("pclass").style.color = 'rgba(0,142,198,1)';
            document.getElementById("pclassmsg").innerHTML = "✔";
        }
        if(document.getElementById("pschool").value === ""){
            document.getElementById("pschool").style.color = 'rgba(207,16,32,1)';
            document.getElementById("pschoolmsg").innerHTML = "Please enter your school name";
            good = false;
        }
        else{
            document.getElementById("pschool").style.color = 'rgba(0,142,198,1)';
            document.getElementById("pschoolmsg").innerHTML = "✔";
        }
        if(document.getElementById("pgrade").value === ""){
            document.getElementById("pgrade").style.color = 'rgba(207,16,32,1)';
            document.getElementById("pgrademsg").innerHTML = "Please enter a grade";
            good = false;
        }
        else{
            var num = parseInt(document.getElementById("pgrade").value);
            if(num > 0 && num < 13){
              document.getElementById("pgrade").style.color = 'rgba(0,142,198,1)';
              document.getElementById("pgrademsg").innerHTML = "✔";
            }
            else{
              document.getElementById("pgrade").style.color = 'rgba(207,16,32,1)';
              document.getElementById("pgrademsg").innerHTML = "Grade must be a number from 1 to 12";
              good = false;
            }
        }
        if(good){
          addLoader();
            var formData = new FormData($(this)[0]);
            var pics = 0;
            for(var i = 0; i <= images; i ++){
              if(document.getElementById("picresultdiv" + i.toString()) !== null){
                try{
                  formData.append("rot" + i, document.getElementById("picresultdiv" + i.toString()).name);
                  formData.append("tag" + pics, i);
                  pics ++;
                }catch(e){}
              }
            }
            $.ajax({
                type: 'POST',
                url: '/SPostTest.php',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function(resp){
                  removeLoader();
                  if(resp === "")window.location="http://photesto.space/account.html";
                  else{
                    document.getElementById("postm").innerHTML = resp;
                    document.getElementById("postm").style.color = "red";
                  }
                },error:function(){
                  removeLoader();
                  document.getElementById("postm").innerHTML = "An error ocurred while uploading your images";
                  document.getElementById("postm").style.color = "red";
                }
            });
            return false;
        }
        else removeLoader();
    });

    $('#search').keydown(function(event){
        if(event.key === "Enter" || event.key === "Return"){
            var searchString = document.getElementById("search").value;
            window.location="http://photesto.space/searchresult.html?s=" + searchString.replace(/ /g, "_");
        }
    });

});

function readURL(input, i){
    if (input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = function(e){
            document.getElementById("picresult" + i.toString()).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addImage(){
    images += 1;
    var div = document.createElement('div');
    div.id = "imginput" + images.toString();
    div.className = "imginput";
    div.innerHTML = "" +
        "<div class='picresultdiv' id='picresultdiv" + images.toString() + "'>" +
        "<image id='picresult" + images.toString() + "' class='picresult'></image>"+
        "</div>" +
        "<div class='picsett'>" +
        "<div class=picinputdiv>" +
        "<input class='picinput' type='file' name='file" + images.toString() + "' id='file" + images.toString() + "' accept='image/*' onchange='readURL(this, " + images.toString() + ");'>" +
        "<li class='picupli'><i class='material-icons' style='font-size: 24px;float: left'>cloud_upload</i></li>" +
        "</div>" +
        "<li class='picli' style='left:42px'><u onclick='rotateImg(" + images.toString() + ")'><i class='material-icons' style='font-size: 24px;float: left'>loop</i></u></li>" +
        "<li class='picli' style='float:right'><d><i onclick='deleteImg(" + images.toString() + ")' class='material-icons' style='font-size:24px;float:left'>delete</i></d></li>" +
        "</div>";
    var imgs = document.getElementById("images");
    imgs.insertBefore(div, imgs.childNodes[imgs.childNodes.length - 2]);
    document.getElementById("picresultdiv" + images.toString()).name = '0';
}

function showTools(i){
    var delli = document.createElement('li');
    delli.className = "picli";
    delli.id = "delli" + i;
    delli.style.right = "10px";
    delli.innerHTML = "<d><i class='material-icons' style='font-size: 24px;float: left' onclick='deleteImg(" + i + ")'>delete_forever</i></d>";
    document.getElementById("imginput" + i).appendChild(delli);
    var rotli = document.createElement('li');
    rotli.className = "picli";
    rotli.id = "rotli" + i;
    rotli.style.left = "8px";
    rotli.style.float = "none";
    rotli.innerHTML = "<u><i class='material-icons' style='font-size: 24px;float: left' onclick='rotateImg(" + i + ")'>loop</i></u>";
    document.getElementById("imginput" + i).appendChild(rotli);
}

function removeTools(i){
    document.getElementById("delli" + i.toString()).remove();
    document.getElementById("rotli" + i.toString()).remove();
}

function deleteImg(i){
    var div = document.getElementById("imginput" + i.toString());
    div.parentNode.removeChild(div);
}

function rotateImg(i){
    document.getElementById("picresultdiv" + i.toString()).style.transform = "rotate(" + (parseInt(document.getElementById("picresultdiv" + i.toString()).name) + 90).toString()  + "deg)";
    document.getElementById("picresultdiv" + i.toString()).name = (parseInt(document.getElementById("picresultdiv" + i.toString()).name) + 90);
}

window.onload = function(){
  if($(window).width() < 825){
    var dropdown = document.createElement('li');
    dropdown.innerHTML = "<a id='dropbtn'style='height: 40px;padding-left: 0;padding-right: 0' onclick='dropdown()'><i class='material-icons' style='font-size: 24px;float: left'>menu</i></a>";
    document.getElementById("before").appendChild(dropdown);
  }
  document.getElementById("picresultdiv" + 0).name = '0';
  $.ajax({
    type:"GET",
    url:'/SGetUser.php',
    success:function(resp){
      if(resp !== ""){
        if($(window).width() < 825){
          var postli = document.createElement('li');
          postli.style.width = "100%";
          postli.innerHTML = "<a id='activelink' style='width: calc(100% - 8px);padding: 10px 0 10px 8px;float: left'><i class='material-icons' style='font-size: 24px;float: left;'>note_add</i></a>";
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
        else document.getElementById("accbtn").innerHTML = "<a id='accbtn' href='account.html' style='padding: 10px 8px'><i class='material-icons' style='font-size: 24px;float: left'>perm_identity</i><p id='accp'>" + resp + "</p></a>";
      }
      else window.location="http://photesto.space/home.html";
    }
  });
    fixfooter();
};

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
