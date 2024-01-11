function GetNumUnit(){
    //(?<=y)x x(?=y)
    const regexNum = /^((\d+\.?\d*)|(\d*\.?\d+))(\/\d+\.?\d*)?$/;
    const regexUnit = /[a-z]+$/i;
    const regexTest = /^km$|^mi$|^gal$|^l$|^kg$|^lbs$/i
    let answer;
    let partString;
   /*  this.checkAll = function(dataString){
      console.log("regexNum match", dataString.match(regexNum));
      if(dataString.match(regexNum) && dataString.match(regexUnit) ) return true;
      return false;
    } */
    
    this.checkNum = function(dataString){ 
      if(dataString.match(regexUnit)==null){
        console.log(regexNum.test(dataString))
        return regexNum.test(dataString)
      } else {
      console.log("regex for split", dataString.match(regexUnit)[0])
      console.log(dataString.split(dataString.match(regexUnit))[0])
      partString = 
        (dataString.split(dataString.match(regexUnit))[0]) ? 
        (dataString.split(dataString.match(regexUnit))[0]) : "";
      console.log("partStr: ", partString )
      console.log("num t ? f: ", regexNum.test(partString.trim()) )
      if(regexNum.test(partString.trim()))
      return true;
      else return false;}
    }
    
    this.checkUnit = function(dataString){
      console.log("matchRegexUnit: ", dataString.match(regexUnit));
     if(dataString.match(regexUnit)) { 
       let tempStr = (dataString.match(regexUnit))[0];
      
      console.log("tempStr: ", tempStr);
      console.log("matchRegexUnit2: ", (tempStr.match(regexTest)));
      console.log(regexTest.test(tempStr));
      
      return regexTest.test(tempStr);
     }
     else return regexTest.test(dataString);
    }
    this.get = function(dataString){
      answer = [
        eval((dataString.split(dataString.match(regexUnit))[0]) ? 
        (dataString.split(dataString.match(regexUnit))[0]) : ""   ),    ((dataString.match(regexUnit))[0]).toLowerCase()];
      console.log("answer: ", answer);
      return answer;    
    }
   
    //return answer;
  }
  
  module.exports = GetNumUnit;