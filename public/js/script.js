const weatherForm = document.querySelector('form');
const inputValue = document.querySelector('input');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
weatherForm.addEventListener('submit', function (e) {
  msg1.textContent = 'Loading...';
  e.preventDefault();
  fetch(`http://localhost:3000/weather?search=${inputValue.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        msg2.textContent = '';
        msg1.textContent = data.error;
        msg1.classList.add('text-danger');
      } else {
        msg1.classList.remove('text-danger');
        msg1.classList.add('text-success');
        msg1.textContent = data.Placename;
        msg2.textContent = data.forecast;
      }
    });
});
