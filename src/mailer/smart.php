<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];

// echo "$name <br> $phone <br> $email";

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'логин от gmail';                 // Наш логин
$mail->Password = 'паротль от gmail';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('логин от gmail', 'тема сообщения');   // От кого письмо 
$mail->addAddress('логин клиента (куда вы хотите отправлять верстку)');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Тема';
$mail->Body    = 'текст сообщения';

if(!$mail->send()) {
    echo "<br>" . $mail->ErrorInfo;
    return false;
} else {
    echo "success!";
    return true;
}

?>