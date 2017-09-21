<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
$usr = $_SESSION['usr'];
$tPath = filter_input(INPUT_GET, 'path');
require 'Validator.php';
if(!preg_match('/[^A-Za-z0-9]/', $usr) && Validator::validateFPath($tPath)){
    try{
      require '../sec/Conduit.php';
      $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
      mysqli_select_db($conn, Conduit::$dbn);
      $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
      $goodRate = "1";
      $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
      $rated = explode("^", $row['rated']);
      for($i = 0; $i < count($rated); $i ++){
        if($rated[$i] == $tPath){
          $goodRate = "0";
        }
      }
      $goodSave = "1";
      $saved = explode("^", $row['saved']);
      for($i = 0; $i < count($saved); $i ++){
        if($saved[$i] == $tPath){
          $goodSave = "0";
        }
      }
    }catch(Exception $e){}
}
echo $goodRate . " " . $goodSave;
