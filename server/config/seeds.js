const db = require("./connection");

const { Item, User } = require("../models");

db.once("open", async () => {
    await Item.deleteMany();

    const items = await Item.insertMany([
        {
            title: "Gucci Shoulder Crossbody Small Black Nylon Messenger Bag 100% Authentic",
            price: 549.99,
            image: "https://i.ebayimg.com/thumbs/images/g/WuwAAOSwwcFh4Ihb/s-l225.jpg",
            link: "https://www.ebay.com/itm/275132016038"
        },
        {
            title: "Gucci Earrings GG Logo Gold Studs Signed Stamped ® Gucci Made in Italy Gucci Box",
            price: 162.5,
            image: "https://i.ebayimg.com/thumbs/images/g/UMgAAOSwWrdh7E-9/s-l225.jpg",
            link: "https://www.ebay.com/itm/284620283368"
        },
        {
            title: "Black Gucci Zip-Up Sweater",
            price: 100,
            image: "https://i.ebayimg.com/thumbs/images/g/0UUAAOSwaJBh2doq/s-l225.jpg",
            link: "https://www.ebay.com/itm/313844784258"
        },
        {
            title: "House of Gucci Movie Poster CAST SIGNED World Premiere Lady Gaga RARE",
            price: 380,
            image: "https://i.ebayimg.com/thumbs/images/g/sh0AAOSw06dh7vpW/s-l225.jpg",
            link: "https://www.ebay.com/itm/393900835765"
        },
        {
            title: "GUCCI mod GG 1672/S col 831T9 sz 66/15 Eyeglasses Frame",
            price: 59.99,
            image: "https://i.ebayimg.com/thumbs/images/g/DNgAAOSwpOVdeK7B/s-l225.jpg",
            link: "https://www.ebay.com/itm/193115527165"
        },
        {
            title: "The Gucci Mane Guide to Greatness",
            price: 10.07,
            image: "https://i.ebayimg.com/thumbs/images/g/WxcAAOSwo-xgAGUt/s-l225.jpg",
            link: "https://www.ebay.com/itm/165271964502"
        }
    ]);

    console.log("items seeded");

    await User.deleteMany();

    await User.create({
        username: "alex7",
        email: "alex@mail.net",
        password: "password12345",
        savedItems: [
            {
                items: [items[0]._id, items[4]._id]
            }
        ]
    });

    await User.create({
        username: "pamela003",
        email: "pamsays@mail.org",
        password: "wambamthankyoupam"
    });

    console.log("users seeded");

    process.exit();
});