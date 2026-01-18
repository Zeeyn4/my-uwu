
var btn = document.getElementById("heartTxt");
btn.style.opacity = 0;
var btnVal = 0;

function showImage(){
	// Плавное исчезновение изображения
	myImage.style.opacity = '0';
	
	setTimeout(function(){
		// Убеждаемся, что индекс в допустимых пределах
		if(imageIndex >= len){
			imageIndex = 0;
		}
		// Изображения уже предзагружены, поэтому сразу устанавливаем src
		myImage.setAttribute("src", imageArray[imageIndex]);
		myTxt.innerHTML = txtArray[imageIndex] || "";
		// Плавное появление нового изображения
		setTimeout(function(){
			myImage.style.opacity = '1';
		}, 50);
		
		// Увеличиваем индекс только после установки изображения
		imageIndex++;
		if(imageIndex >= len){
			imageIndex = 0;
		}
	}, 300);
}

var autoPlayInterval = null;

function play(){
	// Останавливаем предварительный показ при первом клике
	if(t == 0){
		if(showImageInterval){
			clearInterval(showImageInterval);
			showImageInterval = null;
		}
		imageIndex = 0;
		
		// При первом клике показываем изображения и скрываем текст приветствия
		flag = 0;
		document.getElementById("typeDiv").style.opacity = 0; // Скрываем текст "Привет, Рохьим..."
		document.getElementById("imgTxt").style.opacity = 1;
		
		// Показываем первое изображение
		myImage.setAttribute("src", imageArray[0]);
		myTxt.innerHTML = txtArray[0] || "";
		myImage.style.opacity = '1';
		imageIndex = 1; // Готовимся к следующему изображению
	} else {
		// При последующих кликах просто переключаем изображение (не меняем видимость контейнеров)
		// Переключаем на следующую фотографию
		showImage();
	}
	
	t++;
}

function preshowImage(){
	// Функция для предварительного показа изображений при загрузке
	// Не изменяет imageIndex, чтобы не мешать основному переключению
	if(imageIndex >= len){
		imageIndex = 0;
	}
	document.getElementById("imgTxt").style.opacity = 0;
	myImage.setAttribute("src", imageArray[imageIndex]);
	myTxt.innerHTML = txtArray[imageIndex] || "";
	// ВАЖНО: Не изменяем imageIndex здесь, так как это мешает основному переключению
}

function buttonFadeIn(){
	if(btnVal < 1){
		btnVal += 0.025;
		btn.style.opacity = btnVal;
	}
	else{
		clearInterval(buttonInterval);
		if(ok == 3){
			ok += 1;
		}
	}
}



function event(){

	// Увеличиваем интервал для предпоказа - меньше нагрузки на загрузку
	showImageInterval = setInterval(preshowImage, 500);

	imgInterval = setInterval(function (){
		if(ok == 3){
			setTimeout(function(){buttonInterval = setInterval(buttonFadeIn, 50);}, 1500);
			clearInterval(imgInterval);
		}
	}, 50);
}

var showImageInterval;
var imgInterval;
var buttonInterval;

event();
