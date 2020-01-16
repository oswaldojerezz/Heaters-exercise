<?php

//Opening Conection
include("../sesion/conection.php");

//Variables POST
$name = $_REQUEST["name"];


//Pagination
if(isset($_REQUEST["currentPage"])){
    $currentPage = $_REQUEST["currentPage"];
    $sqlConfigHeater = "SELECT * FROM data_heaters WHERE name = '$name' LIMIT ".$currentPage.",10";
}else{
    $sqlConfigHeater = "SELECT * FROM data_heaters WHERE name = '$name' LIMIT 10";
}

//Initial DATA
if($name == "0"){
    $sqlConfigHeater = "SELECT * FROM data_heaters LIMIT 10";
}

//Querys
$instConfigHeater = mysqli_query($con,$sqlConfigHeater);

//Object from Iterations
while ($rs = mysqli_fetch_array($instConfigHeater)) {   
    $heaterObj [] = [  $rs["name"],$rs["time"],$rs["amps"],$rs["total_energy"]];
}

$newArray = array();

$newArray = array(
    'heaterReg' => $heaterObj
);

//JSON
echo json_encode($newArray);




?>