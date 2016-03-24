/**
 * Created by samuel on 2/15/2016.
 */

/*global $, document*/

var current_page = 1;
var records_per_page = 6;
var myArray;
var w_id;

function send_request(url) {
    "use strict";
    var obj, result;
    obj = $.ajax({
        url: url,
        async: false
    });
    result = $.parseJSON(obj.responseText);
    return result;
}

//function change_page(page) {
//
//    "use strict";
//
//    var btn_next = document.getElementById("btn_next");
//    var btn_prev = document.getElementById("btn_prev");
//    var div;
//    var page_span = document.getElementById("page");
//    var num;
//
//    // Validate page
//    if (page < 1) page = 1;
//    if (page > numPages()) page = numPages();
//
//    var div = "";
//    div += '<table class="highlight bordered centered" >';
//    div += '<thead>';
//    div += '<tr>';
//    div += '<th data-field="name" style="color: #00695c"> Wine</th>';
//    div += '<th data-field="id"   style="color: #00695c"> Year</th>';
//    div += '<th data-field="id"   style="color: #00695c"> Wine Type</th>';
//    div += '<th data-field="id"   style="color: #00695c"> Winery</th>';
//    //div += '<th data-field="id"   style="color: #00695c"> Variety</th>';
//    div += '<th data-field="id"   style="color: #00695c"> Cost</th>';
//    div += '<th data-field="id"   style="color: #00695c"> </th>';
//    div += '<th data-field="id"></th>';
//    div += '<th data-field="id"></th>';
//    div += '</tr>';
//    div += '</thead>';
//    div += '<tbody>';
//
//    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < myArray.length; i++) {
//        div += '<tr id="' + myArray[i].wine_id + '">';
//        div += '<td>' + myArray[i].wine_name + '</td>';
//        div += '<td>' + myArray[i].year + '</td>';
//        div += '<td>' + myArray[i].wine_type + '</td>';
//        div += '<td>' + myArray[i].winery_name + '</td>';
//        //div += '<td>' + myArray[i].variety + '</td>';
//        div += '<td> $' + myArray[i].cost + '</td>';
//        div += '<td><a onclick="get_details(' + myArray[i].wine_id + ')" class="btn btn-floating btn-small waves-effect waves-light teal"><i class="material-icons">mode_edit</i></a></td>';
//        div += '<td><a class="btn-floating btn-samll waves-effect waves-light red"><i class="material-icons">delete</i></a></td>';
//        div += '</tr>';
//    }
//
//    div += '</tbody>';
//    div += '</table>';
//    document.getElementById("results").innerHTML = div;
//    //    $("#results").html(div);
//
//    page_span.innerHTML = page;
//
//    if (page == 1) {
//        btn_prev.style.visibility = 'hidden';
//    } else {
//        btn_prev.style.visibility = 'visible';
//    }
//
//    if (page == numPages()) {
//        btn_next.style.visibility = 'hidden';
//    } else {
//        btn_next.style.visibility = 'visible';
//    }
//}

//function prev_page() {
//
//    if (current_page > 1) {
//        current_page--;
//        change_page(current_page);
//    }
//}
//
//function next_page() {
//
//    if (current_page < numPages()) {
//        current_page++;
//        change_page(current_page);
//    }
//}
//
//function numPages() {
//    return Math.ceil(myArray.length / records_per_page);
//}

//function admin_load_wines() {
//    "use strict";
//
//    var url, result;
//    url = "controller.php?cmd=2";
//    result = send_request(url);
//    myArray = result.wines;
//
//    change_page(1);
//
//}

//function search_wines(name) {
//    "use strict";
//
//    var url, wine, result;
//    wine = name;
//    url = "controller.php?cmd=1&name=" + wine;
//    result = send_request(url);
//    myArray = result.wines;
//    change_page(1);
//}

//function load_by_type(type) {
//    "use strict";
//
//    var url, result;
//    //wine = name;
//    url = "controller.php?cmd=3&type=" + type;
//    result = send_request(url);
//    myArray = result.wines;
//    change_page(1);
//
//}

//function sort_price() {
//    "use strict";
//
//    var url, result;
//    //wine = name;
//    url = "controller.php?cmd=4";
//    result = send_request(url);
//    myArray = result.wines;
//    change_page(1);
//}

//function get_details(id) {
//
//    "use strict";
//
//    var url, result, vary;
//
//    url = "controller.php?cmd=5&id=" + id;
//    result = send_request(url);
//
//    document.getElementById("name").value = result.wine_name;
//    document.getElementById("year").value = result.year;
//
//    $("#wt").val(result.wine_type);
//    $("#wt").material_select();
//
//    $("#winery").val(result.winery_name);
//    $("#winery").material_select();
//
//    document.getElementById("winery").value = result.winery_name;
//    document.getElementById("cost").value = result.cost;
//
//    w_id = id;
//    //alert(result.cost);
//    var but = "";
//    but = '<a class="waves-effect waves-light btn" onclick="update()">Update</a>';
//    $("#forbutton").html(but);
//}

//function update() {
//
//    var u, url, result, result2, name, year, type, winery, cost;
//
//    name = document.getElementById("name").value;
//
//    year = document.getElementById("year").value;
//
//    cost = document.getElementById("cost").value
//
//    winery = document.getElementById("winery").value;
//
//    type = document.getElementById("wt").value;
//
//    var w = "controller.php?cmd=9&name=" + winery;
//    var t = "controller.php?cmd=10&type=" + type;
//
//    var r1 = send_request(w);
//    var r2 = send_request(t);
//
//    var ww = r1.winery;
//    var tt = r2.type;
//
//    url = "controller.php?cmd=11&name=" + name + "&type=" + tt + "&woo=" + ww + "&year=" + year + "&cost=" + cost + "&id=" + w_id;
//    result = send_request(url);
//
//    if (result.result === 1) {
//        Materialize.toast('Updated!', 4000);
//        window.location.reload('edit.php');
//    }
//    else {
//        alert("failed");
//        Materialize.toast('Failed!', 4000)
//    }
//}

//function showAdd() {
//    var but = "";
//
//    but += '<div class="input-field i">';
//    but += '<input id="id" type="number" placeholder=" " min="0" required>';
//    but += '<label for="id">Wine ID</label>';
//    but += '</div>';
//
//    but += '<div class="input-field i">';
//    but += '<input id="qty" type="number" placeholder=" " min="0" required>';
//    but += '<label for="qty">On Hand</label>';
//    but += '</div>';
//
//    but += '<a class="waves-effect waves-light btn" onclick="insert()">Add</a>';
//
//    $("#forbutton").html(but);
//}

//function insert() {
//
//    var id, name, year, type, winery, cost, qty, result, url;
//
//
//    //d = Date();
//    name = document.getElementById("name").value;
//
//    year = document.getElementById("year").value;
//
//    type = document.getElementById("wt").value;
//
//    winery = document.getElementById("winery").value;
//
//    id = document.getElementById("id").value;
//
//    cost = document.getElementById("cost").value;
//
//    qty = document.getElementById("qty").value;
//
//    var w = "controller.php?cmd=9&name=" + winery;
//    var t = "controller.php?cmd=10&type=" + type;
//
//    var r1 = send_request(w);
//    var r2 = send_request(t);
//
//    var ww = r1.winery;
//    var tt = r2.type;
//
//    url = "controller.php?cmd=12&name=" + name + "&type=" + tt+ "&winery=" + ww + "&year=" + year + "&id=" + id + "&cost=" + cost + "&qty=" + qty;
//    result = send_request(url);
//
//    if (result.result === 1) {
//        Materialize.toast('Added Successfully!', 4000);
//        window.location.reload('edit.php');
//    }
//}

//function login() {
//    var url, result, u, p;
//
//    u = document.getElementById("username").value;
//    p = document.getElementById("password").value;
//
//    url = 'controller.php?cmd=6&username=' + u + '&password=' + p;
//
//    result = send_request(url);
//    //alert(result.result);
//    if (result.result == 1) {
//        $("#adminform").fadeOut(1000);
//        //$("#adminform").slideUp();
//        window.location.replace('edit.php');
//    }
//}

//function load_by_type(wine) {
//    "use strict";
//
//    var url, result;
//    //wine = name;
//    url = "controller.php?cmd=3&type=" + wine;
//    result = send_request(url);
//    myArray = result.wines;
//    change_page(1);
//
//}

//function populateWineries() {
//
//    var url, result, div;
//
//    url = "controller.php?cmd=8";
//
//    result = send_request(url);
//
//    div = "";
//    div += '<option>Select a Winery</option>';
//    for (var i in result.wineries) {
//        div += '<option id "' + result.wineries[i].winery_id + '">' + result.wineries[i].winery_name + '</option>';
//    }
//
//    $("#winery").append(div);
//}

//function logout(){
//    //var url,result;
//    //
//    //url = "controller.php?cmd=13";
//    //
//    //result = send_request(url);
//    //
//    //if(result.result === 1){
//    //    window.location.replace('admin.html');
//    //}
//}


