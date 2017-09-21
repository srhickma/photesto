<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
$message = "";
$usr = $_SESSION['usr'];
if(!preg_match('/[^A-Za-z0-9]/', $usr)){
    try{
        require '../sec/Conduit.php';
        $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
        mysqli_select_db($conn, Conduit::$dbn);
        $retval = mysqli_query($conn, "SELECT * FROM tests WHERE username='" . $usr . "'");
        while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
            $message .= $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'] . "^";
        }
        $message .= "#";
        $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
        $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
        $saved = explode("^", $row['saved']);
        for($i = 0; $i < count($saved); $i ++){
            if($saved[$i] != ""){
                $retvalb = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $saved[$i] . "%'");
                $rowb = mysqli_fetch_array($retvalb, MYSQLI_ASSOC);
                $message .= $rowb['name'] . "%" . $rowb['class'] . "%" . $rowb['school'] . "%" . $rowb['grade'] . "%" . $rowb['path'] . "%" . $rowb['username'] . "%" . $rowb['views'] . "%" . $rowb['rep'] . "%" . $rowb['type'] . "^";
            }
        }
        mysqli_close($conn);
    }catch(Exception $e){}
}
echo $message;
