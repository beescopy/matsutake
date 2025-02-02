class Controls {
	constructor() {
		this.touchData = {};
		this.isTouch = false;
		this.pressedKeys = new Set()
		this.moved = false
	}

	keyPressListener() {
	}


	pressHandler(x, y, id) {
		// Save origin coords
		game.controls.touchData[id] = {x: x, y: y, prevX: x, prevY: y, startX: x, startY: y, vX: 0, vY: 0};

		if(game.currentView == "burn") {
			if(x < width * 0.4)
				game.controls.pressLeft()
			else if(x > width * 0.6)
				game.controls.pressRight()
		}
	}

	releaseHandler(x, y, id) {
		const touch = game.controls.touchData[id];

		game.player.moving = false

		// short drag is is probably a "click"
		if(Math.abs(touch.startY - y) < 30 && Math.abs(touch.startX - x) < 30)
			game.controls.genericTap(x, y);
		else if(game.currentView == "build" && Math.abs(touch.startX - x) < 70 && touch.startY - y > 60) {
			game.controls.pressUp()
		}

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
		if(game.currentView == "burn" && Math.abs(x - width/2) < 50)
			cut()
		else if(game.currentView == "bury") {
			if(x < width * 0.4)
				buryDoc()
			else if(x > width * 0.6)
				keepDoc()
		}
		else if(game.currentView == "build") {
			if(x < width * 0.4)
				game.controls.pressLeft()
			else if(x > width * 0.6)
				game.controls.pressRight()
		}
	}

	keyDownListener(evt) {
		// move right pressed
		if(evt.keyCode == 39 || evt.keyCode == 68) {
			game.controls.pressRight()
		}
		else if(evt.keyCode == 37 || evt.keyCode == 65) {
			game.controls.pressLeft()
		}
		else if(evt.keyCode == 38 || evt.keyCode == 87) {
			game.controls.pressUp()
		}
		else if(evt.keyCode == 88 ) {
			cut()
		}
		else if(evt.keyCode == 75 ) {
			keepDoc()
		}
		else if(evt.keyCode == 66 ) {
			buryDoc()
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

	pressLeft() {
		if(!this.moved) {
			this.moved = true
			firstmove()
		}
		game.player.movingLeft = true
		game.player.moving = true

		if(game.currentView == "build")
			game.build.fanIdx = (game.build.fanIdx + 1) % game.build.chosenDocs.length
		else if(game.currentView == "bury")
			buryDoc()
	}

	pressRight() {
		if(!this.moved) {
			this.moved = true
			firstmove()
		}
		game.player.movingLeft = false
		game.player.moving = true

		if(game.currentView == "build")
			game.build.fanIdx = (game.build.fanIdx + game.build.chosenDocs.length - 1) % game.build.chosenDocs.length
		else if(game.currentView == "bury")
			keepDoc()
	}

	pressUp() {
		game.player.vspeed = -1

		if(game.currentView == "build")
			handoutDoc()
	}
}
