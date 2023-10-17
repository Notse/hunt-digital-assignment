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

  // adding hardcode data to fill the empty area
  $(function () {
    [1, 2, 3, 4].forEach((e) => {
      $("tbody").append(`<tr class="table_data_row">
      <td>N/A</td>
      <td>${e}</td>
      <td>
        <div id="date-picker-1" class="date-picker-container startDate">
        2023-10-03
        </div>
      </td>
      <td>
        <div class="date-picker-container ">
        2023-10-25
        </div>
      </td>
      <td id="date-count"></td>
      <td>
        <div class="date-picker-container ">
        10/04/2023, 10/05/2023, 10/06/2023
        </div>
      </td>
      <td id="days-count">20</td>
      <td>
       8000
      </td>
      <td>
        400
      </td>
      <td>
      2023-10-17
      </td>
    </tr>`);
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
      //   console.log((excludedDates = $("#exclude_date").val().split(" ")));
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

  $("#submit").on("click", function () {
    // let actionUrl = "http://127.0.0.1:4000/";
    // $.ajax({
    //   type: "POST",
    //   url: actionUrl,
    //   data: "data is sending", // serializes the form's elements.
    //   success: function (data) {
    //     alert(data); // show response from the php script.
    //   },
    // });
    alert("Data Saved");
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
