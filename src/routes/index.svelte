<script context="module">
	export async function load({ fetch }) {
		const response = await fetch('/api/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ page: 1, per_page: 15 })
		});
		const data = await response.json();
		return {
			status: 200,
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	export let data;
</script>

<pre>{JSON.stringify(data)}</pre>
