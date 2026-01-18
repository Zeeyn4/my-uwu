
var dv = document.getElementById("content");
dv.style.opacity = 0;
var val = 0;

// Функция для склонения русских слов
function pluralize(num, forms) {
	// forms = [единственное, форма2-4, множественное]
	// Пример: ["день", "дня", "дней"]
	
	num = Math.abs(num);
	var n1 = num % 10;
	var n2 = num % 100;
	
	if (n2 >= 11 && n2 <= 19) {
		return forms[2]; // 11-19 - всегда множественное
	}
	if (n1 === 1) {
		return forms[0]; // 1, 21, 31, ... - единственное
	}
	if (n1 >= 2 && n1 <= 4) {
		return forms[1]; // 2-4, 22-24, ... - форма 2-4
	}
	return forms[2]; // 5-9, 10, 20, 25-30, ... - множественное
}

function timer(){
	var start = new Date(2025, 9, 10, 24, 0, 0);
	var t = new Date() - start;
	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	var m = Math.floor(t / 1000 / 60 % 60);
	var s = Math.floor(t / 1000 % 60);
	
	// Обновляем числа (без ведущих нулей для дней, с нулями для остальных)
	document.getElementById("d").innerHTML = d;
	document.getElementById("h").innerHTML = (h < 10 ? "0" : "") + h;
	document.getElementById("m").innerHTML = (m < 10 ? "0" : "") + m;
	document.getElementById("s").innerHTML = (s < 10 ? "0" : "") + s;
	
	// Обновляем склонения
	document.getElementById("dLabel").innerHTML = pluralize(d, ["День", "Дня", "Дней"]);
	document.getElementById("hLabel").innerHTML = pluralize(h, ["Час", "Часа", "Часов"]);
	document.getElementById("mLabel").innerHTML = pluralize(m, ["Минута", "Минуты", "Минут"]);
	document.getElementById("sLabel").innerHTML = pluralize(s, ["Секунда", "Секунды", "Секунд"]);
}

function fadein(){
	if(val < 1){
		val += 0.025;
		dv.style.opacity = val;
	}
	else{
		clearInterval(fadeinInterval);
		if(ok == 2){
			ok += 1;
		}
	}
}

var fadeInterval;
var fadeinInterval;

timer();
setInterval(timer, 1000);
fadeInterval = setInterval(function(){
	if(ok == 2){
		clearInterval(fadeInterval);
		fadeinInterval = setInterval(fadein, 50);
	}
}, 50)
