const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe('Co Test', function () {

  it('registers the given products', function () {
    const testProducts = [
      new Product('Test product 1', 1, 1),
      new Product('Test product 2', 2, 2),
      new Product('Test product 3', 3, 3),
      new Product('Test product 4', 4, 4),
      new Product('Test product 5', 5, 5),
    ];

    const carInsurance = new CarInsurance(testProducts);

    const { products } = carInsurance;

    expect(products).to.eql([...testProducts]);
  });

  describe('Price update', function () {
    describe('Common', function () {

      it('sets the minimum product price as zero', function() {
        const carInsurance = new CarInsurance([new Product('Test product', 3, -10)]);

        expect(carInsurance.products[0].price).to.equal(0);
      })

      it('sets the maximum product price as 50', function() {
        const carInsurance = new CarInsurance([new Product('Test product', 3, 100)]);

        expect(carInsurance.products[0].price).to.equal(50);
      })

      it('decreases price by 1 until the sellIn date is reached', function () {
        const carInsurance = new CarInsurance([new Product('Test product', 3, 10)]);

        while(carInsurance.products[0].sellIn > 0) {
          const prevPrice = carInsurance.products[0].price;

          carInsurance.updatePrice();

          const newPrice = carInsurance.products[0].price;

          const deltaPrice = newPrice - prevPrice;

          expect(deltaPrice).to.equal(-1);
        }
      })

      it('decreases price by 2 since the sellIn date is reached', function () {
        const carInsurance = new CarInsurance([new Product('Test product', 0, 10)]);

        const prevPrice = carInsurance.products[0].price;

        carInsurance.updatePrice();

        const newPrice = carInsurance.products[0].price;
        const deltaPrice = newPrice - prevPrice;

        expect(deltaPrice).to.equal(-2);
      })

      it('does not decrease the price below zero', function () {
        const carInsurance = new CarInsurance([new Product('Test product', 0, 0)]);

        carInsurance.updatePrice();

        expect(carInsurance.products[0].price).to.equal(0);
      })
    })

    describe('"Full Coverage" product', function () {
      it('increases its price by 1', function () {
        const carInsurance = new CarInsurance([new Product('Full Coverage', 4, 0)]);

        while(carInsurance.products[0].sellIn > 0) {
          const prevPrice = carInsurance.products[0].price;

          carInsurance.updatePrice();

          const newPrice = carInsurance.products[0].price;

          const deltaPrice = newPrice - prevPrice;

          expect(deltaPrice).to.equal(1);
        }
      })
    })

    describe('"Mega Coverage" product', function () {
      it('always keeps its price as 80', function () {
        const carInsurance = new CarInsurance([new Product('Mega Coverage', 2, 50)]);

        for (let i = 0; i < 4; i++) {
          expect(carInsurance.products[0].price).to.equal(80);

          carInsurance.updatePrice();
        }
      })
    })

    describe('"Special Full Coverage" product', function () {
      it('decreases its price by 1 until the sellIn date reaches 10', function () {
        const carInsurance = new CarInsurance([new Product('Special Full Coverage', 15, 10)]);

        while(carInsurance.products[0].sellIn > 10) {
          const prevPrice = carInsurance.products[0].price;

          carInsurance.updatePrice();

          const newPrice = carInsurance.products[0].price;

          const deltaPrice = newPrice - prevPrice;

          expect(deltaPrice).to.equal(-1);
        }
      })

      it('decreases its price by 2 when sellIn date is 10 or less', function () {
        const carInsurance = new CarInsurance([new Product('Special Full Coverage', 10, 10)]);

        while(carInsurance.products[0].sellIn > 5) {
          const prevPrice = carInsurance.products[0].price;

          carInsurance.updatePrice();

          const newPrice = carInsurance.products[0].price;

          const deltaPrice = newPrice - prevPrice;

          expect(deltaPrice).to.equal(-2);
        }
      })

      it('decreases its price by 3 when sellIn date is 5 or less', function () {
        const carInsurance = new CarInsurance([new Product('Special Full Coverage', 5, 30)]);

        while(carInsurance.products[0].sellIn > 1) {
          const prevPrice = carInsurance.products[0].price;

          carInsurance.updatePrice();

          const newPrice = carInsurance.products[0].price;

          const deltaPrice = newPrice - prevPrice;

          expect(deltaPrice).to.equal(-3);
        }
      })

      it('sets its price to 0 when sellIn date is reached', function () {
        const carInsurance = new CarInsurance([new Product('Special Full Coverage', 1, 30)]);

        carInsurance.updatePrice();

        const newPrice = carInsurance.products[0].price;

        expect(newPrice).to.equal(0);
      })
    })

  })

});
