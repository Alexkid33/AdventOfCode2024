import {computeXmas,computeXmas2} from './utils.js'

const fileInput = document.getElementById('fileInput');
const result = document.getElementById('result');
const result2 = document.getElementById('result2');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          result.textContent = computeXmas(content);
          result2.textContent = computeXmas2(content);
        };
        reader.readAsText(file); 
    }
});

