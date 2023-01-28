const mongoose = require('mongoose');

// Functie connect mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        dbName: 'westerkracht',
      },
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
mongoose.set('strictQuery', true)

module.exports = connectDB;