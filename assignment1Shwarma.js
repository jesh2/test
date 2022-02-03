const Order = require("./assignment1Order");
const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  TOPPINGS: Symbol("toppings"),
  DRINKS: Symbol("drinks"),
  DESSERTS: Symbol("desserts"),
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sItem = "";
    this.sDessert = "";
    this.sTotal=0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Sam's Fusion Food.");
        aReturn.push("Select An Item From The Menu 1: Pizza 2:Shawarma 3:Sandwich");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TOPPINGS;
        this.sItem = sInput;
        if (this.sItem.toLowerCase() == "pizza") {
          this.sTotal=10;
        }
        else if (this.sItem.toLowerCase() == "shawarma") {
          this.sTotal=5;
        }
        else if (this.sItem.toLowerCase() == "sandwich") {
          this.sTotal=2;
        }
        aReturn.push("What toppings would you like?");
        break;
      case OrderState.TOPPINGS:
        this.stateCur = OrderState.DRINKS;
        this.sToppings = sInput;
        aReturn.push("Would you like drinks with that?");
        break;
      case OrderState.DRINKS:
        this.stateCur = OrderState.DESSERTS;
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.sTotal=this.sTotal+1;
        }
        aReturn.push("Would you like desserts with that? 1: Tiramisu 2:Frosty ");
        break;
      case OrderState.DESSERTS:
        this.isDone(true);
        this.sDessert = sInput;
        
        if (sInput.toLowerCase() != "no") {
          this.sTotal=this.sTotal+3;
        }
        aReturn.push("Thankyou for your order of");
        aReturn.push(`${this.sItem} with ${this.sToppings}`);
        if (this.sDrinks!= "no") {
          aReturn.push(`${this.sDrinks} with ${this.sDessert}`);
        }
        
        aReturn.push(`Your Grand Total is ${this.sTotal}$`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
