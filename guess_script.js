$(document).ready(function() {

	/* --- Отключаем кнопку старта игры --- */
	toggleButtonActivity("dis");

	/* --- Вкл / выкл кнопки --- */
	function toggleButtonActivity(e){
		if(e=="dis"){
			$(".start_game_button").prop({disabled: true});
		} else {
			$(".start_game_button").prop({disabled: false});
		}
	};

	/* --- Приводим ДОМ в соответствии с режимом ручного ввода --- */
	$(".people_game").on("click", function(){
		$(".hand_input_field").removeClass("hidden");
		document.getElementById("descr_game_mode").innerHTML = "Ручной ввод числа и количества попыток.";
		$("#guess_number")[0].value = "";
		$("#attempts")[0].value = "";
		toggleButtonActivity("dis");
	});

	/* --- Приводим ДОМ в соответствии с режимом компьютерной игры --- */
	$(".computer_game").on("click", function(){
		$(".hand_input_field").addClass("hidden");
		document.getElementById("descr_game_mode").innerHTML = "Компьютер сам выберет число от 0 до 100. Количество попыток: 10.";
		toggleButtonActivity();
	});

	/* --- Валидация на число --- */
	$("#guess_number, #attempts").keyup(function(){
		var reg=/^\d*$/;
		if(reg=="" || !reg.test(this.value)){
			$(this).addClass("error");
			toggleButtonActivity("dis");
		}else{
			$(this).removeClass("error");
		};
		/* --- Включение кнопки после проверки --- */
		var gn = $("#guess_number")[0].value;
		var att = $("#attempts")[0].value;
		if(reg.test(gn) && reg.test(att) && gn !="" && att !=""){
			toggleButtonActivity();
		}
	});

	$(".start_game_button").on("click", function(){
		/* --- Запоминаем значения при вводе вручную --- */
		if($("#people_game").prop("checked")){
			var guessingNumber = $("#guess_number")[0].value;
			var attempts = $("#attempts")[0].value;
		} else {		
			/* --- Формируем переменные для компьютерного режима --- */														
			var guessingNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
			var attempts = 10;
		}
		gameProcessor(guessingNumber, attempts);   /* --- Вызываем логику) --- */
	});

	/* --- Логика) --- */
	function gameProcessor(guessingNumber, attempts){
		console.log(guessingNumber);
		var comp1, comp2, preNumInput, numInput;
		for (var i=0; i<attempts; i++) {
			numInput = inputNumber();
			if (numInput != null && numInput == guessingNumber) {
				congrat(i, guessingNumber);
				break;
			} else if (numInput == "exit" || numInput == "выход"){
				break;
			}	else {
				error(i, attempts, guessingNumber, numInput, preNumInput);
			}
			preNumInput = numInput;
		} 
	};

	/* --- Пытаемся угадать --- */
	function inputNumber(){
		var number = prompt("Введите число:", "число");
		return number;
	};

	/* --- Угадали --- */
	function congrat(i, guessingNumber){
		alert("Вы угадали за " + (i+1) + " попыток - это число: " + guessingNumber);
		clearField();
	};

	/* --- Не угадали --- */
	function error(i, attempts, guessingNumber, numInput, preNumInput){
		if (i<attempts-1) {	/* --- Не угадали, но попытки остались --- */
			alert("Вы не угадали." + compare(guessingNumber, numInput, preNumInput).toUpperCase() + " Осталось попыток: " + (attempts-(i+1)));
		} else {	/* --- Не угадали и попытки закончились --- */																	
			alert("Попытки закончились - Вы НЕ угадали. Было загадано число: " + guessingNumber);
			clearField();
		}
	};

	/* --- Сравниваем с введенным ранее --- */
	function compare(guessingNumber, numInput, preNumInput){
		if (preNumInput != null) {
			comp1 = Math.abs(guessingNumber - numInput);
			comp2 = Math.abs(guessingNumber - preNumInput);
			if (comp1 < comp2) {
				return " Теплее. ";
			} else {
				return " Холоднее. ";
			}
		} else {
			return "";
		}
	};

	/* --- Чистка полей после этапа --- */
	function clearField(){
		$("#guess_number")[0].value = ""; 
		$("#attempts")[0].value = "";
	};

});