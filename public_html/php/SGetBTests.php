<?php
error_reporting(0);
$message = "";
try{
    require '../sec/Conduit.php';
    $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
    mysqli_select_db($conn, Conduit::$dbn);
    $hrtests = array();
    $mvtests = array();
    $newtests = array();
    $retval = mysqli_query($conn, "SELECT * FROM hrtests ORDER BY rep DESC");
    while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
        $hrtests[] = $row['path'];
    }
    $retval = mysqli_query($conn, "SELECT * FROM mvtests ORDER BY views DESC");
    while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
        $mvtests[] = $row['path'];
    }
    $retval = mysqli_query($conn, "SELECT * FROM newtests ORDER BY spot ASC");
    while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
        $newtests[] = $row['path'];
    }
    foreach($hrtests as $p){
        $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $p . "%'");
        $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
        $message .= $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'] . "^";
    }
    $message .= "#";
    foreach($mvtests as $p){
        $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $p . "%'");
        $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
        $message .= $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'] . "^";
    }
    $message .= "#";
    foreach($newtests as $p){
        $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $p . "%'");
        $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
        $message .= $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'] . "^";
    }
    mysqli_close($conn);
}catch(Exception $e){}
echo $message;
