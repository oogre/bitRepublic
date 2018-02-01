/*----------------------------------------*\
  bitRepublic - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 22:25:19
  @Last Modified time: 2018-02-02 00:09:35
\*----------------------------------------*/
import { check } from 'meteor/check';

export function bitsoilFormat(inputNumber, afterCommaOffest){
	check(inputNumber, Number);
	if(!_.isNumber(afterCommaOffest)) afterCommaOffest = 0;
	
	inputNumber = inputNumber.toFixed(6 + afterCommaOffest);
	let stringNumber = inputNumber+"";
	let outputNumber = (stringNumber.charAt(0) != "0" ? "0" : "") + stringNumber;
	
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

export function scrollTo(hash){
	let h = $("#"+hash);
	if(!!h.length){
		let des = h.offset().top;
		let cur = $('html').get(0).scrollTop;
		$('html, body').animate({
			scrollTop: des
		}, Math.abs(cur-des) * 1);
	}
}