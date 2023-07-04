const mongoose= require('mongoose');

const mongoURI='mongodb://greymatter:Acer05feb@ac-fkspo3r-shard-00-00.db5b2tf.mongodb.net:27017,ac-fkspo3r-shard-00-01.db5b2tf.mongodb.net:27017,ac-fkspo3r-shard-00-02.db5b2tf.mongodb.net:27017/foodapp?ssl=true&replicaSet=atlas-q93itd-shard-0&authSource=admin&retryWrites=true&w=majority'
// console.log("hell");
const mongoDB = async () => {
  await mongoose.connect(mongoURI,{useNewUrlParser: true}, async(err,result)=>{
    if(err)console.log("---",err)
    else{
      console.log("Connected..");
      const fetched_data= await mongoose.connection.db.collection("food_items");

      fetched_data.find({}).toArray(async function(err, data){
        const foodCategory= await mongoose.connection.db.collection("foodCategory");

        foodCategory.find({}).toArray(function (err,catData){
          if(err)console.log(err);

          else{
            global.food_items=data;
            global.foodCategory=catData;
          }
        })
      })
    }
  })
};

module.exports=mongoDB;