'use strict';
 
const lue = require('./kirjasto/syotekirjasto');
 
const Tietovarasto = require('./jsonvarasto/tietovarastokerros');
 
const varasto = new Tietovarasto();
 
const valikkoTeksti = `
Valitse:
 
1: hae kaikki kissat
2: hae kissa
3: lisää kissa
4: poista kissa
5: muuta kissan tietoja
6: lopeta
 
Anna valintasi (1, 2, 3, 4, 5 tai 6): `;
 
const virheilmoitus = `
###############################
Anna numero 1, 2, 3, 4, 5 tai 6
###############################`;
 
const lopputeksti = `
##############################################
Kiitos, että käytit huippuhienoa sovellustamme
##############################################
`
 
valikko();
 
async function valikko() {
    let onLoppu = false;
    do {
        const valinta = await lue(valikkoTeksti);
        if(valinta==='1') {
            await haeKaikkiHenkilot();
        }
        else if(valinta==='2'){
            await haeYksiHenkilo();
        
        }
        else if (valinta === '3') {
            await lisaaHenkilo();
        }
        else if (valinta === '4') {
            await poistaHenkilo();
        }
        else if (valinta === '5') {
            await paivitaHenkilo();
        }
        else if (valinta === '6') {
            console.log(lopputeksti);
            onLoppu = true;
        }
        else {
            console.log(virheilmoitus);
        }
    } while (!onLoppu);
}
 
function muodostaStatusviesti(viesti) {
    return `\n########### Status ##########\n${viesti}`;
}
async function haeKaikkiHenkilot(){
    console.log('\nKaikki kissat');
    for(const henkilo of await varasto.haeKaikki()){
        console.log(henkiloRivi(henkilo));
    }  
}
 
function henkiloRivi(henkilo){
    return `${henkilo.id}: ${henkilo.nimi} ${henkilo.syntymavuosi}, `+
              `${henkilo.rotu} (paino: ${henkilo.painoKg}kg )`
}

async function paivitaHenkilo() {
    try {
        const muutettu = await lueHenkilonTiedot();
        const tulos = await varasto.paivita(muutettu);
        console.log(muodostaStatusviesti(tulos.viesti));
    }
    catch (virhe) {
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}
async function lueHenkilonTiedot() {
    const id = +await lue('Anna id: ');
    const nimi = await lue('Nimi: ')
    const syntymavuosi = await lue('Syntymavuosi:');
    const rotu = await lue('rotu: ');
    const painoKg = +await lue('Paino: ');
 
    return {
        id,
        nimi,
        syntymavuosi,
        rotu,
        painoKg
    };
}
 
async function lisaaHenkilo() {
    try {
        const uusi = await lueHenkilonTiedot();
        const tulos = await varasto.lisaa(uusi);
        console.log(muodostaStatusviesti(tulos.viesti));
    }
    catch (virhe) {
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}

async function poistaHenkilo(){
    try{
        const id= +await lue('Anna id: ');
        const status=await varasto.poista(id);
        console.log(muodostaStatusviesti(status.viesti));
    }
    catch(virhe){
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}
async function haeYksiHenkilo(){
    try{
        const id = +await lue('Anna id: ');
        const tulos = await varasto.hae(id);
        console.log('\n######## hae henkilö ########')
        console.log(henkiloRivi(tulos));
    }
    catch(virhe){
        console.log(muodostaStatusviesti(virhe.viesti));
    }
}