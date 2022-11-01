import { Dynamic } from "./drawables/dynamic";
import { Layer } from "./drawables/layer";
import { Point } from "./so/point";

export class Globals {
	/**
	 * Hierarchy of drawable/interactable layers
	 */
	static LAYERS = {
		OVERLAY : (new Layer()).setHover(true),
		FOREGROUND : (new Layer()).setHover(true).setDrag(true),
		BACKGROUND : (new Layer()),
	};

	/**
	 * Canvas context
	 */
	static VIEWER: CanvasRenderingContext2D;
	
	/**
	 * Whether the canvas is ready to be used
	 */
	static READY: boolean = false;
	
	/**
	 * Holds the current mouse position
	 */
	static MOUSEPOS: Point = new Point(0,0);

	/**
	 * Mouse click state to handle
	 */
	static HOLD: number = 0;
	
	/**
	 * Whether the hover state has been consumed by a layer's element
	 */
	static HOVERED: boolean = false;
	
	/**
	 * The currently dragged element
	 */
	static DRAGGED: Dynamic[] = [];

	/**
	 * The start position of the drag
	 */
	static DRAGPOS: Point | undefined = undefined;

	/**
	 * The starting time of the application
	 */
	static STARTTIME: number;

	/**
	 * The current application time, updated every tick
	 */
	static TIME: number;
}