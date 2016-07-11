<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
$servername = "localhost";
$username = "wilko";
$password = "tittle";
$dbname = "pada2016S";

// Get Name and Data
$name = strval($_GET['name']);
$data = strval($_GET['data']);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE Games SET data='" . $data . "' WHERE name = '" . $name . "'";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
</body>
</html>