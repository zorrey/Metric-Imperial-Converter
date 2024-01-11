'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const GetNumUnit = require('../controllers/getNumUnit.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  let getNumUnit = new GetNumUnit();

  //Index page 
  app.route('/')
    .get(function (req, res) {
      const errorMessage = req.query? req.query.errorMessage: null;
      res.render('index', { result: {} ,
                            errorMessage: errorMessage ? errorMessage: ""});
      //res.sendFile(process.cwd() + '/views/index.html');
    })
    .post((req, res) => {
      //console.log(req.body)
      let input = req.body.input;
      if(!input){
        const errorMessage = "Enter number and unit";        
        res.redirect(`/?errorMessage=${errorMessage}`);
    }

      if (!getNumUnit.checkNum(input) && !getNumUnit.checkUnit(input)){
        const errorMessage = "Invalid number and unit"
        res.redirect(`/?errorMessage=${errorMessage}`);
      } else if(!getNumUnit.checkNum(input)) {
        const errorMessage = "invalid number"
        res.redirect(`/?errorMessage=${errorMessage}`);
      }else if (!getNumUnit.checkUnit(input)){
        const errorMessage = "invalid unit"
        res.redirect(`/?errorMessage=${errorMessage}`);
      }  else
      res.redirect(`/convert?input=${input}`)
    })

  app.route('/convert/')
    .get((req, res) => {
      const input = req.query.input
      console.log('input---', input)
      if (getNumUnit.checkNum(input) && getNumUnit.checkUnit(input)) {
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);

        console.log("?????", convertHandler.getReturnUnit(initUnit))

        console.log(initNum, " - ", initUnit);
        console.log("convertHandler : ", convertHandler.getNum(input));

        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);

        let returnString =
          convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        console.log(initNum, " - ", initUnit);
        console.log("return string: ", returnString)
        //  if(!returnString) res.json("invalid input")

        //res.json(returnString);

        let result = {
          initNum: initNum,
          initUnit: initUnit == 'l' ? 'L' : initUnit,
          returnNum: parseFloat(returnNum),
          returnUnit: returnUnit,
          string: returnString
        }
        console.log("result----", req.query)
        res.render('index', { result: result })
      }
})
}
