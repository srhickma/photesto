<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$message = "";
$paths = array();
$results = 0;
$searchString = filter_input(INPUT_GET, 'search');
$resultsWanted = (int)filter_input(INPUT_GET, 'results');
if(!preg_match('/[^A-Za-z0-9]+$/', $searchString)){
    if($resultsWanted == 25 || $resultsWanted == 50 || $resultsWanted == 100){
        try{
            $results = 0;
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            $words = explode(" ", $searchString);
            if(count($words) > 0){
                $nQString = " name LIKE '%" . $words[0] . "%'";
                $cQString = " class LIKE '%" . $words[0] . "%'";
                $sQString = " school LIKE '%" . $words[0] . "%'";
                $gQString = " grade LIKE '%" . $words[0] . "%'";
                $tQString = " type LIKE '%" . $words[0] . "%'";
                for($i = 1; $i < count($words); $i ++){
                    $nQString .= " OR name LIKE '%" . $words[$i] . "%'";
                    $cQString .= " OR class LIKE '%" . $words[$i] . "%'";
                    $sQString .= " OR school LIKE '%" . $words[$i] . "%'";
                    $gQString .= " OR grade LIKE '%" . $words[$i] . "%'";
                    $tQString .= " OR type LIKE '%" . $words[$i] . "%'";
                }
                $sResults = array();
                $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $nQString . " LIMIT " . $resultsWanted);
                $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $cQString . " LIMIT " . $resultsWanted);
                $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $sQString . " LIMIT " . $resultsWanted);
                $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $gQString . " LIMIT " . $resultsWanted);
                $sResults[] = mysqli_query($conn, "SELECT * FROM tests WHERE" . $tQString . " LIMIT " . $resultsWanted);
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
            }
            mysqli_close($conn);
        }catch(Exception $e){}
    }
}
else{
    $message = "F";
}
echo $message;

class t {

    public $num = 0;
    public $dat = "";

}
