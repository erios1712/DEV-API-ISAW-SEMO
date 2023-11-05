/*
var Int16 = function (value) {
	var ref = UInt16(value);
	return (ref > 0x7FFF) ? ref - 0x10000 : ref;
};

var UInt16 = function (value) {
	return (value & 0xFFFF);
};

var value = 65529;
console.log ("value:\t\t" + value);
console.log ("unsigned:\t" + UInt16(value));
console.log ("signed:\t\t" + Int16(value));
*/
