/* eslint-disable no-console */
const getCompareString = (str, maxLength)=> str.length <= maxLength;
console.log(getCompareString('проверяемая строка', 18));

const isPalindrome = (str)=>{
  let newStr = str.replaceAll(' ','');
  newStr = newStr.toUpperCase();
  let space = '';
  for (let i = newStr.length - 1; i >= 0; i --){
    space += newStr[i];
  }
  return space === newStr;
};
console.log(isPalindrome('Лёша на полке клопа нашёл '));

const getNumberFromString = (str) =>{
  let space = '';
  for (let i = 0; i <= str.length; i ++){
    if (isNaN(parseInt(str[i],10)) === false){
      space += str[i];
    }
  }
  return parseInt(space,10);
};
console.log(getNumberFromString('а я томат'));

