//Variables
let generadorNombres = document.querySelector('#generar-nombre');


//Event Listeners
generadorNombres.addEventListener('submit', cargarnombres);




//Funciones
//Llamado a Ajax e imprimir resultados
function cargarnombres(e){
    //Siempre hay que hacerlo porque es un submit
    e.preventDefault();

    //Leer las variables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'http://uinames.com/api/?';

    //Armado de URL
    //Si se selecciona un origen agregarlo a URL
    if(origenSeleccionado !== ''){

        url += 'region'+'='+origenSeleccionado+'&';
    }
    //Si se selecciona un género agregarlo a URL
    if (generoSeleccionado !== '') {

        url += 'gender'+'='+generoSeleccionado+'&';
    }
    //Si se selecciona una cantidad agregarlo a URL
    if (cantidad !== '') {

        url += 'amount' + '=' + cantidad;
    }

    // 1. Conectar con AJAX
    const xhr = new XMLHttpRequest();
    // 2.Abrir una conexión
    xhr.open('GET', url, true); 
    // 3. Datos e impresión del template
    xhr.onload = function () {
        // Se coloca el status, ej: 200: correcto | 403: Prohibido | 404: No encontrado
        if (this.status === 200) {
                const nombres = JSON.parse(this.responseText);
                //Generar el HTML
                let htmlNombres = '<h2>Nombres Generados</h2>';

                htmlNombres += '<ul class="lista">';

                //Imprimir
                nombres.forEach(nombre => {

                    htmlNombres += '<li>' + nombre.name;
                    
                });

                htmlNombres += '</ul>';

                document.getElementById('resultado').innerHTML = htmlNombres;
            } 
        }
    
        // 4. Enviar el request
        xhr.send();

}
