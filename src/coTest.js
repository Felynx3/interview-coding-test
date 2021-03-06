class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {

  defaultMaxPrice = 50;

  constructor(products = []) {
    this.products = products.map(this.initializePrice.bind(this));
  }

  initializePrice(originalProduct) {
    const product = { ...originalProduct };

    switch (product.name) {
      case 'Mega Coverage':
        product.price = 80;

        break;
      default:
        product.price = Math.max(0, Math.min(product.price, this.defaultMaxPrice))

        break;
    }

    return product;
  }

  updatePrice() {
    this.products.forEach((product) => {
      if (product.name !== 'Mega Coverage') {
        product.sellIn -= 1;
      }

      switch (product.name) {
        case 'Full Coverage':
          if (product.sellIn < 0) {
            product.price += 2;
          } else {
            product.price += 1;
          }

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
          } else {
            product.price -= 1;
          }

          break;
        case 'Super Sale':
          product.price -= 2;

          break;
        default:
          if (product.sellIn < 0) {
            product.price -= 2;
          } else {
            product.price -= 1;
          }
      }

      switch (product.name) {
        case 'Mega Coverage':
          break;
        default:
          product.price = Math.min(product.price, this.defaultMaxPrice);
      }

      product.price = Math.max(0, product.price);
    })

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
