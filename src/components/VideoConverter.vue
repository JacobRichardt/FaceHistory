<template lang="pug">
	v-card.videoConverter
		v-container
			v-btn(v-show="canConvert" @click="convert") Convert to video
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator"

	declare var MediaRecorder: any

	@Component({components: {}})
	export default class VideoConverter extends Vue {
		@Prop()
		public images!: ImageBitmap[] | null
		private isWorking = false

		private width = 1280
		private height = 720
		private frameRate = 7
		private videoBitRate = 50000000
		private mimeTypes = ["video/mp4", "video/webm"]

		public get canConvert(): boolean {
			return this.images !== null && !this.isWorking
		}

		public convert(): void {
			if (this.images === null)
				return

			this.isWorking = true

			this.convertToVideo(this.images, this.getSupportedMimeType(this.mimeTypes))
				.then(blob => {
					this.$emit("videoReady", blob)
					this.isWorking = false
				})
		}

		private getSupportedMimeType(mimeTypes: string[]): string {
			for (const type of mimeTypes)
				if (MediaRecorder.isTypeSupported(type))
					return type

			throw new Error("No supported mime types found")
		}

		private convertToVideo(images: ImageBitmap[], mimeType: string): Promise<Blob> {
			const canvas = document.createElement("Canvas") as HTMLCanvasElement

			canvas.setAttribute("width", this.width.toString(10))
			canvas.setAttribute("height", this.height.toString(10))
			canvas.style.position = "absolute"
			canvas.style.top = "0"
			canvas.style.opacity = "0"
			document.body.appendChild(canvas)
			const context = canvas.getContext("2d")!

			const stream = (canvas as any).captureStream(0)
			const recorder = new MediaRecorder(stream, {mimeType, videoBitsPerSecond: this.videoBitRate})
			const chunks: BlobPart[] = []
			let imageIndex = 0

			recorder.ondataavailable = (event: any) => {
				chunks.push(event.data)
			}

			const animate = () => {
				if (imageIndex === images.length)
					recorder.stop()

				context.clearRect(0, 0, this.width, this.height)
				context.drawImage(images[imageIndex++], 0, 0, this.width, this.height)
				stream.requestFrame()

				setTimeout(animate, 1000 / this.frameRate)
			}

			return new Promise<Blob>(resolve => {
				recorder.onstop = () => {
					document.body.removeChild(canvas)
					resolve(new Blob(chunks, {type: mimeType}))
				}

				recorder.start()
				animate()
			})
		}
	}
</script>

<style scoped lang="stylus">

</style>