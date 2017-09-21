<?php
error_reporting(0);
$message = "";
$paths = array();
$results = 0;
$pname = filter_input(INPUT_GET, 'pname');
$pclass = filter_input(INPUT_GET, 'pclass');
$pschool = filter_input(INPUT_GET, 'pschool');
$pgrade = filter_input(INPUT_GET, 'pgrade');
$ptype = filter_input(INPUT_GET, 'ptype');
$resultsWanted = (int)filter_input(INPUT_GET, 'results');
require 'Validator.php';
if(((strlen($pname) < 26 && strlen($pname) > 0 && Validator::validateSpaces($pname)) || $pname == "") && ((strlen($pclass) < 26 && strlen($pclass) > 0 && Validator::validateSpaces($pclass)) || $pclass == "") && ((strlen($pschool) < 26 && strlen($pschool) > 0 && Validator::validateSpaces($pschool)) || $pschool == "") && ($pgrade == "" || ((int) $pgrade > 0 && (int) $pgrade < 13)) && ($ptype == "test" || $ptype == "quiz" || $ptype == "assignment" || $ptype == "any") && ($resultsWanted == 25 || $resultsWanted == 50 || $resultsWanted == 100)){
  $results = 0;
  require '../sec/Conduit.php';
  $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
  mysqli_select_db($conn, Conduit::$dbn);
  $sResults = array();
  if($pname != ""){
      $words = explode(" ", $pname);
      $qString = " name LIKE '%" . $words[0] . "%'";
      for($i = 1; $i < count($words); $i ++){
          $qString .= " OR name LIKE '%" . $words[$i] . "%'";
      }
      $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $qString . " LIMIT " . $resultsWanted);
  }
  if($pclass != ""){
      $words = explode(" ", $pclass);
      $qString = " class LIKE '%" . $words[0] . "%'";
      for($i = 1; $i < count($words); $i ++){
          $qString .= " OR class LIKE '%" . $words[$i] . "%'";
      }
      $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $qString . " LIMIT " . $resultsWanted);
  }
  if($pschool != ""){
      $words = explode(" ", $pschool);
      $qString = " school LIKE '%" . $words[0] . "%'";
      for($i = 1; $i < count($words); $i ++){
          $qString .= " OR school LIKE '%" . $words[$i] . "%'";
      }
      $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $qString . " LIMIT " . $resultsWanted);
  }
  if($pgrade != ""){
      $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE grade='" . $pgrade . "' LIMIT " . $resultsWanted);
  }
  if($ptype != ""){
      $words = explode(" ", $ptype);
      $qString = " type LIKE '%" . $words[0] . "%'";
      for($i = 1; $i < count($words); $i ++){
          $qString .= " OR type LIKE '%" . $words[$i] . "%'";
      }
      $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $qString . " LIMIT " . $resultsWanted);
  }
  $sTests = array();
  for($i = 0; $i < count($sResults); $i ++){
    while($row = mysqli_fetch_array($sResults[$i], MYSQLI_ASSOC)){
      $tdata = $row['name'] . "%" . $row['class'] . "%" . $row['school'] . "%" . $row['grade'] . "%" . $row['path'] . "%" . $row['username'] . "%" . $row['views'] . "%" . $row['rep'] . "%" . $row['type'];
      $found = false;
      for($j = 0; $j < count($sTests); $j ++){
        if($sTests[$j]->dat == $tdata){
          $sTests[$j]->num = $sTests[$j]->num + 1;
          $found = true;
          break;
        }
      }
      if(!$found){
        $sTests[] = new t;
        $sTests[count($sTests) - 1]->dat = $tdata;
      }
    }
  }
  require 'QuickSort.php';
  $sTests = QuickSort::sort($sTests);
  for($i = count($sTests) - 1; $i >= 0; $i --){
    if($results == $resultsWanted){
      break;
    }
    else{
      $results ++;
      $message .= $sTests[$i]->dat . "^";
    }
  }
  mysqli_close($conn);
}
else{echo "F";}
echo $message;

class t {

    public $num = 0;
    public $dat = "";

}
