//import { func } from 'prop-types';
import React from 'react';
//const util = require('util');
//import {} from './Game'
//import {acusar, mockSegredo} from './GameLogic'

class GameRender extends React.Component {


    render() {
        const board = this.renderBoard()
        const formulario = this.renderFormulario()
        const hand = this.renderHand()
        const dado =  this.renderDado()
        const palpite = this.renderPalpite()
        const acusacao = this.renderAcusar()
        const mostrarCarta = this.renderMostrarCarta()
        return <div className="main">{board}{dado}{palpite}{acusacao}{mostrarCarta}{formulario}{hand}</div>
    }

    renderAcusar(){
        let acusarFormulario = this.renderAcusarFormulario()
        //const ctx = this.props.ctx;
        //const state = this.props.G;
        //let cpuCost = getAttackProp(card, index, 'cpu_cost');
        //let damage = getAttackProp(card, index, 'damage');
        let isDisabled = false//(card.usedAttacks && card.usedAttacks.includes(index)) || !card.booted;
        let onClick = () =>  {
            document.getElementById('modalAcusacao').style.display='none';
            
            var choices = [];

            var elsPersonagem = document.getElementsByName('personagemRadio');
            for (let i=0;i<elsPersonagem.length;i++){
                if ( elsPersonagem[i].checked ) {
                    choices.push(elsPersonagem[i].value);
                }
            }
            var elsArma = document.getElementsByName('armaRadio');
            for (let i=0;i<elsArma.length;i++){
                if ( elsArma[i].checked ) {
                    choices.push(elsArma[i].value);
                }
            }
            var elsLocal = document.getElementsByName('localRadio');
            for (let i=0;i<elsLocal.length;i++){
                if ( elsLocal[i].checked ) {
                    choices.push(elsLocal[i].value);
                }
            }
            console.log(choices)
            this.props.moves.acusar(choices);

        }// default na funçaõ// this.props.moves.acusar(mockSegredo());
        let openModal = () => document.getElementById('modalAcusacao').style.display='block'
        let closeModal =  () => document.getElementById('modalAcusacao').style.display='none'
        return <div className='acusar' key='acusar'>
            
            <button onClick={openModal} className="btnAcusar">Acusar</button>
            
            <div id="modalAcusacao" className="modalAcusar">
                <div className="modalAcusarBox">
                    <div className="">
                        <span onClick={closeModal} className="modalAcusarClose">&times;</span>
                        {acusarFormulario}
                        <button onClick={onClick} disabled={isDisabled}>OK</button>
                    </div>
                </div>
            </div>
            
            </div>;
        //const id = el.target.id.slice(2);
        //.mover(id);
    }
    renderAcusarFormulario() {//futuramente trocar tudo pelo label {} das cartas, fazer laço e otimizar de alguma forma
        const cartas = this.props.G.cartas;
        const personagens = cartas.personagem.map((c, index) => this.renderListRadio(c.label,'personagem', index));
        const armas = cartas.arma.map((c, index) => this.renderListRadio(c.label,'arma', index));
        const locais = cartas.local.map((c, index) => this.renderListRadio(c.label,'local', index));
        return <div className="">
            <h4>Quem:</h4>
            <ul>
                {personagens}
            </ul>
            <h4>Como:</h4>
            <ul>
                {armas}
            </ul>
            <h4>Onde:</h4>
            <ul>
               {locais}
            </ul>
        </div>
    }
    renderMostrarCartaFormulario() {
        const cartas = this.props.G.cartas;
        const personagens = cartas.personagem.map((c, index) => this.renderListRadio(c.label,'personagem', index));
        const armas = cartas.arma.map((c, index) => this.renderListRadio(c.label,'arma', index));
        const locais = cartas.local.map((c, index) => this.renderListRadio(c.label,'local', index));

        return <div className="">
            <h4>Quem:</h4>
            <ul>
                {personagens}
            </ul>
            <h4>Como:</h4>
            <ul>
                {armas}
            </ul>
            <h4>Onde:</h4>
            <ul>
               {locais}
            </ul>
        </div>    
    }
    renderListRadio(label, tipo, index) {
        return <li key={label}>
            <input type="radio" name={`${tipo}Radio`} value={index}></input>
            <label className="container">{label}</label>
        </li>
    }
    renderPalpite(){

        let isDisabled = false
        let onClick = () =>  {
            this.props.moves.palpitar(['0','0','0']);
            //renderMostrarCarta()
        }
        return <div className="palpite" key='palpite'><button onClick={onClick} disabled={isDisabled}>Palpitar</button></div>;
    }




    renderMostrarCarta(){
        let mostrarCarta = (this.props.ctx.activePlayers && this.props.ctx.activePlayers[this.props.playerID] === 'mostrarCarta') ? false : true;
        let onClick = () =>  {            
            this.props.moves.mostrarCarta("Faca")
        }
        
        return <button onClick={onClick} className="btnMostrarCarta" disabled={mostrarCarta}>Mostrar</button>
    }
    











    /*aqui eu tenho que fazer o sever, colar do tictac infinito tuto pois a tela é individual para cada jogador poder ter uma ação*/
    renderMostrarCarta2(){
        let hand = this.renderHandMostrarCarta()
        let isDisabled = false
        let onClick = () =>  {
            document.getElementById('modalMostrarCarta').style.display='none';
            
            var choices = [];

            var elsPersonagem = document.getElementsByName('personagemRadio');
            for (let i=0;i<elsPersonagem.length;i++){
                if ( elsPersonagem[i].checked ) {
                    choices.push(elsPersonagem[i].value);
                }
            }
            var elsArma = document.getElementsByName('armaRadio');
            for (let i=0;i<elsArma.length;i++){
                if ( elsArma[i].checked ) {
                    choices.push(elsArma[i].value);
                }
            }
            var elsLocal = document.getElementsByName('localRadio');
            for (let i=0;i<elsLocal.length;i++){
                if ( elsLocal[i].checked ) {
                    choices.push(elsLocal[i].value);
                }
            }
            console.log(choices)
            this.props.moves.mostrarCarta(choices);

        }
        let openModal = () => document.getElementById('modalMostrarCarta').style.display='block'
        let closeModal =  () => document.getElementById('modalMostrarCarta').style.display='none'
        return <div className="mostrarCarta" key='mostrarCarta'>
            
            <button onClick={openModal} className="btnMostrarCarta">Mostrar</button>
            
            <div id="modalMostrarCarta" className="modalMostrarCarta">
                <div className="modalMostrarCartaBox">
                    <div className="">
                        <span onClick={closeModal} className="modalAcusarClose">&times;</span>
                        {hand}
                        <button onClick={onClick} disabled={isDisabled}>OK</button>
                    </div>
                </div>
            </div>
            </div>;
    }
    renderHandMostrarCarta(){
        const {cartas} = this.props.G;
        const playerHandPersonagem =  cartas.personagem.map(c => this.renderCardHand(c, 'personagem'));
        const playerHandArma =  cartas.arma.map(c => this.renderCardHand(c, 'arma'));
        const playerHandLocal =  cartas.local.map(c => this.renderCardHand(c, 'local'));

        return <div className="hand">
            <h3>Mão</h3>
            <h4>Quem:</h4>
            {playerHandPersonagem}
            <h4>Como:</h4>
            {playerHandArma}
            <h4>Onde:</h4>
            {playerHandLocal}
        </div>
    }
    renderBoard() { //create board
        const state = this.props.G;
        const ctx = this.props.ctx;
        var celula = state.celula;//classe
        var estado = state.estado;//boneco pisou

        let onClick = (el) => this.attachListeners(state, ctx, el);

        return <div className="board">
            <table>
                <tbody>
                    <tr>
                        <td className={celula[0]} id="id0" onClick={onClick}>{estado[0]}</td>
                        <td className={celula[1]} id="id1" onClick={onClick}>{estado[1]}</td>
                        <td className={celula[2]} id="id2" onClick={onClick}>{estado[2]}</td>
                        <td className={celula[3]} id="id3" onClick={onClick}>{estado[3]}</td>
                        <td className={celula[4]} id="id4" onClick={onClick}>{estado[4]}</td>
                        <td className={celula[5]} id="id5" onClick={onClick}>{estado[5]}</td>
                        <td className={celula[6]} id="id6" onClick={onClick}>{estado[6]}</td>
                        <td className={celula[7]} id="id7" onClick={onClick}>{estado[7]}</td>
                        <td className={celula[8]} id="id8" onClick={onClick}>{estado[8]}</td>
                        <td className={celula[9]} id="id9" onClick={onClick}>{estado[9]}</td>
                        <td className={celula[10]} id="id10" onClick={onClick}>{estado[10]}</td>
                        <td className={celula[11]} id="id11" onClick={onClick}>{estado[11]}</td>
                        <td className={celula[12]} id="id12" onClick={onClick}>{estado[12]}</td>
                        <td className={celula[13]} id="id13" onClick={onClick}>{estado[13]}</td>
                        <td className={celula[14]} id="id14" onClick={onClick}>{estado[14]}</td>
                        <td className={celula[15]} id="id15" onClick={onClick}>{estado[15]}</td>
                        <td className={celula[16]} id="id16" onClick={onClick}>{estado[16]}</td>
                        <td className={celula[17]} id="id17" onClick={onClick}>{estado[17]}</td>
                        <td className={celula[18]} id="id18" onClick={onClick}>{estado[18]}</td>
                        <td className={celula[19]} id="id19" onClick={onClick}>{estado[19]}</td>
                        <td className={celula[20]} id="id20" onClick={onClick}>{estado[20]}</td>
                        <td className={celula[21]} id="id21" onClick={onClick}>{estado[21]}</td>
                        <td className={celula[22]} id="id22" onClick={onClick}>{estado[22]}</td>
                        <td className={celula[23]} id="id23" onClick={onClick}>{estado[23]}</td>
                    </tr>
                    <tr>
                        <td className={celula[24]} id="id24" onClick={onClick}>{estado[24]}</td>
                        <td className={celula[25]} id="id25" onClick={onClick}>{estado[25]}</td>
                        <td className={celula[26]} id="id26" onClick={onClick}>{estado[26]}</td>
                        <td className={celula[27]} id="id27" onClick={onClick}>{estado[27]}</td>
                        <td className={celula[28]} id="id28" onClick={onClick}>{estado[28]}</td>
                        <td className={celula[29]} id="id29" onClick={onClick}>{estado[29]}</td>
                        <td className={celula[30]} id="id30" onClick={onClick}>{estado[30]}</td>
                        <td className={celula[31]} id="id31" onClick={onClick}>{estado[31]}</td>
                        <td className={celula[32]} id="id32" onClick={onClick}>{estado[32]}</td>
                        <td className={celula[33]} id="id33" onClick={onClick}>{estado[33]}</td>
                        <td className={celula[34]} id="id34" onClick={onClick}>{estado[34]}</td>
                        <td className={celula[35]} id="id35" onClick={onClick}>{estado[35]}</td>
                        <td className={celula[36]} id="id36" onClick={onClick}>{estado[36]}</td>
                        <td className={celula[37]} id="id37" onClick={onClick}>{estado[37]}</td>
                        <td className={celula[38]} id="id38" onClick={onClick}>{estado[38]}</td>
                        <td className={celula[39]} id="id39" onClick={onClick}>{estado[39]}</td>
                        <td className={celula[40]} id="id40" onClick={onClick}>{estado[40]}</td>
                        <td className={celula[41]} id="id41" onClick={onClick}>{estado[41]}</td>
                        <td className={celula[42]} id="id42" onClick={onClick}>{estado[42]}</td>
                        <td className={celula[43]} id="id43" onClick={onClick}>{estado[43]}</td>
                        <td className={celula[44]} id="id44" onClick={onClick}>{estado[44]}</td>
                        <td className={celula[45]} id="id45" onClick={onClick}>{estado[45]}</td>
                        <td className={celula[46]} id="id46" onClick={onClick}>{estado[46]}</td>
                        <td className={celula[47]} id="id47" onClick={onClick}>{estado[47]}</td>
                    </tr>
                    <tr>
                        <td className={celula[48]} id="id48" onClick={onClick}>{estado[48]}</td>
                        <td className={celula[49]} id="id49" onClick={onClick}>{estado[49]}</td>
                        <td className={celula[50]} id="id50" onClick={onClick}>{estado[50]}</td>
                        <td className={celula[51]} id="id51" onClick={onClick}>{estado[51]}</td>
                        <td className={celula[52]} id="id52" onClick={onClick}>{estado[52]}</td>
                        <td className={celula[53]} id="id53" onClick={onClick}>{estado[53]}</td>
                        <td className={celula[54]} id="id54" onClick={onClick}>{estado[54]}</td>
                        <td className={celula[55]} id="id55" onClick={onClick}>{estado[55]}</td>
                        <td className={celula[56]} id="id56" onClick={onClick}>{estado[56]}</td>
                        <td className={celula[57]} id="id57" onClick={onClick}>{estado[57]}</td>
                        <td className={celula[58]} id="id58" onClick={onClick}>{estado[58]}</td>
                        <td className={celula[59]} id="id59" onClick={onClick}>{estado[59]}</td>
                        <td className={celula[60]} id="id60" onClick={onClick}>{estado[60]}</td>
                        <td className={celula[61]} id="id61" onClick={onClick}>{estado[61]}</td>
                        <td className={celula[62]} id="id62" onClick={onClick}>{estado[62]}</td>
                        <td className={celula[63]} id="id63" onClick={onClick}>{estado[63]}</td>
                        <td className={celula[64]} id="id64" onClick={onClick}>{estado[64]}</td>
                        <td className={celula[65]} id="id65" onClick={onClick}>{estado[65]}</td>
                        <td className={celula[66]} id="id66" onClick={onClick}>{estado[66]}</td>
                        <td className={celula[67]} id="id67" onClick={onClick}>{estado[67]}</td>
                        <td className={celula[68]} id="id68" onClick={onClick}>{estado[68]}</td>
                        <td className={celula[69]} id="id69" onClick={onClick}>{estado[69]}</td>
                        <td className={celula[70]} id="id70" onClick={onClick}>{estado[70]}</td>
                        <td className={celula[71]} id="id71" onClick={onClick}>{estado[71]}</td>
                    </tr>
                    <tr>
                        <td className={celula[72]} id="id72" onClick={onClick}>{estado[72]}</td>
                        <td className={celula[73]} id="id73" onClick={onClick}>{estado[73]}</td>
                        <td className={celula[74]} id="id74" onClick={onClick}>{estado[74]}</td>
                        <td className={celula[75]} id="id75" onClick={onClick}>{estado[75]}</td>
                        <td className={celula[76]} id="id76" onClick={onClick}>{estado[76]}</td>
                        <td className={celula[77]} id="id77" onClick={onClick}>{estado[77]}</td>
                        <td className={celula[78]} id="id78" onClick={onClick}>{estado[78]}</td>
                        <td className={celula[79]} id="id79" onClick={onClick}>{estado[79]}</td>
                        <td className={celula[80]} id="id80" onClick={onClick}>{estado[80]}</td>
                        <td className={celula[81]} id="id81" onClick={onClick}>{estado[81]}</td>
                        <td className={celula[82]} id="id82" onClick={onClick}>{estado[82]}</td>
                        <td className={celula[83]} id="id83" onClick={onClick}>{estado[83]}</td>
                        <td className={celula[84]} id="id84" onClick={onClick}>{estado[84]}</td>
                        <td className={celula[85]} id="id85" onClick={onClick}>{estado[85]}</td>
                        <td className={celula[86]} id="id86" onClick={onClick}>{estado[86]}</td>
                        <td className={celula[87]} id="id87" onClick={onClick}>{estado[87]}</td>
                        <td className={celula[88]} id="id88" onClick={onClick}>{estado[88]}</td>
                        <td className={celula[89]} id="id89" onClick={onClick}>{estado[89]}</td>
                        <td className={celula[90]} id="id90" onClick={onClick}>{estado[90]}</td>
                        <td className={celula[91]} id="id91" onClick={onClick}>{estado[91]}</td>
                        <td className={celula[92]} id="id92" onClick={onClick}>{estado[92]}</td>
                        <td className={celula[93]} id="id93" onClick={onClick}>{estado[93]}</td>
                        <td className={celula[94]} id="id94" onClick={onClick}>{estado[94]}</td>
                        <td className={celula[95]} id="id95" onClick={onClick}>{estado[95]}</td>
                    </tr>
                    <tr>
                        <td className={celula[96]} id="id96" onClick={onClick}>{estado[96]}</td>
                        <td className={celula[97]} id="id97" onClick={onClick}>{estado[97]}</td>
                        <td className={celula[98]} id="id98" onClick={onClick}>{estado[98]}</td>
                        <td className={celula[99]} id="id99" onClick={onClick}>{estado[99]}</td>
                        <td className={celula[100]} id="id100" onClick={onClick}>{estado[100]}</td>
                        <td className={celula[101]} id="id101" onClick={onClick}>{estado[101]}</td>
                        <td className={celula[102]} id="id102" onClick={onClick}>{estado[102]}</td>
                        <td className={celula[103]} id="id103" onClick={onClick}>{estado[103]}</td>
                        <td className={celula[104]} id="id104" onClick={onClick}>{estado[104]}</td>
                        <td className={celula[105]} id="id105" onClick={onClick}>{estado[105]}</td>
                        <td className={celula[106]} id="id106" onClick={onClick}>{estado[106]}</td>
                        <td className={celula[107]} id="id107" onClick={onClick}>{estado[107]}</td>
                        <td className={celula[108]} id="id108" onClick={onClick}>{estado[108]}</td>
                        <td className={celula[109]} id="id109" onClick={onClick}>{estado[109]}</td>
                        <td className={celula[110]} id="id110" onClick={onClick}>{estado[110]}</td>
                        <td className={celula[111]} id="id111" onClick={onClick}>{estado[111]}</td>
                        <td className={celula[112]} id="id112" onClick={onClick}>{estado[112]}</td>
                        <td className={celula[113]} id="id113" onClick={onClick}>{estado[113]}</td>
                        <td className={celula[114]} id="id114" onClick={onClick}>{estado[114]}</td>
                        <td className={celula[115]} id="id115" onClick={onClick}>{estado[115]}</td>
                        <td className={celula[116]} id="id116" onClick={onClick}>{estado[116]}</td>
                        <td className={celula[117]} id="id117" onClick={onClick}>{estado[117]}</td>
                        <td className={celula[118]} id="id118" onClick={onClick}>{estado[118]}</td>
                        <td className={celula[119]} id="id119" onClick={onClick}>{estado[119]}</td>
                    </tr>
                    <tr>
                        <td className={celula[120]} id="id120" onClick={onClick}>{estado[120]}</td>
                        <td className={celula[121]} id="id121" onClick={onClick}>{estado[121]}</td>
                        <td className={celula[122]} id="id122" onClick={onClick}>{estado[122]}</td>
                        <td className={celula[123]} id="id123" onClick={onClick}>{estado[123]}</td>
                        <td className={celula[124]} id="id124" onClick={onClick}>{estado[124]}</td>
                        <td className={celula[125]} id="id125" onClick={onClick}>{estado[125]}</td>
                        <td className={celula[126]} id="id126" onClick={onClick}>{estado[126]}</td>
                        <td className={celula[127]} id="id127" onClick={onClick}>{estado[127]}</td>
                        <td className={celula[128]} id="id128" onClick={onClick}>{estado[128]}</td>
                        <td className={celula[129]} id="id129" onClick={onClick}>{estado[129]}</td>
                        <td className={celula[130]} id="id130" onClick={onClick}>{estado[130]}</td>
                        <td className={celula[131]} id="id131" onClick={onClick}>{estado[131]}</td>
                        <td className={celula[132]} id="id132" onClick={onClick}>{estado[132]}</td>
                        <td className={celula[133]} id="id133" onClick={onClick}>{estado[133]}</td>
                        <td className={celula[134]} id="id134" onClick={onClick}>{estado[134]}</td>
                        <td className={celula[135]} id="id135" onClick={onClick}>{estado[135]}</td>
                        <td className={celula[136]} id="id136" onClick={onClick}>{estado[136]}</td>
                        <td className={celula[137]} id="id137" onClick={onClick}>{estado[137]}</td>
                        <td className={celula[138]} id="id138" onClick={onClick}>{estado[138]}</td>
                        <td className={celula[139]} id="id139" onClick={onClick}>{estado[139]}</td>
                        <td className={celula[140]} id="id140" onClick={onClick}>{estado[140]}</td>
                        <td className={celula[141]} id="id141" onClick={onClick}>{estado[141]}</td>
                        <td className={celula[142]} id="id142" onClick={onClick}>{estado[142]}</td>
                        <td className={celula[143]} id="id143" onClick={onClick}>{estado[143]}</td>
                    </tr>
                    <tr>
                        <td className={celula[144]} id="id144" onClick={onClick}>{estado[144]}</td>
                        <td className={celula[145]} id="id145" onClick={onClick}>{estado[145]}</td>
                        <td className={celula[146]} id="id146" onClick={onClick}>{estado[146]}</td>
                        <td className={celula[147]} id="id147" onClick={onClick}>{estado[147]}</td>
                        <td className={celula[148]} id="id148" onClick={onClick}>{estado[148]}</td>
                        <td className={celula[149]} id="id149" onClick={onClick}>{estado[149]}</td>
                        <td className={celula[150]} id="id150" onClick={onClick}>{estado[150]}</td>
                        <td className={celula[151]} id="id151" onClick={onClick}>{estado[151]}</td>
                        <td className={celula[152]} id="id152" onClick={onClick}>{estado[152]}</td>
                        <td className={celula[153]} id="id153" onClick={onClick}>{estado[153]}</td>
                        <td className={celula[154]} id="id154" onClick={onClick}>{estado[154]}</td>
                        <td className={celula[155]} id="id155" onClick={onClick}>{estado[155]}</td>
                        <td className={celula[156]} id="id156" onClick={onClick}>{estado[156]}</td>
                        <td className={celula[157]} id="id157" onClick={onClick}>{estado[157]}</td>
                        <td className={celula[158]} id="id158" onClick={onClick}>{estado[158]}</td>
                        <td className={celula[159]} id="id159" onClick={onClick}>{estado[159]}</td>
                        <td className={celula[160]} id="id160" onClick={onClick}>{estado[160]}</td>
                        <td className={celula[161]} id="id161" onClick={onClick}>{estado[161]}</td>
                        <td className={celula[162]} id="id162" onClick={onClick}>{estado[162]}</td>
                        <td className={celula[163]} id="id163" onClick={onClick}>{estado[163]}</td>
                        <td className={celula[164]} id="id164" onClick={onClick}>{estado[164]}</td>
                        <td className={celula[165]} id="id165" onClick={onClick}>{estado[165]}</td>
                        <td className={celula[166]} id="id166" onClick={onClick}>{estado[166]}</td>
                        <td className={celula[167]} id="id167" onClick={onClick}>{estado[167]}</td>
                    </tr>
                    <tr>
                        <td className={celula[168]} id="id168" onClick={onClick}>{estado[168]}</td>
                        <td className={celula[169]} id="id169" onClick={onClick}>{estado[169]}</td>
                        <td className={celula[170]} id="id170" onClick={onClick}>{estado[170]}</td>
                        <td className={celula[171]} id="id171" onClick={onClick}>{estado[171]}</td>
                        <td className={celula[172]} id="id172" onClick={onClick}>{estado[172]}</td>
                        <td className={celula[173]} id="id173" onClick={onClick}>{estado[173]}</td>
                        <td className={celula[174]} id="id174" onClick={onClick}>{estado[174]}</td>
                        <td className={celula[175]} id="id175" onClick={onClick}>{estado[175]}</td>
                        <td className={celula[176]} id="id176" onClick={onClick}>{estado[176]}</td>
                        <td className={celula[177]} id="id177" onClick={onClick}>{estado[177]}</td>
                        <td className={celula[178]} id="id178" onClick={onClick}>{estado[178]}</td>
                        <td className={celula[179]} id="id179" onClick={onClick}>{estado[179]}</td>
                        <td className={celula[180]} id="id180" onClick={onClick}>{estado[180]}</td>
                        <td className={celula[181]} id="id181" onClick={onClick}>{estado[181]}</td>
                        <td className={celula[182]} id="id182" onClick={onClick}>{estado[182]}</td>
                        <td className={celula[183]} id="id183" onClick={onClick}>{estado[183]}</td>
                        <td className={celula[184]} id="id184" onClick={onClick}>{estado[184]}</td>
                        <td className={celula[185]} id="id185" onClick={onClick}>{estado[185]}</td>
                        <td className={celula[186]} id="id186" onClick={onClick}>{estado[186]}</td>
                        <td className={celula[187]} id="id187" onClick={onClick}>{estado[187]}</td>
                        <td className={celula[188]} id="id188" onClick={onClick}>{estado[188]}</td>
                        <td className={celula[189]} id="id189" onClick={onClick}>{estado[189]}</td>
                        <td className={celula[190]} id="id190" onClick={onClick}>{estado[190]}</td>
                        <td className={celula[191]} id="id191" onClick={onClick}>{estado[191]}</td>
                    </tr>
                    <tr>
                        <td className={celula[192]} id="id192" onClick={onClick}>{estado[192]}</td>
                        <td className={celula[193]} id="id193" onClick={onClick}>{estado[193]}</td>
                        <td className={celula[194]} id="id194" onClick={onClick}>{estado[194]}</td>
                        <td className={celula[195]} id="id195" onClick={onClick}>{estado[195]}</td>
                        <td className={celula[196]} id="id196" onClick={onClick}>{estado[196]}</td>
                        <td className={celula[197]} id="id197" onClick={onClick}>{estado[197]}</td>
                        <td className={celula[198]} id="id198" onClick={onClick}>{estado[198]}</td>
                        <td className={celula[199]} id="id199" onClick={onClick}>{estado[199]}</td>
                        <td className={celula[200]} id="id200" onClick={onClick}>{estado[200]}</td>
                        <td className={celula[201]} id="id201" onClick={onClick}>{estado[201]}</td>
                        <td className={celula[202]} id="id202" onClick={onClick}>{estado[202]}</td>
                        <td className={celula[203]} id="id203" onClick={onClick}>{estado[203]}</td>
                        <td className={celula[204]} id="id204" onClick={onClick}>{estado[204]}</td>
                        <td className={celula[205]} id="id205" onClick={onClick}>{estado[205]}</td>
                        <td className={celula[206]} id="id206" onClick={onClick}>{estado[206]}</td>
                        <td className={celula[207]} id="id207" onClick={onClick}>{estado[207]}</td>
                        <td className={celula[208]} id="id208" onClick={onClick}>{estado[208]}</td>
                        <td className={celula[209]} id="id209" onClick={onClick}>{estado[209]}</td>
                        <td className={celula[210]} id="id210" onClick={onClick}>{estado[210]}</td>
                        <td className={celula[211]} id="id211" onClick={onClick}>{estado[211]}</td>
                        <td className={celula[212]} id="id212" onClick={onClick}>{estado[212]}</td>
                        <td className={celula[213]} id="id213" onClick={onClick}>{estado[213]}</td>
                        <td className={celula[214]} id="id214" onClick={onClick}>{estado[214]}</td>
                        <td className={celula[215]} id="id215" onClick={onClick}>{estado[215]}</td>
                    </tr>
                    <tr>
                        <td className={celula[216]} id="id216" onClick={onClick}>{estado[216]}</td>
                        <td className={celula[217]} id="id217" onClick={onClick}>{estado[217]}</td>
                        <td className={celula[218]} id="id218" onClick={onClick}>{estado[218]}</td>
                        <td className={celula[219]} id="id219" onClick={onClick}>{estado[219]}</td>
                        <td className={celula[220]} id="id220" onClick={onClick}>{estado[220]}</td>
                        <td className={celula[221]} id="id221" onClick={onClick}>{estado[221]}</td>
                        <td className={celula[222]} id="id222" onClick={onClick}>{estado[222]}</td>
                        <td className={celula[223]} id="id223" onClick={onClick}>{estado[223]}</td>
                        <td className={celula[224]} id="id224" onClick={onClick}>{estado[224]}</td>
                        <td className={celula[225]} id="id225" onClick={onClick}>{estado[225]}</td>
                        <td className={celula[226]} id="id226" onClick={onClick}>{estado[226]}</td>
                        <td className={celula[227]} id="id227" onClick={onClick}>{estado[227]}</td>
                        <td className={celula[228]} id="id228" onClick={onClick}>{estado[228]}</td>
                        <td className={celula[229]} id="id229" onClick={onClick}>{estado[229]}</td>
                        <td className={celula[230]} id="id230" onClick={onClick}>{estado[230]}</td>
                        <td className={celula[231]} id="id231" onClick={onClick}>{estado[231]}</td>
                        <td className={celula[232]} id="id232" onClick={onClick}>{estado[232]}</td>
                        <td className={celula[233]} id="id233" onClick={onClick}>{estado[233]}</td>
                        <td className={celula[234]} id="id234" onClick={onClick}>{estado[234]}</td>
                        <td className={celula[235]} id="id235" onClick={onClick}>{estado[235]}</td>
                        <td className={celula[236]} id="id236" onClick={onClick}>{estado[236]}</td>
                        <td className={celula[237]} id="id237" onClick={onClick}>{estado[237]}</td>
                        <td className={celula[238]} id="id238" onClick={onClick}>{estado[238]}</td>
                        <td className={celula[239]} id="id239" onClick={onClick}>{estado[239]}</td>
                    </tr>
                    <tr>
                        <td className={celula[240]} id="id240" onClick={onClick}>{estado[240]}</td>
                        <td className={celula[241]} id="id241" onClick={onClick}>{estado[241]}</td>
                        <td className={celula[242]} id="id242" onClick={onClick}>{estado[242]}</td>
                        <td className={celula[243]} id="id243" onClick={onClick}>{estado[243]}</td>
                        <td className={celula[244]} id="id244" onClick={onClick}>{estado[244]}</td>
                        <td className={celula[245]} id="id245" onClick={onClick}>{estado[245]}</td>
                        <td className={celula[246]} id="id246" onClick={onClick}>{estado[246]}</td>
                        <td className={celula[247]} id="id247" onClick={onClick}>{estado[247]}</td>
                        <td className={celula[248]} id="id248" onClick={onClick}>{estado[248]}</td>
                        <td className={celula[249]} id="id249" onClick={onClick}>{estado[249]}</td>
                        <td className={celula[250]} id="id250" onClick={onClick}>{estado[250]}</td>
                        <td className={celula[251]} id="id251" onClick={onClick}>{estado[251]}</td>
                        <td className={celula[252]} id="id252" onClick={onClick}>{estado[252]}</td>
                        <td className={celula[253]} id="id253" onClick={onClick}>{estado[253]}</td>
                        <td className={celula[254]} id="id254" onClick={onClick}>{estado[254]}</td>
                        <td className={celula[255]} id="id255" onClick={onClick}>{estado[255]}</td>
                        <td className={celula[256]} id="id256" onClick={onClick}>{estado[256]}</td>
                        <td className={celula[257]} id="id257" onClick={onClick}>{estado[257]}</td>
                        <td className={celula[258]} id="id258" onClick={onClick}>{estado[258]}</td>
                        <td className={celula[259]} id="id259" onClick={onClick}>{estado[259]}</td>
                        <td className={celula[260]} id="id260" onClick={onClick}>{estado[260]}</td>
                        <td className={celula[261]} id="id261" onClick={onClick}>{estado[261]}</td>
                        <td className={celula[262]} id="id262" onClick={onClick}>{estado[262]}</td>
                        <td className={celula[263]} id="id263" onClick={onClick}>{estado[263]}</td>
                    </tr>
                    <tr>
                        <td className={celula[264]} id="id264" onClick={onClick}>{estado[264]}</td>
                        <td className={celula[265]} id="id265" onClick={onClick}>{estado[265]}</td>
                        <td className={celula[266]} id="id266" onClick={onClick}>{estado[266]}</td>
                        <td className={celula[267]} id="id267" onClick={onClick}>{estado[267]}</td>
                        <td className={celula[268]} id="id268" onClick={onClick}>{estado[268]}</td>
                        <td className={celula[269]} id="id269" onClick={onClick}>{estado[269]}</td>
                        <td className={celula[270]} id="id270" onClick={onClick}>{estado[270]}</td>
                        <td className={celula[271]} id="id271" onClick={onClick}>{estado[271]}</td>
                        <td className={celula[272]} id="id272" onClick={onClick}>{estado[272]}</td>
                        <td className={celula[273]} id="id273" onClick={onClick}>{estado[273]}</td>
                        <td className={celula[274]} id="id274" onClick={onClick}>{estado[274]}</td>
                        <td className={celula[275]} id="id275" onClick={onClick}>{estado[275]}</td>
                        <td className={celula[276]} id="id276" onClick={onClick}>{estado[276]}</td>
                        <td className={celula[277]} id="id277" onClick={onClick}>{estado[277]}</td>
                        <td className={celula[278]} id="id278" onClick={onClick}>{estado[278]}</td>
                        <td className={celula[279]} id="id279" onClick={onClick}>{estado[279]}</td>
                        <td className={celula[280]} id="id280" onClick={onClick}>{estado[280]}</td>
                        <td className={celula[281]} id="id281" onClick={onClick}>{estado[281]}</td>
                        <td className={celula[282]} id="id282" onClick={onClick}>{estado[282]}</td>
                        <td className={celula[283]} id="id283" onClick={onClick}>{estado[283]}</td>
                        <td className={celula[284]} id="id284" onClick={onClick}>{estado[284]}</td>
                        <td className={celula[285]} id="id285" onClick={onClick}>{estado[285]}</td>
                        <td className={celula[286]} id="id286" onClick={onClick}>{estado[286]}</td>
                        <td className={celula[287]} id="id287" onClick={onClick}>{estado[287]}</td>
                    </tr>
                    <tr>
                        <td className={celula[288]} id="id288" onClick={onClick}>{estado[288]}</td>
                        <td className={celula[289]} id="id289" onClick={onClick}>{estado[289]}</td>
                        <td className={celula[290]} id="id290" onClick={onClick}>{estado[290]}</td>
                        <td className={celula[291]} id="id291" onClick={onClick}>{estado[291]}</td>
                        <td className={celula[292]} id="id292" onClick={onClick}>{estado[292]}</td>
                        <td className={celula[293]} id="id293" onClick={onClick}>{estado[293]}</td>
                        <td className={celula[294]} id="id294" onClick={onClick}>{estado[294]}</td>
                        <td className={celula[295]} id="id295" onClick={onClick}>{estado[295]}</td>
                        <td className={celula[296]} id="id296" onClick={onClick}>{estado[296]}</td>
                        <td className={celula[297]} id="id297" onClick={onClick}>{estado[297]}</td>
                        <td className={celula[298]} id="id298" onClick={onClick}>{estado[298]}</td>
                        <td className={celula[299]} id="id299" onClick={onClick}>{estado[299]}</td>
                        <td className={celula[300]} id="id300" onClick={onClick}>{estado[300]}</td>
                        <td className={celula[301]} id="id301" onClick={onClick}>{estado[301]}</td>
                        <td className={celula[302]} id="id302" onClick={onClick}>{estado[302]}</td>
                        <td className={celula[303]} id="id303" onClick={onClick}>{estado[303]}</td>
                        <td className={celula[304]} id="id304" onClick={onClick}>{estado[304]}</td>
                        <td className={celula[305]} id="id305" onClick={onClick}>{estado[305]}</td>
                        <td className={celula[306]} id="id306" onClick={onClick}>{estado[306]}</td>
                        <td className={celula[307]} id="id307" onClick={onClick}>{estado[307]}</td>
                        <td className={celula[308]} id="id308" onClick={onClick}>{estado[308]}</td>
                        <td className={celula[309]} id="id309" onClick={onClick}>{estado[309]}</td>
                        <td className={celula[310]} id="id310" onClick={onClick}>{estado[310]}</td>
                        <td className={celula[311]} id="id311" onClick={onClick}>{estado[311]}</td>
                    </tr>
                    <tr>
                        <td className={celula[312]} id="id312" onClick={onClick}>{estado[312]}</td>
                        <td className={celula[313]} id="id313" onClick={onClick}>{estado[313]}</td>
                        <td className={celula[314]} id="id314" onClick={onClick}>{estado[314]}</td>
                        <td className={celula[315]} id="id315" onClick={onClick}>{estado[315]}</td>
                        <td className={celula[316]} id="id316" onClick={onClick}>{estado[316]}</td>
                        <td className={celula[317]} id="id317" onClick={onClick}>{estado[317]}</td>
                        <td className={celula[318]} id="id318" onClick={onClick}>{estado[318]}</td>
                        <td className={celula[319]} id="id319" onClick={onClick}>{estado[319]}</td>
                        <td className={celula[320]} id="id320" onClick={onClick}>{estado[320]}</td>
                        <td className={celula[321]} id="id321" onClick={onClick}>{estado[321]}</td>
                        <td className={celula[322]} id="id322" onClick={onClick}>{estado[322]}</td>
                        <td className={celula[323]} id="id323" onClick={onClick}>{estado[323]}</td>
                        <td className={celula[324]} id="id324" onClick={onClick}>{estado[324]}</td>
                        <td className={celula[325]} id="id325" onClick={onClick}>{estado[325]}</td>
                        <td className={celula[326]} id="id326" onClick={onClick}>{estado[326]}</td>
                        <td className={celula[327]} id="id327" onClick={onClick}>{estado[327]}</td>
                        <td className={celula[328]} id="id328" onClick={onClick}>{estado[328]}</td>
                        <td className={celula[329]} id="id329" onClick={onClick}>{estado[329]}</td>
                        <td className={celula[330]} id="id330" onClick={onClick}>{estado[330]}</td>
                        <td className={celula[331]} id="id331" onClick={onClick}>{estado[331]}</td>
                        <td className={celula[332]} id="id332" onClick={onClick}>{estado[332]}</td>
                        <td className={celula[333]} id="id333" onClick={onClick}>{estado[333]}</td>
                        <td className={celula[334]} id="id334" onClick={onClick}>{estado[334]}</td>
                        <td className={celula[335]} id="id335" onClick={onClick}>{estado[335]}</td>
                    </tr>
                    <tr>
                        <td className={celula[336]} id="id336" onClick={onClick}>{estado[336]}</td>
                        <td className={celula[337]} id="id337" onClick={onClick}>{estado[337]}</td>
                        <td className={celula[338]} id="id338" onClick={onClick}>{estado[338]}</td>
                        <td className={celula[339]} id="id339" onClick={onClick}>{estado[339]}</td>
                        <td className={celula[340]} id="id340" onClick={onClick}>{estado[340]}</td>
                        <td className={celula[341]} id="id341" onClick={onClick}>{estado[341]}</td>
                        <td className={celula[342]} id="id342" onClick={onClick}>{estado[342]}</td>
                        <td className={celula[343]} id="id343" onClick={onClick}>{estado[343]}</td>
                        <td className={celula[344]} id="id344" onClick={onClick}>{estado[344]}</td>
                        <td className={celula[345]} id="id345" onClick={onClick}>{estado[345]}</td>
                        <td className={celula[346]} id="id346" onClick={onClick}>{estado[346]}</td>
                        <td className={celula[347]} id="id347" onClick={onClick}>{estado[347]}</td>
                        <td className={celula[348]} id="id348" onClick={onClick}>{estado[348]}</td>
                        <td className={celula[349]} id="id349" onClick={onClick}>{estado[349]}</td>
                        <td className={celula[350]} id="id350" onClick={onClick}>{estado[350]}</td>
                        <td className={celula[351]} id="id351" onClick={onClick}>{estado[351]}</td>
                        <td className={celula[352]} id="id352" onClick={onClick}>{estado[352]}</td>
                        <td className={celula[353]} id="id353" onClick={onClick}>{estado[353]}</td>
                        <td className={celula[354]} id="id354" onClick={onClick}>{estado[354]}</td>
                        <td className={celula[355]} id="id355" onClick={onClick}>{estado[355]}</td>
                        <td className={celula[356]} id="id356" onClick={onClick}>{estado[356]}</td>
                        <td className={celula[357]} id="id357" onClick={onClick}>{estado[357]}</td>
                        <td className={celula[358]} id="id358" onClick={onClick}>{estado[358]}</td>
                        <td className={celula[359]} id="id359" onClick={onClick}>{estado[359]}</td>
                    </tr>
                    <tr>
                        <td className={celula[360]} id="id360" onClick={onClick}>{estado[360]}</td>
                        <td className={celula[361]} id="id361" onClick={onClick}>{estado[361]}</td>
                        <td className={celula[362]} id="id362" onClick={onClick}>{estado[362]}</td>
                        <td className={celula[363]} id="id363" onClick={onClick}>{estado[363]}</td>
                        <td className={celula[364]} id="id364" onClick={onClick}>{estado[364]}</td>
                        <td className={celula[365]} id="id365" onClick={onClick}>{estado[365]}</td>
                        <td className={celula[366]} id="id366" onClick={onClick}>{estado[366]}</td>
                        <td className={celula[367]} id="id367" onClick={onClick}>{estado[367]}</td>
                        <td className={celula[368]} id="id368" onClick={onClick}>{estado[368]}</td>
                        <td className={celula[369]} id="id369" onClick={onClick}>{estado[369]}</td>
                        <td className={celula[370]} id="id370" onClick={onClick}>{estado[370]}</td>
                        <td className={celula[371]} id="id371" onClick={onClick}>{estado[371]}</td>
                        <td className={celula[372]} id="id372" onClick={onClick}>{estado[372]}</td>
                        <td className={celula[373]} id="id373" onClick={onClick}>{estado[373]}</td>
                        <td className={celula[374]} id="id374" onClick={onClick}>{estado[374]}</td>
                        <td className={celula[375]} id="id375" onClick={onClick}>{estado[375]}</td>
                        <td className={celula[376]} id="id376" onClick={onClick}>{estado[376]}</td>
                        <td className={celula[377]} id="id377" onClick={onClick}>{estado[377]}</td>
                        <td className={celula[378]} id="id378" onClick={onClick}>{estado[378]}</td>
                        <td className={celula[379]} id="id379" onClick={onClick}>{estado[379]}</td>
                        <td className={celula[380]} id="id380" onClick={onClick}>{estado[380]}</td>
                        <td className={celula[381]} id="id381" onClick={onClick}>{estado[381]}</td>
                        <td className={celula[382]} id="id382" onClick={onClick}>{estado[382]}</td>
                        <td className={celula[383]} id="id383" onClick={onClick}>{estado[383]}</td>
                    </tr>
                    <tr>
                        <td className={celula[384]} id="id384" onClick={onClick}>{estado[384]}</td>
                        <td className={celula[385]} id="id385" onClick={onClick}>{estado[385]}</td>
                        <td className={celula[386]} id="id386" onClick={onClick}>{estado[386]}</td>
                        <td className={celula[387]} id="id387" onClick={onClick}>{estado[387]}</td>
                        <td className={celula[388]} id="id388" onClick={onClick}>{estado[388]}</td>
                        <td className={celula[389]} id="id389" onClick={onClick}>{estado[389]}</td>
                        <td className={celula[390]} id="id390" onClick={onClick}>{estado[390]}</td>
                        <td className={celula[391]} id="id391" onClick={onClick}>{estado[391]}</td>
                        <td className={celula[392]} id="id392" onClick={onClick}>{estado[392]}</td>
                        <td className={celula[393]} id="id393" onClick={onClick}>{estado[393]}</td>
                        <td className={celula[394]} id="id394" onClick={onClick}>{estado[394]}</td>
                        <td className={celula[395]} id="id395" onClick={onClick}>{estado[395]}</td>
                        <td className={celula[396]} id="id396" onClick={onClick}>{estado[396]}</td>
                        <td className={celula[397]} id="id397" onClick={onClick}>{estado[397]}</td>
                        <td className={celula[398]} id="id398" onClick={onClick}>{estado[398]}</td>
                        <td className={celula[399]} id="id399" onClick={onClick}>{estado[399]}</td>
                        <td className={celula[400]} id="id400" onClick={onClick}>{estado[400]}</td>
                        <td className={celula[401]} id="id401" onClick={onClick}>{estado[401]}</td>
                        <td className={celula[402]} id="id402" onClick={onClick}>{estado[402]}</td>
                        <td className={celula[403]} id="id403" onClick={onClick}>{estado[403]}</td>
                        <td className={celula[404]} id="id404" onClick={onClick}>{estado[404]}</td>
                        <td className={celula[405]} id="id405" onClick={onClick}>{estado[405]}</td>
                        <td className={celula[406]} id="id406" onClick={onClick}>{estado[406]}</td>
                        <td className={celula[407]} id="id407" onClick={onClick}>{estado[407]}</td>
                    </tr>
                    <tr>
                        <td className={celula[408]} id="id408" onClick={onClick}>{estado[408]}</td>
                        <td className={celula[409]} id="id409" onClick={onClick}>{estado[409]}</td>
                        <td className={celula[410]} id="id410" onClick={onClick}>{estado[410]}</td>
                        <td className={celula[411]} id="id411" onClick={onClick}>{estado[411]}</td>
                        <td className={celula[412]} id="id412" onClick={onClick}>{estado[412]}</td>
                        <td className={celula[413]} id="id413" onClick={onClick}>{estado[413]}</td>
                        <td className={celula[414]} id="id414" onClick={onClick}>{estado[414]}</td>
                        <td className={celula[415]} id="id415" onClick={onClick}>{estado[415]}</td>
                        <td className={celula[416]} id="id416" onClick={onClick}>{estado[416]}</td>
                        <td className={celula[417]} id="id417" onClick={onClick}>{estado[417]}</td>
                        <td className={celula[418]} id="id418" onClick={onClick}>{estado[418]}</td>
                        <td className={celula[419]} id="id419" onClick={onClick}>{estado[419]}</td>
                        <td className={celula[420]} id="id420" onClick={onClick}>{estado[420]}</td>
                        <td className={celula[421]} id="id421" onClick={onClick}>{estado[421]}</td>
                        <td className={celula[422]} id="id422" onClick={onClick}>{estado[422]}</td>
                        <td className={celula[423]} id="id423" onClick={onClick}>{estado[423]}</td>
                        <td className={celula[424]} id="id424" onClick={onClick}>{estado[424]}</td>
                        <td className={celula[425]} id="id425" onClick={onClick}>{estado[425]}</td>
                        <td className={celula[426]} id="id426" onClick={onClick}>{estado[426]}</td>
                        <td className={celula[427]} id="id427" onClick={onClick}>{estado[427]}</td>
                        <td className={celula[428]} id="id428" onClick={onClick}>{estado[428]}</td>
                        <td className={celula[429]} id="id429" onClick={onClick}>{estado[429]}</td>
                        <td className={celula[430]} id="id430" onClick={onClick}>{estado[430]}</td>
                        <td className={celula[431]} id="id431" onClick={onClick}>{estado[431]}</td>
                    </tr>
                    <tr>
                        <td className={celula[432]} id="id432" onClick={onClick}>{estado[432]}</td>
                        <td className={celula[433]} id="id433" onClick={onClick}>{estado[433]}</td>
                        <td className={celula[434]} id="id434" onClick={onClick}>{estado[434]}</td>
                        <td className={celula[435]} id="id435" onClick={onClick}>{estado[435]}</td>
                        <td className={celula[436]} id="id436" onClick={onClick}>{estado[436]}</td>
                        <td className={celula[437]} id="id437" onClick={onClick}>{estado[437]}</td>
                        <td className={celula[438]} id="id438" onClick={onClick}>{estado[438]}</td>
                        <td className={celula[439]} id="id439" onClick={onClick}>{estado[439]}</td>
                        <td className={celula[440]} id="id440" onClick={onClick}>{estado[440]}</td>
                        <td className={celula[441]} id="id441" onClick={onClick}>{estado[441]}</td>
                        <td className={celula[442]} id="id442" onClick={onClick}>{estado[442]}</td>
                        <td className={celula[443]} id="id443" onClick={onClick}>{estado[443]}</td>
                        <td className={celula[444]} id="id444" onClick={onClick}>{estado[444]}</td>
                        <td className={celula[445]} id="id445" onClick={onClick}>{estado[445]}</td>
                        <td className={celula[446]} id="id446" onClick={onClick}>{estado[446]}</td>
                        <td className={celula[447]} id="id447" onClick={onClick}>{estado[447]}</td>
                        <td className={celula[448]} id="id448" onClick={onClick}>{estado[448]}</td>
                        <td className={celula[449]} id="id449" onClick={onClick}>{estado[449]}</td>
                        <td className={celula[450]} id="id450" onClick={onClick}>{estado[450]}</td>
                        <td className={celula[451]} id="id451" onClick={onClick}>{estado[451]}</td>
                        <td className={celula[452]} id="id452" onClick={onClick}>{estado[452]}</td>
                        <td className={celula[453]} id="id453" onClick={onClick}>{estado[453]}</td>
                        <td className={celula[454]} id="id454" onClick={onClick}>{estado[454]}</td>
                        <td className={celula[455]} id="id455" onClick={onClick}>{estado[455]}</td>
                    </tr>
                    <tr>
                        <td className={celula[456]} id="id456" onClick={onClick}>{estado[456]}</td>
                        <td className={celula[457]} id="id457" onClick={onClick}>{estado[457]}</td>
                        <td className={celula[458]} id="id458" onClick={onClick}>{estado[458]}</td>
                        <td className={celula[459]} id="id459" onClick={onClick}>{estado[459]}</td>
                        <td className={celula[460]} id="id460" onClick={onClick}>{estado[460]}</td>
                        <td className={celula[461]} id="id461" onClick={onClick}>{estado[461]}</td>
                        <td className={celula[462]} id="id462" onClick={onClick}>{estado[462]}</td>
                        <td className={celula[463]} id="id463" onClick={onClick}>{estado[463]}</td>
                        <td className={celula[464]} id="id464" onClick={onClick}>{estado[464]}</td>
                        <td className={celula[465]} id="id465" onClick={onClick}>{estado[465]}</td>
                        <td className={celula[466]} id="id466" onClick={onClick}>{estado[466]}</td>
                        <td className={celula[467]} id="id467" onClick={onClick}>{estado[467]}</td>
                        <td className={celula[468]} id="id468" onClick={onClick}>{estado[468]}</td>
                        <td className={celula[469]} id="id469" onClick={onClick}>{estado[469]}</td>
                        <td className={celula[470]} id="id470" onClick={onClick}>{estado[470]}</td>
                        <td className={celula[471]} id="id471" onClick={onClick}>{estado[471]}</td>
                        <td className={celula[472]} id="id472" onClick={onClick}>{estado[472]}</td>
                        <td className={celula[473]} id="id473" onClick={onClick}>{estado[473]}</td>
                        <td className={celula[474]} id="id474" onClick={onClick}>{estado[474]}</td>
                        <td className={celula[475]} id="id475" onClick={onClick}>{estado[475]}</td>
                        <td className={celula[476]} id="id476" onClick={onClick}>{estado[476]}</td>
                        <td className={celula[477]} id="id477" onClick={onClick}>{estado[477]}</td>
                        <td className={celula[478]} id="id478" onClick={onClick}>{estado[478]}</td>
                        <td className={celula[479]} id="id479" onClick={onClick}>{estado[479]}</td>
                    </tr>
                    <tr>
                        <td className={celula[480]} id="id480" onClick={onClick}>{estado[480]}</td>
                        <td className={celula[481]} id="id481" onClick={onClick}>{estado[481]}</td>
                        <td className={celula[482]} id="id482" onClick={onClick}>{estado[482]}</td>
                        <td className={celula[483]} id="id483" onClick={onClick}>{estado[483]}</td>
                        <td className={celula[484]} id="id484" onClick={onClick}>{estado[484]}</td>
                        <td className={celula[485]} id="id485" onClick={onClick}>{estado[485]}</td>
                        <td className={celula[486]} id="id486" onClick={onClick}>{estado[486]}</td>
                        <td className={celula[487]} id="id487" onClick={onClick}>{estado[487]}</td>
                        <td className={celula[488]} id="id488" onClick={onClick}>{estado[488]}</td>
                        <td className={celula[489]} id="id489" onClick={onClick}>{estado[489]}</td>
                        <td className={celula[490]} id="id490" onClick={onClick}>{estado[490]}</td>
                        <td className={celula[491]} id="id491" onClick={onClick}>{estado[491]}</td>
                        <td className={celula[492]} id="id492" onClick={onClick}>{estado[492]}</td>
                        <td className={celula[493]} id="id493" onClick={onClick}>{estado[493]}</td>
                        <td className={celula[494]} id="id494" onClick={onClick}>{estado[494]}</td>
                        <td className={celula[495]} id="id495" onClick={onClick}>{estado[495]}</td>
                        <td className={celula[496]} id="id496" onClick={onClick}>{estado[496]}</td>
                        <td className={celula[497]} id="id497" onClick={onClick}>{estado[497]}</td>
                        <td className={celula[498]} id="id498" onClick={onClick}>{estado[498]}</td>
                        <td className={celula[499]} id="id499" onClick={onClick}>{estado[499]}</td>
                        <td className={celula[500]} id="id500" onClick={onClick}>{estado[500]}</td>
                        <td className={celula[501]} id="id501" onClick={onClick}>{estado[501]}</td>
                        <td className={celula[502]} id="id502" onClick={onClick}>{estado[502]}</td>
                        <td className={celula[503]} id="id503" onClick={onClick}>{estado[503]}</td>
                    </tr>
                    <tr>
                        <td className={celula[504]} id="id504" onClick={onClick}>{estado[504]}</td>
                        <td className={celula[505]} id="id505" onClick={onClick}>{estado[505]}</td>
                        <td className={celula[506]} id="id506" onClick={onClick}>{estado[506]}</td>
                        <td className={celula[507]} id="id507" onClick={onClick}>{estado[507]}</td>
                        <td className={celula[508]} id="id508" onClick={onClick}>{estado[508]}</td>
                        <td className={celula[509]} id="id509" onClick={onClick}>{estado[509]}</td>
                        <td className={celula[510]} id="id510" onClick={onClick}>{estado[510]}</td>
                        <td className={celula[511]} id="id511" onClick={onClick}>{estado[511]}</td>
                        <td className={celula[512]} id="id512" onClick={onClick}>{estado[512]}</td>
                        <td className={celula[513]} id="id513" onClick={onClick}>{estado[513]}</td>
                        <td className={celula[514]} id="id514" onClick={onClick}>{estado[514]}</td>
                        <td className={celula[515]} id="id515" onClick={onClick}>{estado[515]}</td>
                        <td className={celula[516]} id="id516" onClick={onClick}>{estado[516]}</td>
                        <td className={celula[517]} id="id517" onClick={onClick}>{estado[517]}</td>
                        <td className={celula[518]} id="id518" onClick={onClick}>{estado[518]}</td>
                        <td className={celula[519]} id="id519" onClick={onClick}>{estado[519]}</td>
                        <td className={celula[520]} id="id520" onClick={onClick}>{estado[520]}</td>
                        <td className={celula[521]} id="id521" onClick={onClick}>{estado[521]}</td>
                        <td className={celula[522]} id="id522" onClick={onClick}>{estado[522]}</td>
                        <td className={celula[523]} id="id523" onClick={onClick}>{estado[523]}</td>
                        <td className={celula[524]} id="id524" onClick={onClick}>{estado[524]}</td>
                        <td className={celula[525]} id="id525" onClick={onClick}>{estado[525]}</td>
                        <td className={celula[526]} id="id526" onClick={onClick}>{estado[526]}</td>
                        <td className={celula[527]} id="id527" onClick={onClick}>{estado[527]}</td>
                    </tr>
                    <tr>
                        <td className={celula[528]} id="id528" onClick={onClick}>{estado[528]}</td>
                        <td className={celula[529]} id="id529" onClick={onClick}>{estado[529]}</td>
                        <td className={celula[530]} id="id530" onClick={onClick}>{estado[530]}</td>
                        <td className={celula[531]} id="id531" onClick={onClick}>{estado[531]}</td>
                        <td className={celula[532]} id="id532" onClick={onClick}>{estado[532]}</td>
                        <td className={celula[533]} id="id533" onClick={onClick}>{estado[533]}</td>
                        <td className={celula[534]} id="id534" onClick={onClick}>{estado[534]}</td>
                        <td className={celula[535]} id="id535" onClick={onClick}>{estado[535]}</td>
                        <td className={celula[536]} id="id536" onClick={onClick}>{estado[536]}</td>
                        <td className={celula[537]} id="id537" onClick={onClick}>{estado[537]}</td>
                        <td className={celula[538]} id="id538" onClick={onClick}>{estado[538]}</td>
                        <td className={celula[539]} id="id539" onClick={onClick}>{estado[539]}</td>
                        <td className={celula[540]} id="id540" onClick={onClick}>{estado[540]}</td>
                        <td className={celula[541]} id="id541" onClick={onClick}>{estado[541]}</td>
                        <td className={celula[542]} id="id542" onClick={onClick}>{estado[542]}</td>
                        <td className={celula[543]} id="id543" onClick={onClick}>{estado[543]}</td>
                        <td className={celula[544]} id="id544" onClick={onClick}>{estado[544]}</td>
                        <td className={celula[545]} id="id545" onClick={onClick}>{estado[545]}</td>
                        <td className={celula[546]} id="id546" onClick={onClick}>{estado[546]}</td>
                        <td className={celula[547]} id="id547" onClick={onClick}>{estado[547]}</td>
                        <td className={celula[548]} id="id548" onClick={onClick}>{estado[548]}</td>
                        <td className={celula[549]} id="id549" onClick={onClick}>{estado[549]}</td>
                        <td className={celula[550]} id="id550" onClick={onClick}>{estado[550]}</td>
                        <td className={celula[551]} id="id551" onClick={onClick}>{estado[551]}</td>
                    </tr>
                    <tr>
                        <td className={celula[552]} id="id552" onClick={onClick}>{estado[552]}</td>
                        <td className={celula[553]} id="id553" onClick={onClick}>{estado[553]}</td>
                        <td className={celula[554]} id="id554" onClick={onClick}>{estado[554]}</td>
                        <td className={celula[555]} id="id555" onClick={onClick}>{estado[555]}</td>
                        <td className={celula[556]} id="id556" onClick={onClick}>{estado[556]}</td>
                        <td className={celula[557]} id="id557" onClick={onClick}>{estado[557]}</td>
                        <td className={celula[558]} id="id558" onClick={onClick}>{estado[558]}</td>
                        <td className={celula[559]} id="id559" onClick={onClick}>{estado[559]}</td>
                        <td className={celula[560]} id="id560" onClick={onClick}>{estado[560]}</td>
                        <td className={celula[561]} id="id561" onClick={onClick}>{estado[561]}</td>
                        <td className={celula[562]} id="id562" onClick={onClick}>{estado[562]}</td>
                        <td className={celula[563]} id="id563" onClick={onClick}>{estado[563]}</td>
                        <td className={celula[564]} id="id564" onClick={onClick}>{estado[564]}</td>
                        <td className={celula[565]} id="id565" onClick={onClick}>{estado[565]}</td>
                        <td className={celula[566]} id="id566" onClick={onClick}>{estado[566]}</td>
                        <td className={celula[567]} id="id567" onClick={onClick}>{estado[567]}</td>
                        <td className={celula[568]} id="id568" onClick={onClick}>{estado[568]}</td>
                        <td className={celula[569]} id="id569" onClick={onClick}>{estado[569]}</td>
                        <td className={celula[570]} id="id570" onClick={onClick}>{estado[570]}</td>
                        <td className={celula[571]} id="id571" onClick={onClick}>{estado[571]}</td>
                        <td className={celula[572]} id="id572" onClick={onClick}>{estado[572]}</td>
                        <td className={celula[573]} id="id573" onClick={onClick}>{estado[573]}</td>
                        <td className={celula[574]} id="id574" onClick={onClick}>{estado[574]}</td>
                        <td className={celula[575]} id="id575" onClick={onClick}>{estado[575]}</td>
                    </tr>
                    <tr>
                        <td className={celula[576]} id="id576" onClick={onClick}>{estado[576]}</td>
                        <td className={celula[577]} id="id577" onClick={onClick}>{estado[577]}</td>
                        <td className={celula[578]} id="id578" onClick={onClick}>{estado[578]}</td>
                        <td className={celula[579]} id="id579" onClick={onClick}>{estado[579]}</td>
                        <td className={celula[580]} id="id580" onClick={onClick}>{estado[580]}</td>
                        <td className={celula[581]} id="id581" onClick={onClick}>{estado[581]}</td>
                        <td className={celula[582]} id="id582" onClick={onClick}>{estado[582]}</td>
                        <td className={celula[583]} id="id583" onClick={onClick}>{estado[583]}</td>
                        <td className={celula[584]} id="id584" onClick={onClick}>{estado[584]}</td>
                        <td className={celula[585]} id="id585" onClick={onClick}>{estado[585]}</td>
                        <td className={celula[586]} id="id586" onClick={onClick}>{estado[586]}</td>
                        <td className={celula[587]} id="id587" onClick={onClick}>{estado[587]}</td>
                        <td className={celula[588]} id="id588" onClick={onClick}>{estado[588]}</td>
                        <td className={celula[589]} id="id589" onClick={onClick}>{estado[589]}</td>
                        <td className={celula[590]} id="id590" onClick={onClick}>{estado[590]}</td>
                        <td className={celula[591]} id="id591" onClick={onClick}>{estado[591]}</td>
                        <td className={celula[592]} id="id592" onClick={onClick}>{estado[592]}</td>
                        <td className={celula[593]} id="id593" onClick={onClick}>{estado[593]}</td>
                        <td className={celula[594]} id="id594" onClick={onClick}>{estado[594]}</td>
                        <td className={celula[595]} id="id595" onClick={onClick}>{estado[595]}</td>
                        <td className={celula[596]} id="id596" onClick={onClick}>{estado[596]}</td>
                        <td className={celula[597]} id="id597" onClick={onClick}>{estado[597]}</td>
                        <td className={celula[598]} id="id598" onClick={onClick}>{estado[598]}</td>
                        <td className={celula[599]} id="id599" onClick={onClick}>{estado[599]}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
    renderHand() {
        const {cartas} = this.props.G;
        //const personagens = cartas.personagem.map(c => this.renderPersonagemList(c.label));
        //const currentPlayer = "Player_" + state.currentPlayer; //if element.jogador is
        //const playerHand = []

        //const cartas = this.props.G.cartas;
        //const personagens = cartas.personagem.map(c => this.renderPersonagemList(c.label));//locais//armas
        const playerHandPersonagem =  cartas.personagem.map(c => this.renderCardHand(c, 'personagem'));
        const playerHandArma =  cartas.arma.map(c => this.renderCardHand(c, 'arma'));
        const playerHandLocal =  cartas.local.map(c => this.renderCardHand(c, 'local'));

        //cartas.forEach(element => {
        //    playerHand.push(element)
        //});
        
        return <div className="hand">
            <h3>Mão</h3>
            <h4>Quem:</h4>
            {playerHandPersonagem}
            <h4>Como:</h4>
            {playerHandArma}
            <h4>Onde:</h4>
            {playerHandLocal}
        </div>
    
    }
    renderCardHand(c, tipo){
        const {currentPlayer} = this.props.ctx;
        const currentPlayerId = "player_" + currentPlayer;
        var mao = null

        if(c.jogador && c.jogador === currentPlayerId)
            mao = c.label;

        if (!mao) 
            return null;
        else 
            return <div className={tipo} key={c.label}>
                {mao}
            </div>
        
    }
    renderFormulario() {//futuramente trocar tudo pelo label {} das cartas, fazer laço e otimizar de alguma forma
        const cartas = this.props.G.cartas;
        const personagens = cartas.personagem.map(c => this.renderList(c.label));
        const armas = cartas.arma.map(c => this.renderList(c.label));
        const locais = cartas.local.map(c => this.renderList(c.label));
        return <div className="formulario">
            <h3>Formulário</h3>
            <h4>Quem:</h4>
            <ul>
                {personagens}
            </ul>
            <h4>Como:</h4>
            <ul>
                {armas}
            </ul>
            <h4>Onde:</h4>
            <ul>
               {locais}
            </ul>
        </div>
    }

    attachListeners(currentState, ctx, el) {
        const id = el.target.id.slice(2);
        this.props.moves.mover(id);
    }
    renderList(label) {
        return <li key={label}>
            <input type="checkbox"></input>
            <label className="container">{label}</label>
        </li>
    }

    renderDado(){
        const state = this.props.G;
        var dado = state.dado;//classe

        return <div className="dado">
            {dado}
        </div>
    }

}

export default GameRender;

/*
talves seja necessario colocar id nas cartas para referenciar nas listas
*/