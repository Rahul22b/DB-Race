import { MongoClient } from "mongodb";
import { createClient } from 'redis';

const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const client = new MongoClient(url);


const redisClient = createClient({
    url: redisUrl
});




const data={
    name:"John Doe",
    email:"johndoe@example.com",
    age:30,
    address:"123 Main St, Anytown, USA",
    work:"Software Engineer",
    hobbies:["reading","traveling","coding"],
    father:"Robert Doe",
    mother:"Jane Doe",
    dob:"1990-01-01",
    gender:"Male",
    phone:"123-456-7890",
    nationality:"American",
    maritalStatus:"Single",
    education:{
        degree:"Bachelor's in Computer Science",
        university:"XYZ University",
        graduationYear:2012
    },
    skills:["JavaScript","Node.js","MongoDB","React"],
    languages:["English","Spanish"],
    socialMedia:{
        linkedin:"https://www.linkedin.com/in/johndoe",
        github:"https://github.com/johndoe"
    }
}



try
{
await client.connect();

console.time("mongo Insert Time");
 await client.db().collection("users").insertOne(data);
    console.timeEnd("mongo Insert Time");


console.time("mongo Find Time");
 await client.db().collection("users").findOne({ email: "johndoe@example.com" });
    console.timeEnd("mongo Find Time");

    

client.close();

}
catch(err)
{
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
}











try{
const redisdb=await redisClient.connect();

const stringifiedData = JSON.stringify(data);
console.time("redis Insert Time");

redisdb.set("user:1", stringifiedData, (err, reply) => {
    if (err) {
        console.error("Error setting data in Redis:", err);
    } else {
        console.log("Data set in Redis:", reply);
    }
});

console.timeEnd("redis Insert Time");

console.time("redis Find Time");


 redisdb.get("user:1", (err, reply) => {
        if (err) {
            console.error("Error getting data from Redis:", err);
        }
        if (reply) {
            console.log("Data retrieved from Redis:", JSON.parse(reply));
        }
    });

console.timeEnd("redis Find Time");

redisClient.close()


}
catch(err)
{
    console.error("Error connecting to Redis:", err);
    process.exit(1);
}





