<?php
require 'class.phpmailer.php';
require 'class.smtp.php';
$usr = filter_input(INPUT_POST, 'usr');
$message = "";
$found = false;
if(strlen($usr) > 0){
    if(!preg_match('/[^A-Za-z0-9]/', $usr)){
        try{
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
            $email = "";
            $code = "";
            while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                $found = true;
                $email = $row['email'];
                $code = $row['code'];
            }
            if($found == true && $code != "v"){
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
                    $mail->addAddress($email);
                    $mail->WordWrap = 200;
                    $mail->isHTML(true);
                    $mail->Subject = 'Photesto Account Verification';
                    $mail->Body    = 'Your account verification code is: ' . $code;
                    $mail->AltBody = 'Your account verification code is: ' . $code;
                    $mail->send();
                }catch(Exception $e){}
            }
            else{
                $message = "Account does not need verification";
            }
            mysqli_close($conn);
        }catch(Exception $e){}
    }
    else{
        $message = "Username must only contain letters and numbers";
    }
}
else{
    $message = "You must enter your username";
}
print $message;