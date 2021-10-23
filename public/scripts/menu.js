
$(() => {
  const url = location.href;
  const category_id = url.substr(22, url.length - 1)
  // alert(category_id)
  $("button.cart").click(() => {
    $("div.container").slideToggle("slow");
    $("div.container").focus()
  });
  $('.item_container').on('click', '#order', function () {
    $("div.container").slideToggle("slow");
    $("div.container").focus()
  });

  $(".container").on("click", ".open", function () {
    $(".popup, .popup-content").addClass("active");
  });

  $(".close, .popup").on("click", function () {
    $(".popup, .popup-content").removeClass("active");
  });
  $(function () {
    $('.item_container').on('click', '.add', function () {
      // $('.minus,.add').on('click', function() {
      // alert("3321dd")
      let $qty = $(this).closest('p').find('.qty'),

        currentVal = parseInt($qty.val()),
        isAdd = $(this).hasClass('add');
      !isNaN(currentVal) && $qty.val(
        isAdd ? ++currentVal : (currentVal > 0 ? --currentVal : currentVal)
      );
      console.log("q",$qty)
      console.log($(this).parent().siblings(".qty").val())
      generateOrder();

    });
  });
  $(function () {
    $('.item_container').on('click', '.minus', function () {
      // $('.minus,.add').on('click', function() {

      let $qty = $(this).closest('p').find('.qty'),
        currentVal = parseInt($qty.val()),
        isAdd = $(this).hasClass('add');
      !isNaN(currentVal) && $qty.val(
        isAdd ? ++currentVal : (currentVal > 0 ? --currentVal : currentVal)
      );
      generateOrder();

    });
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
        // if (endpoint === "/api/menu") {

        // } else if (endpoint === "/api/catacories")
        // generateCatagories(data);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      }
    });
  }
  if (!category_id) {
    fetchData("/api/menu2");
  } else {
    fetchData("/api/menu2/" + category_id);
  }

  // fetchData("/api/catacories");

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
    return item_conainer
  };

  const generateCatagories = function (catagoies) {
    $("div.overlay-content").empty();
    for (const catagory of catagoies) {
      const $catagory = createCatagoryElement(catagory);
      $("div.overlay-content").prepend($catagory);
    }
  }
  const createCatagoryElement = function (catagory) {
    const catagory_container = `
    <a href="/${catagory.id}">${catagory.name}</a>
    `
    return catagory_container
  };

  let orderItems = [];
  let priceItems = [];
  const generateOrder = function (menuItem) {
    $(".oreder_list").empty();
    const localOrderItems = [];
    $(".qty").each(function () {
      const qty = $(this).val()
      const id = $(this).attr("id")
      const name = $(this).attr("data-name")
      const price = $(this).parents().siblings(".price_adjust").text()
      const item = { qty, id, name ,price};
       console.log("item", item)
       if(qty !== '0'){
         localOrderItems.push(item)
         $(".oreder_list").empty();
         priceItems.length = 0
         for(let orderItem of localOrderItems){
           console.log("ll",localOrderItems)
           const $itemOrder = createOrderElement(orderItem);
           if (orderItem.qty > 0) {
             $(".oreder_list").prepend($itemOrder);
            }
          }
          totalPrice()
        }
    });
  }
  const totalPrice = () => {
    let priceArr = 0;
    $(".item-total").each(function () {
     let qty=  $(this).children(".item-qty").text()
      let price = $(this).children(".item-price").text()
     let total = Number(qty) * Number(price)
     priceArr += total
    })
    $(".total-price").text(`total ${priceArr.toFixed(2)}`)
    console.log("total",priceArr)

  }
  const createOrderElement = function (item) {
    const order_container = `

        <tr class ="item-total">
          <td class ="item-qty">${item.qty}</td>
					<td>${item.name}</td>
					<td class ="item-price">${item.price}</td>
          <td>${item.total}</td>
      </tr>

    `
    return order_container
  };

  const getUserName = function () {
    $(".user-name").each(function () {
      const username = $(this).val()

    });
    $(".phone").each(function () {

      const userPhone = $(this).val()
    })


  }

  const CreateUserElement = function (user) {
    const user_container = `
      <il> username</il>
      <il> <input class = "user-name" data-name=${user.name}type="text"> </il>
      <il>phone number</il>
      <il> <input  class = "phone" data-name=${user.phone}type="text"></il>
      <il>
      <button id ="submit_button" class="close">submit</button>
      </il>
  `
    return user_container
  }


});
