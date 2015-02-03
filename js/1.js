    $('#scene').mousedown(function(e) { //обработчик нажатия клавиши мыши (для перетаскивания)
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { 
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        bMouseDown = true;

        if (mouseX > dragon.x- dragon.w/2 && mouseX < dragon.x- dragon.w/2 +dragon.w &&
            mouseY > dragon.y- dragon.h/2 && mouseY < dragon.y-dragon.h/2 +dragon.h) {

            dragon.bDrag = true;
            dragon.x = mouseX;
            dragon.y = mouseY;
        }
    });

    $('#scene').mousemove(function(e) { // обработчик движения мыши
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) {
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        // сохранение последних координат
        iLastMouseX = mouseX;
        iLastMouseY = mouseY;

        // перемещение дракона
        if (dragon.bDrag) {
            dragon.x = mouseX;
            dragon.y = mouseY;
        }

        // изменение направления дракона (зависит от положения курсора мыши)
        if (mouseX > dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 0;
        } else if (mouseX < dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 4;
        } else if (mouseY > dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 2;
        } else if (mouseY < dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 6;
        } else if (mouseY < dragon.y && mouseX < dragon.x) {
            iSprDir = 5;
        } else if (mouseY < dragon.y && mouseX > dragon.x) {
            iSprDir = 7;
        } else if (mouseY > dragon.y && mouseX < dragon.x) {
            iSprDir = 3;
        } else if (mouseY > dragon.y && mouseX > dragon.x) {
            iSprDir = 1;
        }
    });

    $('#scene').mouseup(function(e) { // обработчик отжатия мыши
        dragon.bDrag = false;
        bMouseDown = false;
		
		
		
		
		
	$(window).keydown(function(event){ // обработчик нажатия клавиш на клавиатуре
        switch (event.keyCode) {
            case 38: // 'up'
			iSprDir = 7;
                dragon.y = dragon.y - 10 ;
        }
		switch (event.keyCode) {
		case 40: // 'down'
		iSprDir = 2;
                dragon.y = dragon.y + 10 ;}
		switch (event.keyCode) {
		case 37: // 'left'
		 iSprDir = 0;
                dragon.x = dragon.x - 10 ;}
		switch (event.keyCode) {
		case 39: // 'right'
		 iSprDir = 0;
                dragon.x = dragon.x + 10 ;}
		
    });
	
	
	$(window).keyup(function(event){ // обработчик отжатия клавиш на клавиатуре
        switch (event.keyCode) {
            case 38: // 'up'
			iSprDir = 0;
        }
		switch (event.keyCode) {
		case 40: // 'down'
                iSprDir = 0;}
		switch (event.keyCode) {
		case 37: // 'left'
                iSprDir = 0;}
		switch (event.keyCode) {
		case 39: // 'right'
                iSprDir = 0 ;}
		
		
    });
	
	
	function handler(event) { // обработчик отжатия клавиш на клавиатуре
		var KEY_CODE = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		
		};
		
		switch(event.keyCode) {
		case KEY_CODE.LEFT:
			 iSprDir = 0;
                dragon.x = dragon.x - 10 ;
		break;
		case KEY_CODE.UP:
		iSprDir = 7;
                dragon.y = dragon.y - 10 ;
		break;
		case KEY_CODE.RIGHT:
			iSprDir = 0;
                dragon.x = dragon.x + 10 ;
		break;
		case KEY_CODE.DOWN:
			iSprDir = 2;
                dragon.y = dragon.y + 10;
		break;
		
		
		default:
		
			}
		
	}
	window.addEventListener('keydown', handler, false);
		window.addEventListener('keypress', handler, false);
		window.addEventListener('keyup', handler, false);