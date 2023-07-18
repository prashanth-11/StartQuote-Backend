const mongoose = require("mongoose");
const uri = "mongodb+srv://puchhakayalaprashanth:Ubad6ediYpTkDyPS@cluster0.nneut4i.mongodb.net/";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connection Successful");
});

db.on("error", () => {
  console.log("Error in mongodb connection");
});

// module.exports = mongoose;
// module.exports = () => {
//   try {
//     mongoose.connect(
//       "mongodb+srv://placement:26D7O1T2cZyOxBED@cluster0.ieghgqu.mongodb.net/",
//       {
//         useNewUrlparser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("DB connection Successful!!");
//   } catch (error) {
//     console.log("Db connection Failed!!");
//     console.log("Dev DBERROR:-", error);
//   }
// };
