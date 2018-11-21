import loadImage from "blueimp-load-image"

export default class ImageInfo {
	public canvas: HTMLCanvasElement | null = null
	public isLoading = false

	public error: Error | null = null
	public metadata: any | null = null

	constructor(private file: File) {

	}

	public get name(): string {
		return this.file.name
	}

	public get date(): Date {
		return this.metadata !== null && this.metadata.exif.get("DateTime") ? this.metadata.exif.get("DateTime") : new Date(this.file.lastModified)
	}

	public get isLoaded(): boolean {
		return this.canvas !== null
	}

	public load(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			loadImage(this.file, (canvas, metadata: any) => {
				if (canvas instanceof Error) {
					this.error = canvas
					reject(canvas.message)
				} else {
					this.canvas = canvas as HTMLCanvasElement
					this.metadata = metadata
					resolve()
				}
			}, {canvas: true, orientation: true, meta: true})
		})
	}
}
