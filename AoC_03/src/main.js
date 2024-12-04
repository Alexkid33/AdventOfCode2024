const textInput = document.getElementById('textInput');
const computeButton = document.getElementById('computeButton');

const mul = (a,b) => a*b;
const filterText = (text) => {
  const re_do = /(do\(\))/;
  const re_dont = /(don\'t\(\))/;
  const arr1 = text.split(re_dont);
  let skipElem = false;
  let finalArray = [];
  let textfilter = "";

  arr1.forEach(element => {
    console.log(element);
    if(element.includes("don't()")){
      skipElem = true;
      
    }else{
      const doId = element.search(re_do);
      
      if(doId === -1 ){
        
        if(!skipElem){
          finalArray.push(element);}
        }
      else{
        if(!skipElem){
          finalArray.push(element);
        }else{
          finalArray.push(element.substring(doId));
          skipElem = false;
        }

      }
    }

  });

  textfilter = finalArray.join("");

  // console.log("------------------------------");
  // console.log(textfilter);
  // console.log("------------------------------");
  return textfilter;
}



computeButton.addEventListener('click', (event) => {
  const text = textInput.value;
  const output = text.length; // Longueur du texte
  const filteredText = filterText(text);
  
  let re = /(mul\([0-9]{1,3},[0-9]{1,3}\))/g


  const validInputs = filteredText.match(re);
  const validInputStr = validInputs.join("+");
  const value = eval(validInputStr);

  document.getElementById('output').textContent = value;
});
