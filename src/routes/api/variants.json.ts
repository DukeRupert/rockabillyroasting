import wcClient from '$lib/wcClient';

export async function POST({ request }) {
	const options = await request.json();
	console.log(options);
	// Falsy fallbacks keep option from triggering if not passed
	const { id } = options ?? 0;
	console.log(id);
	if (id) {
		console.log('Executing fetch');
		const response = await wcClient.get(`products/${id}/variations`);
		const data = await response.data;
		console.log(data);

		return {
			status: 200,
			body: { data }
		};
	}

	return {
		status: 404,
		body: 'There was an error fetching the variant data.'
	};
}
