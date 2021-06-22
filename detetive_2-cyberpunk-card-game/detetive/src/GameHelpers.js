import { mockState } from "./GameLogic";

//até a lógica do circulo serve, o resto joga fora e faz pilha
function calculaCelulasHabitadas(currentState, ctx) {
    let celulasHabilitadas = []
    let celulasHabilitadasSemClasse = [[], []]

    let playerId = "player_" + ctx.currentPlayer;
    //console.log(playerId)
    let celulaId = currentState.players[playerId].posicao

    let celulahd = celulaId, celulahe = celulaId, celulavb = celulaId, celulavt = celulaId
    for (let dadoi = 0; dadoi < currentState.dado; dadoi++) {
        celulahd += 1
        celulahe -= 1
        celulavb += 24
        celulavt -= 24
        if (dadoi > 0) { //mover as 4 diagonais simuntaneamente
            let diagonalHorariaCelulahd = celulahd, diagonalHorariaCelulahe = celulahe, diagonalHorariaCelulavb = celulavb, diagonalHorariaCelulavt = celulavt
            for (let diagonal = 0; diagonal < dadoi; diagonal++) {
                diagonalHorariaCelulahd += 23
                diagonalHorariaCelulahe -= 23
                diagonalHorariaCelulavb -= 25
                diagonalHorariaCelulavt += 25
                celulasHabilitadasSemClasse.push([diagonalHorariaCelulahd, "diagonalHorariaCelulahd"], [diagonalHorariaCelulahe, "diagonalHorariaCelulahe"], [diagonalHorariaCelulavb, "diagonalHorariaCelulavb"], [diagonalHorariaCelulavt, "diagonalHorariaCelulavt"])
            }
        }
        celulasHabilitadasSemClasse.push([celulahd, 'celulahd'], [celulahe, 'celulahe'], [celulavb, 'celulavb'], [celulavt, 'celulavt'])
    }

    //bater idCelula com estado do tabuleiro e retirar classes nao clicaveis
    let pilhaRetirar = [] //cruz nao atravessa paredes
    celulasHabilitadasSemClasse.forEach(idCelula => {
        if (idCelula[0] > 0 && idCelula[0] < 600) // se array fora
            if (currentState.celula[idCelula[0]].indexOf("cellNull") === -1) { // se piso clicavel drop do proprio array?
                celulasHabilitadas.push(idCelula[0]);
            } else {
                //descobrir direção, ou fazer array [id][direcao]
                if (idCelula[1] === 'celulavt') {//se celula que tem nulo aponta pra cima retirar dado linha reta pra cima, devido a bugs retirar somente o ultimo elemento da ponta #fé
                    let valorRetirar = (idCelula[0] - 24)
                    pilhaRetirar.push(valorRetirar)
                    if (currentState.dado > 3) //gambriarra de milhoes, futuramente implementar pilha a partir do circulo clicavel calculado
                        pilhaRetirar.push(valorRetirar - 24) //retirar 2 carinhas
                    //console.log(valorRetirar - 24)
                }
            }
    });

    for (let index = 0; index < celulasHabilitadas.length; index++) {
        //console.log(celulasHabilitadas[index])
        if (pilhaRetirar.includes(celulasHabilitadas[index]))
        celulasHabilitadas.splice(index)//  console.log();
    }
    return celulasHabilitadas
}

function createBoard() {

    /*
    cells : [
        celula: passagem, //passagem
        estado: jogador1 //null
    ] 
    */
    let cells = { celula: Array(600).fill(null), estado: Array(600).fill(null) }
    //pré sets - tem que ser na mao nao te jeito os 600 quadradinho nao seguem uma logica de preenchimento

    cells.celula[0] = 'cell cellNull'
    cells.celula[1] = 'cell cellNull'
    cells.celula[2] = 'cell cellNull'
    cells.celula[3] = 'cell cellNull'
    cells.celula[4] = 'cell cellNull'
    cells.celula[5] = 'cell cellNull'
    cells.celula[6] = 'cell cellNull'
    cells.celula[7] = 'cell cellNull'
    cells.celula[8] = 'cell cellNull'
    cells.celula[9] = 'cell cellStart'; cells.estado[9] = '0'//id jogador
    cells.celula[10] = 'cell cellNull'
    cells.celula[11] = 'cell cellNull'
    cells.celula[12] = 'cell cellNull'
    cells.celula[13] = 'cell cellNull'
    cells.celula[14] = 'cell cellStart'; cells.estado[14] = '1'
    cells.celula[15] = 'cell cellNull'
    cells.celula[16] = 'cell cellNull'
    cells.celula[17] = 'cell cellNull'
    cells.celula[18] = 'cell cellNull'
    cells.celula[19] = 'cell cellNull'
    cells.celula[20] = 'cell cellNull'
    cells.celula[21] = 'cell cellNull'
    cells.celula[22] = 'cell cellNull'
    cells.celula[23] = 'cell cellNull'
    cells.celula[24] = 'cell cellNull'
    cells.celula[25] = 'cell cellNull'
    cells.celula[26] = 'cell cellNull'
    cells.celula[27] = 'cell cellNull'
    cells.celula[28] = 'cell cellNull'
    cells.celula[29] = 'cell cellNull'
    cells.celula[30] = 'cell cellNull'
    cells.celula[31] = 'cell cellLivre'
    cells.celula[32] = 'cell cellLivre'
    cells.celula[33] = 'cell cellLivre'
    cells.celula[34] = 'cell cellNull'
    cells.celula[35] = 'cell cellNull'
    cells.celula[36] = 'cell cellNull'
    cells.celula[37] = 'cell cellNull'
    cells.celula[38] = 'cell cellLivre'
    cells.celula[39] = 'cell cellLivre'
    cells.celula[40] = 'cell cellLivre'
    cells.celula[41] = 'cell cellNull'
    cells.celula[42] = 'cell cellNull'
    cells.celula[43] = 'cell cellNull'
    cells.celula[44] = 'cell cellNull'
    cells.celula[45] = 'cell cellNull'
    cells.celula[46] = 'cell cellNull'
    cells.celula[47] = 'cell cellNull'
    cells.celula[48] = 'cell cellNull'
    cells.celula[49] = 'cell cellNull'
    cells.celula[50] = 'cell cellNull'
    cells.celula[51] = 'cell cellNull'
    cells.celula[52] = 'cell cellNull'
    cells.celula[53] = 'cell cellNull'
    cells.celula[54] = 'cell cellLivre'
    cells.celula[55] = 'cell cellLivre'
    cells.celula[56] = 'cell cellNull'
    cells.celula[57] = 'cell cellNull'
    cells.celula[58] = 'cell cellNull'
    cells.celula[59] = 'cell cellNull'
    cells.celula[60] = 'cell cellNull'
    cells.celula[61] = 'cell cellNull'
    cells.celula[62] = 'cell cellNull'
    cells.celula[63] = 'cell cellNull'
    cells.celula[64] = 'cell cellLivre'
    cells.celula[65] = 'cell cellLivre'
    cells.celula[66] = 'cell cellNull'
    cells.celula[67] = 'cell cellNull'
    cells.celula[68] = 'cell cellNull'
    cells.celula[69] = 'cell cellNull'
    cells.celula[70] = 'cell cellNull'
    cells.celula[71] = 'cell cellNull'
    cells.celula[72] = 'cell cellNull'
    cells.celula[73] = 'cell cellNull'
    cells.celula[74] = 'cell cellNull'
    cells.celula[75] = 'cell cellNull'
    cells.celula[76] = 'cell cellNull'
    cells.celula[77] = 'cell cellNull'
    cells.celula[78] = 'cell cellLivre'
    cells.celula[79] = 'cell cellLivre'
    cells.celula[80] = 'cell cellNull'
    cells.celula[81] = 'cell cellNull'
    cells.celula[82] = 'cell cellNull'
    cells.celula[83] = 'cell cellNull'
    cells.celula[84] = 'cell cellNull'
    cells.celula[85] = 'cell cellNull'
    cells.celula[86] = 'cell cellNull'
    cells.celula[87] = 'cell cellNull'
    cells.celula[88] = 'cell cellLivre'
    cells.celula[89] = 'cell cellLivre'
    cells.celula[90] = 'cell cellNull'
    cells.celula[91] = 'cell cellNull'
    cells.celula[92] = 'cell cellNull'
    cells.celula[93] = 'cell cellNull'
    cells.celula[94] = 'cell cellNull'
    cells.celula[95] = 'cell cellNull'
    cells.celula[96] = 'cell cellNull'
    cells.celula[97] = 'cell cellNull'
    cells.celula[98] = 'cell cellNull'
    cells.celula[99] = 'cell cellNull'
    cells.celula[100] = 'cell cellNull'
    cells.celula[101] = 'cell cellNull'
    cells.celula[102] = 'cell cellLivre'
    cells.celula[103] = 'cell cellLivre'
    cells.celula[104] = 'cell cellNull'
    cells.celula[105] = 'cell cellNull'
    cells.celula[106] = 'cell cellNull'
    cells.celula[107] = 'cell cellNull'
    cells.celula[108] = 'cell cellNull'
    cells.celula[109] = 'cell cellNull'
    cells.celula[110] = 'cell cellNull'
    cells.celula[111] = 'cell cellNull'
    cells.celula[112] = 'cell cellLivre'
    cells.celula[113] = 'cell cellLivre'
    cells.celula[114] = 'cell cellPorta'
    cells.celula[115] = 'cell cellPassagem'
    cells.celula[116] = 'cell cellNull'
    cells.celula[117] = 'cell cellNull'
    cells.celula[118] = 'cell cellNull'
    cells.celula[119] = 'cell cellNull'
    cells.celula[120] = 'cell cellNull'
    cells.celula[121] = 'cell cellNull'
    cells.celula[122] = 'cell cellNull'
    cells.celula[123] = 'cell cellNull'
    cells.celula[124] = 'cell cellPassagem'
    cells.celula[125] = 'cell cellNull'
    cells.celula[126] = 'cell cellLivre'
    cells.celula[127] = 'cell cellLivre'
    cells.celula[128] = 'cell cellPorta'
    cells.celula[129] = 'cell cellNull'
    cells.celula[130] = 'cell cellNull'
    cells.celula[131] = 'cell cellNull'
    cells.celula[132] = 'cell cellNull'
    cells.celula[133] = 'cell cellNull'
    cells.celula[134] = 'cell cellNull'
    cells.celula[135] = 'cell cellPorta'
    cells.celula[136] = 'cell cellLivre'
    cells.celula[137] = 'cell cellLivre'
    cells.celula[138] = 'cell cellNull'
    cells.celula[139] = 'cell cellNull'
    cells.celula[140] = 'cell cellNull'
    cells.celula[141] = 'cell cellNull'
    cells.celula[142] = 'cell cellNull'
    cells.celula[143] = 'cell cellNull'
    cells.celula[144] = 'cell cellNull'
    cells.celula[145] = 'cell cellNull'
    cells.celula[146] = 'cell cellNull'
    cells.celula[147] = 'cell cellNull'
    cells.celula[148] = 'cell cellPorta'
    cells.celula[149] = 'cell cellNull'
    cells.celula[150] = 'cell cellLivre'
    cells.celula[151] = 'cell cellLivre'
    cells.celula[152] = 'cell cellNull'
    cells.celula[153] = 'cell cellNull'
    cells.celula[154] = 'cell cellNull'
    cells.celula[155] = 'cell cellNull'
    cells.celula[156] = 'cell cellNull'
    cells.celula[157] = 'cell cellNull'
    cells.celula[158] = 'cell cellNull'
    cells.celula[159] = 'cell cellNull'
    cells.celula[160] = 'cell cellLivre'
    cells.celula[161] = 'cell cellLivre'
    cells.celula[162] = 'cell cellLivre'
    cells.celula[163] = 'cell cellLivre'
    cells.celula[164] = 'cell cellLivre'
    cells.celula[165] = 'cell cellLivre'
    cells.celula[166] = 'cell cellLivre'
    cells.celula[167] = 'cell cellStart'; cells.estado[167] = '2'
    cells.celula[168] = 'cell cellNull'
    cells.celula[169] = 'cell cellLivre'
    cells.celula[170] = 'cell cellLivre'
    cells.celula[171] = 'cell cellLivre'
    cells.celula[172] = 'cell cellLivre'
    cells.celula[173] = 'cell cellLivre'
    cells.celula[174] = 'cell cellLivre'
    cells.celula[175] = 'cell cellLivre'
    cells.celula[176] = 'cell cellNull'
    cells.celula[177] = 'cell cellPorta'
    cells.celula[178] = 'cell cellNull'
    cells.celula[179] = 'cell cellNull'
    cells.celula[180] = 'cell cellNull'
    cells.celula[181] = 'cell cellNull'
    cells.celula[182] = 'cell cellPorta'
    cells.celula[183] = 'cell cellNull'
    cells.celula[184] = 'cell cellLivre'
    cells.celula[185] = 'cell cellLivre'
    cells.celula[186] = 'cell cellLivre'
    cells.celula[187] = 'cell cellLivre'
    cells.celula[188] = 'cell cellLivre'
    cells.celula[189] = 'cell cellLivre'
    cells.celula[190] = 'cell cellLivre'
    cells.celula[191] = 'cell cellNull'
    cells.celula[192] = 'cell cellNull'
    cells.celula[193] = 'cell cellLivre'
    cells.celula[194] = 'cell cellLivre'
    cells.celula[195] = 'cell cellLivre'
    cells.celula[196] = 'cell cellLivre'
    cells.celula[197] = 'cell cellLivre'
    cells.celula[198] = 'cell cellLivre'
    cells.celula[199] = 'cell cellLivre'
    cells.celula[200] = 'cell cellLivre'
    cells.celula[201] = 'cell cellLivre'
    cells.celula[202] = 'cell cellLivre'
    cells.celula[203] = 'cell cellLivre'
    cells.celula[204] = 'cell cellLivre'
    cells.celula[205] = 'cell cellLivre'
    cells.celula[206] = 'cell cellLivre'
    cells.celula[207] = 'cell cellLivre'
    cells.celula[208] = 'cell cellLivre'
    cells.celula[209] = 'cell cellLivre'
    cells.celula[210] = 'cell cellNull'
    cells.celula[211] = 'cell cellNull'
    cells.celula[212] = 'cell cellNull'
    cells.celula[213] = 'cell cellNull'
    cells.celula[214] = 'cell cellNull'
    cells.celula[215] = 'cell cellNull'
    cells.celula[216] = 'cell cellNull'
    cells.celula[217] = 'cell cellNull'
    cells.celula[218] = 'cell cellNull'
    cells.celula[219] = 'cell cellNull'
    cells.celula[220] = 'cell cellNull'
    cells.celula[221] = 'cell cellLivre'
    cells.celula[222] = 'cell cellLivre'
    cells.celula[223] = 'cell cellLivre'
    cells.celula[224] = 'cell cellLivre'
    cells.celula[225] = 'cell cellLivre'
    cells.celula[226] = 'cell cellLivre'
    cells.celula[227] = 'cell cellLivre'
    cells.celula[228] = 'cell cellLivre'
    cells.celula[229] = 'cell cellLivre'
    cells.celula[230] = 'cell cellLivre'
    cells.celula[231] = 'cell cellLivre'
    cells.celula[232] = 'cell cellLivre'
    cells.celula[233] = 'cell cellLivre'
    cells.celula[234] = 'cell cellPorta'
    cells.celula[235] = 'cell cellNull'
    cells.celula[236] = 'cell cellNull'
    cells.celula[237] = 'cell cellNull'
    cells.celula[238] = 'cell cellNull'
    cells.celula[239] = 'cell cellNull'
    cells.celula[240] = 'cell cellNull'
    cells.celula[241] = 'cell cellNull'
    cells.celula[242] = 'cell cellNull'
    cells.celula[243] = 'cell cellNull'
    cells.celula[244] = 'cell cellNull'
    cells.celula[245] = 'cell cellNull'
    cells.celula[246] = 'cell cellNull'
    cells.celula[247] = 'cell cellNull'
    cells.celula[248] = 'cell cellLivre'
    cells.celula[249] = 'cell cellLivre'
    cells.celula[250] = 'cell cellNull'
    cells.celula[251] = 'cell cellNull'
    cells.celula[252] = 'cell cellNull'
    cells.celula[253] = 'cell cellNull'
    cells.celula[254] = 'cell cellNull'
    cells.celula[255] = 'cell cellLivre'
    cells.celula[256] = 'cell cellLivre'
    cells.celula[257] = 'cell cellLivre'
    cells.celula[258] = 'cell cellNull'
    cells.celula[259] = 'cell cellNull'
    cells.celula[260] = 'cell cellNull'
    cells.celula[261] = 'cell cellNull'
    cells.celula[262] = 'cell cellNull'
    cells.celula[263] = 'cell cellNull'
    cells.celula[264] = 'cell cellNull'
    cells.celula[265] = 'cell cellNull'
    cells.celula[266] = 'cell cellNull'
    cells.celula[267] = 'cell cellNull'
    cells.celula[268] = 'cell cellNull'
    cells.celula[269] = 'cell cellNull'
    cells.celula[270] = 'cell cellNull'
    cells.celula[271] = 'cell cellNull'
    cells.celula[272] = 'cell cellLivre'
    cells.celula[273] = 'cell cellLivre'
    cells.celula[274] = 'cell cellNull'
    cells.celula[275] = 'cell cellNull'
    cells.celula[276] = 'cell cellNull'
    cells.celula[277] = 'cell cellNull'
    cells.celula[278] = 'cell cellNull'
    cells.celula[279] = 'cell cellLivre'
    cells.celula[280] = 'cell cellLivre'
    cells.celula[281] = 'cell cellLivre'
    cells.celula[282] = 'cell cellNull'
    cells.celula[283] = 'cell cellNull'
    cells.celula[284] = 'cell cellNull'
    cells.celula[285] = 'cell cellNull'
    cells.celula[286] = 'cell cellNull'
    cells.celula[287] = 'cell cellNull'
    cells.celula[288] = 'cell cellNull'
    cells.celula[289] = 'cell cellNull'
    cells.celula[290] = 'cell cellNull'
    cells.celula[291] = 'cell cellNull'
    cells.celula[292] = 'cell cellNull'
    cells.celula[293] = 'cell cellNull'
    cells.celula[294] = 'cell cellNull'
    cells.celula[295] = 'cell cellPorta'
    cells.celula[296] = 'cell cellLivre'
    cells.celula[297] = 'cell cellLivre'
    cells.celula[298] = 'cell cellNull'
    cells.celula[299] = 'cell cellNull'
    cells.celula[300] = 'cell cellNull'
    cells.celula[301] = 'cell cellNull'
    cells.celula[302] = 'cell cellNull'
    cells.celula[303] = 'cell cellLivre'
    cells.celula[304] = 'cell cellLivre'
    cells.celula[305] = 'cell cellLivre'
    cells.celula[306] = 'cell cellNull'
    cells.celula[307] = 'cell cellNull'
    cells.celula[308] = 'cell cellNull'
    cells.celula[309] = 'cell cellNull'
    cells.celula[310] = 'cell cellPorta'
    cells.celula[311] = 'cell cellNull'
    cells.celula[312] = 'cell cellNull'
    cells.celula[313] = 'cell cellNull'
    cells.celula[314] = 'cell cellNull'
    cells.celula[315] = 'cell cellNull'
    cells.celula[316] = 'cell cellNull'
    cells.celula[317] = 'cell cellNull'
    cells.celula[318] = 'cell cellNull'
    cells.celula[319] = 'cell cellNull'
    cells.celula[320] = 'cell cellLivre'
    cells.celula[321] = 'cell cellLivre'
    cells.celula[322] = 'cell cellNull'
    cells.celula[323] = 'cell cellNull'
    cells.celula[324] = 'cell cellNull'
    cells.celula[325] = 'cell cellNull'
    cells.celula[326] = 'cell cellNull'
    cells.celula[327] = 'cell cellLivre'
    cells.celula[328] = 'cell cellLivre'
    cells.celula[329] = 'cell cellLivre'
    cells.celula[330] = 'cell cellLivre'
    cells.celula[331] = 'cell cellLivre'
    cells.celula[332] = 'cell cellLivre'
    cells.celula[333] = 'cell cellLivre'
    cells.celula[334] = 'cell cellLivre'
    cells.celula[335] = 'cell cellNull'
    cells.celula[336] = 'cell cellNull'
    cells.celula[337] = 'cell cellNull'
    cells.celula[338] = 'cell cellNull'
    cells.celula[339] = 'cell cellNull'
    cells.celula[340] = 'cell cellNull'
    cells.celula[341] = 'cell cellNull'
    cells.celula[342] = 'cell cellNull'
    cells.celula[343] = 'cell cellNull'
    cells.celula[344] = 'cell cellLivre'
    cells.celula[345] = 'cell cellLivre'
    cells.celula[346] = 'cell cellNull'
    cells.celula[347] = 'cell cellNull'
    cells.celula[348] = 'cell cellNull'
    cells.celula[349] = 'cell cellNull'
    cells.celula[350] = 'cell cellNull'
    cells.celula[351] = 'cell cellLivre'
    cells.celula[352] = 'cell cellLivre'
    cells.celula[353] = 'cell cellLivre'
    cells.celula[354] = 'cell cellNull'
    cells.celula[355] = 'cell cellNull'
    cells.celula[356] = 'cell cellPorta'
    cells.celula[357] = 'cell cellNull'
    cells.celula[358] = 'cell cellNull'
    cells.celula[359] = 'cell cellNull'
    cells.celula[360] = 'cell cellNull'
    cells.celula[361] = 'cell cellNull'
    cells.celula[362] = 'cell cellNull'
    cells.celula[363] = 'cell cellNull'
    cells.celula[364] = 'cell cellNull'
    cells.celula[365] = 'cell cellNull'
    cells.celula[366] = 'cell cellPorta'
    cells.celula[367] = 'cell cellNull'
    cells.celula[368] = 'cell cellLivre'
    cells.celula[369] = 'cell cellLivre'
    cells.celula[370] = 'cell cellNull'
    cells.celula[371] = 'cell cellNull'
    cells.celula[372] = 'cell cellNull'
    cells.celula[373] = 'cell cellNull'
    cells.celula[374] = 'cell cellNull'
    cells.celula[375] = 'cell cellLivre'
    cells.celula[376] = 'cell cellLivre'
    cells.celula[377] = 'cell cellNull'
    cells.celula[378] = 'cell cellNull'
    cells.celula[379] = 'cell cellNull'
    cells.celula[380] = 'cell cellNull'
    cells.celula[381] = 'cell cellNull'
    cells.celula[382] = 'cell cellNull'
    cells.celula[383] = 'cell cellNull'
    cells.celula[384] = 'cell cellNull'
    cells.celula[385] = 'cell cellLivre'
    cells.celula[386] = 'cell cellLivre'
    cells.celula[387] = 'cell cellLivre'
    cells.celula[388] = 'cell cellLivre'
    cells.celula[389] = 'cell cellLivre'
    cells.celula[390] = 'cell cellLivre'
    cells.celula[391] = 'cell cellLivre'
    cells.celula[392] = 'cell cellLivre'
    cells.celula[393] = 'cell cellLivre'
    cells.celula[394] = 'cell cellLivre'
    cells.celula[395] = 'cell cellLivre'
    cells.celula[396] = 'cell cellLivre'
    cells.celula[397] = 'cell cellLivre'
    cells.celula[398] = 'cell cellLivre'
    cells.celula[399] = 'cell cellLivre'
    cells.celula[400] = 'cell cellLivre'
    cells.celula[401] = 'cell cellPorta'
    cells.celula[402] = 'cell cellNull'
    cells.celula[403] = 'cell cellNull'
    cells.celula[404] = 'cell cellNull'
    cells.celula[405] = 'cell cellNull'
    cells.celula[406] = 'cell cellNull'
    cells.celula[407] = 'cell cellNull'
    cells.celula[408] = 'cell cellStart'; cells.estado[408] = '3'
    cells.celula[409] = 'cell cellLivre'
    cells.celula[410] = 'cell cellLivre'
    cells.celula[411] = 'cell cellLivre'
    cells.celula[412] = 'cell cellLivre'
    cells.celula[413] = 'cell cellLivre'
    cells.celula[414] = 'cell cellLivre'
    cells.celula[415] = 'cell cellLivre'
    cells.celula[416] = 'cell cellLivre'
    cells.celula[417] = 'cell cellLivre'
    cells.celula[418] = 'cell cellLivre'
    cells.celula[419] = 'cell cellLivre'
    cells.celula[420] = 'cell cellLivre'
    cells.celula[421] = 'cell cellLivre'
    cells.celula[422] = 'cell cellLivre'
    cells.celula[423] = 'cell cellLivre'
    cells.celula[424] = 'cell cellLivre'
    cells.celula[425] = 'cell cellNull'
    cells.celula[426] = 'cell cellNull'
    cells.celula[427] = 'cell cellNull'
    cells.celula[428] = 'cell cellNull'
    cells.celula[429] = 'cell cellNull'
    cells.celula[430] = 'cell cellNull'
    cells.celula[431] = 'cell cellNull'
    cells.celula[432] = 'cell cellNull'
    cells.celula[433] = 'cell cellLivre'
    cells.celula[434] = 'cell cellLivre'
    cells.celula[435] = 'cell cellLivre'
    cells.celula[436] = 'cell cellLivre'
    cells.celula[437] = 'cell cellLivre'
    cells.celula[438] = 'cell cellLivre'
    cells.celula[439] = 'cell cellLivre'
    cells.celula[440] = 'cell cellLivre'
    cells.celula[441] = 'cell cellNull'
    cells.celula[442] = 'cell cellNull'
    cells.celula[443] = 'cell cellPorta'
    cells.celula[444] = 'cell cellPorta'
    cells.celula[445] = 'cell cellNull'
    cells.celula[446] = 'cell cellNull'
    cells.celula[447] = 'cell cellLivre'
    cells.celula[448] = 'cell cellLivre'
    cells.celula[449] = 'cell cellLivre'
    cells.celula[450] = 'cell cellNull'
    cells.celula[451] = 'cell cellNull'
    cells.celula[452] = 'cell cellNull'
    cells.celula[453] = 'cell cellNull'
    cells.celula[454] = 'cell cellNull'
    cells.celula[455] = 'cell cellNull'
    cells.celula[456] = 'cell cellNull'
    cells.celula[457] = 'cell cellNull'
    cells.celula[458] = 'cell cellNull'
    cells.celula[459] = 'cell cellNull'
    cells.celula[460] = 'cell cellNull'
    cells.celula[461] = 'cell cellPorta'
    cells.celula[462] = 'cell cellNull'
    cells.celula[463] = 'cell cellLivre'
    cells.celula[464] = 'cell cellLivre'
    cells.celula[465] = 'cell cellNull'
    cells.celula[466] = 'cell cellNull'
    cells.celula[467] = 'cell cellNull'
    cells.celula[468] = 'cell cellNull'
    cells.celula[469] = 'cell cellNull'
    cells.celula[470] = 'cell cellNull'
    cells.celula[471] = 'cell cellLivre'
    cells.celula[472] = 'cell cellLivre'
    cells.celula[473] = 'cell cellLivre'
    cells.celula[474] = 'cell cellLivre'
    cells.celula[475] = 'cell cellLivre'
    cells.celula[476] = 'cell cellLivre'
    cells.celula[477] = 'cell cellLivre'
    cells.celula[478] = 'cell cellLivre'
    cells.celula[479] = 'cell cellStart'; cells.estado[479] = '4'
    cells.celula[480] = 'cell cellNull'
    cells.celula[481] = 'cell cellNull'
    cells.celula[482] = 'cell cellNull'
    cells.celula[483] = 'cell cellNull'
    cells.celula[484] = 'cell cellNull'
    cells.celula[485] = 'cell cellPassagem'
    cells.celula[486] = 'cell cellNull'
    cells.celula[487] = 'cell cellLivre'
    cells.celula[488] = 'cell cellLivre'
    cells.celula[489] = 'cell cellNull'
    cells.celula[490] = 'cell cellNull'
    cells.celula[491] = 'cell cellNull'
    cells.celula[492] = 'cell cellNull'
    cells.celula[493] = 'cell cellNull'
    cells.celula[494] = 'cell cellPorta'
    cells.celula[495] = 'cell cellLivre'
    cells.celula[496] = 'cell cellLivre'
    cells.celula[497] = 'cell cellLivre'
    cells.celula[498] = 'cell cellLivre'
    cells.celula[499] = 'cell cellLivre'
    cells.celula[500] = 'cell cellLivre'
    cells.celula[501] = 'cell cellLivre'
    cells.celula[502] = 'cell cellLivre'
    cells.celula[503] = 'cell cellNull'
    cells.celula[504] = 'cell cellNull'
    cells.celula[505] = 'cell cellNull'
    cells.celula[506] = 'cell cellNull'
    cells.celula[507] = 'cell cellNull'
    cells.celula[508] = 'cell cellNull'
    cells.celula[509] = 'cell cellNull'
    cells.celula[510] = 'cell cellNull'
    cells.celula[511] = 'cell cellLivre'
    cells.celula[512] = 'cell cellLivre'
    cells.celula[513] = 'cell cellNull'
    cells.celula[514] = 'cell cellNull'
    cells.celula[515] = 'cell cellNull'
    cells.celula[516] = 'cell cellNull'
    cells.celula[517] = 'cell cellNull'
    cells.celula[518] = 'cell cellNull'
    cells.celula[519] = 'cell cellLivre'
    cells.celula[520] = 'cell cellLivre'
    cells.celula[521] = 'cell cellNull'
    cells.celula[522] = 'cell cellPorta'
    cells.celula[523] = 'cell cellNull'
    cells.celula[524] = 'cell cellNull'
    cells.celula[525] = 'cell cellNull'
    cells.celula[526] = 'cell cellNull'
    cells.celula[527] = 'cell cellNull'
    cells.celula[528] = 'cell cellNull'
    cells.celula[529] = 'cell cellNull'
    cells.celula[530] = 'cell cellNull'
    cells.celula[531] = 'cell cellNull'
    cells.celula[532] = 'cell cellNull'
    cells.celula[533] = 'cell cellNull'
    cells.celula[534] = 'cell cellNull'
    cells.celula[535] = 'cell cellLivre'
    cells.celula[536] = 'cell cellLivre'
    cells.celula[537] = 'cell cellNull'
    cells.celula[538] = 'cell cellNull'
    cells.celula[539] = 'cell cellNull'
    cells.celula[540] = 'cell cellNull'
    cells.celula[541] = 'cell cellNull'
    cells.celula[542] = 'cell cellNull'
    cells.celula[543] = 'cell cellLivre'
    cells.celula[544] = 'cell cellLivre'
    cells.celula[545] = 'cell cellNull'
    cells.celula[546] = 'cell cellPassagem'
    cells.celula[547] = 'cell cellNull'
    cells.celula[548] = 'cell cellNull'
    cells.celula[549] = 'cell cellNull'
    cells.celula[550] = 'cell cellNull'
    cells.celula[551] = 'cell cellNull'
    cells.celula[552] = 'cell cellNull'
    cells.celula[553] = 'cell cellNull'
    cells.celula[554] = 'cell cellNull'
    cells.celula[555] = 'cell cellNull'
    cells.celula[556] = 'cell cellNull'
    cells.celula[557] = 'cell cellNull'
    cells.celula[558] = 'cell cellNull'
    cells.celula[559] = 'cell cellLivre'
    cells.celula[560] = 'cell cellLivre'
    cells.celula[561] = 'cell cellNull'
    cells.celula[562] = 'cell cellNull'
    cells.celula[563] = 'cell cellNull'
    cells.celula[564] = 'cell cellNull'
    cells.celula[565] = 'cell cellNull'
    cells.celula[566] = 'cell cellNull'
    cells.celula[567] = 'cell cellLivre'
    cells.celula[568] = 'cell cellLivre'
    cells.celula[569] = 'cell cellNull'
    cells.celula[570] = 'cell cellNull'
    cells.celula[571] = 'cell cellNull'
    cells.celula[572] = 'cell cellNull'
    cells.celula[573] = 'cell cellNull'
    cells.celula[574] = 'cell cellNull'
    cells.celula[575] = 'cell cellNull'
    cells.celula[576] = 'cell cellNull'
    cells.celula[577] = 'cell cellNull'
    cells.celula[578] = 'cell cellNull'
    cells.celula[579] = 'cell cellNull'
    cells.celula[580] = 'cell cellNull'
    cells.celula[581] = 'cell cellNull'
    cells.celula[582] = 'cell cellNull'
    cells.celula[583] = 'cell cellStart'; cells.estado[583] = '5'
    cells.celula[584] = 'cell cellNull'
    cells.celula[585] = 'cell cellNull'
    cells.celula[586] = 'cell cellNull'
    cells.celula[587] = 'cell cellNull'
    cells.celula[588] = 'cell cellNull'
    cells.celula[589] = 'cell cellNull'
    cells.celula[590] = 'cell cellNull'
    cells.celula[591] = 'cell cellNull'
    cells.celula[592] = 'cell cellNull'
    cells.celula[593] = 'cell cellNull'
    cells.celula[594] = 'cell cellNull'
    cells.celula[595] = 'cell cellNull'
    cells.celula[596] = 'cell cellNull'
    cells.celula[597] = 'cell cellNull'
    cells.celula[598] = 'cell cellNull'
    cells.celula[599] = 'cell cellNull'

    return cells
}

function getPlayerId(ctx) {

    //currentState.players[playerId].posicao = parseInt(idCelula)
    
    //player_1:{
    //   posicao: 224,
    //    peca: 'Srta Rosa',
    //    assumido: null
    //}
    
    return "player_" + ctx.currentPlayer;
}

function sortCartas(ctx) {

    let numPlayers = ctx.numPlayers

    let cartas = {
        personagem: [{
            label: 'Dona Violeta',
            jogador: null
        },
        {
            label: 'Srta Rosa',
            jogador: null
        },
        {
            label: 'Dona Branca',
            jogador: null
        },
        {
            label: 'Professor Black',
            jogador: null
        },
        {
            label: 'Sr. Marinho',
            jogador: null
        },
        {
            label: 'Coronel Mostarda',
            jogador: null
        }],
        arma: [{
            label: 'Corda',
            jogador: null
        },
        {
            label: 'Revólver',
            jogador: null
        },
        {
            label: 'Cano',
            jogador: null
        },
        {
            label: 'Chave Inglesa',
            jogador: null
        },
        {
            label: 'Faca',
            jogador: null
        },
        {
            label: 'Candelabro',
            jogador: null
        },
        ],
        local: [{
            label: 'Sala de jantar',
            jogador: null
        },
        {
            label: 'Hall',
            jogador: null
        },
        {
            label: 'Sala de estar',
            jogador: null
        },
        {
            label: 'Cozinha',
            jogador: null
        },
        {
            label: 'Salão de festas',
            jogador: null
        },
        {
            label: 'Sala de música',
            jogador: null
        },
        {
            label: 'Sala de jogos',
            jogador: null
        },
        {
            label: 'Biblioteca',
            jogador: null
        },
        {
            label: 'Escritório',
            jogador: null
        },
        ]
    }

    let personagemSegredo = Math.floor(Math.random() * Object.keys(cartas.personagem).length)
    let armaSegredo = Math.floor(Math.random() * Object.keys(cartas.arma).length)
    let localSegredo = Math.floor(Math.random() * Object.keys(cartas.local).length)
    let segredo = [`${personagemSegredo}`, `${armaSegredo}`, `${localSegredo}`]

    cartas.personagem[segredo[0]].jogador = 'segredo'
    cartas.arma[segredo[1]].jogador = 'segredo'
    cartas.local[segredo[2]].jogador = 'segredo'

    let qtdCartas = Object.keys(cartas.personagem).length + Object.keys(cartas.arma).length + Object.keys(cartas.local).length - segredo.length

    const arr = [];

    for (let i = 0; i < qtdCartas; ) {
        for(let y = 0; y < numPlayers; y++){
            i++
            arr.push(`player_${y}`);
        }
    }       

    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    cartas.personagem.forEach(card => {
        if(card.jogador == null)
        card.jogador = arr.pop()
    });
    cartas.arma.forEach(card => {
        if(card.jogador == null)
        card.jogador = arr.pop()
    });
    cartas.local.forEach(card => {
        if(card.jogador == null)
        card.jogador = arr.pop()
    });

    return [cartas,segredo]
}
//resgatar o personagem
function sortPlayers() { //player_0 a player_5 o id do player não fixo, se ele escoljer dona violeta sorteia um start pra ela e devolve pro player quer solicitou
    return [{
        posicao: 9,
        personagem: 'Dona Violeta' //cartas.personagem.label // 'Dona Violeta'
    }, {
        posicao: 14,
        personagem: 'Srta Rosa' 
    }, {
        posicao: 167,
        personagem: 'Dona Branca' 
    }, {
        posicao: 408,
        personagem: 'Professor Black' 
    }, {
        posicao: 479,
        personagem: 'Sr. Marinho' 
    }, {
        posicao: 583,
        personagem: 'Coronel Mostarda' 
    }]
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

/*função zinha da pilha e função de sort cartas*/
function removeActivePlayer(){

}
function getActivePlayer(currentState, ctx){
    
    if(!currentState) return mockState() //inicio do jogo,sem logica de pegar jogadores no lobby por enquanto
    else {
        var activePlayers = []
        for(var i = 0 ; i< Object.keys(currentState.players).length; i++){
            if(currentState.players['player_'+i].assumido != null && currentState.players['player_'+i].gameover == null)
                activePlayers.push(currentState.players['player_'+i].assumido)
        }
           //console.log(activePlayers)
        return activePlayers
    }
}

function isComodo(idCelula){
    if(idCelula === '148')
        return 'Cozinha'
    else
        return null
}
//currentState.players[getPlayerId(ctx)].gameover = true
/* setActivePlayers(['0', '3']);
implementar função get active players, depois deletePlayer etc
passar o que ele espera receber no acusar
pega todos os jogadores com gameover null
console log pra que ele espera receber

activePlayers: Object {
1: stage
3: stage
5: stage
}

implementar stage quando a visao do joga estiver ok
*/


export { calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas, sortPlayers, arraysEqual, removeActivePlayer, getActivePlayer, isComodo}