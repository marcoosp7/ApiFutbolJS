const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/';

function BuscarLigas(){
    let liga_url = 'all_leagues.php';
    fetch(`${API_URL}${liga_url}`)
        .then(response => response.json())
        .then(data => {
            // actualizo los datos
            const ligas = data.leagues;
            const nombreLigas = ligas.map(equipo => equipo.strLeague);
            // Seleccionar el elemento HTML donde se mostrarán los nombres de los equipos
            const listaLigas = document.getElementById('ligas');
            // Limpiar cualquier contenido previo en la lista
            listaLigas.innerHTML = '';
            // Iterar sobre los nombres de los equipos y agregarlos a la lista en el HTML
            nombreLigas.forEach(nombreLiga => {
                const listItem = document.createElement('li');
                listItem.textContent = nombreLiga + ' ';
                let button = document.createElement('button');
                button.textContent = 'Acceder a la liga';
                button.onclick = function() {
                    BuscarEquipos(nombreLiga);
                };
                listItem.appendChild(button);
                listaLigas.appendChild(listItem); // Agregar el listItem a la lista
            });
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // Mostrar el error en el HTML
            const listaLigas = document.getElementById('ligas');
            listaLigas.textContent = 'Error al cargar las ligas. Por favor, inténtalo de nuevo más tarde.';
        });
}


function BuscarEquipos(liga) {
    let liga_url = `search_all_teams.php?l=${encodeURIComponent(liga)}`;
    console.log(liga_url)
    fetch(`${API_URL}${liga_url}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.teams) { // Verificar si data.teams no es null
                const equipos = data.teams;
                const nombresEquipos = equipos.map(equipo => equipo.strTeam);
                // Seleccionar el elemento HTML donde se mostrarán los nombres de los equipos
                const listaEquipos = document.getElementById('equipos');
                // Limpiar cualquier contenido previo en la lista
                listaEquipos.innerHTML = '';
                // Iterar sobre los nombres de los equipos y agregarlos a la lista en el HTML
                nombresEquipos.forEach(nombreEquipo => {
                    const listItem = document.createElement('li');
                    listItem.textContent = nombreEquipo;
                    listaEquipos.appendChild(listItem);
                });
            } else {
                console.error('No se encontraron equipos.');
                // Mostrar un mensaje en el HTML indicando que no se encontraron equipos
                const listaEquipos = document.getElementById('equipos');
                listaEquipos.textContent = 'No se encontraron equipos para esta liga.';
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // Mostrar el error en el HTML
            const listaEquipos = document.getElementById('equipos');
            listaEquipos.textContent = 'Error al cargar los equipos. Por favor, inténtalo de nuevo más tarde.';
        });
}
