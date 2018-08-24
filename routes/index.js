var express = require('express');
var router = express.Router();
var Cart= require('../Models/cart');


var Product= require('../Models/product')

//To import product structure
/* GET home page. */
router.get('/', function(req, res, next) {
  var products=Product.find();//To store the data

  Product.find(function(err,docs){

      var productChunks=[];
      chunkSize=3;
      for (var i=0; i<docs.length; i+=chunkSize)
      {
        productChunks.push(docs.slice(i,i+chunkSize))
      }
      res.render('shop/index', { title: 'Shopping cart',products:productChunks }); //Passes this value to index.html file

  })
});
router.get('/addToCart/:id', function(req,res,next){
   var productId=req.params.id;
   var cart=new Cart(req.session.cart ? req.session.cart : {items: {}}); // Check if we have old cart or not

   Product.findById(productId, function (err,product) {
    if(err){
        return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect('/');
       
   });

});

router.get('/shopping-cart',function (req,res,next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    else{
        var cart=new Cart(req.session.cart);
        return res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
    }

});

router.get('/checkout',function(req,res,next){
    if(!req.session.cart){
        return res.redirect('shop/shopping-cart',{products:null});
    }
    else{
        var cart=new Cart(req.session.cart);
        var errMsg=req.flash('error')[0];
        return res.render('shop/checkout',{totalPrice: cart.totalPrice, err:errMsg, noError: !errMsg });
    }

});
router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});
module.exports = router;
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
        return next();

    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()) {
        return next();

    }
    res.redirect('/');

}

