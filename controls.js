class Controls {
	constructor() {
		this.touchData = {};
		this.isTouch = false;
		this.pressedKeys = new Set()
		this.moved = false
	}

	mute() {
		const toggle = !game.audio.muted;
		game.audio.mainLoop.audio.muted = toggle;
	}

	keyPressListener() {
		game.controls.startAudio()
	}

	startAudio(){
		
	}


	pressHandler(x, y, id) {
		game.controls.startAudio()
		// Save origin coords
		game.controls.touchData[id] = {x: x, y: y, prevX: x, prevY: y, startX: x, startY: y, vX: 0, vY: 0};
	}

	releaseHandler(x, y, id) {
		const touch = game.controls.touchData[id];

		// short drag is is probably a "click"
		if(Math.abs(touch.startY - y) < 3 * game.pix && Math.abs(touch.startX - x) < 30)
			game.controls.genericTap(x, y);

		if(game.controls.touchData[id].simKey) {
			game.controls.pressedKeys.delete(game.controls.touchData[id].simKey)
			const pressedKeys = game.controls.pressedKeys

			if(!(pressedKeys.has(39) || pressedKeys.has(68) || pressedKeys.has(37) || pressedKeys.has(65))) {
				
			}
		}

		game.controls.touchData[id] = null;
	}

	moveHandler(x, y, id) {

	}

	genericTap(x, y) {
		
	}

	keyDownListener(evt) {
		//console.log(evt.keyCode)
		if(evt.keyCode == 77) {
			game.controls.mute()
		}
		// move right pressed
		else if(evt.keyCode == 39 || evt.keyCode == 68) {
			if(!this.moved) {
				this.moved = true
				firstmove()
			}
			game.player.movingLeft = false
			game.player.moving = true
		}
		else if(evt.keyCode == 37 || evt.keyCode == 65) {
			if(!this.moved) {
				this.moved = true
				firstmove()
			}
			game.player.movingLeft = true
			game.player.moving = true
		}
		else if(evt.keyCode == 38 || evt.keyCode == 87) {
			game.player.vspeed = -1
		}
		else if(evt.keyCode == 88 ) {
			cut()
		}
		else {
			console.log(evt.keyCode)
		}
		game.controls.pressedKeys.add(evt.keyCode)
	}

	keyUpListener(evt) {
		game.controls.pressedKeys.delete(evt.keyCode)
		const pressedKeys = game.controls.pressedKeys

		if(!(pressedKeys.has(39) || pressedKeys.has(68) || pressedKeys.has(37) || pressedKeys.has(65))) {
			game.player.moving = false
		}

	}
}