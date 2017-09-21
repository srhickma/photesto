<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
$usr = $_SESSION['usr'];
$tPath = filter_input(INPUT_POST, 'tPath');
require 'Validator.php';
if(!preg_match('/[^A-Za-z0-9]/', $usr) && Validator::validateFPath($tPath)){
  require '../sec/Conduit.php';
  $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
  mysqli_select_db($conn, Conduit::$dbn);
  $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
  $newPath = "";
  $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
  $saved = explode("^", $row['saved']);
  for($i = 0; $i < count($saved); $i ++){
    if($saved[$i] != $tPath){
      $newPath .= $saved[$i] . "^";
    }
  }
  if($row['saved'] != $newPath){
    mysqli_query($conn, "UPDATE upass SET saved='" . $newPath . "' WHERE username='" . $usr . "'");
  }
  mysqli_close($conn);
}
