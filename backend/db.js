const mongoose = require("mongoose");
const mongoURI =
  "mongodb://HaraleAmoolRao:Amool123@ac-eyozzot-shard-00-00.uarwybc.mongodb.net:27017,ac-eyozzot-shard-00-01.uarwybc.mongodb.net:27017,ac-eyozzot-shard-00-02.uarwybc.mongodb.net:27017/FoodFreshmern?ssl=true&replicaSet=atlas-cuxcl0-shard-0&authSource=admin&retryWrites=true&w=majority";

// const mongoDB = () =>{
//    mongoose.connect(mongoURI,{useNewUrlParser:true})
//    .then(()=> console.log("connected"))
//    .catch((err)=>console.log(err));
// }

// const mongoDB = async() => {
//    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
//       if(err) console.log("---",err)
//       else{
//           console.log("connected");
//           const fetched_data = await mongoose.connection.db.collection("food_items");
//           fetched_data.find({}).toArray(function(err,data){
//             const foodCategory = await mongoose.connection.db.collection("foodCategory");
//             foodCategory.find({}).toArray(function(err,catData){
//                if(err) console.log(err);
//                else {
//                   global.food_items = data;
//                   global.foodCategory = catData;
//                }
//             })
//             // if(err) console.log(err);
//             // else{
//             //    global.food_items = date;
//             //    console.log(global.food_items)
//             // }
//           })
//          }
//    });
// }
const mongoDB = async () => {
   try {
     await mongoose.connect(mongoURI, { useNewUrlParser: true });
     console.log("Connected");
 
     const foodItemsCollection = await mongoose.connection.db.collection("food_items");
     const foodItemsData = await foodItemsCollection.find({}).toArray();
 
     const foodCategoryCollection = await mongoose.connection.db.collection("foodCategory");
     const foodCategoryData = await foodCategoryCollection.find({}).toArray();
 
     global.food_items = foodItemsData;
     global.foodCategory = foodCategoryData;
     //console.log(foodItemsData)
 
   //   console.log("Food Items:", global.food_items);
   //   console.log("Food Categories:", global.foodCategory);
 
   } catch (err) {
     console.error("Error:", err);
   }
 };
 


module.exports = mongoDB;
//module.exports = foodItemsData;