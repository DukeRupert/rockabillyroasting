<script lang="ts">
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

	export let plans: SubscriptionPlan[];
	export let gift = false;

	function buildGiftOptions(plans: SubscriptionPlan[]) {
		let result: string[] = [];
		plans.forEach((value) =>
			result.push(
				`Every ${value.subscription_period} for ${value.subscription_length} months (${value.subscription_discount}% off)`
			)
		);
		return result;
	}

	function buildSubscriptionOptions(plans: SubscriptionPlan[]) {
		let result: string[] = [];
		plans.forEach((value) =>
			result.push(
				`Every ${
					value.subscription_period_interval == '1' ? '' : value.subscription_period_interval
				} ${
					value.subscription_period_interval == '1'
						? value.subscription_period
						: value.subscription_period + 's'
				} (${value.subscription_discount}% off)`
			)
		);
		return result;
	}

	$: options = gift ? buildGiftOptions(plans) : buildSubscriptionOptions(plans);
	let option: string;
	$: console.log(option);
</script>

<div class="mt-6">
	<label for="location" class="block text-sm font-medium text-gray-700">Deliver</label>
	<select
		bind:value={option}
		id="deliver"
		name="deliver"
		class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
	>
		{#each options as option, i}
			{#if (i = 0)}
				<option selected>{option}</option>
			{:else}
				<option>{option}</option>
			{/if}
		{/each}
	</select>
</div>
