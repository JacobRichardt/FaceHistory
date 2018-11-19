<template lang="pug">
	v-card.imageImport
		v-container
			label Select the images
				input(type="file" multiple accept="image/*" @change="imagesSelected")
			v-divider
			div Selected files: {{selectedNumberOfFiles}}
			video(v-if="videoUrl" :src="videoUrl" controls)

</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"

	declare var MediaRecorder: any

	@Component({components: {}})
	export default class ImageImport extends Vue {
		public selectedNumberOfFiles = 0
		public videoUrl: string | null = null

		public imagesSelected(event: Event): void {
			const files = this.getFilesFromInput(event.target as HTMLInputElement)

			this.selectedNumberOfFiles = files.length

			if (files.length !== 0)
				this.createImageBitmaps(files)
					.then(images => this.convertToVideo(images))
					.then(blob => {
						if (this.videoUrl !== null)
							URL.revokeObjectURL(this.videoUrl)

						this.videoUrl = URL.createObjectURL(blob)
					})
		}

		private createImageBitmaps(files: File[]): Promise<ImageBitmap[]> {
			return Promise.all(files.map(f => createImageBitmap(f)))
		}

		private convertToVideo(images: ImageBitmap[]): Promise<Blob> {
			const canvas = document.createElement("Canvas") as HTMLCanvasElement
			const width = 1280
			const height = 720

			canvas.setAttribute("width", width.toString(10))
			canvas.setAttribute("height", height.toString(10))
			canvas.style.position = "absolute"
			canvas.style.top = "0"
			canvas.style.opacity = "0"
			document.body.appendChild(canvas)
			const context = canvas.getContext("2d")!

			const stream = (canvas as any).captureStream(0)
			const recorder = new MediaRecorder(stream, {mimeType: "video/webm", videoBitsPerSecond: 50000000})
			const chunks: BlobPart[] = []
			let imageIndex = 0

			recorder.ondataavailable = (event: any) => {
				chunks.push(event.data)
			}

			const animate = () => {
				context.clearRect(0, 0, width, height)
				context.drawImage(images[imageIndex++], 0, 0, width, height)
				stream.requestFrame()

				if (imageIndex < images.length)
					setTimeout(animate, 100)
				else
					recorder.stop()
			}

			return new Promise<Blob>(resolve => {
				recorder.onstop = () => {
					document.body.removeChild(canvas)
					resolve(new Blob(chunks, {type: "video/*"}))
				}

				recorder.start()
				animate()
			})
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