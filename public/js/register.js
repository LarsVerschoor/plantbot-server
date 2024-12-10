window.addEventListener('load', () => {
	const form = document.getElementById('register');
	const elements = {
		email: {
			input: document.getElementById('email'),
			error: document.getElementById('email-error')
		},
		password: {
			input: document.getElementById('password'),
			error: document.getElementById('password-error')
		}
	};

	const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const response = await fetch('/register', {
			method: 'post',
			headers: {
				'X-CSRF-Token': csrfToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: elements.email.input.value,
				password: elements.password.input.value
			})
		});

		if (response.ok) {
			window.location.href = '/verify-account';
		} else {
			const errors = (await response.json()).errors;

			if (errors) {
				errors.forEach((error) => {
					elements[error.field].error.innerText = error.message;
				});
			}
		}
	});
});
