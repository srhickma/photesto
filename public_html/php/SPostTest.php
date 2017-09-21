<?php
ini_set('memory_limit', '132M');
$pname = filter_input(INPUT_POST, 'pname');
$pclass = filter_input(INPUT_POST, 'pclass');
$pschool = filter_input(INPUT_POST, 'pschool');
$pgrade = filter_input(INPUT_POST, 'pgrade');
$ptype = filter_input(INPUT_POST, 'ptype');
if(strlen($pname) > 0 && strlen($pclass) > 0 && strlen($pschool) > 0 && strlen($pgrade) > 0){
  $pgrade = (int) $pgrade;
  if(strlen($pname) < 76 && strlen($pclass) < 26 && strlen($pschool) < 26 && $pgrade > 0 && $pgrade < 13 && ($ptype == "test" || $ptype == "quiz" || $ptype == "assignment")){
    require 'Validator.php';
    if(Validator::validateSpaces($pname) && Validator::validateSpaces($pclass) && Validator::validateSpaces($pschool)){
        $name = "";
        $posted = false;
        $message = "";
        require '../sec/Conduit.php';
        $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
        mysqli_select_db($conn, Conduit::$dbn);
        set_error_handler('errHandle');
        $picnum = 0;
        $madeIcon = false;
        $goodUpload = true;
        $images = array();
        $rots = array();
        for($i = 0; $i < 14; $i ++){
          $tag = filter_input(INPUT_POST, 'tag' . $i);
          if(isset($_FILES["file" . $tag])){
            try{
              $file = $_FILES["file" . $tag];
              if(exif_imagetype($file['tmp_name']) == 2){
                $tstart = imagecreatefromjpeg($file['tmp_name']);
              }
              else if(exif_imagetype($file['tmp_name']) == 3){
                $tstart = imagecreatefrompng($file['tmp_name']);
              }
              else{
                $message = "Invalid image";
                $goodUpload = false;
                break;
              }
              if($goodUpload){
                list($tstartw, $tstarth) = getimagesize($file['tmp_name']);
                imagedestroy($tstart);
              }
            }catch(Exception $e){$message = "Bad Upload";$goodUpload = false;break;}
            $images[] = $file['tmp_name'];
            $rots[] = filter_input(INPUT_POST, 'rot' . $tag);
          }
        }
        if($goodUpload){
          $retval = mysqli_query($conn, "SELECT * FROM testcount");
          $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
          $testsOrig = (int) $row['tests'];
          $name = md5($testsOrig);
          for($i = 0; $i < count($images); $i ++){
            try{
                $goodImage = true;
                if(exif_imagetype($images[$i]) == 2){
                  $start = imagecreatefromjpeg($images[$i]);
                }
                else if(exif_imagetype($images[$i]) == 3){
                  $start = imagecreatefrompng($images[$i]);
                }
                else{
                  $message = "Invalid image";
                  $goodImage = false;
                }
                if($goodImage){
                    list($startw, $starth) = getimagesize($images[$i]);
                    $angle = (int)(filter_input(INPUT_POST, 'rot' . $i)) % 360;
                    $maxDim = 1400;
                    if($startw > $starth){
                      $ratio = (float) $maxDim / (float) $startw;
                      $rwidth = $maxDim;
                      $rheight = (int) ($ratio * $starth);
                    }
                    else{
                      $ratio = (float) $maxDim / (float) $starth;
                      $rheight = $maxDim;
                      $rwidth = (int) ($ratio * $startw);
                    }
                    $resized = imagecreatetruecolor($rwidth, $rheight);
                    imagecopyresampled($resized, $start, 0, 0, 0, 0, $rwidth, $rheight, $startw, $starth);
                    imagedestroy($start);
                    if($angle == 90 || $angle == 270){
                      $sx = imagecreatetruecolor($rheight, $rwidth);
                      $width = $rheight;
                      $height = $rwidth;
                    }
                    else{
                      $sx = imagecreatetruecolor($rwidth, $rheight);
                      $width = $rwidth;
                      $height = $rheight;
                    }
                    $sx = imagerotate($resized, -$angle, 0);
                    imagedestroy($resized);
                    $c = imagecreatetruecolor($width, $height);
                    imagecopymerge($c, $sx, 0, 0, 0, 0, $width, $height, 100);
                    imagetruecolortopalette($sx, false, 64);
                    imagecolormatch($c, $sx);
                    imagedestroy($c);
                    imagepng($sx, "i/lrg/" . $name . "$" . $i . ".png");
                    if(!$madeIcon){
                      $iwidth = $width / 6;
                      $iheight = $height / 6;
                      $icon = imagecreatetruecolor($iwidth, $iheight);
                      imagecopyresampled($icon, $sx, 0, 0, 0, 0, $iwidth, $iheight, $width, $height);
                      $c = imagecreatetruecolor($iwidth, $iheight);
                      imagecopymerge($c, $icon, 0, 0, 0, 0, $iwidth, $iheight, 100);
                      imagetruecolortopalette($icon, false, 64);
                      imagecolormatch($c, $icon);
                      imagedestroy($c);
                      imagepng($icon, "i/icn/" . $name . ".png");
                      $madeIcon = true;
                      imagedestroy($icon);
                    }
                    imagedestroy($sx);
                    $posted = true;
                    $picnum ++;
                }
                else{
                  break;
                }
            }catch(Exception $e){$message = "Invalid image";break;}
          }
        }
        if($posted == true){
            require 'SessionManager.php';
            SessionManager::sessionStart('Photesto');
            $usr = $_SESSION['usr'];
            if(!preg_match('/[^A-Za-z0-9]/', $usr)){
                try{
                    mysqli_query($conn, "UPDATE testcount SET tests='" . ($testsOrig + 1) . "'");
                    mysqli_query($conn, "INSERT INTO tests (name, class, school, grade, path, username, views, rep, type) VALUES ('" . $pname . "', '" . $pclass . "', '" . $pschool . "', '" . $pgrade . "', '" . $name . "$" . $picnum . "', '" . $usr . "', '0', '0', '" . $ptype . "')");
                    mysqli_query($conn, "INSERT INTO newtests (path, spot) VALUES ('" . $name . "$" . $picnum . "', '0')");
                    mysqli_query($conn, "UPDATE newtests SET spot=spot+'1'");
                    $retval = mysqli_query($conn, "SELECT * FROM newtests ORDER BY spot DESC");
                    $count = (int) mysqli_num_rows($retval);
                    if($count > 10){
                        while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                            mysqli_query($conn, "DELETE FROM newtests WHERE path='" . $row['path'] . "'");
                            break;
                        }
                    }
                }catch(Exception $e){}
            }
        }
        else{
            echo $message;
        }
        mysqli_close($conn);
    }
    else{
        $error = "School ";
        if(!Validator::validateSpaces($pname)){
          $error = "Test name ";
        }
        else if(!Validator::validateSpaces($pclass)){
          $error = "Subject/Class ";
        }
        echo $error . "must only contain letters, numbers, or spaces";
    }
  }
  else{
    echo "One of the entered fields is too long";
  }
}
else{
  echo "One or more of the required fields hasn't been entered";
}

function errHandle($errNo) {
    $msg = "error";
    if($errNo == E_NOTICE || $errNo == E_WARNING){
        throw new ErrorException($msg, $errNo);
    }
}
