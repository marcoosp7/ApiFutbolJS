const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
function BuscarJugador() {
    // Obtener el nombre del jugador ingresado por el usuario
    const jugador = document.getElementById("buscar_jugador").value;

    // Construir la URL de la API para buscar el jugador
    const jugador_Url = `searchplayers.php?p=${encodeURIComponent(jugador)}`;

    // Realizar la solicitud a la API
    fetch(`${API_URL}${jugador_Url}`)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('La solicitud a la API falló.');
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Verificar si se encontraron jugadores
            if (data && data.player) {
                // Obtener la información del jugador encontrado
                const jugadorInfo = data.player[0];
                // Construir la tabla con la información del jugador
                let table = '<table border="1">';
                table += '<tr><th>Imagen</th><th>Nombre</th><th>Equipo</th><th>Nacionalidad</th><th>Nacimiento</th><th>Altura</th><th>Peso</th><th>Dorsal</th></tr>';
                table += '<tr>';
                table += '</tr>';
                table += '<tr>';
                table += `<td><img src="${jugadorInfo.strCutout}" alt="${jugadorInfo.strPlayer}" width="100"></td>`;
                table += `<td>${jugadorInfo.strPlayer}</td>`;
                table += `<td>${jugadorInfo.strTeam}</td>`;
                table += `<td>${jugadorInfo.strNationality}</td>`;
                table += `<td>${jugadorInfo.dateBorn}</td>`;
                table += `<td>${jugadorInfo.strHeight}</td>`;
                table += `<td>${jugadorInfo.strWeight}</td>`;
                table += `<td>${jugadorInfo.strNumber}</td>`;
                table += '</tr>';
                table += '</table>';
                // Insertar la tabla en el HTML
                document.getElementById("tabla_jugador").innerHTML = table;
            } else {
                // Mostrar un mensaje si no se encontraron jugadores
                document.getElementById("tabla_jugador").innerHTML = 'No se encontraron jugadores.';
            }
        })
        .catch(error => {
            // Manejar cualquier error que ocurra durante la solicitud
            console.error('Error al realizar la solicitud:', error);
            document.getElementById("tabla_jugador").innerHTML = 'Error al realizar la solicitud: ' + error.message;
        });
}