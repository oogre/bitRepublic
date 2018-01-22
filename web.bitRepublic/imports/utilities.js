import { check } from 'meteor/check';

export function numberFormat(inputNumber){
	const maxChar = 10;

	check(inputNumber, Number);

	inputNumber = Math.round(inputNumber);
	let stringNumber = inputNumber+"";
	let outputNumber = '';
	let counter = 0;
	for(let c = stringNumber.length-1 ; c >= 0 || counter < maxChar; c --, counter++){
		var s = stringNumber.charAt(c);
		if(c < 0){
			s = "0";
		}
		if(counter == 5){
			s += ",";
		}
		outputNumber = s + outputNumber;
	}
	return outputNumber;
}