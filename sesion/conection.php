<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "db";
  // Create connection
  $con = mysqli_connect($servername,$username,$password,$db);
  // Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>