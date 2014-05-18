var ISA = {
	ADD: /ADD\s+\$(\d+),\s+\$(\d+),\s+\$(\d+)\((\-?\d+)\)/i,
	ADDI: /ADDI\s+\$(\d+),\s+\$(\d+),\s+(\-?\d+)/i,
	SUB: /SUB\s+\$(\d+),\s+\$(\d+),\s+\$(\d+)\((\-?\d+)\)/i,
	AND: /AND\s+\$(\d+),\s+\$(\d+),\s+\$(\d+)\((\-?\d+)\)/i,
	ANDI: /ANDI\s+\$(\d+),\s+\$(\d+),\s+(\d+)/i,
	OR: /OR\s+\$(\d+),\s+\$(\d+),\s+\$(\d+)\((\-?\d+)\)/i,
	ORI: /ORI\s+\$(\d+),\s+\$(\d+),\s+(\d+)/i,
	XOR: /XOR\s+\$(\d+),\s+\$(\d+),\s+\$(\d+)\((\-?\d+)\)/i,
	XORI: /XORI\s+\$(\d+),\s+\$(\d+),\s+(\d+)/i,
	NEG: /NEG\s+\$(\d+),\s+\$(\d+)/i,
	RND: /RND\s+\$(\d+),\s+\$(\d+)/i,
	LDK: /LDK\s+\$(\d+)/i,
	LW: /LW\s+\$(\d+),\s+\$(\d+),\s+(\d+)/i,
	SW: /SW\s+\$(\d+),\s+\$(\d+),\s+(\d+)/i,
	CEQ: /CEQ\s+\$(\d+),\s+\$(\d+)/i,
	CLT: /CLT\s+\$(\d+),\s+\$(\d+)/i,
	BT: /BT\s+\:(\w+)/i,
	BF: /BF\s+\:(\w+)/i,
	BOF: /BOF\s+\:(\w+)/i,
	BTL: /BTL\s+\$(\d+),\s+\:(\w+)/i,
	BOFL: /BOFL\s+\$(\d+),\s+\:(\w+)/i,
	BCD: /BCD\s+\$(\d+),\s+(\d+)/i,
	JR: /JR\s+\$(\d+)/i,
	STALL: /STALL\s+\$(\d+),\s+(\d+)/i,
	GRAPHCALL: /GRAPHCALL/i,
	EXIT: /EXIT/i
};

function execute(controller, code) {
	var registers = controller.get('registers');
	var memory = controller.get('memory');
	var pc = parseInt(controller.get('pc'))+1;
	var labels = controller.get('labels');

	// ADD Instruction
	if(ISA.ADD.test(code)) {
		var temp = ISA.ADD.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var rt = registers[parseInt(temp[3])].get('value');
		var shamt = parseInt(temp[4]);
		registers[parseInt(temp[1])].set('value', rs + (shamt > 0 ? rt >> shamt : rt << -shamt));
		console.log('++ ADD');
	}

	if(ISA.ADDI.test(code)) {
		var temp = ISA.ADDI.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		registers[parseInt(temp[1])].set('value', (rs + imm));
		console.log('++ ADDI');
	}

	if(ISA.SUB.test(code)) {
		var temp = ISA.SUB.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var rt = registers[parseInt(temp[3])].get('value');
		var shamt = parseInt(temp[4]);
		registers[parseInt(temp[1])].set('value', rs - (shamt > 0 ? rt >> shamt : rt << -shamt));
		console.log('++ SUB');
	}

	if(ISA.AND.test(code)) {
		var temp = ISA.AND.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var rt = registers[parseInt(temp[3])].get('value');
		var shamt = parseInt(temp[4]);
		registers[parseInt(temp[1])].set('value', rs & (shamt > 0 ? rt >> shamt : rt << -shamt));
		console.log('++ AND');
	}

	if(ISA.ANDI.test(code)) {
		var temp = ISA.ANDI.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		registers[parseInt(temp[1])].set('value', (rs & imm));
		console.log('++ ANDI');
	}

	if(ISA.OR.test(code)) {
		var temp = ISA.OR.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var rt = registers[parseInt(temp[3])].get('value');
		var shamt = parseInt(temp[4]);
		registers[parseInt(temp[1])].set('value', rs | (shamt > 0 ? rt >> shamt : rt << -shamt));
		console.log('++ OR');
	}

	if(ISA.ORI.test(code)) {
		var temp = ISA.ORI.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		registers[parseInt(temp[1])].set('value', (rs | imm));
		console.log('++ ORI');
	}

	if(ISA.XOR.test(code)) {
		var temp = ISA.XOR.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var rt = registers[parseInt(temp[3])].get('value');
		var shamt = parseInt(temp[4]);
		registers[parseInt(temp[1])].set('value', rs ^ (shamt > 0 ? rt >> shamt : rt << -shamt));
		console.log('++ XOR');
	}

	if(ISA.XORI.test(code)) {
		var temp = ISA.XORI.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		registers[parseInt(temp[1])].set('value', (rs ^ imm));
		console.log('++ XORI');
	}

	if(ISA.NEG.test(code)) {
		var temp = ISA.NEG.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		registers[parseInt(temp[1])].set('value', -rs);
		console.log('++ NEG');
	}

	if(ISA.RND.test(code)) {
		var temp = ISA.RND.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		registers[parseInt(temp[1])].set('value', parseInt(Math.random()*rs));
		console.log('++ RND');
	}

	if(ISA.LDK.test(code)) {
		var temp = ISA.LDK.exec(code);
		registers[parseInt(temp[1])].set('value', controller.get('last_key'));
		console.log('++ LDK');
	}

	if(ISA.LW.test(code)) {
		var temp = ISA.LW.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		registers[parseInt(temp[1])].set('value', memory[rs + imm]);
		console.log('++ LW');
	}

	if(ISA.SW.test(code)) {
		var temp = ISA.SW.exec(code);
		var rs = registers[parseInt(temp[2])].get('value');
		var imm = parseInt(temp[3]);
		var rt = registers[parseInt(temp[1])].get('value');
		memory[rs + imm] = rt;
		controller.set('memory_changed', Date()); // Timestamp
		console.log('++ SW');
	}

	if(ISA.CEQ.test(code)) {
		var temp = ISA.CEQ.exec(code);
		var rs = registers[parseInt(temp[1])].get('value');
		var rt = registers[parseInt(temp[2])].get('value');
		controller.set('zflag', rs == rt);
		console.log('++ CEQ');
	}

	if(ISA.CLT.test(code)) {
		var temp = ISA.CLT.exec(code);
		var rs = registers[parseInt(temp[1])].get('value');
		var rt = registers[parseInt(temp[2])].get('value');
		controller.set('zflag', rs < rt);
		console.log('++ CLT');
	}

	if(ISA.BT.test(code)) {
		var temp = ISA.BT.exec(code);
		var imm = temp[1];
		if(controller.get('zflag')) {
			pc = labels.get(imm);
		}
		console.log('++ BT');
	}

	if(ISA.BF.test(code)) {
		var temp = ISA.BF.exec(code);
		var imm = temp[1];
		if(!controller.get('zflag')) {
			pc = labels.get(imm);
		}
		console.log('++ BF');
	}

	// Branch Then Link
	if(ISA.BTL.test(code)) {
		var temp = ISA.BTL.exec(code);
		var imm = temp[2]; // Imm
		if(controller.get('zflag')) {
			registers[parseInt(temp[1])].set('value', pc);
			pc = labels.get(imm);
		}
		console.log('++ BTL');
	}

	if(ISA.JR.test(code)) {
		var temp = ISA.JR.exec(code);
		var rs = registers[parseInt(temp[1])].get('value');
		pc = rs;
		console.log('++ JR');
	}

	if(ISA.STALL.test(code)) {
		var temp = ISA.STALL.exec(code);
		if(temp.length == 3) {
			var rs = registers[parseInt(temp[1])].get('value');
			var imm = parseInt(temp[2]);
			controller.set('stall', rs+imm);
		} else {
			// var rs = registers[parseInt(temp[1])].get('value');
			var imm = parseInt(temp[1]);
			controller.set('stall', imm);
		}
		
		console.log('++ STALL');
	}

	if(ISA.EXIT.test(code)) {
		var temp = ISA.EXIT.exec(code);
		controller.set('break', true);
		console.log('++ EXIT');
	}

	controller.set('pc', pc);
	controller.set('registers', registers);
	controller.set('memory', memory);
}

function assemble(controller, code) {
	var assembly = controller.get('assembly');
	var labels = controller.get('labels');
	// var memory = controller.get('memory');

	// ADD Instruction
	if(ISA.ADD.test(code)) {
		var line = '00000';
		var temp = ISA.ADD.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[3]), 5); // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += intToBinary(parseInt(temp[4]), 6); // Shamt
		
		console.log('++ ADD');
		assembly.pushObject(line);
	}

	if(ISA.ADDI.test(code)) {
		var line = '01000';
		var temp = ISA.ADDI.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ ADDI');
		assembly.pushObject(line);
	}

	if(ISA.SUB.test(code)) {
		var line = '00001';
		var temp = ISA.SUB.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[3]), 5); // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += intToBinary(parseInt(temp[4]), 6); // Shamt
		
		console.log('++ SUB');
		assembly.pushObject(line);
	}

	if(ISA.AND.test(code)) {
		var line = '00010';
		var temp = ISA.AND.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[3]), 5); // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += intToBinary(parseInt(temp[4]), 6); // Shamt
		
		console.log('++ AND');
		assembly.pushObject(line);
	}

	if(ISA.ANDI.test(code)) {
		var line = '01010';
		var temp = ISA.ANDI.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ ANDI');
		assembly.pushObject(line);
	}

	if(ISA.OR.test(code)) {
		var line = '00011';
		var temp = ISA.OR.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[3]), 5); // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += intToBinary(parseInt(temp[4]), 6); // Shamt
		
		console.log('++ OR');
		assembly.pushObject(line);
	}

	if(ISA.ORI.test(code)) {
		var line = '01011';
		var temp = ISA.ORI.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ ORI');
		assembly.pushObject(line);
	}

	if(ISA.XOR.test(code)) {
		var line = '00100';
		var temp = ISA.XOR.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[3]), 5); // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += intToBinary(parseInt(temp[4]), 6); // Shamt
		
		console.log('++ XOR');
		assembly.pushObject(line);
	}

	if(ISA.XORI.test(code)) {
		var line = '01100';
		var temp = ISA.XORI.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ XORI');
		assembly.pushObject(line);
	}

	if(ISA.NEG.test(code)) {
		var line = '00101';
		var temp = ISA.NEG.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += '00000'; // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += '000000'; // Shamt
		
		console.log('++ NEG');
		assembly.pushObject(line);
	}

	if(ISA.RND.test(code)) {
		var line = '00110';
		var temp = ISA.RND.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += '00000'; // Rt
		line += intToBinary(parseInt(temp[1]), 5); // Rd
		line += '000000'; // Shamt
		
		console.log('++ RND');
		assembly.pushObject(line);
	}

	if(ISA.LDK.test(code)) {
		var line = '01111';
		var temp = ISA.LDK.exec(code);
		line += '00000'; // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += '00000000000'; // Imm
		
		console.log('++ LDK');
		assembly.pushObject(line);
	}

	if(ISA.LW.test(code)) {
		var line = '01001';
		var temp = ISA.LW.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ LW');
		assembly.pushObject(line);
	}

	if(ISA.SW.test(code)) {
		var line = '11001';
		var temp = ISA.SW.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(parseInt(temp[3]), 11); // Imm
		
		console.log('++ SW');
		assembly.pushObject(line);
	}

	if(ISA.CEQ.test(code)) {
		var line = '10000';
		var temp = ISA.CEQ.exec(code);
		line += intToBinary(parseInt(temp[1]), 5); // Rs
		line += intToBinary(parseInt(temp[2]), 5); // Rt
		line += '00000000000'; // Imm
		
		console.log('++ CEQ');
		assembly.pushObject(line);
	}

	if(ISA.CLT.test(code)) {
		var line = '10001';
		var temp = ISA.CLT.exec(code);
		line += intToBinary(parseInt(temp[2]), 5); // Rs
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += '00000000000'; // Imm
		
		console.log('++ CLT');
		assembly.pushObject(line);
	}

	if(ISA.BT.test(code)) {
		var line = '10010';
		var temp = ISA.BT.exec(code);
		line += '0000000000'; // XXX
		line += intToBinary(labels.get(temp[1]), 11); // IMM

		console.log('++ BT');
		assembly.pushObject(line);
	}

	if(ISA.BF.test(code)) {
		var line = '10011';
		var temp = ISA.BF.exec(code);
		line += '0000000000'; // XXX
		line += intToBinary(labels.get(temp[1]), 11); // IMM

		console.log('++ BF');
		assembly.pushObject(line);
	}

	if(ISA.BOF.test(code)) {
		var line = '10100';
		var temp = ISA.BOF.exec(code);
		line += '0000000000'; // XXX
		line += intToBinary(labels.get(temp[1]), 11); // IMM

		console.log('++ BOF');
		assembly.pushObject(line);
	}

	if(ISA.BTL.test(code)) {
		var line = '11100';
		var temp = ISA.BTL.exec(code);
		line += '00000'; // XXX
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(labels.get(temp[2]), 11); // IMM

		console.log('++ BTL');
		assembly.pushObject(line);
	}

	if(ISA.BOFL.test(code)) {
		var line = '11101';
		var temp = ISA.BOFL.exec(code);
		line += '00000'; // XXX
		line += intToBinary(parseInt(temp[1]), 5); // Rt
		line += intToBinary(labels.get(temp[2]), 11); // IMM

		console.log('++ BOFL');
		assembly.pushObject(line);
	}

	if(ISA.BCD.test(code)) {
		var line = '11010';
		var temp = ISA.BCD.exec(code);
		line += intToBinary(parseInt(temp[1]), 5); // Rs
		line += '00000'; // XXX
		line += intToBinary(parseInt(temp[2]), 11); // IMM

		console.log('++ BCD');
		assembly.pushObject(line);
	}

	if(ISA.JR.test(code)) {
		var line = '10111';
		var temp = ISA.JR.exec(code);
		line += intToBinary(parseInt(temp[1]), 5); // Rs
		line += '00000'; // XXX
		line += '00000000000'; // IMM

		console.log('++ JR');
		assembly.pushObject(line);
	}

	if(ISA.STALL.test(code)) {
		var line = '11011';
		var temp = ISA.STALL.exec(code);
		line += intToBinary(temp.length == 3 ? parseInt(temp[1]) : 0, 5); // Rs 
		line += '00000'; // XXX
		line += intToBinary(temp.length == 3 ? parseInt(temp[2]) : parseInt(temp[1]), 11); // IMM

		console.log('++ STALL');
		assembly.pushObject(line);
	}

	if(ISA.GRAPHCALL.test(code)) {
		var line = '10101';
		line += '00000'; // Rs
		line += '00000'; // XXX
		line += '00000000000'; // IMM

		console.log('++ GRAPHCALL');
		assembly.pushObject(line);
	}

	if(ISA.EXIT.test(code)) {
		var line = '10110';
		line += '00000'; // Rs
		line += '00000'; // XXX
		line += '00000000000'; // IMM

		console.log('++ EXIT');
		assembly.pushObject(line);
	}

	controller.set('assembly', assembly);
}

function _process_macros(program) {
	// var lines = [];
	// program.replace(/@up_head/i, 1).split('\n').forEach(function(l) {
	// 	lines.push(l
	// 		.replace(/@down_head/i, 2)
	// 		.replace(/@right_head/i, 3)
	// 		.replace(/@left_head/i, 4)
	// 		.replace(/@up_body/i, 5)
	// 		.replace(/@down_body/i, 6)
	// 		.replace(/@right_body/i, 7)
	// 		.replace(/@left_body/i, 8)
	// 		.replace(/@apple/i, 9)
	// 		.replace(/@black/i, 0)
	// 		.replace(/@blue/i, 1)
	// 		.replace(/@green/i, 2)
	// 		.replace(/@cyan/i, 3)
	// 		.replace(/@red/i, 4)
	// 		.replace(/@pink/i, 5)
	// 		.replace(/@yellow/i, 6)
	// 		.replace(/@white/i, 7)
	// 		.replace(/li\s+(\$\d+),\s+(\d+)/gi, "addi $1, $0, $2"));
	// });	
	// return lines;
	return program
			.replace(/\$(\w+)/gi, function(match, p1) {
				switch(p1) {
					case "return":
						return "$31";
					case "head":
						return "$30";
					case "key":
						return "$29";
					case "score":
						return "$28";
					case "x":
						return "$27";
					case "y":
						return "$26";
					default:
						return "$"+p1;
				}
			})
			.replace(/brl\s+(\:\w+)/gi, function(match, p1) {
				return "ceq $0, $0\n"+
				"btl $31, "+p1;
			})
			.replace(/@center/gi, 1)
			.replace(/@up/i, 2)
			.replace(/@down/gi, 4)
			.replace(/@right/gi, 3)
			.replace(/@left/gi, 5)
			.replace(/@up_head/i, 1)
			.replace(/@down_head/gi, 2)
			.replace(/@right_head/gi, 3)
			.replace(/@left_head/gi, 4)
			.replace(/@up_body/gi, 5)
			.replace(/@down_body/gi, 6)
			.replace(/@right_body/gi, 7)
			.replace(/@left_body/gi, 8)
			.replace(/@apple/gi, 9)
			.replace(/@black/gi, 0)
			.replace(/@blue/gi, 1)
			.replace(/@green/gi, 2)
			.replace(/@cyan/gi, 3)
			.replace(/@red/gi, 4)
			.replace(/@pink/gi, 5)
			.replace(/@yellow/gi, 6)
			.replace(/@white/gi, 7)
			.replace(/li\s+(\$\d+),\s+(\d+)/gi, "addi $1, $0, $2")
			.replace(/point\s+(\$\d+),\s+(\$\d+),\s+(\d+)/gi, function(match, p1, p2, p3) {
				return "addi $10, $0, 6\n" // function (point)
						+"addi $11, "+p1+", 0\n" // x
						+"addi $12, "+p2+", 0\n" // y
						+"addi $15, $0, "+p3+"\n" // color
						+"GRAPHCALL"; // Trigger the graph call
			})
			.split('\n');
}