<?php
require_once(__DIR__ . "/../../../vendor/autoload.php");

use Utils\Mailer;

$email = $_POST['email'];
$emailSubject = 'report bug';
$body = $_POST['body'];
$emailSent = Mailer::sendMail($email,  $emailSubject, $body, strip_tags($body), 'fr_ai_generate_support');
if(!$emailSent){
    echo json_encode(['success'=>false, 'message'=>'errorSendingEmail']);
} else {
    echo json_encode(['success'=>true, 'message'=>'emailSent']);
}