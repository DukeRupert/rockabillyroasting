<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let prompt = 'Choose one-time or Subscription';
	let subscribe: number;

	$: dispatch('subscription', {
		subscribe: subscribe
	});
</script>

<div class="mt-6">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-gray-900">{prompt}</h2>
	</div>
	<fieldset class="mt-4">
		<legend class="sr-only">Plan</legend>
		<div class="space-y-5">
			<div class="relative flex items-start">
				<div class="flex items-center h-5">
					<input
						bind:group={subscribe}
						id="small"
						aria-describedby="small-description"
						name="plan"
						type="radio"
						value="0"
						checked
						class="focus:ring-indigo-500 h-4 w-4 text-secondary border-gray-300"
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for="small" class="font-medium text-gray-700">Single Order</label>
					<!-- <span id="small-description" class="text-gray-500"
						>4 GB RAM / 2 CPUS / 80 GB SSD Storage</span
					> -->
				</div>
			</div>

			<div class="relative flex items-start">
				<div class="flex items-center h-5">
					<input
						bind:group={subscribe}
						id="medium"
						aria-describedby="medium-description"
						name="plan"
						type="radio"
						value="1"
						class="focus:ring-primary h-4 w-4 text-secondary border-gray-300"
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for="medium" class="font-medium text-gray-700">Subscribe and save 10%</label>
					<!-- <span id="medium-description" class="text-gray-500"></span> -->
				</div>
			</div>
		</div>
	</fieldset>
</div>
