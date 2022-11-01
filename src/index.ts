import { Globals } from './globals.js';

export class Light {

	static get LAYERS () { return Globals.LAYERS; };

	/**
	 * Capture the canvas and initialize the engine
	 */
	static init(instance: any): void {
		onmousemove = function(e){
			Globals.MOUSEPOS.x = e.clientX;
			Globals.MOUSEPOS.y = e.clientY;
		};
		onmousedown = function(e){
			if(Globals.HOLD == 0) {
				Globals.HOLD = 1;
			}
		};
		onmouseup = function(e){
			Globals.HOLD = 2;
		};

		let body = document.getElementsByTagName("body")[0];
		body.style.padding = "0px";
		body.style.margin = "0px";
		body.style.overflow = "hidden";

		let canvas: HTMLCanvasElement = document.createElement('canvas');
		canvas.setAttribute("id", "viewer");
		body.appendChild(canvas);

		if(!canvas) {
			document.getElementsByTagName("body")[0].innerHTML = "Unable to load canvas : Not found.";
			return;
		}
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		let context = canvas.getContext('2d');
		
		if(!context) {
			document.getElementsByTagName("body")[0].innerHTML = "Unable to load canvas : Could not initialize 2D Context.";
			return;
		}

		Globals.VIEWER = context;

		setInterval(instance["viewTick"], 16);
		setInterval(instance["updateTick"], 16);

		Globals.READY = true;
	}

	/**
	 * Removes all from the canvas
	 */
	static clearCanvas(): void {
		Globals.VIEWER.clearRect(0, 0, Globals.VIEWER.canvas.width, Globals.VIEWER.canvas.height);
		Globals.VIEWER.beginPath();
	}
	
	/**
	 * Draw loop
	 */
	static viewTick(): void {
		Light.clearCanvas();
		Globals.LAYERS.BACKGROUND.draw();
		Globals.LAYERS.FOREGROUND.draw();
		Globals.LAYERS.OVERLAY.draw();
	}
	
	/**
	 * Update loop
	 */
	static updateTick(): void {
		// Unlock the hover event
		Globals.HOVERED = false;

		// Undrag on release
		if(Globals.HOLD == 2) {
			Globals.DRAGGED.forEach(el => el.onDragEnd());
			Globals.DRAGGED = [];
			Globals.HOLD = 0;
		}
	
		// Trigger layer updates
		Globals.LAYERS.OVERLAY.update();
		Globals.LAYERS.FOREGROUND.update();
		Globals.LAYERS.BACKGROUND.update();
	
		Globals.DRAGGED.forEach(el => el.whileDrag());
	}
}