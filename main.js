let EmployeeTable = $("#EmployeeTable");
let btnAction = "Insert";

// console.log(EmployeeTable);

let showModalBtn = $("#showModalBtn");

showModalBtn.on("click", function () {
  $("#EmployeeModal").modal("show");
});

// when submit The data

$("#empForm").on("submit", function (event) {
  event.preventDefault();

  let name = $("#empName").val();
  let phone = $("#empPhone").val();
  let address = $("#empAdress").val();
  let updateId = $("#updateId").val();

  let sendingData = {};

  if (btnAction == "Insert") {
    sendingData = {
      action: "registerEmployee",
      name: name,
      phone: phone,
      address: address,
    };
  } else {
    sendingData = {
      action: "updateEmployee",
      name: name,
      phone: phone,
      address: address,
      update_id: updateId,
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "./api.php",
    data: sendingData,
    success: function (data) {
      let status = data["status"];
      let response = data.data;

      if (status) {
        alert(response);
        $("#EmployeeModal").modal("hide");
        $("#empForm")[0].reset();
        btnAction = "Insert";
        loadData();
      } else {
        console.log(response);
      }
    },
    error: function (data) {
      console.log("Some Errorr");
    },
  });
});

loadData();

function loadData() {
  $("#EmployeeTable tbody").html("");

  // ajax

  let sendingData = {
    action: "readAllEmployee",
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "./api.php",
    data: sendingData,
    success: function (data) {
      let status = data["status"];
      let response = data.data;
      let html = "";
      let tr = "";
      let td = "";
      if (status) {
        response.forEach((item) => {
          tr += "<tr>";
          for (let i in item) {
            // console.log(`${i} : ${item[i]}`);
            tr += `<td ${i}=${item[i]}>${item[i]}</td>`;
          }
          tr += `<td><button class="btn btn-success update_info" infoUpdate=${item["id"]}><i class="fa fa-edit"></i></button>&nbsp;&nbsp;&nbsp;<button class="btn btn-danger delete_info" infoDelete=${item["id"]}><i class="fa fa-trash"></i></button></td>';
                    tr += '</tr>`;
        });

        html = tr;

        $("#EmployeeTable tbody").append(html);
      } else {
        console.log(response);
      }
    },
    error: function (data) {
      console.log("Some Errorr");
    },
  });
}
function fetchData(id) {
  // ajax

  let sendingData = {
    action: "readEmployeeInfo",
    id: id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "./api.php",
    data: sendingData,
    success: function (data) {
      let status = data["status"];
      let response = data.data;

      if (status) {
        $("#empName").val(response[0].name);
        $("#empPhone").val(response[0].phone);
        $("#empAdress").val(response[0].address);
        $("#updateId").val(response[0].id);

        $("#EmployeeModal").modal("show");
      } else {
        console.log(response);
      }
    },
    error: function (data) {
      console.log("Some Errorr");
    },
  });
}
// Update
$("#EmployeeTable").on("click", "button.update_info", function () {
  btnAction = "Update";
  let id = $(this).attr("infoUpdate");

  fetchData(id);
});
