<?php

//Opening Conection
include("../sesion/conection.php");

//Variables POST
$name = $_REQUEST["name"];

//Querys
$sqlConfigHeater = "SELECT * FROM config_heaters WHERE name = '$name'";
$instConfigHeater = mysqli_query($con,$sqlConfigHeater);

//JSON
echo json_encode(mysqli_fetch_array($instConfigHeater));




?>