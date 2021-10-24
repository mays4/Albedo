$(() => {
  const url = location.href;
  const category_id = url.substr(22, url.length - 1);
  $("button.cart").click(() => {
    $("div.container").slideToggle("slow");
    $("div.container").focus();
  });
  $(".item_container").on("click", "#order", function () {
    $("div.container").slideToggle("slow");
    $("div.container").focus();
  });

  $(".container").on("click", ".open", function () {
    $(".popup, .popup-content").addClass("active");
  });

  $(".close, .popup").on("click", function () {
    $(".popup, .popup-content").removeClass("active");
  });

  $(".item_container").on("click", ".add", function () {
    let $qty = $(this).closest("p").find(".qty"),
      currentVal = parseInt($qty.val()),
      isAdd = $(this).hasClass("add");
    !isNaN(currentVal) &&
      $qty.val(
        isAdd ? ++currentVal : currentVal > 0 ? --currentVal : currentVal
      );

    console.log($(this).parent().siblings(".qty").val());
    generateOrder();
  });
  $(".item_container").on("click", ".minus", function () {
    let $qty = $(this).closest("p").find(".qty"),
      currentVal = parseInt($qty.val()),
      isAdd = $(this).hasClass("add");
    !isNaN(currentVal) &&
      $qty.val(
        isAdd ? ++currentVal : currentVal > 0 ? --currentVal : currentVal
      );
    generateOrder();
  });

  $(".main_container").on("click", "#checkout_button", function () {
    console.log("checkout click handler excuted");
    // createItemElement(item)
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const fetchData = (endpoint) => {
    $.ajax({
      url: `${endpoint}`,
      method: "GET",
      dataType: "json",
      success: (data) => {
        generateItems(data.menus);
        generateCatagories(data.categories);
        generateOrder();
      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      },
    });
  };
  if (!category_id) {
    fetchData("/api/menu2");
  } else {
    fetchData("/api/menu2/" + category_id);
  }

  const fetchData2 = (endpoint2) => {
    $.ajax({
      url: `${endpoint2}`,
      type: "POST",
      dataType: "json",
      success: (data) => {
        console.log("dataCart", data);
        createOrderElement(data);
      },
    });
  };
  fetchData2("/api/menu2");

  const generateItems = function (items) {
    $("section.item_container").empty();
    for (const item of items) {
      const $item = createItemElement(item);
      $("section.item_container").prepend($item);
    }
  };

  const createItemElement = function (item) {
    const item_conainer = `
  <div class="cont">
    <div>
      <img src="${item.image_url}"class="img"/>
    </div>
    <div class="order_button">
      <button type="button" id ="order">order</button>
    </div>
    <div id= "price">
      <div class="cal">
        <ul>
          <il> ${item.name} | cal ${item.cal}</il>
        </ul>
      </div>
      <div class="cal">
        <a class="qty_adjust">CAD $ </a>
        <a class="price_adjust"> ${item.price}</a>
        <p class="qty_adjust">
        <input data-name=${item.name} id =${item.id} class="qty" type="text" value="0"/>
        <a class="minus">
          <i class="fas fa-minus"></i>
        </a>
          <a class="add">
          <i class="fas fa-plus"></i>
        </a>
        </p>
      </div>
      <div> ${item.description}
      </div>
    </div>
  </div>
  `;
    return item_conainer;
  };

  const generateCatagories = function (catagoies) {
    $("div.overlay-content").empty();
    for (const catagory of catagoies) {
      const $catagory = createCatagoryElement(catagory);
      $("div.overlay-content").prepend($catagory);
    }
  };
  const createCatagoryElement = function (catagory) {
    const catagory_container = `
    <a href="/${catagory.id}">${catagory.name}</a>
    `;
    return catagory_container;
  };

  let orderItems = [];
  let priceItems = [];
  const generateOrder = function (menuItem) {
    $(".order_list").empty();
    const localOrderItems = [];
    $(".qty").each(function () {
      const qty = $(this).val();
      const id = $(this).attr("id");
      const name = $(this).attr("data-name");
      const price = $(this).parents().siblings(".price_adjust").text();
      const item = { qty, id, name, price };
      console.log("item", item);
      if (qty !== "0") {
        localOrderItems.push(item);
        $(".order_list").empty();
        priceItems.length = 0;
        for (let orderItem of localOrderItems) {
          // console.log("ll", localOrderItems);
          const $itemOrder = createOrderElement(orderItem);
          if (orderItem.qty > 0) {
            $(".order_list").prepend($itemOrder);
          }
        }
        totalPrice();
      }
    });
  };
  const totalPrice = () => {
    let priceArr = 0;
    $(".item-total").each(function () {
      let qty = $(this).children(".item-qty").children(".qty_item").attr("value");
      let price = $(this).children(".item-price").children(".price_item").attr("value");
      let total = Number(qty) * Number(price);
      let id = $(this).children(".item-name").children(".name_item").attr("id");
      priceArr += total;
    });
    $(".total-price").text(`total ${priceArr.toFixed(2)}`);
    // console.log("total", priceArr);
  };
  const createOrderElement = function (item) {
    const order_container = `
        <tr class="item-total">
          <td class="item-qty"><input class="qty_item" type="text" name="qty" size="2"  value="${item.qty}"/></td>
					<td class="item-name"><input type="text" class="name_item" name="name" readonly  size="10" value="${item.name}"/></td>
					<td class="item-price"><input  class="price_item" type="text" name="price" readonly  size="5" value="${item.price}"/></td>

          <td><input type="hidden" name="id" size="2" value="${Number(item.id)}"/></td>

        </tr>
    `;
    return order_container;
  };
});
