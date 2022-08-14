<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Attribute {
		id: number;
		name: string;
		position: number;
		visible: boolean;
		variation: boolean;
		options: string[];
	}

	export let attribute: Attribute;

	let option: string;

	const dispatch = createEventDispatcher();

	$: dispatch('attributeChoice', {
		id: attribute.id,
		name: attribute.name,
		option: option
	});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="mt-6">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-gray-900">{attribute.name}</h2>
	</div>

	<fieldset class="mt-2">
		<legend class="sr-only">Choose a {attribute.name} option</legend>
		<div class="grid grid-cols-3 gap-3 sm:grid-cols-4">
			<!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-offset-2 ring-indigo-500"
        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
      -->
			{#each attribute.options as name, i}
				<label
					class="{name == option
						? 'bg-secondary text-white'
						: ''} border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none"
				>
					<input
						bind:group={option}
						type="radio"
						name={name + ' option'}
						value={name}
						class="sr-only"
						aria-labelledby={name + ' -option-' + { i } + '-label'}
					/>
					<span id="memory-option-0-label"> {name} </span>
				</label>
			{/each}
		</div>
	</fieldset>
</div>
