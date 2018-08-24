module.exports = function Cart(oldCart){
this.items= oldCart.items || {};
this.totalQty=oldCart.totalQty|| 0;
this.totalPrice= oldCart.totalPrice|| 0;
this.add= function (item, id) {
    var storeItem= this.items[id];
    if(!storeItem){
        storeItem=this.items[id]= { item: item, qty: 0, price: 0};
    }
    storeItem.qty++;
    storeItem.price=storeItem.item.price *storeItem.qty;
    this.totalQty++;
    this.totalPrice +=storeItem.item.price;


};
this.generateArray= function() {
    var arr=[];
    for (var id in this.items){
        arr.push(this.items[id]);

    }
    return arr;

};

/*Till now
It gets the value from the old cart
Assigns the value of these old cart to new cart
Creates a function to be able to add a new item in the cart which checks if items already exists
If it does we just increase the quantity
And after that I just create an array to push those items in the array so that I will be able to extract and print from the list
 */

};