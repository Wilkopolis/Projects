
function doit() {
	var string = "{ ";
	for (var i = 0; i < 41; i++) {
		string += i + ", ";
		string += i + ", ";
		string += i + ", ";
		string += i + ", ";
		string += i + ", ";
	};
	string += "}"
	print(string);
};

doit();