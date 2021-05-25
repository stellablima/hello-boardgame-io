import { func } from 'prop-types';
import React from 'react';

class GameRender extends React.Component {

    /*
    start(){
        const [tela, setTela] = useState('lobby'); 

        switch (tela) {
            case 'lobby':
                return getTelaLobby();
            case 'partida':
                return getTelaPartida();
        }

        function getTelaLobby(){
            return 'lobby'
            
        }
        function getTelaPartida(){
            return 'partida'
            
        }
    }
    */

    render() {
        const state = this.props.G;
        const ctx = this.props.ctx;
        var celula = state.celula;
        var estado = state.estado;

        return <div className="board">
            <table>
                <tr>
                    <td className={celula[0]} id="id0">{estado[0]}</td>
                    <td className={celula[1]} id="id1">{estado[1]}</td>
                    <td className={celula[2]} id="id2">{estado[2]}</td>
                    <td className={celula[3]} id="id3">{estado[3]}</td>
                    <td className={celula[4]} id="id4">{estado[4]}</td>
                    <td className={celula[5]} id="id5">{estado[5]}</td>
                    <td className={celula[6]} id="id6">{estado[6]}</td>
                    <td className={celula[7]} id="id7">{estado[7]}</td>
                    <td className={celula[8]} id="id8">{estado[8]}</td>
                    <td className={celula[9]} id="id9">{estado[9]}</td>
                    <td className={celula[10]} id="id10">{estado[10]}</td>
                    <td className={celula[11]} id="id11">{estado[11]}</td>
                    <td className={celula[12]} id="id12">{estado[12]}</td>
                    <td className={celula[13]} id="id13">{estado[13]}</td>
                    <td className={celula[14]} id="id14">{estado[14]}</td>
                    <td className={celula[15]} id="id15">{estado[15]}</td>
                    <td className={celula[16]} id="id16">{estado[16]}</td>
                    <td className={celula[17]} id="id17">{estado[17]}</td>
                    <td className={celula[18]} id="id18">{estado[18]}</td>
                    <td className={celula[19]} id="id19">{estado[19]}</td>
                    <td className={celula[20]} id="id20">{estado[20]}</td>
                    <td className={celula[21]} id="id21">{estado[21]}</td>
                    <td className={celula[22]} id="id22">{estado[22]}</td>
                    <td className={celula[23]} id="id23">{estado[23]}</td>
                </tr>
                <tr>
                    <td className={celula[24]} id="id24">{estado[24]}</td>
                    <td className={celula[25]} id="id25">{estado[25]}</td>
                    <td className={celula[26]} id="id26">{estado[26]}</td>
                    <td className={celula[27]} id="id27">{estado[27]}</td>
                    <td className={celula[28]} id="id28">{estado[28]}</td>
                    <td className={celula[29]} id="id29">{estado[29]}</td>
                    <td className={celula[30]} id="id30">{estado[30]}</td>
                    <td className={celula[31]} id="id31">{estado[31]}</td>
                    <td className={celula[32]} id="id32">{estado[32]}</td>
                    <td className={celula[33]} id="id33">{estado[33]}</td>
                    <td className={celula[34]} id="id34">{estado[34]}</td>
                    <td className={celula[35]} id="id35">{estado[35]}</td>
                    <td className={celula[36]} id="id36">{estado[36]}</td>
                    <td className={celula[37]} id="id37">{estado[37]}</td>
                    <td className={celula[38]} id="id38">{estado[38]}</td>
                    <td className={celula[39]} id="id39">{estado[39]}</td>
                    <td className={celula[40]} id="id40">{estado[40]}</td>
                    <td className={celula[41]} id="id41">{estado[41]}</td>
                    <td className={celula[42]} id="id42">{estado[42]}</td>
                    <td className={celula[43]} id="id43">{estado[43]}</td>
                    <td className={celula[44]} id="id44">{estado[44]}</td>
                    <td className={celula[45]} id="id45">{estado[45]}</td>
                    <td className={celula[46]} id="id46">{estado[46]}</td>
                    <td className={celula[47]} id="id47">{estado[47]}</td>
                </tr>
                <tr>
                    <td className={celula[48]} id="id48">{estado[48]}</td>
                    <td className={celula[49]} id="id49">{estado[49]}</td>
                    <td className={celula[50]} id="id50">{estado[50]}</td>
                    <td className={celula[51]} id="id51">{estado[51]}</td>
                    <td className={celula[52]} id="id52">{estado[52]}</td>
                    <td className={celula[53]} id="id53">{estado[53]}</td>
                    <td className={celula[54]} id="id54">{estado[54]}</td>
                    <td className={celula[55]} id="id55">{estado[55]}</td>
                    <td className={celula[56]} id="id56">{estado[56]}</td>
                    <td className={celula[57]} id="id57">{estado[57]}</td>
                    <td className={celula[58]} id="id58">{estado[58]}</td>
                    <td className={celula[59]} id="id59">{estado[59]}</td>
                    <td className={celula[60]} id="id60">{estado[60]}</td>
                    <td className={celula[61]} id="id61">{estado[61]}</td>
                    <td className={celula[62]} id="id62">{estado[62]}</td>
                    <td className={celula[63]} id="id63">{estado[63]}</td>
                    <td className={celula[64]} id="id64">{estado[64]}</td>
                    <td className={celula[65]} id="id65">{estado[65]}</td>
                    <td className={celula[66]} id="id66">{estado[66]}</td>
                    <td className={celula[67]} id="id67">{estado[67]}</td>
                    <td className={celula[68]} id="id68">{estado[68]}</td>
                    <td className={celula[69]} id="id69">{estado[69]}</td>
                    <td className={celula[70]} id="id70">{estado[70]}</td>
                    <td className={celula[71]} id="id71">{estado[71]}</td>
                </tr>
                <tr>
                    <td className={celula[72]} id="id72">{estado[72]}</td>
                    <td className={celula[73]} id="id73">{estado[73]}</td>
                    <td className={celula[74]} id="id74">{estado[74]}</td>
                    <td className={celula[75]} id="id75">{estado[75]}</td>
                    <td className={celula[76]} id="id76">{estado[76]}</td>
                    <td className={celula[77]} id="id77">{estado[77]}</td>
                    <td className={celula[78]} id="id78">{estado[78]}</td>
                    <td className={celula[79]} id="id79">{estado[79]}</td>
                    <td className={celula[80]} id="id80">{estado[80]}</td>
                    <td className={celula[81]} id="id81">{estado[81]}</td>
                    <td className={celula[82]} id="id82">{estado[82]}</td>
                    <td className={celula[83]} id="id83">{estado[83]}</td>
                    <td className={celula[84]} id="id84">{estado[84]}</td>
                    <td className={celula[85]} id="id85">{estado[85]}</td>
                    <td className={celula[86]} id="id86">{estado[86]}</td>
                    <td className={celula[87]} id="id87">{estado[87]}</td>
                    <td className={celula[88]} id="id88">{estado[88]}</td>
                    <td className={celula[89]} id="id89">{estado[89]}</td>
                    <td className={celula[90]} id="id90">{estado[90]}</td>
                    <td className={celula[91]} id="id91">{estado[91]}</td>
                    <td className={celula[92]} id="id92">{estado[92]}</td>
                    <td className={celula[93]} id="id93">{estado[93]}</td>
                    <td className={celula[94]} id="id94">{estado[94]}</td>
                    <td className={celula[95]} id="id95">{estado[95]}</td>
                </tr>
                <tr>
                    <td className={celula[96]} id="id96">{estado[96]}</td>
                    <td className={celula[97]} id="id97">{estado[97]}</td>
                    <td className={celula[98]} id="id98">{estado[98]}</td>
                    <td className={celula[99]} id="id99">{estado[99]}</td>
                    <td className={celula[100]} id="id100">{estado[100]}</td>
                    <td className={celula[101]} id="id101">{estado[101]}</td>
                    <td className={celula[102]} id="id102">{estado[102]}</td>
                    <td className={celula[103]} id="id103">{estado[103]}</td>
                    <td className={celula[104]} id="id104">{estado[104]}</td>
                    <td className={celula[105]} id="id105">{estado[105]}</td>
                    <td className={celula[106]} id="id106">{estado[106]}</td>
                    <td className={celula[107]} id="id107">{estado[107]}</td>
                    <td className={celula[108]} id="id108">{estado[108]}</td>
                    <td className={celula[109]} id="id109">{estado[109]}</td>
                    <td className={celula[110]} id="id110">{estado[110]}</td>
                    <td className={celula[111]} id="id111">{estado[111]}</td>
                    <td className={celula[112]} id="id112">{estado[112]}</td>
                    <td className={celula[113]} id="id113">{estado[113]}</td>
                    <td className={celula[114]} id="id114">{estado[114]}</td>
                    <td className={celula[115]} id="id115">{estado[115]}</td>
                    <td className={celula[116]} id="id116">{estado[116]}</td>
                    <td className={celula[117]} id="id117">{estado[117]}</td>
                    <td className={celula[118]} id="id118">{estado[118]}</td>
                    <td className={celula[119]} id="id119">{estado[119]}</td>
                </tr>
                <tr>
                    <td className={celula[120]} id="id120">{estado[120]}</td>
                    <td className={celula[121]} id="id121">{estado[121]}</td>
                    <td className={celula[122]} id="id122">{estado[122]}</td>
                    <td className={celula[123]} id="id123">{estado[123]}</td>
                    <td className={celula[124]} id="id124">{estado[124]}</td>
                    <td className={celula[125]} id="id125">{estado[125]}</td>
                    <td className={celula[126]} id="id126">{estado[126]}</td>
                    <td className={celula[127]} id="id127">{estado[127]}</td>
                    <td className={celula[128]} id="id128">{estado[128]}</td>
                    <td className={celula[129]} id="id129">{estado[129]}</td>
                    <td className={celula[130]} id="id130">{estado[130]}</td>
                    <td className={celula[131]} id="id131">{estado[131]}</td>
                    <td className={celula[132]} id="id132">{estado[132]}</td>
                    <td className={celula[133]} id="id133">{estado[133]}</td>
                    <td className={celula[134]} id="id134">{estado[134]}</td>
                    <td className={celula[135]} id="id135">{estado[135]}</td>
                    <td className={celula[136]} id="id136">{estado[136]}</td>
                    <td className={celula[137]} id="id137">{estado[137]}</td>
                    <td className={celula[138]} id="id138">{estado[138]}</td>
                    <td className={celula[139]} id="id139">{estado[139]}</td>
                    <td className={celula[140]} id="id140">{estado[140]}</td>
                    <td className={celula[141]} id="id141">{estado[141]}</td>
                    <td className={celula[142]} id="id142">{estado[142]}</td>
                    <td className={celula[143]} id="id143">{estado[143]}</td>
                </tr>
                <tr>
                    <td className={celula[144]} id="id144">{estado[144]}</td>
                    <td className={celula[145]} id="id145">{estado[145]}</td>
                    <td className={celula[146]} id="id146">{estado[146]}</td>
                    <td className={celula[147]} id="id147">{estado[147]}</td>
                    <td className={celula[148]} id="id148">{estado[148]}</td>
                    <td className={celula[149]} id="id149">{estado[149]}</td>
                    <td className={celula[150]} id="id150">{estado[150]}</td>
                    <td className={celula[151]} id="id151">{estado[151]}</td>
                    <td className={celula[152]} id="id152">{estado[152]}</td>
                    <td className={celula[153]} id="id153">{estado[153]}</td>
                    <td className={celula[154]} id="id154">{estado[154]}</td>
                    <td className={celula[155]} id="id155">{estado[155]}</td>
                    <td className={celula[156]} id="id156">{estado[156]}</td>
                    <td className={celula[157]} id="id157">{estado[157]}</td>
                    <td className={celula[158]} id="id158">{estado[158]}</td>
                    <td className={celula[159]} id="id159">{estado[159]}</td>
                    <td className={celula[160]} id="id160">{estado[160]}</td>
                    <td className={celula[161]} id="id161">{estado[161]}</td>
                    <td className={celula[162]} id="id162">{estado[162]}</td>
                    <td className={celula[163]} id="id163">{estado[163]}</td>
                    <td className={celula[164]} id="id164">{estado[164]}</td>
                    <td className={celula[165]} id="id165">{estado[165]}</td>
                    <td className={celula[166]} id="id166">{estado[166]}</td>
                    <td className={celula[167]} id="id167">{estado[167]}</td>
                </tr>
                <tr>
                    <td className={celula[168]} id="id168">{estado[168]}</td>
                    <td className={celula[169]} id="id169">{estado[169]}</td>
                    <td className={celula[170]} id="id170">{estado[170]}</td>
                    <td className={celula[171]} id="id171">{estado[171]}</td>
                    <td className={celula[172]} id="id172">{estado[172]}</td>
                    <td className={celula[173]} id="id173">{estado[173]}</td>
                    <td className={celula[174]} id="id174">{estado[174]}</td>
                    <td className={celula[175]} id="id175">{estado[175]}</td>
                    <td className={celula[176]} id="id176">{estado[176]}</td>
                    <td className={celula[177]} id="id177">{estado[177]}</td>
                    <td className={celula[178]} id="id178">{estado[178]}</td>
                    <td className={celula[179]} id="id179">{estado[179]}</td>
                    <td className={celula[180]} id="id180">{estado[180]}</td>
                    <td className={celula[181]} id="id181">{estado[181]}</td>
                    <td className={celula[182]} id="id182">{estado[182]}</td>
                    <td className={celula[183]} id="id183">{estado[183]}</td>
                    <td className={celula[184]} id="id184">{estado[184]}</td>
                    <td className={celula[185]} id="id185">{estado[185]}</td>
                    <td className={celula[186]} id="id186">{estado[186]}</td>
                    <td className={celula[187]} id="id187">{estado[187]}</td>
                    <td className={celula[188]} id="id188">{estado[188]}</td>
                    <td className={celula[189]} id="id189">{estado[189]}</td>
                    <td className={celula[190]} id="id190">{estado[190]}</td>
                    <td className={celula[191]} id="id191">{estado[191]}</td>
                </tr>
                <tr>
                    <td className={celula[192]} id="id192">{estado[192]}</td>
                    <td className={celula[193]} id="id193">{estado[193]}</td>
                    <td className={celula[194]} id="id194">{estado[194]}</td>
                    <td className={celula[195]} id="id195">{estado[195]}</td>
                    <td className={celula[196]} id="id196">{estado[196]}</td>
                    <td className={celula[197]} id="id197">{estado[197]}</td>
                    <td className={celula[198]} id="id198">{estado[198]}</td>
                    <td className={celula[199]} id="id199">{estado[199]}</td>
                    <td className={celula[200]} id="id200">{estado[200]}</td>
                    <td className={celula[201]} id="id201">{estado[201]}</td>
                    <td className={celula[202]} id="id202">{estado[202]}</td>
                    <td className={celula[203]} id="id203">{estado[203]}</td>
                    <td className={celula[204]} id="id204">{estado[204]}</td>
                    <td className={celula[205]} id="id205">{estado[205]}</td>
                    <td className={celula[206]} id="id206">{estado[206]}</td>
                    <td className={celula[207]} id="id207">{estado[207]}</td>
                    <td className={celula[208]} id="id208">{estado[208]}</td>
                    <td className={celula[209]} id="id209">{estado[209]}</td>
                    <td className={celula[210]} id="id210">{estado[210]}</td>
                    <td className={celula[211]} id="id211">{estado[211]}</td>
                    <td className={celula[212]} id="id212">{estado[212]}</td>
                    <td className={celula[213]} id="id213">{estado[213]}</td>
                    <td className={celula[214]} id="id214">{estado[214]}</td>
                    <td className={celula[215]} id="id215">{estado[215]}</td>
                </tr>
                <tr>
                    <td className={celula[216]} id="id216">{estado[216]}</td>
                    <td className={celula[217]} id="id217">{estado[217]}</td>
                    <td className={celula[218]} id="id218">{estado[218]}</td>
                    <td className={celula[219]} id="id219">{estado[219]}</td>
                    <td className={celula[220]} id="id220">{estado[220]}</td>
                    <td className={celula[221]} id="id221">{estado[221]}</td>
                    <td className={celula[222]} id="id222">{estado[222]}</td>
                    <td className={celula[223]} id="id223">{estado[223]}</td>
                    <td className={celula[224]} id="id224">{estado[224]}</td>
                    <td className={celula[225]} id="id225">{estado[225]}</td>
                    <td className={celula[226]} id="id226">{estado[226]}</td>
                    <td className={celula[227]} id="id227">{estado[227]}</td>
                    <td className={celula[228]} id="id228">{estado[228]}</td>
                    <td className={celula[229]} id="id229">{estado[229]}</td>
                    <td className={celula[230]} id="id230">{estado[230]}</td>
                    <td className={celula[231]} id="id231">{estado[231]}</td>
                    <td className={celula[232]} id="id232">{estado[232]}</td>
                    <td className={celula[233]} id="id233">{estado[233]}</td>
                    <td className={celula[234]} id="id234">{estado[234]}</td>
                    <td className={celula[235]} id="id235">{estado[235]}</td>
                    <td className={celula[236]} id="id236">{estado[236]}</td>
                    <td className={celula[237]} id="id237">{estado[237]}</td>
                    <td className={celula[238]} id="id238">{estado[238]}</td>
                    <td className={celula[239]} id="id239">{estado[239]}</td>
                </tr>
                <tr>
                    <td className={celula[240]} id="id240">{estado[240]}</td>
                    <td className={celula[241]} id="id241">{estado[241]}</td>
                    <td className={celula[242]} id="id242">{estado[242]}</td>
                    <td className={celula[243]} id="id243">{estado[243]}</td>
                    <td className={celula[244]} id="id244">{estado[244]}</td>
                    <td className={celula[245]} id="id245">{estado[245]}</td>
                    <td className={celula[246]} id="id246">{estado[246]}</td>
                    <td className={celula[247]} id="id247">{estado[247]}</td>
                    <td className={celula[248]} id="id248">{estado[248]}</td>
                    <td className={celula[249]} id="id249">{estado[249]}</td>
                    <td className={celula[250]} id="id250">{estado[250]}</td>
                    <td className={celula[251]} id="id251">{estado[251]}</td>
                    <td className={celula[252]} id="id252">{estado[252]}</td>
                    <td className={celula[253]} id="id253">{estado[253]}</td>
                    <td className={celula[254]} id="id254">{estado[254]}</td>
                    <td className={celula[255]} id="id255">{estado[255]}</td>
                    <td className={celula[256]} id="id256">{estado[256]}</td>
                    <td className={celula[257]} id="id257">{estado[257]}</td>
                    <td className={celula[258]} id="id258">{estado[258]}</td>
                    <td className={celula[259]} id="id259">{estado[259]}</td>
                    <td className={celula[260]} id="id260">{estado[260]}</td>
                    <td className={celula[261]} id="id261">{estado[261]}</td>
                    <td className={celula[262]} id="id262">{estado[262]}</td>
                    <td className={celula[263]} id="id263">{estado[263]}</td>
                </tr>
                <tr>
                    <td className={celula[264]} id="id264">{estado[264]}</td>
                    <td className={celula[265]} id="id265">{estado[265]}</td>
                    <td className={celula[266]} id="id266">{estado[266]}</td>
                    <td className={celula[267]} id="id267">{estado[267]}</td>
                    <td className={celula[268]} id="id268">{estado[268]}</td>
                    <td className={celula[269]} id="id269">{estado[269]}</td>
                    <td className={celula[270]} id="id270">{estado[270]}</td>
                    <td className={celula[271]} id="id271">{estado[271]}</td>
                    <td className={celula[272]} id="id272">{estado[272]}</td>
                    <td className={celula[273]} id="id273">{estado[273]}</td>
                    <td className={celula[274]} id="id274">{estado[274]}</td>
                    <td className={celula[275]} id="id275">{estado[275]}</td>
                    <td className={celula[276]} id="id276">{estado[276]}</td>
                    <td className={celula[277]} id="id277">{estado[277]}</td>
                    <td className={celula[278]} id="id278">{estado[278]}</td>
                    <td className={celula[279]} id="id279">{estado[279]}</td>
                    <td className={celula[280]} id="id280">{estado[280]}</td>
                    <td className={celula[281]} id="id281">{estado[281]}</td>
                    <td className={celula[282]} id="id282">{estado[282]}</td>
                    <td className={celula[283]} id="id283">{estado[283]}</td>
                    <td className={celula[284]} id="id284">{estado[284]}</td>
                    <td className={celula[285]} id="id285">{estado[285]}</td>
                    <td className={celula[286]} id="id286">{estado[286]}</td>
                    <td className={celula[287]} id="id287">{estado[287]}</td>
                </tr>
                <tr>
                    <td className={celula[288]} id="id288">{estado[288]}</td>
                    <td className={celula[289]} id="id289">{estado[289]}</td>
                    <td className={celula[290]} id="id290">{estado[290]}</td>
                    <td className={celula[291]} id="id291">{estado[291]}</td>
                    <td className={celula[292]} id="id292">{estado[292]}</td>
                    <td className={celula[293]} id="id293">{estado[293]}</td>
                    <td className={celula[294]} id="id294">{estado[294]}</td>
                    <td className={celula[295]} id="id295">{estado[295]}</td>
                    <td className={celula[296]} id="id296">{estado[296]}</td>
                    <td className={celula[297]} id="id297">{estado[297]}</td>
                    <td className={celula[298]} id="id298">{estado[298]}</td>
                    <td className={celula[299]} id="id299">{estado[299]}</td>
                    <td className={celula[300]} id="id300">{estado[300]}</td>
                    <td className={celula[301]} id="id301">{estado[301]}</td>
                    <td className={celula[302]} id="id302">{estado[302]}</td>
                    <td className={celula[303]} id="id303">{estado[303]}</td>
                    <td className={celula[304]} id="id304">{estado[304]}</td>
                    <td className={celula[305]} id="id305">{estado[305]}</td>
                    <td className={celula[306]} id="id306">{estado[306]}</td>
                    <td className={celula[307]} id="id307">{estado[307]}</td>
                    <td className={celula[308]} id="id308">{estado[308]}</td>
                    <td className={celula[309]} id="id309">{estado[309]}</td>
                    <td className={celula[310]} id="id310">{estado[310]}</td>
                    <td className={celula[311]} id="id311">{estado[311]}</td>
                </tr>
                <tr>
                    <td className={celula[312]} id="id312">{estado[312]}</td>
                    <td className={celula[313]} id="id313">{estado[313]}</td>
                    <td className={celula[314]} id="id314">{estado[314]}</td>
                    <td className={celula[315]} id="id315">{estado[315]}</td>
                    <td className={celula[316]} id="id316">{estado[316]}</td>
                    <td className={celula[317]} id="id317">{estado[317]}</td>
                    <td className={celula[318]} id="id318">{estado[318]}</td>
                    <td className={celula[319]} id="id319">{estado[319]}</td>
                    <td className={celula[320]} id="id320">{estado[320]}</td>
                    <td className={celula[321]} id="id321">{estado[321]}</td>
                    <td className={celula[322]} id="id322">{estado[322]}</td>
                    <td className={celula[323]} id="id323">{estado[323]}</td>
                    <td className={celula[324]} id="id324">{estado[324]}</td>
                    <td className={celula[325]} id="id325">{estado[325]}</td>
                    <td className={celula[326]} id="id326">{estado[326]}</td>
                    <td className={celula[327]} id="id327">{estado[327]}</td>
                    <td className={celula[328]} id="id328">{estado[328]}</td>
                    <td className={celula[329]} id="id329">{estado[329]}</td>
                    <td className={celula[330]} id="id330">{estado[330]}</td>
                    <td className={celula[331]} id="id331">{estado[331]}</td>
                    <td className={celula[332]} id="id332">{estado[332]}</td>
                    <td className={celula[333]} id="id333">{estado[333]}</td>
                    <td className={celula[334]} id="id334">{estado[334]}</td>
                    <td className={celula[335]} id="id335">{estado[335]}</td>
                </tr>
                <tr>
                    <td className={celula[336]} id="id336">{estado[336]}</td>
                    <td className={celula[337]} id="id337">{estado[337]}</td>
                    <td className={celula[338]} id="id338">{estado[338]}</td>
                    <td className={celula[339]} id="id339">{estado[339]}</td>
                    <td className={celula[340]} id="id340">{estado[340]}</td>
                    <td className={celula[341]} id="id341">{estado[341]}</td>
                    <td className={celula[342]} id="id342">{estado[342]}</td>
                    <td className={celula[343]} id="id343">{estado[343]}</td>
                    <td className={celula[344]} id="id344">{estado[344]}</td>
                    <td className={celula[345]} id="id345">{estado[345]}</td>
                    <td className={celula[346]} id="id346">{estado[346]}</td>
                    <td className={celula[347]} id="id347">{estado[347]}</td>
                    <td className={celula[348]} id="id348">{estado[348]}</td>
                    <td className={celula[349]} id="id349">{estado[349]}</td>
                    <td className={celula[350]} id="id350">{estado[350]}</td>
                    <td className={celula[351]} id="id351">{estado[351]}</td>
                    <td className={celula[352]} id="id352">{estado[352]}</td>
                    <td className={celula[353]} id="id353">{estado[353]}</td>
                    <td className={celula[354]} id="id354">{estado[354]}</td>
                    <td className={celula[355]} id="id355">{estado[355]}</td>
                    <td className={celula[356]} id="id356">{estado[356]}</td>
                    <td className={celula[357]} id="id357">{estado[357]}</td>
                    <td className={celula[358]} id="id358">{estado[358]}</td>
                    <td className={celula[359]} id="id359">{estado[359]}</td>
                </tr>
                <tr>
                    <td className={celula[360]} id="id360">{estado[360]}</td>
                    <td className={celula[361]} id="id361">{estado[361]}</td>
                    <td className={celula[362]} id="id362">{estado[362]}</td>
                    <td className={celula[363]} id="id363">{estado[363]}</td>
                    <td className={celula[364]} id="id364">{estado[364]}</td>
                    <td className={celula[365]} id="id365">{estado[365]}</td>
                    <td className={celula[366]} id="id366">{estado[366]}</td>
                    <td className={celula[367]} id="id367">{estado[367]}</td>
                    <td className={celula[368]} id="id368">{estado[368]}</td>
                    <td className={celula[369]} id="id369">{estado[369]}</td>
                    <td className={celula[370]} id="id370">{estado[370]}</td>
                    <td className={celula[371]} id="id371">{estado[371]}</td>
                    <td className={celula[372]} id="id372">{estado[372]}</td>
                    <td className={celula[373]} id="id373">{estado[373]}</td>
                    <td className={celula[374]} id="id374">{estado[374]}</td>
                    <td className={celula[375]} id="id375">{estado[375]}</td>
                    <td className={celula[376]} id="id376">{estado[376]}</td>
                    <td className={celula[377]} id="id377">{estado[377]}</td>
                    <td className={celula[378]} id="id378">{estado[378]}</td>
                    <td className={celula[379]} id="id379">{estado[379]}</td>
                    <td className={celula[380]} id="id380">{estado[380]}</td>
                    <td className={celula[381]} id="id381">{estado[381]}</td>
                    <td className={celula[382]} id="id382">{estado[382]}</td>
                    <td className={celula[383]} id="id383">{estado[383]}</td>
                </tr>
                <tr>
                    <td className={celula[384]} id="id384">{estado[384]}</td>
                    <td className={celula[385]} id="id385">{estado[385]}</td>
                    <td className={celula[386]} id="id386">{estado[386]}</td>
                    <td className={celula[387]} id="id387">{estado[387]}</td>
                    <td className={celula[388]} id="id388">{estado[388]}</td>
                    <td className={celula[389]} id="id389">{estado[389]}</td>
                    <td className={celula[390]} id="id390">{estado[390]}</td>
                    <td className={celula[391]} id="id391">{estado[391]}</td>
                    <td className={celula[392]} id="id392">{estado[392]}</td>
                    <td className={celula[393]} id="id393">{estado[393]}</td>
                    <td className={celula[394]} id="id394">{estado[394]}</td>
                    <td className={celula[395]} id="id395">{estado[395]}</td>
                    <td className={celula[396]} id="id396">{estado[396]}</td>
                    <td className={celula[397]} id="id397">{estado[397]}</td>
                    <td className={celula[398]} id="id398">{estado[398]}</td>
                    <td className={celula[399]} id="id399">{estado[399]}</td>
                    <td className={celula[400]} id="id400">{estado[400]}</td>
                    <td className={celula[401]} id="id401">{estado[401]}</td>
                    <td className={celula[402]} id="id402">{estado[402]}</td>
                    <td className={celula[403]} id="id403">{estado[403]}</td>
                    <td className={celula[404]} id="id404">{estado[404]}</td>
                    <td className={celula[405]} id="id405">{estado[405]}</td>
                    <td className={celula[406]} id="id406">{estado[406]}</td>
                    <td className={celula[407]} id="id407">{estado[407]}</td>
                </tr>
                <tr>
                    <td className={celula[408]} id="id408">{estado[408]}</td>
                    <td className={celula[409]} id="id409">{estado[409]}</td>
                    <td className={celula[410]} id="id410">{estado[410]}</td>
                    <td className={celula[411]} id="id411">{estado[411]}</td>
                    <td className={celula[412]} id="id412">{estado[412]}</td>
                    <td className={celula[413]} id="id413">{estado[413]}</td>
                    <td className={celula[414]} id="id414">{estado[414]}</td>
                    <td className={celula[415]} id="id415">{estado[415]}</td>
                    <td className={celula[416]} id="id416">{estado[416]}</td>
                    <td className={celula[417]} id="id417">{estado[417]}</td>
                    <td className={celula[418]} id="id418">{estado[418]}</td>
                    <td className={celula[419]} id="id419">{estado[419]}</td>
                    <td className={celula[420]} id="id420">{estado[420]}</td>
                    <td className={celula[421]} id="id421">{estado[421]}</td>
                    <td className={celula[422]} id="id422">{estado[422]}</td>
                    <td className={celula[423]} id="id423">{estado[423]}</td>
                    <td className={celula[424]} id="id424">{estado[424]}</td>
                    <td className={celula[425]} id="id425">{estado[425]}</td>
                    <td className={celula[426]} id="id426">{estado[426]}</td>
                    <td className={celula[427]} id="id427">{estado[427]}</td>
                    <td className={celula[428]} id="id428">{estado[428]}</td>
                    <td className={celula[429]} id="id429">{estado[429]}</td>
                    <td className={celula[430]} id="id430">{estado[430]}</td>
                    <td className={celula[431]} id="id431">{estado[431]}</td>
                </tr>
                <tr>
                    <td className={celula[432]} id="id432">{estado[432]}</td>
                    <td className={celula[433]} id="id433">{estado[433]}</td>
                    <td className={celula[434]} id="id434">{estado[434]}</td>
                    <td className={celula[435]} id="id435">{estado[435]}</td>
                    <td className={celula[436]} id="id436">{estado[436]}</td>
                    <td className={celula[437]} id="id437">{estado[437]}</td>
                    <td className={celula[438]} id="id438">{estado[438]}</td>
                    <td className={celula[439]} id="id439">{estado[439]}</td>
                    <td className={celula[440]} id="id440">{estado[440]}</td>
                    <td className={celula[441]} id="id441">{estado[441]}</td>
                    <td className={celula[442]} id="id442">{estado[442]}</td>
                    <td className={celula[443]} id="id443">{estado[443]}</td>
                    <td className={celula[444]} id="id444">{estado[444]}</td>
                    <td className={celula[445]} id="id445">{estado[445]}</td>
                    <td className={celula[446]} id="id446">{estado[446]}</td>
                    <td className={celula[447]} id="id447">{estado[447]}</td>
                    <td className={celula[448]} id="id448">{estado[448]}</td>
                    <td className={celula[449]} id="id449">{estado[449]}</td>
                    <td className={celula[450]} id="id450">{estado[450]}</td>
                    <td className={celula[451]} id="id451">{estado[451]}</td>
                    <td className={celula[452]} id="id452">{estado[452]}</td>
                    <td className={celula[453]} id="id453">{estado[453]}</td>
                    <td className={celula[454]} id="id454">{estado[454]}</td>
                    <td className={celula[455]} id="id455">{estado[455]}</td>
                </tr>
                <tr>
                    <td className={celula[456]} id="id456">{estado[456]}</td>
                    <td className={celula[457]} id="id457">{estado[457]}</td>
                    <td className={celula[458]} id="id458">{estado[458]}</td>
                    <td className={celula[459]} id="id459">{estado[459]}</td>
                    <td className={celula[460]} id="id460">{estado[460]}</td>
                    <td className={celula[461]} id="id461">{estado[461]}</td>
                    <td className={celula[462]} id="id462">{estado[462]}</td>
                    <td className={celula[463]} id="id463">{estado[463]}</td>
                    <td className={celula[464]} id="id464">{estado[464]}</td>
                    <td className={celula[465]} id="id465">{estado[465]}</td>
                    <td className={celula[466]} id="id466">{estado[466]}</td>
                    <td className={celula[467]} id="id467">{estado[467]}</td>
                    <td className={celula[468]} id="id468">{estado[468]}</td>
                    <td className={celula[469]} id="id469">{estado[469]}</td>
                    <td className={celula[470]} id="id470">{estado[470]}</td>
                    <td className={celula[471]} id="id471">{estado[471]}</td>
                    <td className={celula[472]} id="id472">{estado[472]}</td>
                    <td className={celula[473]} id="id473">{estado[473]}</td>
                    <td className={celula[474]} id="id474">{estado[474]}</td>
                    <td className={celula[475]} id="id475">{estado[475]}</td>
                    <td className={celula[476]} id="id476">{estado[476]}</td>
                    <td className={celula[477]} id="id477">{estado[477]}</td>
                    <td className={celula[478]} id="id478">{estado[478]}</td>
                    <td className={celula[479]} id="id479">{estado[479]}</td>
                </tr>
                <tr>
                    <td className={celula[480]} id="id480">{estado[480]}</td>
                    <td className={celula[481]} id="id481">{estado[481]}</td>
                    <td className={celula[482]} id="id482">{estado[482]}</td>
                    <td className={celula[483]} id="id483">{estado[483]}</td>
                    <td className={celula[484]} id="id484">{estado[484]}</td>
                    <td className={celula[485]} id="id485">{estado[485]}</td>
                    <td className={celula[486]} id="id486">{estado[486]}</td>
                    <td className={celula[487]} id="id487">{estado[487]}</td>
                    <td className={celula[488]} id="id488">{estado[488]}</td>
                    <td className={celula[489]} id="id489">{estado[489]}</td>
                    <td className={celula[490]} id="id490">{estado[490]}</td>
                    <td className={celula[491]} id="id491">{estado[491]}</td>
                    <td className={celula[492]} id="id492">{estado[492]}</td>
                    <td className={celula[493]} id="id493">{estado[493]}</td>
                    <td className={celula[494]} id="id494">{estado[494]}</td>
                    <td className={celula[495]} id="id495">{estado[495]}</td>
                    <td className={celula[496]} id="id496">{estado[496]}</td>
                    <td className={celula[497]} id="id497">{estado[497]}</td>
                    <td className={celula[498]} id="id498">{estado[498]}</td>
                    <td className={celula[499]} id="id499">{estado[499]}</td>
                    <td className={celula[500]} id="id500">{estado[500]}</td>
                    <td className={celula[501]} id="id501">{estado[501]}</td>
                    <td className={celula[502]} id="id502">{estado[502]}</td>
                    <td className={celula[503]} id="id503">{estado[503]}</td>
                </tr>
                <tr>
                    <td className={celula[504]} id="id504">{estado[504]}</td>
                    <td className={celula[505]} id="id505">{estado[505]}</td>
                    <td className={celula[506]} id="id506">{estado[506]}</td>
                    <td className={celula[507]} id="id507">{estado[507]}</td>
                    <td className={celula[508]} id="id508">{estado[508]}</td>
                    <td className={celula[509]} id="id509">{estado[509]}</td>
                    <td className={celula[510]} id="id510">{estado[510]}</td>
                    <td className={celula[511]} id="id511">{estado[511]}</td>
                    <td className={celula[512]} id="id512">{estado[512]}</td>
                    <td className={celula[513]} id="id513">{estado[513]}</td>
                    <td className={celula[514]} id="id514">{estado[514]}</td>
                    <td className={celula[515]} id="id515">{estado[515]}</td>
                    <td className={celula[516]} id="id516">{estado[516]}</td>
                    <td className={celula[517]} id="id517">{estado[517]}</td>
                    <td className={celula[518]} id="id518">{estado[518]}</td>
                    <td className={celula[519]} id="id519">{estado[519]}</td>
                    <td className={celula[520]} id="id520">{estado[520]}</td>
                    <td className={celula[521]} id="id521">{estado[521]}</td>
                    <td className={celula[522]} id="id522">{estado[522]}</td>
                    <td className={celula[523]} id="id523">{estado[523]}</td>
                    <td className={celula[524]} id="id524">{estado[524]}</td>
                    <td className={celula[525]} id="id525">{estado[525]}</td>
                    <td className={celula[526]} id="id526">{estado[526]}</td>
                    <td className={celula[527]} id="id527">{estado[527]}</td>
                </tr>
                <tr>
                    <td className={celula[528]} id="id528">{estado[528]}</td>
                    <td className={celula[529]} id="id529">{estado[529]}</td>
                    <td className={celula[530]} id="id530">{estado[530]}</td>
                    <td className={celula[531]} id="id531">{estado[531]}</td>
                    <td className={celula[532]} id="id532">{estado[532]}</td>
                    <td className={celula[533]} id="id533">{estado[533]}</td>
                    <td className={celula[534]} id="id534">{estado[534]}</td>
                    <td className={celula[535]} id="id535">{estado[535]}</td>
                    <td className={celula[536]} id="id536">{estado[536]}</td>
                    <td className={celula[537]} id="id537">{estado[537]}</td>
                    <td className={celula[538]} id="id538">{estado[538]}</td>
                    <td className={celula[539]} id="id539">{estado[539]}</td>
                    <td className={celula[540]} id="id540">{estado[540]}</td>
                    <td className={celula[541]} id="id541">{estado[541]}</td>
                    <td className={celula[542]} id="id542">{estado[542]}</td>
                    <td className={celula[543]} id="id543">{estado[543]}</td>
                    <td className={celula[544]} id="id544">{estado[544]}</td>
                    <td className={celula[545]} id="id545">{estado[545]}</td>
                    <td className={celula[546]} id="id546">{estado[546]}</td>
                    <td className={celula[547]} id="id547">{estado[547]}</td>
                    <td className={celula[548]} id="id548">{estado[548]}</td>
                    <td className={celula[549]} id="id549">{estado[549]}</td>
                    <td className={celula[550]} id="id550">{estado[550]}</td>
                    <td className={celula[551]} id="id551">{estado[551]}</td>
                </tr>
                <tr>
                    <td className={celula[552]} id="id552">{estado[552]}</td>
                    <td className={celula[553]} id="id553">{estado[553]}</td>
                    <td className={celula[554]} id="id554">{estado[554]}</td>
                    <td className={celula[555]} id="id555">{estado[555]}</td>
                    <td className={celula[556]} id="id556">{estado[556]}</td>
                    <td className={celula[557]} id="id557">{estado[557]}</td>
                    <td className={celula[558]} id="id558">{estado[558]}</td>
                    <td className={celula[559]} id="id559">{estado[559]}</td>
                    <td className={celula[560]} id="id560">{estado[560]}</td>
                    <td className={celula[561]} id="id561">{estado[561]}</td>
                    <td className={celula[562]} id="id562">{estado[562]}</td>
                    <td className={celula[563]} id="id563">{estado[563]}</td>
                    <td className={celula[564]} id="id564">{estado[564]}</td>
                    <td className={celula[565]} id="id565">{estado[565]}</td>
                    <td className={celula[566]} id="id566">{estado[566]}</td>
                    <td className={celula[567]} id="id567">{estado[567]}</td>
                    <td className={celula[568]} id="id568">{estado[568]}</td>
                    <td className={celula[569]} id="id569">{estado[569]}</td>
                    <td className={celula[570]} id="id570">{estado[570]}</td>
                    <td className={celula[571]} id="id571">{estado[571]}</td>
                    <td className={celula[572]} id="id572">{estado[572]}</td>
                    <td className={celula[573]} id="id573">{estado[573]}</td>
                    <td className={celula[574]} id="id574">{estado[574]}</td>
                    <td className={celula[575]} id="id575">{estado[575]}</td>
                </tr>
                <tr>
                    <td className={celula[576]} id="id576">{estado[576]}</td>
                    <td className={celula[577]} id="id577">{estado[577]}</td>
                    <td className={celula[578]} id="id578">{estado[578]}</td>
                    <td className={celula[579]} id="id579">{estado[579]}</td>
                    <td className={celula[580]} id="id580">{estado[580]}</td>
                    <td className={celula[581]} id="id581">{estado[581]}</td>
                    <td className={celula[582]} id="id582">{estado[582]}</td>
                    <td className={celula[583]} id="id583">{estado[583]}</td>
                    <td className={celula[584]} id="id584">{estado[584]}</td>
                    <td className={celula[585]} id="id585">{estado[585]}</td>
                    <td className={celula[586]} id="id586">{estado[586]}</td>
                    <td className={celula[587]} id="id587">{estado[587]}</td>
                    <td className={celula[588]} id="id588">{estado[588]}</td>
                    <td className={celula[589]} id="id589">{estado[589]}</td>
                    <td className={celula[590]} id="id590">{estado[590]}</td>
                    <td className={celula[591]} id="id591">{estado[591]}</td>
                    <td className={celula[592]} id="id592">{estado[592]}</td>
                    <td className={celula[593]} id="id593">{estado[593]}</td>
                    <td className={celula[594]} id="id594">{estado[594]}</td>
                    <td className={celula[595]} id="id595">{estado[595]}</td>
                    <td className={celula[596]} id="id596">{estado[596]}</td>
                    <td className={celula[597]} id="id597">{estado[597]}</td>
                    <td className={celula[598]} id="id598">{estado[598]}</td>
                    <td className={celula[599]} id="id599">{estado[599]}</td>
                </tr>
            </table>
        </div>;
    }
}

export default GameRender;