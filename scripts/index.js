const cardsList = document.querySelector('.cards');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details')

const setupUI = (user) => {
	if (user) {
		const html = `
			<div>Logged in as ${user.email}</div>
			<div>User ID: ${user.uid}</div>
		`;
		accountDetails.innerHTML = html;
		loggedInLinks.forEach(item => item.style.display = 'block');
		loggedOutLinks.forEach(item => item.style.display = 'none');
	} else {
	accountDetails.innerHTML = '';
		loggedInLinks.forEach(item => item.style.display = 'none');
		loggedOutLinks.forEach(item => item.style.display = 'block');
	}
}

const setupCards = (data) => {

	if(data.length) {
		let html ='';
		data.forEach(doc => {
			const cards = doc.data();
			console.log(cards)
			const li = `
				<li>
					<div class="collapsible-header grey lighten-4">Use of Card: ${cards.title}</div>
					<div class="collapsible-body white">Name: ${cards.name}</div>
					<div class="collapsible-body white">Goodthru Date: ${cards.goodthru}</div>
					<div class="collapsible-body white">Card Number: ${cards.cardnum}</div>
					<div class="collapsible-body white">CVV: ${cards.cvv}</div>
					<div class="collapsible-body white">Address: ${cards.address}</div>
					<div class="collapsible-body white">Postal Code: ${cards.postcode}</div>
				</li>
			`;
			html += li
		});

		cardsList.innerHTML = html;
	} else {
		cardsList.innerHTML = '<h5 class="center-align">Create a Card</h5> '
	}
}


document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});