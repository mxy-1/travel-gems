import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    console.log(typeof process.env.MONGODB_URI_DEV)
    await mongoose.connect(process.env.MONGODB_URI_DEV, {autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true, })
    console.log("connected to mongodb")
    
  } catch (error) {
    console.log(error)
  }
}


// global.mongoose = {
//   conn: null,
//   promise: null
// }

// const getMongoUri = () => {
//   if (process.env.NODE_ENV === 'production') return process.env.MONGODB_URI;
//   if (process.env.NODE_ENV === 'test') return process.env.MONGODB_URI_TEST;
//   return process.env.MONGODB_URI_DEV;
// };

// export const connectToDatabase = async () => {
//   let promise;
//   try {
//     if (global.mongoose && global.mongoose.conn) {
//       console.log('connected from previous')
//       return global.mongoose.conn;
//     } else {
//       promise = mongoose.connect(getMongoUri(), {
//         autoIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log(typeof promise, "type???")
//       console.log(promise, "The promise")
//     }

//     global.mongoose = {
//       conn: await promise,
//       promise,
//     }
//     console.log("Newly connected to MongoDB")

//   } catch (error) {
//     console.log(error)
//     throw new Error("Error connecting to the database: ", error)
//   }
// }
