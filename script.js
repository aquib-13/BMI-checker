document.getElementById('bmi-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  if (!name || !weight || !height) {
      alert("Please fill in all fields.");
      return;
  }

  // Call the API to calculate BMI
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
          const response = JSON.parse(this.responseText);
          if (response && response.bmi) {
              const bmi = response.bmi;
              const resultText = `Hello ${name}, your BMI is: ${bmi.toFixed(2)}.`;

              // Display the result
              document.getElementById('result').innerText = resultText;
          } else {
              document.getElementById('result').innerText = "Error: Unable to calculate BMI.";
          }
      }
  });

  xhr.open('GET', `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weight}&height=${height}`);
  xhr.setRequestHeader('x-rapidapi-key', '487cfeb30cmsh8b47a4f79a4a36ep1dbc82jsn7b50cb07f47c');
  xhr.setRequestHeader('x-rapidapi-host', 'body-mass-index-bmi-calculator.p.rapidapi.com');

  xhr.send();
});

