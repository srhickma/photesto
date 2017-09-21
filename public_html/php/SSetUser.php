<?php
error_reporting(0);
require 'SessionManager.php';
SessionManager::sessionStart('Photesto');
$_SESSION["usr"] = "";
session_regenerate_id(true);