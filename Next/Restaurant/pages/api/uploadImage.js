import formidable from "formidable";

export default async function handle(req, res) {
  let success = null;
  let error = null;
  let result = null;

  // Set formidable to get incoming image file
  const form = new formidable.IncomingForm();

  // console.log("Successfully uploaded");

  // Get form data
  form.parse(req, function (err, fields, files) {
    // Get the file system
    const fs = require("fs");

    // get the file
    var file = files.image;

    // console.log(file);
    var oldPath = file.filepath;
    var newPath = "./public/uploads/" + file.originalFilename;

    // get file from temp location
    var rawData = fs.readFileSync(oldPath, async function (err) {
      if (err) console.log(err);
    });

    // Upload file to upload folder
    fs.writeFile(newPath, rawData, async function (err) {
      if (err) {
        error = "Image not Uploaded";
        // console.log(err);
      } else {
        success = "Image uploaded";
        // console.log(success);
      }

      if (error === null) {
        res.status(200).send({ success, error, result });
      } else {
        res.status(400).send({ error });
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
