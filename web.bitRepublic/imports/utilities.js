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
