<?php
sessiion_start();
if(!sset($_SESSION['full_name'])){
    header("location: log.html");
    exit();
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>welcome</title>
    </head>
    <body>
        <h2>Welcome, <?php echo $_SESSION['full_name']; ?></h2>
        <a href="logout.php">Logout</a>
    </body>
</html>
