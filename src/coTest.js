class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }

  updatePrice() {
    this.products.forEach((product) => {
      product.sellIn -= 1;

      switch (product.name) {
        case 'Full Coverage':
          product.price += 1;

          break;
        case 'Mega Coverage':
          product.price = 80;

          break;
        case 'Special Full Coverage':
          if (product.sellIn <= 0) {
            product.price = 0;
          } else if (product.sellIn < 5) {
            product.price -= 3;
          } else if (product.sellIn < 10) {
            product.price -= 2;
          }

          break;
        default:
          if (product.sellIn < 0) {
            product.price -= 2;
          } else {
            product.price -= 1;
          }
      }
    })

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
