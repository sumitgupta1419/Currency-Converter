const apiKey = 'https://api.exchangerate-api.com/v4/latest/USD'; // or use other free APIs
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');

// Populate currency dropdowns
fetch(apiKey)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    // Set defaults
    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
  });

function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === '' || isNaN(amount)) {
    resultDiv.innerText = 'Please enter a valid number';
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
    });
}
