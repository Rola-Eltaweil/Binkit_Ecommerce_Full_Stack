import mongoose from "mongoose";
import Ordermodel from "../model/order.model.js";
import User from "../model/User.model.js";
import Cart from "../model/Cart.model.js";
import Stripe from "../config/Stripe.js";

export const PaymentCash = async (req, res) => {
  try {
    const userId = req.userId;
    const { delivery_address, Total_amount, items_list, sub_Total_amount } =
      req.body;

    const payload = items_list.map((el) => {
      return {
        userId: userId,
        orderId: "Order" + new mongoose.Types.ObjectId(),
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image[0],
        },
        paymentId: "",
        paymentStatus: "CASH ON DELEIVERY",
        delivery_address: delivery_address,
        sub_Total_amount: sub_Total_amount,
        Total_amount: Total_amount,
      };
    });

    const createorder = await Ordermodel.insertMany(payload);
    const deletedcart = await Cart.deleteMany({ userId: userId });
    const updatecartuser = await User.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    return res.status(200).json({
      message: "order success",
      error: false,
      success: true,
      data: createorder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, error: true, success: false });
  }
};

export const pricewithdiscount = (price, discount = 1) => {
  const actualamount = Math.ceil((Number(price) * Number(discount)) / 100);
  console.log(actualamount, "s");
  const lastamount = Number(price) - actualamount;
  return lastamount;
};

export const Paymentonline = async (req, res) => {
  try {
    const userId = req.userId;
    const { items_list, Total_amount, sub_Total_amount, address_Id } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const items = items_list.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productId.name,
          images: [item?.productId?.image[0]], // ✅ صح
          metadata: { productId: item.productId._id },
        },
        unit_amount: Math.round(
          pricewithdiscount(item.productId.price, item.productId.discount) * 100
        ),
      },
      adjustable_quantity: { enabled: true, minimum: 1 },
      quantity: item.quantity,
    }));

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: { userId, addressId: address_Id },
      line_items: items,
      success_url: `${process.env.FRONTED_URL_ONE}/success`,
      cancel_url: `${process.env.FRONTED_URL_ONE}/cancel`,
    };

    const session = await Stripe.checkout.sessions.create(params);

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      message: error.message || "Payment creation failed",
      success: false,
      error: true,
    });
  }
};

const getOrderProductItems = async ({
  lineitem,
  userId,
  addressId,
  paymentId,
  paymentStatus,
}) => {
  const productList = [];

  if (lineitem?.data?.length) {
    for (const item of lineitem.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const payload = {
        userId,
        orderId: "Order" + new mongoose.Types.ObjectId(),
        productId: product.metadata.productId,
        product_details: {
          name: product.name,
          image: product.images[0], // ✅ استخدم images بدل image
        },
        paymentId,
        paymentStatus,
        delivery_address: addressId,
        sub_Total_amount: item.amount_subtotal / 100, // ✅ استخدم المبلغ الصحيح من line item
        Total_amount: item.amount_total / 100, // ✅ استخدم المبلغ الصحيح من line item
      };

      productList.push(payload);
    }
  }

  return productList;
};


export const webhooks = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

    // ✅ تأكيد أن الحدث حقيقي من Stripe
    const event = Stripe.webhooks.constructEvent(req.body, sig, secret);
    console.log("🔔 Received event:", event.type);

    switch (event.type) {
      // ✅ الحدث الأصح للتعامل مع الطلبات هو checkout.session.completed
      case "checkout.session.completed": {
        const session = event.data.object;

        // استرجاع تفاصيل المنتجات من Stripe
        const line_items = await Stripe.checkout.sessions.listLineItems(
          session.id
        );

        // بناء البيانات للـ order
        const orderProducts = await getOrderProductItems({
          lineitem: line_items,
          userId: session.metadata.userId,
          addressId: session.metadata.addressId,
          paymentId: session.payment_intent,
          paymentStatus: session.payment_status,
        });

        // إدخال الطلب في قاعدة البيانات
        const order = await Ordermodel.insertMany(orderProducts);

        if (order) {
          await User.findByIdAndUpdate(session.metadata.userId, {
            shopping_cart: [],
          });
          await Cart.deleteMany({ userId: session.metadata.userId });
        }

        console.log("✅ Order saved successfully:", order);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export const getorders =async(req,res)=>{
  try {
    const userId =req.userId
    const allorder = await Ordermodel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({data:allorder ,success:true ,error:false})
  } catch (error) {
    return res
      .status(500)
      .json({ message: error || error.message, success: false ,error:true });
  }
}

