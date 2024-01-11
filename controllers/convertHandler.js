const GetNumUnit = require('../controllers/getNumUnit.js');
let getNumUnit = new GetNumUnit();
function ConvertHandler() {

  this.getNum = function (input) {
    if (getNumUnit.checkNum(input)) {

      let result = ((getNumUnit.get(input))[0]);
      if (result!=null && result!="") {
        result.toFixed;
        console.log("getNum + parsefloat", parseFloat(result));
        return parseFloat(result);
      }
    }
    else return null;
  };

  this.getUnit = function (input) {
    if (getNumUnit.checkUnit(input)) {
      let result = (getNumUnit.get(input))[1].toLowerCase();
      return result == "l" ? "L" : result;
    }
    else return undefined;
  };

  this.getReturnUnit = function (initUnit) {

    let result = initUnit == "km" ? "mi" :
      initUnit == "mi" ? "km" :
        initUnit == "L" ? "gal" :
          initUnit == "gal" ? "L" :
            initUnit == "lbs" ? "kg" :
              initUnit == "kg" ? "lbs" : undefined;

    return result;
  };

  this.spellOutUnit = function (initUnit) {
    let result = initUnit == "km" ? "kilometers" :
      initUnit == "mi" ? "miles" :
        initUnit == "L" || initUnit == "l" ? "liters" :
          initUnit == "gal" ? "gallons" :
            initUnit == "lbs" ? "pounds" :
              initUnit == "kg" ? "kilograms" : undefined;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case "km": result = initNum / miToKm; break;
      case "mi": result = initNum * miToKm; break;
      case "L": result = initNum / galToL; break;
      case "gal": result = initNum * galToL; break;
      case "lbs": result = initNum * lbsToKg; break;
      case "kg": result = initNum / lbsToKg; break;
      default: undefined;
    }
    return parseFloat((result).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
   // console.log("getString result:", result);
    return result;
  };
}

module.exports = ConvertHandler;
