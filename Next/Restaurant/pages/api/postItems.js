import mongoose from "mongoose";
import dbConnect from "../../lib/dbConnect";
import foodItems from "../../models/foodItems";
import foodOrders from "../../models/orders";
import userInfo from "../../models/userInfo";

export default async function handle(req, res) {
  let success = null;
  let error = null;
  let result = null;

  const method = req.method;

  if (method === "POST") {
    const body = req.body;
    const operation = body.operation;
    const operationType = body.operationType;

    // console.log(body);

    await dbConnect();

    // If it is a (Create) request
    if (operation === "create") {
      // If operation type is set to (addItem)
      if (operationType === "addItem") {
        const name = body.itemName;
        const description = body.itemDesc;
        const price = body.price;
        const image = body.itemImage;
        const category = body.itemCategory;

        // add new item to database
        try {
          const item = await foodItems.create({
            name,
            description,
            price,
            image,
            category,
          });
          // console.log(item);
          if (item) {
            success = "Your item has been saved";
            result = await foodItems.find({}).sort({ name: -1 });
            // console.log(result);
          } else {
            error = "Something went wrong while saving your data";
          }
        } catch (err) {
          console.log(err);
        }
      }

      // If operation type is set to (order)
      if (operationType === "order") {
        const userID = body.userID;
        const items = body.items;
        const address = body.address;
        const status = "pending";

        // add new customer order to database with status
        try {
          const item = await foodOrders.create({
            user: mongoose.Types.ObjectId(userID),
            items,
            address,
            status,
          });

          // console.log(item);
          if (item) {
            success = "Your item has been saved";
            result = item;
            // console.log(result);
          } else {
            error = "Something went wrong while saving your data";
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    // If it is a (Read) request
    if (operation === "read") {
      // If operation type is set to (search)
      if (operationType === "search") {
        const name = body.itemName;

        // Search for items by name
        try {
          const items = await foodItems.find({
            name: { $regex: name, $options: "i" },
          });

          if (items) {
            success = "Data was retrieved";
            result = items;
          } else {
            error = "Data was not retrieved";
          }
        } catch (err) {
          error = err.response;
          console.log(error);
        }
      }

      // If operation type is set to (orderItems)
      if (operationType === "orderItems") {
        const userID = body.userID;

        let item = {};

        // Get all orders and their items from the database
        try {
          // Get all items that have not been completed
          const incompleteItems = await foodOrders
            .find({ user: userID })
            .sort({ _id: -1 })
            .populate({ path: "user", select: "_id email username" })
            .where("status")
            .ne("delivered");

          // Get all items that have been completed
          const completeItems = await foodOrders
            .find({ user: userID })
            .sort({ _id: -1 })
            .populate({ path: "user", select: "_id email username" })
            .where("status")
            .equals("delivered");

          item.incompleteItems = incompleteItems;
          item.completeItems = completeItems;
          // console.log(item);
          if (item) {
            success = "Your item has been retrieved";
            result = item;
          } else {
            error = "Data was not received";
          }
        } catch (err) {
          console.log(err);
          error = err;
        }
      }

      // If operation type is set to (getAllOrders)
      if (operationType === "getAllOrders") {
        const userSearch = body.userSearch;
        const orderSort = body.orderSort;

        let orderStatus;

        if (orderSort === "all") {
          orderStatus = { $ne: "" };
        } else if (orderSort === "pending") {
          orderStatus = "pending";
        } else if (orderSort === "complete") {
          orderStatus = "delivered";
        } else {
          orderStatus = { $ne: "complete" };
        }

        let items = null;
        // console.log(searchOrder);

        try {
          // Find all orders belonging to a specific user
          if (userSearch) {
            const userID = userSearch.value;
            // const userID = await userInfo
            //   .find({
            //     username: { $regex: searchOrder, $options: "i" },
            //     role: "user",
            //   })
            //   .select("_id");

            // console.log(userID);
            items = await foodOrders
              .find({
                user: userID,
                status: orderStatus,
              })
              .populate({
                path: "user",
                select: "username email _id",
              });
          } else {
            // Find all orders that belong to all users
            items = await foodOrders
              .find({
                status: orderStatus,
              })
              .populate({
                path: "user",
                select: "username email _id",
              });
          }

          if (items) {
            success = "Your item has been retrieved";
            result = items;
          } else {
            error = "Your item was not retrieved";
          }
        } catch (err) {
          console.log(err);
          error = err;
        }
      }

      // If operation type is set to (getUserInfo)
      if (operationType === "getUserInfo") {
        const userID = body.userID;

        try {
          // Get Single user info
          const user = await userInfo
            .find({ _id: userID })
            .select({
              _id: -1,
              username: 1,
              email: 1,
            })
            .sort({ userID: -1 });

          if (user) {
            success = "Your item has been retrieved";
            result = user;
          } else {
            error = "Your Item was not received";
          }
        } catch (err) {
          console.log(err);
          error = err;
        }
      }

      // If operation type is set to (findOne)
      if (operationType === "findOne") {
        const itemId = body.itemId;

        try {
          // Find single item by it's ID
          const item = await foodItems.findOne({ _id: itemId });
          //   console.log(item);
          if (item) {
            result = item;
          } else {
            error = "Data was not received";
          }
        } catch (err) {
          console.log(err);
          error = err;
        }
      }

      // If operation type is set to (findAll)
      if (operationType === "findAll") {
        try {
          // Find all Items in database
          const items = await foodItems.find({}).sort({ name: -1 });

          if (items) {
            success = "Data has been retrieved";
            result = items;
          } else {
            error = "Data was not retrieved";
          }
        } catch (err) {
          console.log(err);
          error = err;
        }
      }
    }

    // If it is a (Update) request
    if (operation === "update") {
      // If operation type is set to (updateItem)
      if (operationType === "updateItem") {
        const id = body.itemID;
        const name = body.itemName;
        const description = body.itemDesc;
        const price = body.price;
        const image = body.itemImage;
        const category = body.itemCategory;

        try {
          // Find and Update single item by it's ID
          const item = await foodItems.findByIdAndUpdate(id, {
            name,
            description,
            price,
            image,
            category,
          });
          // console.log(item);
          if (item) {
            success = "Your item has been saved";
            result = await foodItems.find({}).sort({ name: -1 });
            // console.log(result);
          } else {
            error = "Something went wrong while saving your data";
          }
        } catch (err) {
          console.log(err);
        }
      }

      // If operation type is set to (updateStatus)
      if (operationType === "updateStatus") {
        const id = body.orderID;
        const status = body.orderStatus;

        // Update the status of the item by it's ID
        try {
          const item = await foodOrders.findByIdAndUpdate(id, {
            status,
          });
          // console.log(item);
          if (item) {
            success = "Your item has been saved";
            result = await foodItems.find({}).sort({ name: -1 });
            // console.log(result);
          } else {
            error = "Something went wrong while saving your data";
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    // If it is a (Delete) request
    if (operation === "delete") {
      // If operation type is set to (deleteItem)
      if (operationType === "deleteItem") {
        const id = body.itemID;

        // Delete Single item bu it's ID
        const deleteItem = await foodItems.findByIdAndDelete(id);

        if (deleteItem) {
          success = "Your item has been deleted";
          result = await foodItems.find({}).sort({ name: -1 });
        } else {
          error = "Something went wrong while deleting your data";
        }
      }
    }
  }

  // Send the response
  if (error === null) {
    // console.log(result);
    res.status(200).send({ success, result });
  } else {
    res.status(400).send({ error });
  }
}
