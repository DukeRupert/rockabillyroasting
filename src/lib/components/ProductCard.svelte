<script lang="ts">
	import type { Product } from '$lib/types/woocommerce/products';
	import Button from '@smui/button';
	import { Label } from '@smui/button';

	export let data: Product;
	const { variations } = data ?? [];
	const { slug } = data ?? '';
</script>

<div class="group">
	<a href={`/products/${slug}`}>
		<div class="w-full aspect-w-1 aspect-h-1 max-h-80 rounded-lg overflow-hidden">
			<img
				src={data.images[0].src}
				alt={data.images[0].alt}
				class="w-full h-full object-center object-cover group-hover:opacity-75"
				height="300"
				width="300"
			/>
		</div>
	</a>
	<div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
		<h3>{data.name}</h3>
		<p>${data.price}</p>
	</div>
	<Button variant="unelevated" color="primary"
		><Label>{variations.length > 0 ? 'See options' : 'Add to cart'}</Label></Button
	>
</div>
