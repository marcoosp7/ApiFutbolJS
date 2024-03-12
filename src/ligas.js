const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/';

/* Función para obtener las ligas */
const getLeagues = async (country) => {
    try {
        const param = `search_all_leagues.php?c=${country}`;
        const response = await fetch(`${API_URL}${param}`);
        const data = await response.json();
        return data.countries;
    } catch (error) {
        throw new Error('No se pudieron encontrar los datos');
    }
}

/* Función para mostrar las ligas */
const showLeages = async () => {
    try {
        // Limpiar contenido anterior
        const salida = document.getElementById("salida");
        salida.innerHTML = '';

        const country = document.getElementById("entrada").value;
        let datos = await getLeagues(country);
        datos = datos.filter(obj => obj.strSport === "Soccer");

        const nameLeage = datos.map(obj => obj.strLeague);
        const lista = document.createElement("ul");

        nameLeage.forEach(element => {
            let lis = document.createElement("li");
            lis.textContent = element;
            lista.appendChild(lis);
        });

        salida.appendChild(lista);
    } catch (error) {
        console.error('Error:', error.message);
        let noti = document.createElement('span');
        noti.textContent = error.message;
        let salida = document.getElementById('salida');
        salida.appendChild(noti);
    }
}
