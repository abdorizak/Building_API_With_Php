<?php

header("Content-Type: application/json");

include('conn.php');

// $action ? $action = $_POST['action'] "";

if (isset($_POST['action'])) {
    $action = $_POST['action'];
}

function readAllEmployee($conn)
{
    $data = array(); //last result
    $dataArray = array(); // while loop temp
    // prepare the query
    $query = "SELECT * FROM employee";
    $result = $conn->query($query);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $dataArray[] = $row;
        }
        $data = array("status" => true, "data" => $dataArray);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}
function readEmployeeInfo($conn)
{
    extract($_POST);
    $query = "SELECT * from employee where id = '$id'";
    $result = $conn->query($query);
    if ($result) {
        // get the data
        while ($row = $result->fetch_assoc()) {
            $dataArray[] = $row;
        }
        $data = array("status" => true, "data" => $dataArray);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

// register employee
function registerEmployee($conn)
{

    extract($_POST);
    $data = array();
    $query = "INSERT INTO employee(name,phone,address)VALUE('$name','$phone','$address')";
    $result = $conn->query($query);
    if ($result) {
        $data = array("status" => true, "data" => "SuccessFully Registered");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

// update employee

function updateEmployee($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE employee set name = '$name', phone = '$phone',address = '$address' WHERE id = '$update_id'";
    $result = $conn->query($query);
    if ($result) {
        $data = array("status" => true, "data" => "SuccessFully Updated");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}
// delete employee

function deleteEmployee($conn)
{

    extract($_POST);
    $data = array();
    $query = "DELETE FROM employee";
    $result = $conn->query($query);
    if ($result) {
        $data = array("status" => true, "message" => "Deleted Successfully");
    } else {
        $data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($data);
}

if (isset($action)) {
    $action($conn);
} else {
    echo json_encode("Please Send The Action");
}
