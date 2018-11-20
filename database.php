<?php

$dbhost = 'oniddb.cws.oregonstate.edu';
$dbname = 'kimjasmi-db';
$dbuser = 'kimjasmi-db';
$dbpass = 'sR4E5gIeq5cPvVyM';

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

echo 'Successfully connected to database!';

$mysqli->close();

?>
