module.exports = function Cart(oldCart){
  this.series=oldCart.series || {};
  this.totalqty=oldCart.totalqty || 0;

  this.add = function(item,id){
    var storedseries = this.series[id];
    if(!storedseries){
      storedseries = this.series[id] = {
        item:item,
        qty:0
      };
    }
    storedseries.qty++;
    this.totalqty++;
  }

  this.generateArray= function(){
    var arr=[];
    for(var id in this.series){
      arr.push(this.series[id]);
    }
    return arr;
  }
};
