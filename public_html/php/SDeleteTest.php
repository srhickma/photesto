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
  $goodDel = false;
  $retval = mysqli_query($conn, "SELECT * FROM tests WHERE path LIKE '%" . $tPath . "%' AND username='" . $usr . "'");
  while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
      $goodDel = true;
      for($i = 0; $i < (int) explode("$", $row['path'])[1]; $i ++){
          unlink("i/lrg/" . $tPath . "$" . $i . ".png");
      }
      unlink("i/icn/" . $tPath . ".png");
  }
  if($goodDel){
      mysqli_query($conn, "DELETE FROM tests WHERE path LIKE '%" . $tPath . "%'");
      mysqli_query($conn, "DELETE FROM hrtests WHERE path LIKE '%" . $tPath . "%'");
      mysqli_query($conn, "DELETE FROM mvtests WHERE path LIKE '%" . $tPath . "%'");
      mysqli_query($conn, "DELETE FROM newtests WHERE path LIKE '%" . $tPath . "%'");
      $retval = mysqli_query($conn, "SELECT * FROM upass WHERE rated LIKE '%" . $tPath . "%'");
      while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
          $newR = "";
          $rated = explode("^", $row['rated']);
          for($i = 0; $i < count($rated); $i ++){
              if($rated[$i] != $tPath && $rated[$i] != ""){
                  $newR .= $rated[$i] . "^";
              }
          }
          mysqli_query($conn, "UPDATE upass SET rated='" . $newR . "' WHERE username='" . $row['username'] . "'");
      }
      $retval = mysqli_query($conn, "SELECT * FROM upass WHERE saved LIKE '%" . $tPath . "%'");
      while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
          $newS = "";
          $saved = explode("^", $row['saved']);
          for($i = 0; $i < count($saved); $i ++){
              if($saved[$i] != $tPath && $saved[$i] != ""){
                  $newS .= $saved[$i] . "^";
              }
          }
          mysqli_query($conn, "UPDATE upass SET saved='" . $newS . "' WHERE username='" . $row['username'] . "'");
      }
      $retval = mysqli_query($conn, "SELECT * FROM hrtests");
      $count = (int) mysqli_num_rows($retval);
      if($count < 10){
          mysqli_query($conn, "UPDATE minofmax SET minmaxr='0'");
      }
      $retval = mysqli_query($conn, "SELECT * FROM mvtests");
      $count = (int) mysqli_num_rows($retval);
      if($count < 10){
          mysqli_query($conn, "UPDATE minofmax SET minmaxv='0'");
      }
  }
  mysqli_close($conn);
}
