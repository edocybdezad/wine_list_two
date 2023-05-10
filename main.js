
const properties = ['name','precio','cepas','dop']

document.addEventListener('DOMContentLoaded', function() {
    
    logJSONData().
    then( wines => {

        const Whites = wines.filter( wine => wine.attributes.tipo == 'blanco')
        const Reds = wines.filter( wine => wine.attributes.tipo == 'tinto')    
        const Cava = wines.filter( wine => wine.attributes.tipo === 'Espumoso') 
        const Crianza = wines.filter( wine => wine.attributes.edad === 'Crianza')
        const Ribera = wines.filter( wine => wine.attributes.dop === 'D.O. Ribera del Duero')
        const Valencia = wines.filter( wine => wine.attributes.dop === 'D.O. Valencia')
        const Garnacha = wines.filter( wine => wine.attributes.cepas.includes('Garnacha'));
        const Verdejo = wines.filter( wine => wine.attributes.cepas === 'Verdejo')
        document.getElementById('Crianza').addEventListener('click', () => {fltrWines('Crianza',Crianza)});
        document.getElementById('Ribera').addEventListener('click', () => {fltrWines('Ribera',Ribera)});
        document.getElementById('Valencia').addEventListener('click',() => {fltrWines('Valencia',Valencia)});
        document.getElementById('Garnacha').addEventListener('click', () => {fltrWines('Garnacha',Garnacha)});
        document.getElementById('Verdejo').addEventListener('click', () => {fltrWines('Verdejo',Verdejo)});
        document.getElementById('Espumosos').addEventListener('click', () => {fltrWines('Espumosos',Cava)});        
        
        mainf([Whites, Reds, Cava]); 

   
});
});
async function logJSONData() {
    const response = await fetch('https://restaurantapi-vjlx.onrender.com/api/vinos');
    const jsonData = await response.json();
    // console.log("function",jsonData.data);
    return jsonData.data;
}


 
function card(data) {
    // console.log(data.attributes)

    const itemCard = document.createElement("div");
    itemCard.className = 'item--card';
    for (let i = 0; i < properties.length; i++) {
        var item = document.createElement("div")
        item.classList.add(properties[i])
        
        item.innerText = data.attributes[properties[i]]
        itemCard.appendChild(item)         
    }
    return itemCard
  }
function mainf(categories) {
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('mainPageBtn').style.display = 'none';    
    const wine_sections = ['whites','reds','cava']
    for (var i = 0; i < categories.length; i++){
        main_list(categories[i], wine_sections[i]);
    }
}
function hideShowElements(side_btn, visual){
    if (document.getElementById('buttons').innerHTML != '') {
        document.getElementById('buttons').innerHTML = '';
    }
    document.getElementById(side_btn).style.display = `${visual}`;
    document.getElementById('whites').style.display = `${visual}`;
    document.getElementById('reds').style.display = `${visual}`;
    document.getElementById('cava').style.display = `${visual}`;
}
function backToHome(side_btn){
    document.getElementById('mainPageBtn').removeEventListener('click', backToHome);
    document.getElementById('buttons').innerHTML = '';
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('btnTitle').innerHTML = '';
    document.getElementById('btnTitle').style.display = 'none';
    document.getElementById('mainPageBtn').style.display = 'none';
    hideShowElements(side_btn, 'block');
}

function fltrWines(side_btn,Btn) {
    hideShowElements(side_btn,'none');
    document.getElementById('mainPageBtn').style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('btnTitle').style.display = 'block';
    document.getElementById('btnTitle').innerText = `Vinos ${side_btn}`;
    Btn.forEach( (e) => {

        var item = card(e);
        document.getElementById('buttons').appendChild(item);       
    })
    document.getElementById('mainPageBtn').addEventListener('click', () => {backToHome(side_btn)});
}

function main_list(w, ws) {
    w.forEach( (e) => {
        var item = card(e);
        document.getElementById(ws).appendChild(item);
    })
}

