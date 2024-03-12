const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
const salida = document.getElementById("salida")
/* saca los datos de la api */
const getLeagues = async (country) => {
try{
    const param = `search_all_leagues.php?c=${country}`
    const datos = await fetch(`${API_URL}${param}`).then(response => response.json()).then(data => data.countries)
    return datos
}catch(error){
    let noti = document.createElement('span');
        noti.textContent = 'No se pudieron encontrar los datos';
    salida.innerHTML=""
    salida.appendChild(noti);
    console.error('Error:', error);

}
}
/* mete los datos en la api */
const showLeages = async () => {
try{
    const country = document.getElementById("entrada").value
    let datos = await getLeagues(country)
    datos = datos.filter(obj => obj.strSport === "Soccer")
salida.innerHTML=""
    const nameLeage = datos.map(obj => obj.strLeague)
    const lista = document.createElement("ul")

    nameLeage.forEach(element => {
        let lis = document.createElement("li")
        lis.textContent = element
        lista.appendChild(lis)
    });

    salida.appendChild(lista)
}catch(error){
    let noti = document.createElement('span');
    noti.textContent = 'No se pudieron encontrar los datos';
    salida.innerHTML=""
    salida.appendChild(noti);
    console.error('Error:', error);
}
}

