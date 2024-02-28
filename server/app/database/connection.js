const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://leminhtri:qwer1234@atlascluster.zxndapz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connect" + con.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
