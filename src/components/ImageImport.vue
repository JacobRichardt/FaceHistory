<template lang="pug">
	v-card.imageImport
		label Select the images
			input(type="file" multiple)
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	@Component({components: {}})
	export default class ImageImport extends Vue {

	}
</script>

<style scoped lang="stylus">
	.imageImport
		label
			cursor pointer
			input[type=file]
				display none
</style>