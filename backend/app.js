const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const projectRoutes = require('./routes/projectRoutes');
const connectDB = require('./config/db');



//configure env
dotenv.config({ path: "./config/.env" });


//databse config
connectDB()

const app = express()
mongoose.set('strictQuery', true);


//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());



app.use('/api/v1', userRoutes );
app.use('/api/v1', projectRoutes );
app.use('/api/v1', categoryRoutes );




//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});