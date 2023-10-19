"use strict";

// Global variables
let validation = {
  StartDatePicked: false,
  EndDatePicked: false,
};

let excludedDates = 0;
let totalDays;
let date1, date2;

$(document).ready(function () {
  $(function () {
    $("#start_date").datepicker({
      dateFormat: "yy-mm-dd",
    });
  });

  $(function () {
    $("#end_date").datepicker({
      dateFormat: "yy-mm-dd",
    });
  });

  //  append saved data to html
  $(function () {
    $.ajax({
      url: "https://hunt-digital-assignment.onrender.com/data",
      type: "GET",
      dataType: "json", // added data type
      success: function (res) {
        res.forEach((e, i) => {
          $("tbody").append(`<tr class="table_data_row">
          <td>N/A</td>
          <td>${i + 1}</td>
          <td>
            <div id="date-picker-1" class="date-picker-container startDate">
           ${e["Start Date"]}
            </div>
          </td>
          <td>
            <div class="date-picker-container ">
            ${e["End Date"]}
            </div>
          </td>
          <td id="date-count">${e["Month, Year"]}</td>
          <td>
            <div class="date-picker-container ">
            ${e["Excluded Date"]}
            </div>
          </td>
          <td id="days-count"> ${e["Number Of days"]}</td>
          <td>
          ${e["Lead count"]}
          </td>
          <td>
          ${e["Expected Drr"]}
          </td>
          <td>
          ${e.CurrentTime}
          </td>
        </tr>`);
        });
      },
    });
  });

  // Dark mode switch
  $("#mySwitch").on("click", function () {
    $("table").toggleClass("table-dark");
  });

  //showing datepicker when user clicks on calendar icon.
  $(function () {
    $(".fa-calendar").on("click", function () {
      let id = this.id;
      if (id === "start") {
        $("#start").datepicker("show");
      } else if (id === "end" && validation.StartDatePicked) {
        $("#end").datepicker("show");
      } else if (id === "exclude" && validation.StartDatePicked) {
        $("#exclude").datepicker("show");
      } else {
        alert("First Select Start Date ");
      }
    });
  });
  // calculating No Of days
  function NumberOfDays() {
    totalDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24) + 1);
    $("#days-count").text(totalDays);
    $("#exclude_date").multiDatesPicker("resetDates");
  }

  // attaching multidate picker to excludes date input field
  $("#exclude_date").multiDatesPicker({
    onSelect: function () {
      $(this).data("datepicker").inline = true;
      let arrDate = $("#exclude_date").val().split(" ");

      excludedDates = arrDate.length;
      if (arrDate[0] === "") {
        $("#days-count").text(totalDays - 0);
      } else {
        $("#days-count").text(totalDays - excludedDates);
      }
    },
    onClose: function () {
      $(this).data("datepicker").inline = false;
    },
  });

  // submit data  to server
  $("#submit").on("click", function () {
    let currentDate = new Date($.now());

    let dateTime =
      currentDate.getDate() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    let data = {
      "Number Of days": $("#days-count").text(),
      Id: 1,
      "Start Date": $("#start_date").val(),
      "End Date": $("#end_date").val(),
      "Excluded Date": $("#exclude_date").val(),
      "Month, Year": $("#date-count").text(),
      "Lead count": $(".lead_count").val(),
      "Expected Drr": $(".expected_drr").val(),
      CurrentTime: `${dateTime}`,
    };
    $.ajax({
      url: "https://hunt-digital-assignment.onrender.com/getCity",
      type: "POST",
      data: data,
      success: function (data) {
        alert("Submitted successfully");
      },
      error: function (e) {
        alert("Server is not connected,-> run command node server.js");
      },
    });
    $(document).ajaxStop(function () {
      window.location.reload();
    });
  });

  $("#start_date").change(function () {
    let startDate = $(this).datepicker("getDate");
    $("#end_date").datepicker("option", "minDate", startDate);
    $("#exclude_date").datepicker("option", "minDate", startDate);
    $("#date-count").text(startDate.getMonth() + 1);
    date1 = startDate;
    validation.StartDatePicked = true;
    $("#end_date").removeAttr("disabled");
    $(".endDate").css("opacity", "1");
  });

  $("#end_date").change(function () {
    let endDate = $(this).datepicker("getDate");
    $("#start_date").datepicker("option", "maxDate", endDate);
    $("#exclude_date").datepicker("option", "maxDate", endDate);
    date2 = endDate;
    NumberOfDays();
    validation.EndDatePicked = true;
    $("#exclude_date").removeAttr("disabled");
    $(".datesExcluded").css("opacity", "1");
  });
});
