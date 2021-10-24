// Fulfillment scripts are here




$(() => {






})


const createOrder = function (order) {
  const $order = $(`

  <div class="foodItem" style="
  border: solid 5px rgb(119, 202, 126);
  padding: 10px;
  margin: 5px;
  min-width: 90%;
   overflow-wrap: break-word;
   ">

      <section class="order-box">
        <main class="order-details">

          <div class="set-time">
            <button type="button" class="set-time-button btn btn-outline-warning" data-time="15">15 MIN</button>
            <button type="button" class="set-time-button btn btn-outline-warning" data-time="30">30 MIN</button>
            <button type="button" class="set-time-button btn btn-outline-warning" data-time="45">45 MIN</button>
          </div>

          <div class="order-items">
            <div class="order-number" data-order_no="${order.id}" style="text-align: center;"> <b>Order#: ${order.id} </b></div>
            <div class="order-line" data-order_no="${order.order_no}">${order.order_no}</div>
            <div class="order-note">${order.order_note}</div>
          </div>

          <div class="order-fulfilled">
            <button type="button" class="order-fulfilled-button"><i class="fa-solid fa-check"></i></button>
          </div>

        </main>

        <footer class="order-time">
          <div class="time-ordered">${timeago.format(order.order_time)}</div>
          <div class="time-remaining">${order.estimated_time}min remaining</div>
        </footer>

      </section>


  </div>

    `);

  return $order;
};
