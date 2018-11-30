declare module "blueimp-load-image" {
	// tslint:disable-next-line
	interface loadImageOptions {
		maxWidth?: number
		maxHeight?: number
		minWidth?: number
		minHeight?: number
		orientation?: number|boolean
		meta?: boolean
		canvas?: boolean
	}

	type loadImage = (image: File|Blob, callback: (result: HTMLImageElement|HTMLCanvasElement|Error, metadata: any) => void, options: loadImageOptions) => any

	const loadImage: loadImage

	export = loadImage
}
