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

		public get canConvert(): boolean {
			return this.images !== null && !this.isWorking
		}

		public convert(): void {
			if (this.images === null)
				return

			this.isWorking = true

			this.convertToVideo(this.images)
				.then(blob => {
					this.$emit("videoReady", blob)
					this.isWorking = false
				})
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
	}
</script>

<style scoped lang="stylus">

</style>