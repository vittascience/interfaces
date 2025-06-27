$(function () {
	let successDiv = `
<div class="alert alert-success alert-lite" role="alert">
  <h2 class='text-center mt-2 mb-4'>Merci !</h2>
  <p>Nous vous avons envoyé le détail de la procédure par e-mail.</p>
  <p>Voici un résumé :</p>
  <ul>
    <li><b>Étape 1 :</b> allez sur <a href='https://tne.reseau-canope.fr'>https://tne.reseau-canope.fr</a></li>
    <li><b>Étape 2 :</b> connectez-vous ou créez votre compte Canopé avec votre adresse e-mail académique</li>
    <li><b>Étape 3 :</b> trouvez la solution #CabriSTEAM dans le catalogue</li>
    <li><b>Étape 4 :</b> suivez la formation de 30min</li>
    <li><b>Étape 5 :</b> activez la licence pour la solution #CabriSTEAM</li>
    <li><b>Étape 6 :</b> ouvrez la ressource depuis le Mediacentre de votre ENT</li>
  </ul>
</div>
`;
	let errorDiv = `
<div class="alert alert-danger alert-lite" role="alert">
  <h2 class='text-center mt-2 mb-4'>Oups !</h2>
  <p>Une erreur est survenue lors de du processus d'inscription.</p>
  <p>Nous avons été averti et reviendrons vers vous par e-mail au plus vite.</p>
  <p>Toutes nos excuses pour la gêne occasionnée.</p>
</div>
`;

	function checkField(field) {
		if (!field.checkValidity()) {
			field.classList.add("is-invalid");
			return false
		} else {
			field.classList.remove("is-invalid");
			return true
		}
	}

	document.getElementById("tne-subscribe").addEventListener("click", function (ev) {
		ev.preventDefault();
		disableButton(this);
		let check = [];
		check[0] = checkField(document.getElementById("tne-email"))
		check[1] = checkField(document.getElementById("tne-school"))
		check[2] = checkField(document.getElementById("tne-city"))

		if (check[0] && check[1] && check[2]) {
			sendMailerlite();
		} else {
			enableButton(this);
		}
	});

	function sendMailerlite() {
		const email = document.getElementById("tne-email").value;
		const school = document.getElementById("tne-school").value;
		const city = document.getElementById("tne-city").value;
		$.ajax({
			type: "POST",
			url: "/services/post/postTneSubscribe.php",
			data: {
				'email': email,
				'school': school,
				'city': city,
				'tne-token': tokenTne,
			},
			dataType: "JSON",
			success: function (response) {
				if (response.success) {
					document.getElementById("tne-form").innerHTML = successDiv;
				} else {
					document.getElementById("tne-form").innerHTML = errorDiv;
				}
			}
		});
	}
});

