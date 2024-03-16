'use strict';
 
const path = require('path');
 
const {jsontiedosto} = require('./varastoConfig.json');
 
const varastoTiedosto=path.join(__dirname,jsontiedosto);
const {
    lueVarasto,
    kirjoitaVarasto
} = require('./varastokasittelija');
 
async function haeYksiVarastosta(id){
    return (await lueVarasto(varastoTiedosto))
        .find(olio=>olio.id==id) || null;
}
async function haeKaikkiVarastosta() {
    return lueVarasto(varastoTiedosto);
}
async function lisaaVarastoon(uusiOlio) {
    const varasto = await lueVarasto(varastoTiedosto);
    varasto.push(uusiOlio);
    return await kirjoitaVarasto(varastoTiedosto,varasto);
}
async function poistaVarastosta(id){
    const varasto = await lueVarasto(varastoTiedosto);
    const i = varasto.findIndex(alkio=>alkio.id==id);
    if(i<0) return false;
    varasto.splice(i, 1);
    return await kirjoitaVarasto(varastoTiedosto, varasto);
}

async function paivitaVarasto(olio){
    const varasto = await lueVarasto(varastoTiedosto);
    const vanhaOlio=varasto.find(vanha=>vanha.id==olio.id);
    if(vanhaOlio) {
        Object.assign(vanhaOlio, olio);
        return await kirjoitaVarasto(varastoTiedosto, varasto);
    }
    return false;
}

module.exports={
    haeKaikkiVarastosta,
    haeYksiVarastosta,
    lisaaVarastoon,
    poistaVarastosta,
    paivitaVarasto
};