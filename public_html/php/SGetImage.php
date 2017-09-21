<?php
error_reporting(0);
$name = filter_input(INPUT_GET, 'name');
$picname = filter_input(INPUT_GET, 'picname');
$size = filter_input(INPUT_GET, 's');
require 'Validator.php';
if(strlen($size) == 1 && !preg_match('/[^A-Za-z0-9]/', $size) && !preg_match('/[^A-Za-z0-9]/', $picname) && Validator::validateFPath($name)){
    $path = "../lib/picDir/" . $name;
    if($size == "s"){
        list($width, $height) = getimagesize($path);
        $src = imagecreatefrompng($path);
        $dst = imagecreatetruecolor($width / 6, $height / 6);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $width / 6, $height / 6, $width, $height);
        imagefilter($dst, IMG_FILTER_GRAYSCALE);
        imagefilter($dst, IMG_FILTER_CONTRAST, -1000);
        imagetruecolortopalette($dst, false, 2);
        ob_start();
          imagepng($dst);
          $data = ob_get_contents();
        ob_end_clean();
    }
    else{
        $data = file_get_contents($path);
    }
    echo $picname . "\n";
    echo base64_encode($data);
}
