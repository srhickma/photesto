<?php
error_reporting(0);
$code = filter_input(INPUT_POST, 'code');
$usr = filter_input(INPUT_POST, 'usr');
$pas = filter_input(INPUT_POST, 'pas');
$message = "";
$goodCode = false;
$found = false;
if(!preg_match('/[^A-Za-z0-9]/', $pas) && !preg_match('/[^A-Za-z0-9]/', $usr)){
    if(strlen($code) > 0 && strlen($usr) > 0 && strlen($pas) > 0){
        require '../sec/Conduit.php';
        $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
        mysqli_select_db($conn, Conduit::$dbn);
        $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
        while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
            if(password_verify($pas, $row['password'])){
                $found = true;
                if($row['code'] == $code){
                    $goodCode = true;
                }
                else{
                    $message = "Incorrect verification code";
                }
            }
        }
        if($found == false){
            $message = "Incorrect username and/or password";
        }
        if($goodCode){
            mysqli_query($conn, "UPDATE upass SET code='v' WHERE username='" . $usr . "'");
            echo "S";
            require 'SessionManager.php';
            SessionManager::sessionStart('Photesto');
            $_SESSION["usr"] = $usr;
            session_regenerate_id(true);
        }
        mysqli_close($conn);
    }
    else{
        $message = "One of the required fields has not been filled in";
    }
}
else{
    $message = "Username and password must only contain letters and numbers";
}
if(!$goodCode){
    echo $message;
}