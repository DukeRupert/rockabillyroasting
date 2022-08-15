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
		const { id } = product ?? 0;

		const res = await fetch('/api/variants.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});
		const { data: variants } = await res.json();

		if (product && variants) {
			return {
				status: 200,
				props: {
					product,
					variants
				}
			};
		}
		return {
			status: 404,
			body: 'Fetch product failed'
		};
	}
</script>

<script lang="ts">
	import Attribute from '$lib/components/Attribute.svelte';
	import GiftToggle from '$lib/components/GiftToggle.svelte';
	import OrderType from '$lib/components/OrderType.svelte';
	import PlanPicker from '$lib/components/PlanPicker.svelte';
	import RelatedProductCard from '$lib/components/RelatedProductCard.svelte';
	import ReviewStars from '$lib/components/ReviewStars.svelte';
	import type { Product } from '$lib/types/woocommerce/products';
	import type { Variant } from '$lib/types/woocommerce/variants';
	import { slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	interface SubscriptionPlan {
		subscription_period_interval: string;
		subscription_period: string;
		subscription_length: string;
		subscription_pricing_method: string;
		subscription_regular_price: string;
		subscription_sale_price: string;
		subscription_discount: number;
		position: string;
		subscription_price: string;
		subscription_payment_sync_date: number;
	}

	export let product: Product;
	export let variants: Variant[];
	console.log(product);
	// console.log(variants);

	let promptIndex = product.meta_data.findIndex((el) => el.key == '_wcsatt_subscription_prompt');
	const prompt = product.meta_data[promptIndex].value;

	let subPlansIndex = product.meta_data.findIndex((el) => el.key == '_wcsatt_schemes');
	const subPlans: SubscriptionPlan[] = product.meta_data[subPlansIndex].value;

	function getGiftOptions(arr: SubscriptionPlan[], gift: boolean) {
		let result = [];
		if (!gift) {
			result = arr.filter((el) => el.subscription_length == '0');
			return result;
		}
		result = arr.filter((el) => el.subscription_length != '0');
		return result;
	}

	const { images, related_ids } = product ?? [];
	let activeImage = 0;

	const { attributes } = product ?? [];

	interface AttributeDetail {
		id: number;
		name: string;
		option: string;
	}

	let selectedAttributes: AttributeDetail[] = [];

	function findVariant(attributes: Attribute[], variants: Variant[]): number {
		let filters: string[] = [];
		let v = [...variants];
		attributes.map((el) => filters.push(el.option));

		if (filters.length > 0) {
			filters.forEach((filter) => {
				v = v.filter((el) => el.attributes.forEach((el) => el.name === filter));
			});
		}

		return 1;
	}

	$: selectedVariant = findVariant(selectedAttributes, variants);

	let subscribe = 0;
	let gift = false;
	$: console.log(gift);
	$: plans = getGiftOptions(subPlans, gift);
	$: console.log(plans);

	function handleAttributeChoice(event) {
		const { detail } = event ?? { id: 1 };
		let newAttributes = [...selectedAttributes];
		let exists = selectedAttributes.findIndex(({ id }) => id == detail.id);
		if (exists == -1) {
			newAttributes.push(detail);
			selectedAttributes = newAttributes;
		} else {
			newAttributes[exists] = detail;
			selectedAttributes = newAttributes;
		}
	}

	function handleSubscription(event) {
		subscribe = event.detail.subscribe;
	}

	function handleGift(event) {
		gift = event.detail.gift;
	}

	let options = ['fish', 'beef', 'pork'];

	async function getVariants(id: number) {
		const response = await fetch('/api/variants.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});
		const data = await response.json();
		return data;
	}
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
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
					<p class="tracking-tight text-3xl text-gray-900">${product.price}</p>
				</div>

				<!-- Reviews -->
				<ReviewStars />

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="text-base text-gray-700 space-y-6">
						<p>
							{@html product.description}
						</p>
					</div>
				</div>

				{#if product.attributes}
					{#each attributes as attribute}
						<Attribute {attribute} on:attributeChoice={handleAttributeChoice} />
					{/each}
					<GiftToggle on:gift={handleGift} />
				{/if}

				{#if selectedAttributes.length == 2}
					<OrderType on:subscription={handleSubscription} {prompt} />
				{/if}

				{#if subscribe == 1}
					<PlanPicker {plans} {gift} />
				{/if}

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
