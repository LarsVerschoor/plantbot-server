window.addEventListener('load', () => {
	const form = document.getElementById('logout');
	const elements = {
		general: {
			input: null,
			error: document.getElementById('general-error')
		}
	};

	const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const response = await fetch('/logout', {
			method: 'post',
			headers: {
				'X-CSRF-Token': csrfToken,
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			window.location.href = '/login';
			console.log(await response.text());
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
