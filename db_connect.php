<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'baybayabondb');

try{
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
}catch(Error $e){
    echo 'An error occured.';
    echo 'Message: '. $e -> getMessage() .'</br>';
    echo 'The system is busy please try again.';
}

$dbHost = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "baybayabondb";

$db = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if($db->connect_error){
    die("Connection Failed: ". $db->connect_error);
}else{
    echo"<h4 style='color: green;'>Database has successfully connected."."</h4>";
}

?>