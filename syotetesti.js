'use strict';
 
const lue = require('./kirjasto/syotekirjasto');
 
// lue('Anna nimi:').then(console.log);
 
async function testi(){
    const etunimi= await lue('Anna etunimi: ');
    const sukunimi= await lue('Anna sukunimi: ');
    console.log(`${etunimi} ${sukunimi}`);
}
 
testi();