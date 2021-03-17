const expect = require('chai').expect;
const fs = require('fs');

const ReportBuilder = require('../src/ReportBuilder');
const CarInsurance = require('../src/coTest').CarInsurance;
const Product = require('../src/coTest').Product;

describe('ReportBuilder', function () {
  it('generates the "30 days report" file', function () {
    const filePath = 'products_after_30_days.txt';

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }

    expect(fs.existsSync(filePath)).to.be.false;

    const carInsurance = new CarInsurance([new Product('Test product', 3, -10)]);

    const reportBuilder = new ReportBuilder(carInsurance);

    reportBuilder.generate30DaysReport();

    expect(fs.existsSync(filePath)).to.be.true;
  })
})