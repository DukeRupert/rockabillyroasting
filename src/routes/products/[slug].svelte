<script context="module">
	export async function load({ params, fetch }) {
		const { slug } = params;
		const response = await fetch('/api/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug: slug })
		});
		const { data } = await response.json();
		const product = data[0];

		if (product) {
			return {
				status: 200,
				props: {
					data: product
				}
			};
		}
		return {
			status: 404
		};
	}
</script>

<script lang="ts">
	import RelatedProductCard from '$lib/components/RelatedProductCard.svelte';
	import type { Product } from '$lib/types/woocommerce/products';

	export let data: Product;
	console.log(data);

	const { images, related_ids } = data ?? [];
	let activeImage = 0;

	const { attributes } = data ?? [];
</script>

<main class="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
	<div class="max-w-2xl mx-auto lg:max-w-none">
		<!-- Product -->
		<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
			<!-- Image gallery -->
			<div class="flex flex-col-reverse">
				<!-- Image selector -->
				<div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
					<div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
						{#each images as image, i}
							<button
								on:click|preventDefault={() => (activeImage = i)}
								id="tabs-2-tab-{i}"
								class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
								aria-controls="tabs-2-panel-1"
								role="tab"
								type="button"
							>
								<span class="sr-only"> {image.name}</span>
								<span class="absolute inset-0 rounded-md overflow-hidden">
									<img
										src={image.src}
										alt={image.alt}
										class="w-full h-full object-center object-cover"
									/>
								</span>

								<span
									class="{activeImage == i
										? 'ring-indigo-500'
										: 'ring-transparent'} absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
									aria-hidden="true"
								/>
							</button>
						{/each}
					</div>
				</div>

				<div class="w-full aspect-w-1 aspect-h-1">
					<!-- Tab panel, show/hide based on tab state. -->
					<div id="tabs-2-panel-1" aria-labelledby="tabs-2-tab-1" role="tabpanel" tabindex="0">
						<img
							src={images[activeImage].src}
							alt={images[activeImage].alt}
							class="w-full h-full object-center object-cover sm:rounded-lg"
						/>
					</div>

					<!-- More images... -->
				</div>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{data.name}</h1>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
					<p class="tracking-tight text-3xl text-gray-900">${data.price}</p>
				</div>

				<!-- Reviews -->
				<div class="mt-3">
					<h3 class="sr-only">Reviews</h3>
					<div class="flex items-center">
						<div class="flex items-center">
							<!--
                  Heroicon name: solid/star

                  Active: "text-indigo-500", Inactive: "text-gray-300"
                -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>

							<!-- Heroicon name: solid/star -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>

							<!-- Heroicon name: solid/star -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>

							<!-- Heroicon name: solid/star -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>

							<!-- Heroicon name: solid/star -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-300"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						</div>
						<p class="sr-only">4 out of 5 stars</p>
					</div>
				</div>

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="text-base text-gray-700 space-y-6">
						<p>
							{@html data.description}
						</p>
					</div>
				</div>

				<form class="mt-6">
					<div class="mt-10 flex sm:flex-col1">
						<button type="button" class="btn btn-primary max-w-xs flex-1">Add to cart</button>

						<button
							type="button"
							class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
						>
							<!-- Heroicon name: outline/heart -->
							<svg
								class="h-6 w-6 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
							<span class="sr-only">Add to favorites</span>
						</button>
					</div>
				</form>
			</div>
		</div>

		<section
			aria-labelledby="related-heading"
			class="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
		>
			<h2 id="related-heading" class="text-xl font-bold text-gray-900">Customers also bought</h2>

			<div
				class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
			>
				{#each related_ids as id}
					<RelatedProductCard {id} />
				{/each}
			</div>
		</section>
	</div>
</main>
