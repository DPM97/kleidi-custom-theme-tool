var stripe = Stripe(document.getElementById('publishable_key').value);
var elements = stripe.elements();
var stripeSettings = {
  iconStyle: 'solid',
  style: {
    base: {
      color: '#fff',
      iconColor: '#fff',
      fontWeight: 400,
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':-webkit-autofill': {
        color: '#fce883'
      }
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE'
    }
  }
};

var card = elements.create('card', stripeSettings);

card.mount('#card-element');

// Handle form submission
var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-button');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  submitButton.disabled = true;
  stripe
    .createToken(card, {
      name: document.getElementById('fullName').value
    })
    .then(function (result) {
      if (result.error) {
        submitButton.disabled = false;
        window.FlashMessage.error(msg, {
          progress: true,
          interactive: true,
          timeout: 6000,
          appear_delay: 200,
          container: '.flash-container',
          theme: 'default'
        });
      } else {
        stripeTokenHandler(result.token);
      }
    });
});

function stripeTokenHandler(token) {
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
  form.submit();
}
