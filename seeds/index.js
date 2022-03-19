const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '62347a3858f97581bd64c1ac',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/denbvkeuy/image/upload/v1647605633/YelpCamp/christopher-jolly-gcCcIy6Fc_M-unsplash_xpyj74.jpg',
                    filename: 'YelpCamp/christopher-jolly-gcCcIy6Fc_M-unsplash_xpyj74'
                },
                {
                    url: 'https://res.cloudinary.com/denbvkeuy/image/upload/v1647605627/YelpCamp/jet-van-der-wouden-k42aEvMwUGA-unsplash_h7ir3b.jpg',
                    filename: 'YelpCamp/jet-van-der-wouden-k42aEvMwUGA-unsplash_h7ir3b'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})