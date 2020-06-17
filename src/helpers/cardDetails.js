import paymaya from "paymaya-js-sdk";

const cardDetails = (
  total,
  fn,
  ln,
  con,
  email,
  ad,
  cty,
  zip,
  cartArray,
  trans
) => {
  // console.log(cartArray);

  let itemsArray;

  itemsArray = cartArray.map((item) => {
    return {
      name: `${item.item.name} flavor  (${item.item.shell.name} shell)`,
      quantity: item.quantity,
      code: item.itemId,
      description: `${item.item.name} flavor (${item.item.shell.name} shell)`,
      amount: {
        value: item.item.price,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: item.item.price * item.quantity,
        },
      },
      totalAmount: {
        value: item.item.price * item.quantity,
        details: {
          discount: 0,
          serviceCharge: 0,
          shippingFee: 0,
          tax: 0,
          subtotal: item.item.price * item.quantity,
        },
      },
    };
  });

  const exampleCheckoutObject = {
    totalAmount: {
      value: total,
      currency: "PHP",
      details: {
        discount: 0,
        serviceCharge: 0,
        // "shippingFee": 50,
        tax: 0,
        subtotal: total,
      },
    },
    buyer: {
      firstName: fn,
      // middleName: ln,
      lastName: ln,
      // birthday: "1995-10-24",
      // customerSince: "1995-10-24",
      // sex: "M",
      contact: {
        phone: con,
        email: email,
      },
      billingAddress: {
        line1: ad,
        line2: " ",
        city: cty,
        state: "Metro Manila",
        zipCode: zip,
        countryCode: "PH",
      },
    },
    items: itemsArray,
    redirectUrl: {
      success: "https://fj-prime.now.sh/",
      failure: "https://fj-prime.now.sh/",
      cancel: "https://fj-prime.now.sh/",
    },
    requestReferenceNumber: trans,
    logoUrl: "https://fj-prime.now.sh/assets/img/foodhub.png",
    metadata: {},
  };

  paymaya.createCheckout(exampleCheckoutObject);
};

export default cardDetails;
