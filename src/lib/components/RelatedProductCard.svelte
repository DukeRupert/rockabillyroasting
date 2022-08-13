<script lang="ts">
	import type { Product } from '$lib/types/woocommerce/products';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let id: number;

	async function getProduct(id: number) {
		const response = await fetch('/api/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});
		const { data }: { data: Product } = await response.json();
		return data;
	}
</script>

<div>
	{#await getProduct(id)}
		<div class="relative flex items-center justify-center w-full h-72 rounded-lg overflow-hidden">
			<LoadingSpinner />
		</div>
	{:then data}
		<div class="relative">
			<div class="relative w-full h-72 rounded-lg overflow-hidden">
				<img
					src={data.images[0].src}
					alt={data.images[0].alt}
					class="w-full h-full object-center object-cover"
				/>
			</div>
			<div class="relative mt-4">
				<h3 class="text-sm font-medium text-gray-900">{data.name}</h3>
			</div>
			<div
				class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden"
			>
				<div
					aria-hidden="true"
					class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
				/>
				<p class="relative text-lg font-semibold text-white">${data.price}</p>
			</div>
		</div>
		<div class="mt-6">
			<button type="button" class="btn btn-secondary">Add to cart</button>
		</div>
	{/await}
</div>
