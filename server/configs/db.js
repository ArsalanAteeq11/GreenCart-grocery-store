import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("err", error.message);
  }
};

export default connectDB;
