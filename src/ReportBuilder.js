const fs = require('fs');

class ReportBuilder {
  constructor(carInsurance) {
    this.carInsurance = carInsurance;
  }

  generate30DaysReport() {
    let fileLines = [''];

    for (let day = 0; day <= 30; day++) {
      fileLines.push(`-------- day ${day} --------`);

      fileLines.push(`name, sellIn, price`);

      this.carInsurance.products.forEach((product) => {
        fileLines.push(`${product.name},\t${product.sellIn}, ${product.price}`);
      })

      this.carInsurance.updatePrice();

      fileLines.push('')
    }

    const fileContent = fileLines.join('\n');

    fs.writeFileSync('./products_after_30_days.txt', fileContent);
  }
}

module.exports = ReportBuilder;