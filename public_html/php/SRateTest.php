<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
$message = "";
$usr = $_SESSION['usr'];
$tPath = filter_input(INPUT_POST, 'path');
$rate = filter_input(INPUT_POST, 'rate');
require 'Validator.php';
if(!preg_match('/[^A-Za-z0-9]/', $usr) && Validator::validateFPath($tPath) && Validator::validateInt($rate) && ((int) $rate == 1 || (int) $rate == -1)){
    try{
        require '../sec/Conduit.php';
        $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
        mysqli_select_db($conn, Conduit::$dbn);
        $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
        $goodRate = false;
        $newPath = "";
        while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
            $goodRate = true;
            try{
                $rated = explode("^", $row['rated']);
                $newPath .= $row['rated'];
                for($i = 0; $i < count($rated); $i ++){
                    if($rated[$i] == $tPath){
                        $goodRate = false;
                        $message = "F";
                    }
                }
            }catch(Exception $e){}
        }
        if($goodRate == true){
            $newPath .= $tPath . "^";
            mysqli_query($conn, "UPDATE tests SET rep=rep+'" . $rate . "' WHERE path LIKE '%" . $tPath . "%'");
            mysqli_query($conn, "UPDATE upass SET rated='" . $newPath . "' WHERE username='" . $usr . "'");
            $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $tPath . "%'");
            $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
            $rep = (int) $row["rep"];
            $message = $rep;
            $retval = mysqli_query($conn, "SELECT * FROM minofmax");
            $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
            $minmaxr = (int) $row['minmaxr'];
            if($rep > $minmaxr){
                $alreadyIn = false;
                $retval = mysqli_query($conn, "SELECT * FROM hrtests WHERE path LIKE '%" . $tPath . "%'");
                while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                    $alreadyIn = true;
                }
                if(!$alreadyIn){
                    mysqli_query($conn, "INSERT INTO hrtests (path, rep) VALUES ('" . $tPath . "', '" . $rep . "')");
                }
                else{
                    mysqli_query($conn, "UPDATE hrtests SET rep='" . $rep . "' WHERE path LIKE '%" . $tPath . "%'");
                }
                $retval = mysqli_query($conn, "SELECT * FROM hrtests");
                $count = (int) mysqli_num_rows($retval);
                if($count > 10){
                    $retval = mysqli_query($conn, "SELECT * FROM hrtests WHERE rep='" . $minmaxr . "'");
                    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
                    mysqli_query($conn, "DELETE FROM hrtests WHERE path LIKE '%" . $row['path'] . "%'");
                }
                if($count > 9){
                    $lowest = $rep;
                    $retval = mysqli_query($conn, "SELECT * FROM hrtests ORDER BY rep ASC");
                    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
                    $lowest = (int) $row['rep'];
                    mysqli_query($conn, "UPDATE minofmax SET minmaxr='" . $lowest . "'");
                }
            }
        }
        mysqli_close($conn);
    }catch(Exception $e){}
}
echo $message;