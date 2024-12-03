const textInput = document.getElementById('textInput');
const computeButton = document.getElementById('computeButton');

const mul = (a,b) => a*b;

computeButton.addEventListener('click', (event) => {
  const text = textInput.value;
  const output = text.length; // Longueur du texte
  
  let re = /(mul\([0-9]{1,3},[0-9]{1,3}\))/g

  const validInputs = text.match(re);
  const validInputStr = validInputs.join("+");
  const value = eval(validInputStr);

  document.getElementById('output').textContent = value;
});