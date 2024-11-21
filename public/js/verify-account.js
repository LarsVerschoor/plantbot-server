const init = () => {
	const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
	const verifyButton = document.getElementById('verify');

	verifyButton.addEventListener('click', async () => {
		const response = await fetch(window.location.href, {
			method: 'post',
			headers: {
				'X-CSRF-Token': csrfToken
			}
		});

		if (response.ok) {
			window.location.href = '/login';
		} else {
			console.error(response);
		}
	});
};

window.addEventListener('load', () => {
	init();
});
