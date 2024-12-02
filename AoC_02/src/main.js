import {computeSafeReports,computeSafeReportsDampener } from './utils.js'

const fileInput = document.getElementById('fileInput');
const safereports = document.getElementById('safereports');
const safereportsDampener = document.getElementById('safereportsDampener');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          safereports.textContent = computeSafeReports(content);
          safereportsDampener.textContent = computeSafeReportsDampener(content);
        };
        reader.readAsText(file); 
    }
});