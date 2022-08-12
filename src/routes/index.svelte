<script context="module">
	export async function load({ fetch }) {
		const response = await fetch('/api/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ page: 1, per_page: 3 })
		});
		const { data } = await response.json();
		return {
			status: 200,
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { Products } from '$lib/types/woocommerce/products';
	export let data: Products;
	console.log(data);
</script>

<!-- Product grid -->
<section aria-labelledby="products-heading" class="mt-8">
	<h2 id="products-heading" class="sr-only">Products</h2>

	<div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
		{#each data as product}
			<ProductCard data={product} />
		{/each}

		<!-- More products... -->
	</div>
</section>
