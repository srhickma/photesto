<?php
error_reporting(0);
require 'class.phpmailer.php';
require 'class.smtp.php';
$usr = filter_input(INPUT_POST, 'usr');
$message = "";
$found = false;
if(strlen($usr) > 0){
    if(!preg_match('/[^A-Za-z0-9]/', $usr)){
        try{
            $email = "";
            require '../sec/Conduit.php';
            $conn = mysqli_connect(Conduit::$dbh, Conduit::$dbu, Conduit::$dbp);
            mysqli_select_db($conn, Conduit::$dbn);
            $retval = mysqli_query($conn, "SELECT * FROM upass WHERE username='" . $usr . "'");
            while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)){
                $found = true;
                $email = $row['email'];
            }
            $message = "S";
            if($found == true){
                try{
                    $code = dechex(mt_rand() / mt_getrandmax() * 1000000000);
                    mysqli_query($conn, "UPDATE upass SET fpcode='" . $code . "' WHERE username='" . $usr . "'");
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
                    $mail->Subject = 'Photesto Password Reset';
                    $mail->Body = "Click the link to reset your password\nhttp://photesto.space/resetpass.php?usr=" . $usr . "&code=" . $code;
                    $mail->AltBody = "Click the link to reset your password\nhttp://photesto.space/resetpass.php?usr=" . $usr . "&code=" . $code;
                    $mail->send();
                }catch(Exception $e){}
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
echo $message;
