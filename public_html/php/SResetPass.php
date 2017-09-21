<?php
error_reporting(0);
$code = filter_input(INPUT_POST, 'code');
$usr = filter_input(INPUT_POST, 'usr');
$pas = filter_input(INPUT_POST, 'pas');
$cpas = filter_input(INPUT_POST, 'cpas');
$message = "";
try{
    $goodCode = false;
    if(!preg_match('/[^A-Za-z0-9]/', $pas) && !preg_match('/[^A-Za-z0-9]/', $cpas) && !preg_match('/[^A-Za-z0-9]/', $usr) && !preg_match('/[^A-Za-z0-9]/', $code)){
        if($cpas == $pas){
            $message = "S";
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
            while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                if($row['fpcode'] == $code && $row['fpcode'] != "v"){
                    $goodCode = true;
                }
            }
            if($goodCode == true){
                $hash = password_hash($pas, PASSWORD_DEFAULT);
                mysqli_query($conn, "UPDATE upass SET fpcode='v' WHERE username='" . $usr . "'");
                mysqli_query($conn, "UPDATE upass SET password='" . $hash . "' WHERE username='" . $usr . "'");
            }
            mysqli_close($conn);
        }
        else{
            $message = "The passwords entered must be the same";
        }
    }
    else{
        $message = "Fields must only contain letters and numbers";
    }
}catch(Exception $e){}
echo $message;