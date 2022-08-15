import wcClient from '$lib/wcClient';

export async function POST({ request }) {
	const options = await request.json();

	// Falsy fallbacks keep option from triggering if not passed
	const { id } = options ?? 0;
	const { slug } = options ?? '';

	if (id) {
		const response = await wcClient.get(`products/${id}`);
		const data = await response.data;

		return {
			status: 200,
			body: { data }
		};
	}

	if (slug) {
		console.log(`Getting data for: ${slug}`);
		const response = await wcClient.get('products', {
			slug: slug
		});
		const data = await response.data;

		return {
			status: 200,
			body: { data }
		};
	}

	// Destructure options with sane defaults
	const { page } = options ?? 1;
	const { per_page } = options ?? 10;

	const response = await wcClient.get('products', {
		page: page,
		per_page: per_page
	});

	const data = await response.data;

	return {
		status: 200,
		body: { data }
	};
}
