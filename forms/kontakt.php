<?php

	header('Content-type:application/json;charset=utf-8');
	header('Access-Control-Allow-Origin: https://florianweich.me');
	header('Access-Control-Allow-Origin: https://www.florianweich.me');

	if ( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) && isset($_POST['privacypolicy']) ) {

		if ( isset($_POST['subject']) && !empty($_POST['subject']) ) {
			// Honeypot
			$response = ["success" => false];
			echo json_encode( $response );
			return;
		}

		if ( $_POST['privacypolicy'] != "on" ) {
			$response = ["success" => false, "error" => "Privacy policy must be read and accepted."];
			echo json_encode( $response );
			return;
		}

		$to = "hallo@florianweich.me";
		$subject = "Nachricht via florianweich.me";
		$body = $_POST["name"]." (".$_POST["email"].") schreibt:\n\n". $_POST["message"]. "\n\n=====\nDatenschutzerklärung wurde akzeptiert: ja";
		$header = 'From: form@florianweich.me' . "\r\n" .
		'Reply-To: '.$_POST["email"].'' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
		 
		if ( mail($to, $subject, $body, $header) ) {
			$response = ["success" => true];
			echo json_encode( $response );
		} else {
			$response = ["success" => false, "error" => "Mail function failed."];
			echo json_encode( $response );
		}

	} else {
	
		$response = ["success" => false, "error" => "Missing request params."];
		echo json_encode( $response );
		
	}

?>