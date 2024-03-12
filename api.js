const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/';

function BuscarEquipos() {
    let liga_url = 'search_all_teams.php';
    let params = new URLSearchParams({
        s: 'Soccer',
        c: 'Spain'
    });
    fetch(`${API_URL}${liga_url}?${params}`)
        .then(response => response.json())
        .then(data => {
            const equipos = data.teams;
            const nombresEquipos = equipos.map(equipo => equipo.strTeam);
            console.log(nombresEquipos);
            /*INSERTAR DATOS AL HTML*/
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // este error se debe mostrar en html
        });
}

BuscarEquipos();

function BuscarjUGADOR () {

    let jugador = document.getElementById("buscar_jugador").value;

    let liga_url = 'searchplayers.php?';
    let params = new URLSearchParams({
        p: jugador
    });
    fetch(`${API_URL}${liga_url}?${params}`)
        .then(response => response.json())
        .then(data => {
            const equipos = data.teams;
            const nombresEquipos = equipos.map(equipo => equipo.strTeam);
            console.log(nombresEquipos);
            /*INSERTAR DATOS AL HTML*/
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // este error se debe mostrar en html
        });
}