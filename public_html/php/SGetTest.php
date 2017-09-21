<?php
error_reporting(0);
$message = "";
$path = filter_input(INPUT_GET, 'path');
require 'Validator.php';
if(Validator::validateFPath($path)){
    try{
        require '../sec/Conduit.php';
        $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
        mysqli_select_db($conn, Conduit::$dbn);
        $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $path . "%'");
        while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
            $message = $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'];
        }
        mysqli_close($conn);
    }catch(Exception $e){}
}
echo $message;