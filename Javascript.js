


$(document).ready(function() {
  //the trigger on hover when cursor directed to this class
  $(".core-menu li").hover(
    function() {
      //i used the parent ul to show submenu
      $(this)
        .children("ul")
        .slideDown("fast");
    },
    //when the cursor away
    function() {
      $("ul", this).slideUp("fast");
    }
  );
  //this feature only show on 600px device width
  $(".hamburger-menu").click(function() {
    $(".burger-1, .burger-2, .burger-3").toggleClass("open");
    $(".core-menu").slideToggle("fast");
  });

  //Support The Museum

  $(".open-custom-control").on("click", function() {
    $(".button-selectors-custom").show();
  });

  $(".button-value").on("click", function() {
    $(".button-selectors-custom")
      .removeAttr("style")
      .hide();
    var arr = $(this).text();
    console.log(arr);
    let value = parseInt(arr);
    console.log(value);
    number1 = value;
    $(".support-the-museum-total-price").text("Total price : " + value + "$");
  });

  $(".input-donation-form").change(function() {
    var arr = $(this).val();
    let value = parseInt(arr);
    if (value < 0) $(".input-donation-form").val((value *= -1));
    $(".support-the-museum-total-price").text("Total price : " + value + "$");
    number1 = value;
  });
  //Payment

  let a = $(".support-the-museum-total-price")
    .text()
    .split(":");
  let number1 = parseInt(a[1]);

  paypal.Button.render(
    {
      // Configure environment
      env: "sandbox",
      client: {
        sandbox: "demo_sandbox_client_id",
        production: "demo_production_client_id"
      },
      // Customize button (optional)
      locale: "en_US",
      style: {
        size: "small",
        color: "black",
        shape: "rect"
      },

      // Enable Pay Now checkout flow (optional)
      commit: true,

      // Set up a payment
      payment: function(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: number1,
                currency: "USD"
              }
            }
          ]
        });
      },
      // Execute the payment
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
          // Show a confirmation message to the buyer
          window.alert("Thank you for your purchase!");
        });
      }
    },
    "#paypal-button"
  );

  //Buy Ticket Script
  $(".sale-item-down").click(function() {
    let element = $(this)
      .parent()
      .find(".sale-item-quantity");
    var quantity = parseInt(element.text());

    if (quantity <= 0) {
      $(element).text(quantity);
    } else {
      $(element).text(quantity - 1);
      $(this).css("opacity", "1");
      let number = $(this)
        .parent()
        .find(".sale-item-price");
      let price = parseInt(number.text());
      let arr = $(".admission-total-price")
        .text()
        .split(":");
      console.log(arr);
      let currentPrice = parseInt(arr[1]);
      result = currentPrice - price;
      $(".admission-total-price").text("Total: " + result + "$");
      number1 = result;
    }
    if (quantity - 1 <= 0) $(this).css("opacity", "0.3");
  });

  $(".sale-item-up").click(function() {
    let element = $(this)
      .parent()
      .find(".sale-item-quantity");
    var quantity = parseInt(element.text());
    $(element).text(quantity + 1);

    $(this)
      .parent()
      .find(".sale-item-down")
      .css("opacity", "1");

    let number = $(this)
      .parent()
      .find(".sale-item-price");
    let price = parseInt(number.text());
    let arr = $(".admission-total-price")
      .text()
      .split(":");
    console.log(arr);
    let currentPrice = parseInt(arr[1]);
    result = price + currentPrice;
    $(".admission-total-price").text("Total: " + result + "$");
    number1 = result;
  });

  //Donate to The Museum
});
