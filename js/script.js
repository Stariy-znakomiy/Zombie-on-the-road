
// переменные
var canvas, ctx;
var backgroundImage;
var iBgShiftX = 100;

var car, enemy = null; puli = null; // игровые объекты
var patrons = [];
var enemies = [];
var pulies = [];
var benzins = [];
var pressedKeys = []; // массив нажатых кнопок
var carW = 75; // ширина машины
var carH = 70; // высота машины
var iSprPos = 0; // начальный кадр спрайта
var iSprPosZomb = 0; // начальный кадр спрайта зомби
var iSprDir = 0; // начальное направление машины
var iSprDirZomb = 0; // начальное направление Зомби
var iEnemyW = 75; // ширина врага
var iEnemyH = 50; // высота врага
var iPuliW = 25; // ширина патронов
var iPuliH = 25; // высота патронов
var iBenzW = 25; // ширина бензина
var iBenzH = 25; // высота бензина
var iPatronSpeed = 10; // скорость патронов
var iEnemySpeed = 10; // скорость врага
var iPuliSpeed = 5; // скорость пуль
var iBenzSpeed = 5; // скорость бензина
var benzin = 20; //начальное количество бензина
var zombiFailed = 0; //  кол-во прорвавшихся зомби



var iMoveDir = 1; // move direction


var carSound; // звук машины
var wingsSound; // звук крыльев
var explodeSound, explodeSound2; // звуки взрыва
var laughtSound; // смех

var bMouseDown = false; // состояние мыши
var iLastMouseX = 0;
var iLastMouseY = 0;
var iScore = 0;

var puli = 10;
// -------------------------------------------------------------

// объекты:

function Car(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}
function Patron(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Enemy(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Puli(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Benzin(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
// -------------------------------------------------------------
// получить случайное число между X и Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

function NoSave(){
	 iScore = 0;
	 iBgShiftX = 0;
	 car.x = 100;
	 car.y = 100;
	 puli = 10;
	 zombiFailed = 0;
	benzin = 20;
	 for (var ekey in patrons) {
       if (patrons[ekey] !== undefined)
          delete patrons[ekey];
		  
       }
	 for (var ekey in enemies) {
       if (enemies[ekey] !== undefined)
          delete enemies[ekey];
		  
       }
	   for (var ekey in pulies) {
       if (pulies[ekey] !== undefined)
          delete pulies[ekey];
		  
       }
	   for (var ekey in benzins) {
       if (benzins[ekey] !== undefined)
          delete benzins[ekey];
		  
       }
	   for (var ekey in pressedKeys) {
       if (pressedKeys[evt.keyCode] !== undefined)
          delete pressedKeys[evt.keyCode];
		  
       }
	   
}


// функции рисования :
function drawScene() { // основная функция отрисовки сцены

 // process pressed keys (movement of plane)
            processPressedKeys();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //очистить холст

    // нарисовать фон
    iBgShiftX += 4;
    if (iBgShiftX >= 1045) {
        iBgShiftX = 0;
    }
    ctx.drawImage(backgroundImage, 0 + iBgShiftX, 0, 1000, 300, 0, 0, 1000, 300);

    // обновить позиции спрайтов
   iSprPos++;
   if (iSprPos >= 9) {
       iSprPos = 0;
    }
	
	// обновить позиции спрайтов
    iSprPosZomb++;
    if (iSprPosZomb >= 8) {
        iSprPosZomb = 0;
    }

    // если зажата кнопка мыши - перемещение машины ближе к курсору
    if (bMouseDown) {
        if (iLastMouseX > car.x) {
            car.x += 5;
        }
        if (iLastMouseY > car.y) {
            car.y += 5;
        }
        if (iLastMouseX < car.x) {
            car.x -= 5;
        }
        if (iLastMouseY < car.y) {
            car.y -= 5;
        }
    }

    // рисуем машины
    ctx.drawImage(car.image, iSprPos*car.w, iSprDir*car.h, car.w, car.h, car.x - car.w/2, car.y - car.h/2, car.w, car.h);

    // рисуем патроны
    if (patrons.length > 0) {
	
        for (var key in patrons) {
            if (patrons[key] != undefined) {
                ctx.drawImage(patrons[key].image, patrons[key].x, patrons[key].y);
                patrons[key].x += patrons[key].speed;
				
                if (patrons[key].x > canvas.width) {
                    delete patrons[key];
                }
            }
        }
    }

    // рисуем врагов
    if (enemies.length > 0) {
        for (var ekey in enemies) {
            if (enemies[ekey] != undefined) {
               // ctx.drawImage(enemies[ekey].image,  enemies[ekey].x, enemies[ekey].y);
				ctx.drawImage(enemies[ekey].image, iSprPosZomb*enemies[ekey].w, iSprDirZomb*enemies[ekey].h, enemies[ekey].w, enemies[ekey].h, enemies[ekey].x, enemies[ekey].y, enemies[ekey].w, enemies[ekey].h);
                enemies[ekey].x += enemies[ekey].speed;
				
				
                if (enemies[ekey].x < - iEnemyW) {
                    delete enemies[ekey];
					zombiFailed = zombiFailed + 1;
					
                    // включаем звук смеха 
                    laughtSound.currentTime = 0;
                    laughtSound.play();
                }
            }
        }
    }
	
	if(zombiFailed == 10){
	NoSave();
	
	}
	
	if (benzin <0){
	NoSave();

	
	}
	
	// рисуем пули
    if (pulies.length > 0) {
        for (var ekey in pulies) {
            if (pulies[ekey] != undefined) {
                ctx.drawImage(pulies[ekey].image,  pulies[ekey].x, pulies[ekey].y);
				//ctx.drawImage(enemies[ekey].image, iSprPosZomb*enemies[ekey].w, iSprDirZomb*enemies[ekey].h, enemies[ekey].w, enemies[ekey].h, enemies[ekey].x, enemies[ekey].y, enemies[ekey].w, enemies[ekey].h);
                pulies[ekey].x += pulies[ekey].speed;

                if (pulies[ekey].x < - iPuliW) {
                    delete pulies[ekey];

                  
                }
            }
        }
    }
	
	// рисуем бензин
    if (benzins.length > 0) {
        for (var ekey in benzins) {
            if (benzins[ekey] != undefined) {
                ctx.drawImage(benzins[ekey].image,  benzins[ekey].x, benzins[ekey].y);
				//ctx.drawImage(enemies[ekey].image, iSprPosZomb*enemies[ekey].w, iSprDirZomb*enemies[ekey].h, enemies[ekey].w, enemies[ekey].h, enemies[ekey].x, enemies[ekey].y, enemies[ekey].w, enemies[ekey].h);
                benzins[ekey].x += benzins[ekey].speed;

                if (benzins[ekey].x < - iBenzW) {
                    delete benzins[ekey];

                  
                }
            }
        }
    }
	
	

    // обнаружение столкновения врагов с пулями
    if (patrons.length > 0) {
        for (var key in patrons) {
            if (patrons[key] != undefined) {

                if (enemies.length > 0) {
                    for (var ekey in enemies) {
                        if (enemies[ekey] != undefined && patrons[key] != undefined) {
                          //  if (patrons[key].x > enemies[ekey].x && patrons[key].x + patrons[key].w > enemies[ekey].x && patrons[key].y + patrons[key].h > enemies[ekey].y && patrons[key].y < enemies[ekey].y + enemies[ekey].h) {
                               if (patrons[key].x > enemies[ekey].x && patrons[key].x < enemies[ekey].x + enemies[ekey].w && patrons[key].y > enemies[ekey].y && patrons[key].y < enemies[ekey].y + enemies[ekey].h) { 
								
								delete enemies[ekey];
                                delete patrons[key];
                                iScore++;

                                // включаем звук взрыва #2
                                zombiDieSound.currentTime = 0;
                                zombiDieSound.play();
                            }
                        }
                    }
                }
            }
        }
    }



// обнаружение столкновения машины с врагами
    
                if (enemies.length > 0) {
                    for (var ekey in enemies) {
                        if (enemies[ekey] != undefined && car != undefined) {
                            if (car.x  > enemies[ekey].x && car.x < enemies[ekey].x + enemies[ekey].w && car.y > enemies[ekey].y && car.y < enemies[ekey].y + enemies[ekey].h) {
                                // включаем звук взрыва #2
                                dieSound.currentTime = 0;
                                dieSound.play();				 
				NoSave();
                            }
                        }
                    }
                }
         
		 // обнаружение столкновения машины с патронами
    
                if (pulies.length > 0) {
                    for (var ekey in pulies) {
                        if (pulies[ekey] != undefined && car != undefined) {
                            if (car.x  > pulies[ekey].x && car.x < pulies[ekey].x + pulies[ekey].w && car.y > pulies[ekey].y && car.y < pulies[ekey].y + pulies[ekey].h) {
                                // включаем звук взрыва #2
                                explodeSound3.currentTime = 0;
                                explodeSound3.play();
				delete pulies[ekey];
				 puli += 10;				
                            }
                        }
                    }
                }

					
				// обнаружение столкновения машины с бензином
    
                if (benzins.length > 0) {
                    for (var ekey in benzins) {
                        if (benzins[ekey] != undefined && car != undefined) {
                            if (car.x  > benzins[ekey].x && car.x < benzins[ekey].x + benzins[ekey].w && car.y > benzins[ekey].y && car.y < benzins[ekey].y + benzins[ekey].h) {
                                // включаем звук взрыва #2
                                benzSound.currentTime = 0;
                                benzSound.play();
				delete benzins[ekey];
				benzin = 20;				
                            }
                        }
                    }
                }

	

    // обновление счета
    ctx.font = '16px Verdana';
    ctx.fillStyle = '#fff';
    ctx.fillText('Счет: ' + iScore * 10, 900, 280);
    ctx.fillText('Нажмите "1" для выстрела', 100, 280);
	ctx.fillText('Пули: ' + puli, 800, 280);
	ctx.fillText('Бензин: ' + benzin, 650, 280);
	 ctx.fillText('Прорвавшиеся зомби: ' + zombiFailed, 400, 280);
}


// Функция процесса нажатия клавиш
function processPressedKeys() {
    if (pressedKeys[37] != undefined) { // 'Left' key
       
            iSprPos = 2;
            iMoveDir = -5;//скорость поворота машины
        
        if (car.x > 10) {
            car.x += iMoveDir;
        }
    }
    else if (pressedKeys[39] != undefined) { // 'Right' key
        
            iSprPos = 0;
            iMoveDir = 5;
        
        if (car.x  < canvas.width - 10) {
            car.x += iMoveDir;
        }
    }
	
	else if (pressedKeys[40] != undefined) { // 'Down' key
        
            iSprDir = 2;
            iMoveDir = 5;
        
        if (car.y  < canvas.height - 10) {
            car.y += iMoveDir;
        }
    }
	else if (pressedKeys[38] != undefined) { // 'Up' key
       
            iSprDir = 7;
            iMoveDir = -5;
        
        if (car.y  > 10) {
            car.y += iMoveDir;
        }
    }
	
}

// -------------------------------------------------------------

// инициализация
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    // загрузка фона
    backgroundImage = new Image();
    backgroundImage.src = 'images/road.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error');
    }

   

    laughtSound = new Audio('media/laught.wav');
    laughtSound.volume = 0.9;

    explodeSound = new Audio('media/shoot.mp3');
    explodeSound.volume = 0.9;
	dieSound = new Audio('media/die.wav');
	dieSound.volume = 0.9;
	zombiDieSound = new Audio('media/zombiDie.wav');
	zombiDieSound.volume = 0.9;
    explodeSound2 = new Audio('media/explosion.wav');
    explodeSound2.volume = 0.9;
	explodeSound3 = new Audio('media/reloadingweapons.wav');
    explodeSound3.volume = 0.9;
	explodeSound4 = new Audio('media/zombi.mp3');
    explodeSound4.volume = 0.9;
	benzSound = new Audio('media/benz.wav');
    benzSound.volume = 0.9;
	osechkaSound = new Audio('media/osechka.wav');
    osechkaSound.volume = 0.9;
    wingsSound = new Audio('media/wings.wav');
   wingsSound.volume = 0.5;
    wingsSound.addEventListener('ended', function() { // зациклить воспроизведение звука машины
        this.currentTime = 0;
        this.play();
    }, false);
    wingsSound.play();

    // инициализация пустых патронов
    var oPatronImage = new Image();
    oPatronImage.src = 'images/fire.png';
    oPatronImage.onload = function() { }

    // инициализация пустого врага
    var oEnemyImage = new Image();
    oEnemyImage.src = 'images/zombi.gif';
    oEnemyImage.onload = function() { 
	}
	
	// инициализация пулей
    var oPuliImage = new Image();
    oPuliImage.src = 'images/puli.png';
    oPuliImage.onload = function() { 
	}
	
	// инициализация бензина
    var oBenzImage = new Image();
    oBenzImage.src = 'images/benz.png';
    oBenzImage.onload = function() { 
	}
	
	//var iSprPosZomb = 0;
	
    // инициализация машины
    var oCarImage = new Image();
    oCarImage.src = 'images/car.gif';
    oCarImage.onload = function() {
        car = new Car(100, 100, carW, carH, oCarImage);
    }
////////////////////////////обработчик нажатия клавиши мыши 
    $('#scene').mousedown(function(e) { //обработчик нажатия клавиши мыши (для перетаскивания)
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { 
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        bMouseDown = true;

        
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

        // перемещение машины
        if (car.bDrag) {
            car.x = mouseX;
            car.y = mouseY;
        }

        // изменение направления машины (зависит от положения курсора мыши)
        if (mouseX > car.x && Math.abs(mouseY-car.y) < car.w/2) {
            iSprDir = 0;
        } else if (mouseX < car.x && Math.abs(mouseY-car.y) < car.w/2) {
            iSprDir = 4;
        } else if (mouseY > car.y && Math.abs(mouseX-car.x) < car.h/2) {
            iSprDir = 2;
        } else if (mouseY < car.y && Math.abs(mouseX-car.x) < car.h/2) {
            iSprDir = 6;
        } else if (mouseY < car.y && mouseX < car.x) {
            iSprDir = 5;
        } else if (mouseY < car.y && mouseX > car.x) {
            iSprDir = 7;
        } else if (mouseY > car.y && mouseX < car.x) {
            iSprDir = 3;
        } else if (mouseY > car.y && mouseX > car.x) {
            iSprDir = 1;
        }
    });

    $('#scene').mouseup(function(e) { // обработчик отжатия мыши
        car.bDrag = false;
        bMouseDown = false;

        // воспроизвести звук машины
        carSound.currentTime = 0;
        carSound.play();
    });

	
    $(window).keydown(function(event){ // обработчик нажатия клавиш на клавиатуре
        switch (event.keyCode) {
            case 49: // '1'
				if(puli>0){
                patrons.push(new Patron(car.x, car.y, 15, 15, iPatronSpeed, oPatronImage));
				
                // воспроизвести звук взрыва #1
                explodeSound.currentTime = 0;
                explodeSound.play();
                puli=puli-1;
				break;
				} else{
				osechkaSound.currentTime = 0;
                osechkaSound.play();
				}
				
        }
    });
	
	
	
	
	
	$(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }
    });

    $(window).keyup(function (evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 38 || evt.keyCode == 40) {
            // revert plane sprite to default position
            if (iSprPos > 1) {
                for (var i = iSprPos; i >= 1; i--) {
                    iSprDir = 0;
                    iMoveDir = 0;
                }
            } else {
                for (var i = iSprPos; i <= 1; i++) {
                    iSprDir = 0;
                    iMoveDir = 0;
                }
            }
        }
    });
	
	
	

	
    setInterval(drawScene, 20); // повторение кадров дорога

    // генерировать врагов случайно
    var enTimer = null;
    function addEnemy() {
        clearInterval(enTimer);

		var speedZomb = getRand(3,10); // случайная скорость зомби
        var randY = getRand(0, canvas.height - iEnemyH);
        enemies.push(new Enemy(canvas.width, randY, iEnemyW, iEnemyH, - speedZomb, oEnemyImage));
		explodeSound4.currentTime = 0;
        explodeSound4.play();
        var interval = getRand(600, 2000);
        enTimer = setInterval(addEnemy, interval); // повторение кадров
    }
    addEnemy();
	
	// генерировать пули случайно
    var puTimer = null;
    function addPuli() {
        clearInterval(puTimer);
        var randY = getRand(0, canvas.height - iPuliH);
        pulies.push(new Puli(canvas.width, randY, iPuliW, iPuliH, - iPuliSpeed, oPuliImage));

        var interval = getRand(5000, 7000);
        puTimer = setInterval(addPuli, interval); // повторение кадров
    }
    addPuli();
	
	// генерировать бензин случайно
    var beTimer = null;
    function addBenz() {
        clearInterval(beTimer);
        var randY = getRand(0, canvas.height - iBenzH);
        benzins.push(new Benzin(canvas.width, randY, iBenzW, iBenzH, - iBenzSpeed, oBenzImage));

        var interval = getRand(8000, 10000);
        beTimer = setInterval(addBenz, interval); // повторение кадров
    }
    addBenz();
	
	// счетчик бензина 
	 var benzTimer = null
	 function benzinOver(){
	 clearInterval(benzTimer);
	 benzin = benzin - 1;
	 benzTimer = setInterval(benzinOver,1000);
	 }
	benzinOver();
});



