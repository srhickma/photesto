<?php
error_reporting(0);
$usr = filter_input(INPUT_POST, 'usr');
$pas = filter_input(INPUT_POST, 'pwd');
$message = "F";
$found = false;
$verified = false;
if(strlen($pas) > 0 && strlen($usr) > 0){
  if(strlen($pas) < 26 && strlen($usr) < 26){
    if(!preg_match('/[^A-Za-z0-9]/', $pas) && !preg_match('/[^A-Za-z0-9]/', $usr)){
        try{
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
            while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                if(password_verify($pas, $row['password']) && $row['username'] == $usr){
                    $found = true;
                    if($row['code'] == 'v'){
                        $verified = true;
                    }
                    else{
                        $message = "Your account has not been verified";
                    }
                }
            }
            mysqli_close($conn);
        }catch(Exception $e){}
    }
    else{
        $message = "Username and password must only contain letters and numbers";
    }
  }
}
else{
    $message = "You have not filled in one of the required fields";
}
if($found && $verified){
    echo "S";
    require 'SessionManager.php';
    SessionManager::sessionStart('Photesto');
    $_SESSION["usr"] = $usr;
    session_regenerate_id(true);
}
else{
    echo $message;
}
