
var Product=require('../Models/product');
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('localhost:27017/shopping');
var products= [
    new Product({
    imagePath:"https://media.contentapi.ea.com/content/dam/ea/easports/fifa/features/2017/cristiano-ronaldo/june5/ronaldo-share.jpg",
    title:'FIFA-18',
    description:"Awesome!!!",
    price: "19.99"

    }),

    new Product({
        imagePath:"https://icdn2.digitaltrends.com/image/horizon-zero-dawn-1-720x720-720x405-c.jpg",
        title:'Horizon-zero Dawn',
        description :"Awesome!!!",
        price: "19.99"

    }),
    new Product({
        imagePath:"https://ubistatic19-a.akamaihd.net/ubicomstatic/en-us/global/search-thumbnail/poptfs_searchthumbnail_mobile_158098.jpg",
        title:'Prince of Persia',
        description:"Awesome!!!",
        price: "17.99"

    }),
    new Product({
        imagePath:"https://i.ytimg.com/vi/OQRydrsWd8I/maxresdefault.jpg",
        title:'Max-res',
        description:"Awesome!!!",
        price: "16.99"

    }),
    new Product({
        imagePath:"http://www.gamersworldbd.com/images/NFS-Shift-2/big.jpg",
        title:'NFS-SHIFT II',
        description:"PRETTY COOL!!!",
        price: "18.99"

    }),

    new Product({
        imagePath:"http://cdn.gospelherald.com/data/images/full/16626/gta-6.jpg",
        title:'GTA-VI',
        description:"Awesome!!!",
        price: "16.99"

    })];
var check=0;
for (var i=0; i<products.length;i++)
{
    products[i].save(function(err,result){
        result++;
        if (result===products.length)
        {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}