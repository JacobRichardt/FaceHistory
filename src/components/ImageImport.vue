<template lang="pug">
	v-card.imageImport
		v-container
			label Select the images
				input(type="file" multiple accept="image/*" @change="imagesSelected")
			v-divider
			div Selected files: {{selectedFiles}}

</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	@Component({components: {}})
	export default class ImageImport extends Vue {
		public selectedFiles = 0

		public imagesSelected(event: Event): void {
			const files = this.getFilesFromInput(event.target as HTMLInputElement)

			this.selectedFiles = files.length
		}

		private getFilesFromInput(input: HTMLInputElement): File[] {
			if (input.files === null || input.files.length === 0)
				return []

			const files = Array.from(input.files)
			input.value = ""

			return files
		}
	}
</script>

<style scoped lang="stylus">
	.imageImport
		label
			cursor pointer
			input[type=file]
				display none
</style>