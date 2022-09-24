import dbConnect from "../../lib/dbConnect";
import Category from "../../models/categories";

export default async function handle(req, res) {
  const method = req.method;
  let success = null;
  let error = null;
  let result = null;

  if (method === "POST") {
    await dbConnect();

    const body = req.body;
    const operation = body.operation;
    const operationType = body.operationType;

    // console.log(body.operation);

    // If it is a (Read) request
    if (operation === "read") {
      // If operation type is set to (search)
      if (operationType === "search") {
        const categoryName = body.categoryName;
        const sort = body.sort;

        // console.log(categoryName);

        result = await Category.find({
          name: { $regex: categoryName, $options: "i" },
        }).sort({
          name: 1,
        });
        // console.log(result);
        if (result) {
          success = "Data was retrieved";
        }
      }

      if (operationType === "findAll") {
        // console.log(categoryName);

        result = await Category.find({});
        // console.log(result);
        if (result) {
          success = "Data was retrieved";
        }
      }
    }

    // If it is a (Update) request
    if (operation === "update") {
      // If operation type is set to (updateCategory)
      if (operationType === "updateCategory") {
        const categoryId = body.id;
        const categoryName = body.categoryName;
        const categoryUpdate = await Category.findByIdAndUpdate(categoryId, {
          name: categoryName,
        });

        if (categoryUpdate) {
          success = "Your category has been updated";
          result = await Category.find({}).sort({ name: 1 });
        } else {
          error = "Your category could not be updated";
        }
      }
    }

    // If it is a (Delete) request
    if (operation === "delete") {
      // If operation type is set to (deleteCategory)
      if (operationType === "deleteCategory") {
        const categoryId = body.id;
        const categoryDelete = await Category.findByIdAndDelete(categoryId);

        if (categoryDelete) {
          success = "Your category has been Deleted";
          result = await Category.find({}).sort({ name: 1 });
        } else {
          error = "Your category could not be deleted";
        }
      }
    }

    // If it is a (Create) request
    if (operation === "create") {
      // If operation type is set to (addCategory)
      if (operationType === "addCategory") {
        const categoryName = body.categoryName;

        const categorySave = await Category.create({ name: categoryName });

        if (categorySave) {
          success = "Your category has been added";
          result = await Category.find({}).sort({ name: 1 });
        } else {
          error = "Your category could not be created";
        }
      }
      // console.log(result);
    }

    // Send the response
    if (error === null) {
      res.status(200).send({ success, result });
    } else {
      res.status(200).send({ error });
    }
  }
}
