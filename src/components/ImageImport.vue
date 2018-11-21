<template lang="pug">
	v-card.imageImport
		v-container
			label.v-btn Select the images
				input(type="file" multiple accept="image/*" @change="imagesSelected")
			v-divider
			div Converted files: {{convertedNumberOfFiles}} of {{selectedNumberOfFiles}}
			FaceImage(v-for="image in images" :image="image")
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import ImageInfo from "@/components/ImageInfo"
	import FaceImage from "@/components/FaceImage.vue"

	@Component({components: {FaceImage}})
	export default class ImageImport extends Vue {
		public images: ImageInfo[] = []

		private currentlyLoading = 0
		private maxConcurrentLoading = 5

		public get selectedNumberOfFiles(): number {
			return this.images.length
		}

		public get convertedNumberOfFiles(): number {
			return this.images.filter(i => i.isLoaded).length
		}

		public imagesSelected(event: Event): void {
			const files = this.getFilesFromInput(event.target as HTMLInputElement)

			if (files.length !== 0) {
				this.images = files.map(f => new ImageInfo(f))
				this.loadMore()
			}
		}

		private loadMore(): void {
			for (const image of this.images) {
				if (this.currentlyLoading >= this.maxConcurrentLoading)
					return

				if (image.isLoaded || image.isLoading)
					continue

				this.currentlyLoading++
				image.load().finally(() => {
					this.currentlyLoading--
					this.loadMore()
				})
			}

			if (this.images.every(i => i.isLoaded))
				this.$emit("imagesReady", this.images)
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