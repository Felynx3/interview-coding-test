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

});
