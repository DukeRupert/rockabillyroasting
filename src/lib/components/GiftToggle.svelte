<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let isGift = false;
	$: dispatch('gift', {
		gift: isGift
	});
</script>

<div class="mt-6">
	<div class="flex items-center justify-between" />
	<div class="relative flex items-start mt-4">
		<div class="flex items-left h-5">
			<input
				bind:checked={isGift}
				id="comments"
				aria-describedby="comments-description"
				name="comments"
				type="checkbox"
				class="focus:ring-primary h-4 w-4 text-secondary border-gray-300 rounded"
			/>
		</div>
		<div class="ml-3 text-sm">
			<h2 class="text-sm font-medium text-gray-900">Is this a gift?</h2>
		</div>
	</div>
</div>
