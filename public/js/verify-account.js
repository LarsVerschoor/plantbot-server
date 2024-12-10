window.addEventListener('load', () => {
	const form = document.getElementById('verify');
	const elements = {
		verification: {
			input: document.getElementById('verification'),
			error: document.getElementById('verification-error')
		}
	};

	const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const response = await fetch('/verify-account', {
			method: 'post',
			headers: {
				'X-CSRF-Token': csrfToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				verification: elements.verification.input.value
			})
		});

		if (response.ok) {
			window.location.href = '/';
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
