import wcClient from '$lib/wcClient';

export async function POST({ request }) {
	const options = await request.json();
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
