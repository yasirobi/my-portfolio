const mongoose = require ("mongoose");
const colors = require('colors');
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
        
    );
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

module.exports = connectDB;