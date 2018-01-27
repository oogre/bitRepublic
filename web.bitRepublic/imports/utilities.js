import { check } from 'meteor/check';

export function bitsoilFormat(inputNumber){
	check(inputNumber, Number);
	inputNumber = inputNumber.toFixed(6);
	let stringNumber = inputNumber+"";
	let outputNumber = (stringNumber.charAt(0) != "0" ? "0" : "") +stringNumber;
	while(outputNumber.length < ("bitsoil").length){
		outputNumber = "0"+outputNumber;
	}
	return outputNumber;
}


export function numberFormat(inputNumber, len){
	check(inputNumber, Number);

	let stringNumber = inputNumber+"";
	let outputNumber = stringNumber;
	while(outputNumber.length < len){
		outputNumber = "0"+outputNumber;
	}
	return outputNumber;
}

export function nowPlusSeconds(seconds){
	check(seconds, Number);
	let date = new Date();
	return new Date(date.getTime() + seconds*1000);
}

export function datePlusSeconds(date, seconds){
	check(date, Date);
	check(seconds, Number);
	return new Date(date.getTime() + seconds*1000);
}