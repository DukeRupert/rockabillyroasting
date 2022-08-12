<script lang="ts">
	import type { Product } from '$lib/types/woocommerce/products';

	export let data: Product;
	console.log(data);
</script>

<a href="#" class="group">
	<div class="w-full aspect-w-1 aspect-h-1 max-h-80 rounded-lg overflow-hidden">
		<img
			src={data.images[0].src}
			alt={data.images[0].alt}
			class="w-full h-full object-center object-cover group-hover:opacity-75"
			height="300"
			width="300"
		/>
	</div>
	<div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
		<h3>{data.name}</h3>
		<p>${data.price}</p>
	</div>
	<p class="mt-1 text-sm italic text-gray-500">3 sizes available</p>
</a>
