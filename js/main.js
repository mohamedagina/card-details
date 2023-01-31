/* Handle form submission:
  - add "submitted" class to the form.
  - remove "inputs" container from the DOM.
  - display congrats message.
*/
const handleSubmit = e => {
  const form = e.target;
  e.preventDefault();
  form.classList.add('submitted');
  form.querySelector('.inputs').remove();
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  const innerHtml = `<span class="message-heading">thank you !</span>
  <span class="message-description">We've added your card details</span>
  `;
  successMessage.innerHTML = innerHtml;

  form.insertAdjacentElement('afterbegin', successMessage);
};

// prevent default error message
const handleInvalid = e => {
  e.preventDefault();
};

// checks validity of inputs group
const isValid = element => {
  for (const input of element.parentElement.getElementsByTagName('input')) {
    if (!input.checkValidity()) return false;
  }
  return true;
};

/* update vcard info as inputs change
  - checks if we defined "wordLength, maxLength" and use them to control input.
  - if there is "wordLength" then split the text to (maxLength length) words.
  - if there is "maxLength" then don`t accept input once text reaches this length.
  - add empty class to "input`s parent" to customize error message.
*/
const handleChange = e => {
  const wordLength = parseInt(e.target.dataset.wordLength || 0);
  const maxLength = parseInt(e.target.dataset.maxLength || 0);

  let formattedText = e.target.value;

  if (maxLength) formattedText = formattedText.substring(0, maxLength);

  if (wordLength)
    formattedText = formattedText
      .replace(/\s/g, '')
      .replace(new RegExp(`(.{${wordLength}})`, 'g'), '$1 ')
      .trim();

  if (!formattedText) e.target.parentElement.classList.add('empty');
  else {
    e.target.parentElement.classList.remove('empty');

    if (isValid(e.target)) e.target.parentElement.classList.remove('invalid');
    else e.target.parentElement.classList.add('invalid');
  }

  e.target.value = formattedText;
  document.getElementById(e.target.name).innerText = formattedText;
};

// Add visited class to input`s parent to indicate that user was here.

const handleFocus = e => {
  e.target.classList.add('visited');
  e.target.parentElement.classList.add('visited');
  e.target.parentElement.classList.add('focused');
};

const handleBlur = e => {
  e.target.parentElement.classList.remove('focused');
};

// Attach Event Listenters to Elements

const mainForm = document.getElementById('main-form');
mainForm.addEventListener('submit', handleSubmit);
mainForm.addEventListener('input', handleChange);

for (const input of mainForm.getElementsByTagName('input')) {
  input.addEventListener('invalid', handleInvalid);
  input.addEventListener('focus', handleFocus);
  input.addEventListener('blur', handleBlur);
  input.parentElement.classList.add('empty');
}
