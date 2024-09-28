/* eslint-disable no-console */
const getCompareString = (str, maxLength)=>{
  if(str.length <= maxLength){
    return true;
  }
  return false;
};
console.log(getCompareString('проверяемая строка', 18));

const getCheckString = (str)=>{
  let newStr = str.replaceAll(' ','');
  newStr = newStr.toUpperCase();
  let space = '';
  for (let i = newStr.length - 1; i >= 0; i --){
    space += newStr[i];
  }
  return space === newStr;
};
console.log(getCheckString('Лёша на полке клопа нашёл '));

const getNumberOfString = (str) =>{
  let space = '';
  for (let i = 0; i <= str.length; i ++){
    const newChar = str[i];
    if (isNaN(parseInt(newChar,10)) === false){
      space += str[i];
    }
  }
  parseInt(space,10);
  isNaN(space);
  return space.toString();
};
console.log(getNumberOfString('а я томат'));

