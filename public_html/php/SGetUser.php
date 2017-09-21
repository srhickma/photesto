<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
if(isset($_SESSION['usr'])){
    $usr = $_SESSION['usr'];
    if(!preg_match('/[^A-Za-z0-9]/', $usr)){
        echo $_SESSION['usr'];
    }
    else{
        echo "";
    }
}
else{
    echo "";
}
