<?php

$conn = new mysqli("localhost", "root", "","empoloye");


if($conn){
    // echo "seccesfull";
}else{
    echo $conn->error;
}