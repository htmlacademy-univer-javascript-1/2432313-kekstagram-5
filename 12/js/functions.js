/* eslint-disable no-console */
const getCompareString = (str, maxLength)=> str.length <= maxLength;
console.log(getCompareString('проверяемая строка', 10));

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

const getNumberToDate = (str) =>{
  // let space = '';
  // for (let i = 0; i <= str.length; i ++){
  //   if (str[i] === ':'){
  //     space += '.';
  //   }
  //   space += str[i];
  // }
  const newStr = str.replace(':','.');
  return parseFloat(newStr);
};

const compareTime = (startDay,endDay,startMeet,lengthMeet) => {
  const start = getNumberToDate(startDay);
  const end = getNumberToDate(endDay);
  const meet = getNumberToDate(startMeet);
  const length = lengthMeet / 60;
  return (meet >= start && meet + length <= end);
};
console.log(compareTime('08:00', '17:30', '14:00', 90)); // true
console.log(compareTime('8:0', '10:0', '8:0', 120));// true
console.log(compareTime('08:00', '14:30', '14:00', 90)); // false
console.log(compareTime('14:00', '17:30', '08:0', 90));// false
console.log(compareTime('8:00', '17:30', '08:00', 900)); // false
