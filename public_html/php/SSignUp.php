<?php
error_reporting(0);
require 'class.phpmailer.php';
require 'class.smtp.php';
$usr = filter_input(INPUT_POST, 'suusr');
$pas = filter_input(INPUT_POST, 'supwd');
$pasc = filter_input(INPUT_POST, 'supwdc');
$suemail = filter_input(INPUT_POST, 'suemail');
$message = "";
$worked = true;
$workedb = true;
if(strlen($pas) > 0 && strlen($pasc) > 0 && strlen($usr) > 0){
  if(strlen($pas) < 26 && strlen($pasc) < 26 && strlen($usr) < 26 && strlen($suemail) < 226){
    if($pas == $pasc){
        if(!preg_match('/[^A-Za-z0-9]/', $pas) && !preg_match('/[^A-Za-z0-9]/', $usr)){
            require 'Validator.php';
            if(filter_var($suemail, FILTER_VALIDATE_EMAIL) && Validator::validateEmail($suemail)){
                try{
                    require '../sec/Conduit.php';
                    $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
                    mysqli_select_db($conn, Conduit::$dbn);
                    $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
                    while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                        $worked = false;
                        $message = "Username already taken";
                    }
                    if($worked == true){
                        $retvalb = mysqli_query($conn, "SELECT * FROM upass WHERE email='" . $suemail . "'");
                        while($row = mysqli_fetch_array($retvalb, MYSQLI_ASSOC)){
                            $workedb = false;
                            $message = "There is already an account associated with " . $suemail;
                        }
                        if($workedb == true){
                            $code = dechex(mt_rand() / mt_getrandmax() * 1000000000);
                            $hash = password_hash($pas, PASSWORD_DEFAULT);
                            mysqli_query($conn, "INSERT INTO upass (username, password, email, code, fpcode, rated, saved) VALUES ('" . $usr . "', '" . $hash . "', '" . $suemail . "', '" . $code . "', 'v', '', '')");
                            $message = "S";
                            try{
                                $mail = new PHPMailer;
                                $mail->isSMTP();
                                $mail->Host = 'server212.web-hosting.com';
                                $mail->SMTPAuth = true;
                                $mail->Username = 'noreply@photesto.space';
                                $mail->Password = 'XLt4bz927y';
                                $mail->SMTPSecure = 'ssl';
                                $mail->Port = 465;
                                $mail->setFrom('noreply@photesto.space', 'Photesto');
                                $mail->addAddress($suemail);
                                $mail->WordWrap = 200;
                                $mail->isHTML(true);
                                $mail->Subject = 'Photesto Account Verification';
                                $mail->Body = 'Your account verification code is: ' . $code;
                                $mail->AltBody = 'Your account verification code is: ' . $code;
                                $mail->send();
                            }catch(Exception $e){}
                        }
                    }
                    mysqli_close($conn);
                }catch(Exception $e){}
            }
            else{
                $message = "Invalid email address";
            }
        }
        else{
            $message = "Username and password must only contain letters and numbers";
        }
    }
    else{
        $message = "The passwords entered must be the same";
    }
  }
}
else{
    $message = "You have not filled in one of the required fields";
}
echo $message;
