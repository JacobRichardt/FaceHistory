<template lang="pug">
	v-card.imageImport
		v-container
			label.v-btn Select the images
				input(type="file" multiple accept="image/*" @change="imagesSelected")
			v-divider
			div Converted files: {{convertedNumberOfFiles}} of {{selectedNumberOfFiles}}
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"

	@Component({components: {}})
	export default class ImageImport extends Vue {
		public selectedNumberOfFiles = 0
		public convertedNumberOfFiles = 0

		public imagesSelected(event: Event): void {
			const files = this.getFilesFromInput(event.target as HTMLInputElement)

			this.selectedNumberOfFiles = files.length

			if (files.length !== 0)
				this.createImageBitmaps(files)
					.then(images => {
						this.$emit("imagesReady", images)
					})
		}

		private createImageBitmaps(files: File[]): Promise<ImageBitmap[]> {
			this.convertedNumberOfFiles = 0
			return Promise.all(files.map(f => createImageBitmap(f).then(i => {
				this.convertedNumberOfFiles++
				return i
			})))
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