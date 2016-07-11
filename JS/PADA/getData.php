<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
	$link = mysql_connect('localhost', 'wilko', 'tittle');
	if (!$link) {
	    die('Could not connect: ' . mysql_error());
	}

	$sql = "SELECT * FROM pada2016S.Games;";
	$result = mysql_query($sql, $link);
	if (!$result) {
	    echo 'Error executing sql: ' . mysql_error() . "\n";
	}

	while ($row = mysql_fetch_assoc($result)) {
		echo $row['name'] . "-" . $row['data'] . "\n";
	}
?>
</body>
</html>