import {computeTotalDistance, computeSimilarity} from './listdistance.js'

const fileInput = document.getElementById('fileInput');
const distance = document.getElementById('distance');
const similarity = document.getElementById('similarity');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          distance.textContent = computeTotalDistance(content);
          similarity.textContent = computeSimilarity(content);
        };
        reader.readAsText(file); 
    }
});