function binaryToInt(bin) {
	var num = 0;
	var count = 0;
	var v = 0;
	var MSB = bin[bin.length-1];
	var isNeg = bin[bin.length-1] == '1';
	if(bin.length < 16) {
		var c = '';
		for(var i = 0; i < 16 - bin.length; i++) {
			c += MSB;
		}
		bin = c + bin;
	}

	console.log(bin);

	for (var i = 0; i < 16; i++) {
		v += parseInt(bin[bin.length-i-1])*Math.pow(2, count++);
	}

	return isNeg ? v - Math.pow(2, bin.length) : v;
}

function log2(x) {
	return Math.log(x) / Math.LN2;
}

function intToBinary(num, length) {
	var bin = '';
	// while(num != 0) {
	// 	bin += (num & 0x1).toString();
	// 	num >>= 1;
	// }
	var count = 0;
	var bin = "";
	var isNeg = num < 0;
	var MSB = isNeg ? '1' : '0';

	// // 2's Complement ( if Negative )
	// // console.log(Math.pow(2, Math.ceil(log2(-num))))
	num = isNeg ? Math.pow(2, length) + num : num;
	// // num = isNeg ? -num + num : num;
	// console.log(num);

	while(num != 0) {
		bin += (num & 0x1).toString();
		num >>= 1;
	}
	
	// console.log(bin);

	var bin_reverse = '';
	for(var i = 0; i < bin.length; i++) {
		bin_reverse += bin[bin.length-1-i];
	}

	// console.log(bin_reverse);

	for(var i = bin.length; i < length; i++)
	{ 
		bin_reverse = MSB + bin_reverse;
	}

	return bin_reverse;
}

Ember.Handlebars.helper('getIndex', function(item, array, options) {
  return array.indexOf(item);
});
