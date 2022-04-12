jQuery(document).ready(function ($) {
  "use strict";

  $(".owl-carousel").owlCarousel({
    items: 4,
    lazyLoad: true,
    loop: true,
    dots: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  /* activate jquery isotope */
  var $container = $(".posts").isotope({
    itemSelector: ".item",
    isFitWidth: true,
  });

  $(window).smartresize(function () {
    $container.isotope({
      columnWidth: ".col-sm-3",
    });
  });

  $container.isotope({ filter: "*" });

  // filter items on button click
  $("#filters").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $container.isotope({ filter: filterValue });
  });

  $("#carousel").flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: "#slider",
  });

  $("#slider").flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel",
  });
});

var item_ids = [], item_titles = [], item_prices = [], item_quantities = [];
var temp = getCookie("item_ids");
if(temp != "")
  item_ids = JSON.parse(temp);
var temp2 = getCookie("item_titles");
if(temp2 != "")
  item_titles = JSON.parse(temp2);
var temp3 = getCookie("item_prices");
if(temp3 != "")
  item_prices = JSON.parse(temp3);
var temp4 = getCookie("item_quantities");
if(temp4 != "")
  item_quantities = JSON.parse(temp4);

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
  let c = ca[i];
  while (c.charAt(0) == ' ') {
  c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
  return c.substring(name.length, c.length);
  }
}
return "";
}

function add_all_to_cart_from_cookies(){
  var i;
  var count = 0;
  $('tbody').html("");
  for(i=0;i<item_ids.length;i++){
    $("tbody").html(
      $("tbody").html() +
        `
		<tr id="cart-` +
        item_ids[i] +
        `">
			<td scope="row" class="item-title">` +
        item_titles[i] +
        `</td>
			<td>
			<i class="fa fa-minus-circle p-2" onclick="dec('` +
        item_ids[i] +
        `')" aria-hidden="true"></i>
			<span class="item-quantity">`+item_quantities[i]+`</span>
			<i class="fa fa-plus-circle p-2" aria-hidden="true" onclick="inc('` +
        item_ids[i] +
        `')"></i>
			</td>
			<td>$<span class="item-price">` +
        item_prices[i]*item_quantities[i]+
        `</span></td>
			<td><i class="fa fa-times-circle p-2" onclick="del('` +
        item_ids[i] +
        `')" aria-hidden="true"></i></td>
		</tr>
		`
    );
    tot_price();
    count++;
    $(".badge").html(count);
  }
}

function add_to_cart(item_id) {
  var item_title = $("#" + item_id + " h4").html();
  var item_price = parseFloat(
    $("#" + item_id + " h6")
      .html()
      .split("$")[1]
  );
  $("#modelId").modal();
  // item id and title both are primary key
  var x = document.querySelectorAll('tbody .item-title');
  var i,
  flag = 0;
  for (i = 0; i < x.length; i++) {
    if (item_title == x[i].textContent) {
      flag = 1;
    }
  }
  if (flag == 1) inc(item_id);
  else {
    item_ids.push(item_id);
    setCookie("item_ids", JSON.stringify(item_ids), 7);
    item_titles.push(item_title);
    setCookie("item_titles", JSON.stringify(item_titles), 7);
    item_prices.push(item_price);
    setCookie("item_prices", JSON.stringify(item_prices), 7);
    item_quantities.push(1);
    setCookie("item_quantities", JSON.stringify(item_quantities), 7);
    add_all_to_cart_from_cookies();
  }
}
add_all_to_cart_from_cookies();
function inc(item_id) {
  var i;
  for(i=0;i<item_ids.length;i++){
    if(item_ids[i] == item_id){
      var stock_left = parseInt($('#'+item_id+' .stock-left').html().split(' ')[0]);
      if(item_quantities[i] < stock_left){
        item_quantities[i]++;
        setCookie("item_quantities", JSON.stringify(item_quantities), 7);
      } else {
      alert("Stocks not available!");
      }
    }
  }
  add_all_to_cart_from_cookies();
}
function dec(item_id) {
  var item_quantity = parseInt(
    $("#cart-" + item_id + " .item-quantity").text()
  );
  if (item_quantity > 0) {
    var i;
    for(i=0;i<item_ids.length;i++){
      if(item_ids[i] == item_id){
        item_quantities[i]--;
        if(item_quantities[i] == 0)
            del(item_id);
        setCookie("item_quantities", JSON.stringify(item_quantities), 7);
      }
    }
    add_all_to_cart_from_cookies();
  }
}
function tot_price() {
  var x = document.querySelectorAll("#modelId .item-price");
  var i,
    sum = 0;
  for (i = 0; i < x.length; i++) {
    sum += parseFloat(x[i].textContent);
    $("tfoot").html(
      `
		<tr>
			<td></td>
			<td><b>Total</b></td>
			<td id="total">$` +
        sum +
        `</td>
		</tr>
		`
    );
  }
  if (x.length == 0) {
    $("tfoot").html(`
		<tr>
			<td></td>
			<td><b>Total</b></td>
			<td id="total">$0</td>
		</tr>
		`);
  }
}
function del(item_id) {
  document.getElementById("cart-" + item_id).remove();
  tot_price();
  var count = parseInt($(".badge").html());
  count--;
  $(".badge").html(count);
  var i;
  for(i=0;i<item_ids.length;i++){
    if(item_ids[i] == item_id){
      item_ids = item_ids.filter(function(item) {
        return item != item_ids[i]
      })
      console.log(JSON.stringify(item_ids));
      item_titles = item_titles.filter(function(item) {
        return item != item_titles[i]
      })
      // item_prices = item_prices.filter(function(item) {
      //   return item != item_prices[i]
      // })
      item_prices.splice(i, 1);
      // item_quantities = item_quantities.filter(function(item) {
      //   return item != item_quantities[i]
      // })
      item_quantities.splice(i, 1);
      setCookie("item_ids", JSON.stringify(item_ids), 7);
      setCookie("item_titles", JSON.stringify(item_titles), 7);
      setCookie("item_prices", JSON.stringify(item_prices), 7);
      setCookie("item_quantities", JSON.stringify(item_quantities), 7);
      break;
    }
  }
}

