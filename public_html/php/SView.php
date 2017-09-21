<?php
error_reporting(0);
$path = filter_input(INPUT_POST, 'path');
require 'Validator.php';
if(Validator::validateFPath($path)){
    try{
        require 'SessionManager.php';
        SessionManager::sessionStart('Photesto');
        if(isset($_SESSION['viewed']) == false){
       	    $_SESSION["viewed"] = "";
        }
        $viewed = $_SESSION["viewed"];
        if(!(in_array($path, explode("%", $viewed)))){
            $_SESSION["viewed"] .= $path . "%";
            echo "here";
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            mysqli_query($conn, "UPDATE tests SET views=views+'1' WHERE path LIKE '%" . $path . "%'");
            $retval = mysqli_query($conn, "SELECT * FROM minofmax");
            $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
            $minmaxv = (int) $row['minmaxv'];
            $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $path . "%'");
            $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
            $views = (int) $row['views'];
            if($views > $minmaxv){
                $alreadyIn = false;
                $retval = mysqli_query($conn, "SELECT * FROM mvtests WHERE path LIKE '%" . $path . "%'");
                while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                    $alreadyIn = true;
                }
                if(!$alreadyIn){
                    mysqli_query($conn, "INSERT INTO mvtests (path, views) VALUES ('" . $path . "', '" . $views . "')");
                }
                else{
                    mysqli_query($conn, "UPDATE mvtests SET views='" . $views . "' WHERE path LIKE '%" . $path . "%'");
                }
                $retval = mysqli_query($conn, "SELECT * FROM mvtests");
                $count = (int) mysqli_num_rows($retval);
                if($count > 10){
                    $retval = mysqli_query($conn, "SELECT * FROM mvtests WHERE views='" . $minmaxv . "'");
                    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
                    mysqli_query($conn, "DELETE FROM mvtests WHERE path LIKE '%" . $row['path'] . "%'");
                }
                if($count > 9){
                    $retval = mysqli_query($conn, "SELECT * FROM mvtests ORDER BY views ASC");
                    $lowest = $views;
                    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
                    $lowest = (int) $row['views'];
                    mysqli_query($conn, "UPDATE minofmax SET minmaxv='" . $lowest . "'");
                }
            }
            mysqli_close($conn);
        }
    }catch(Exception $e){}
}