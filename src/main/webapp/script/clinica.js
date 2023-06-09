
class Paciente {
	constructor(nombre, telefono, edad, fechaIngreso, fechaAlta) {
		this._nombre = nombre;
		this._telefono = telefono;
		this._edad = edad;
		this._fechaIngreso = fechaIngreso;
		this._fechaAlta = fechaAlta;
		this._deAlta = false;
	}
}

function FormularioIngreso(form) {
	// Obtener los valores del formulario
	var nombre = form.nombre.value;
	var telefono = form.telefono.value;
	var edad = form.edad.value;
	var fechaIngreso = new Date();
	var fechaAlta = " ----------- ";

	// Crear un nuevo objeto Paciente con los datos ingresados
	var paciente = new Paciente(nombre, telefono, edad, fechaIngreso, fechaAlta);
	console.log(paciente)

	localStorage.setItem("paciente_" + telefono, JSON.stringify(paciente));

	// Redireccionar a la página index.html
	window.location.href = "index.html";
}

// Para dar de alta al paciente, también se mostrarán los datos
function BuscarPaciente(form) {
	var paciente = new Paciente
	
	var formTelefono = form.telefono.value;
	var paciente = JSON.parse(localStorage.getItem("paciente_" + formTelefono));

	if (formTelefono === paciente._telefono) {
		// Obtener los datos del paciente del almacenamiento local (localStorage)
		var nombre = paciente._nombre;
		var edad = paciente._edad;
		var telefono = paciente._telefono;
		var fechaIngreso = paciente._fechaIngreso;

		var fechaAlta = new Date();
		paciente._fechaAlta = fechaAlta.toDateString();

		// Mostrar los datos del paciente antes de marcarlo como dado de alta
		var formS = document.getElementById("respuestaDeBusqueda");

		formS.nombre.value = nombre;
		formS.edad.value = edad;
		formS.telefono.value = telefono;
		formS.fechaIngreso.value = fechaIngreso;
		formS.fechaAlta.value = fechaAlta;

		return formTelefono;
	}
}
function FormularioAlta(form) {
	// Actualizar la información del paciente para marcarlo como dado de alta
	var nombre = form.nombre.value;
	var telefono = form.telefono.value;
	var edad = form.edad.value;
	var fechaIngreso = new Date();
	var fechaAlta = form.fechaAlta.value;

	var paciente = new Paciente(nombre, telefono, edad, fechaIngreso, fechaAlta);

	paciente._deAlta = true;
	
	// Guardar los cambios en el almacenamiento local
	localStorage.setItem("paciente_" + telefono, JSON.stringify(paciente));
	window.location.href = "index.html";

}

function mostrarPacientes() {
	// Obtener el elemento de la tabla donde se mostrarán los pacientes
	var tablaPacientes = document.getElementById("tablaPacientes");

	// Limpiar el contenido existente de la tabla
	tablaPacientes.innerHTML = "";

	// Recorrer todos los elementos almacenados en localStorage
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);

		// Verificar si la clave comienza con "paciente_"
		if (key.startsWith("paciente_")) {
			// Obtener el valor (objeto paciente) almacenado en localStorage
			var paciente = JSON.parse(localStorage.getItem(key));
			console.log(paciente)

			// Crear una nueva fila en la tabla
			var fila = tablaPacientes.insertRow();

			// Crear celdas para cada propiedad del paciente

			var nombreCelda = fila.insertCell();
			var telefonoCelda = fila.insertCell();
			var edadCelda = fila.insertCell();
			var fechaIngresoCelda = fila.insertCell();
			var fechaAltaCelda = fila.insertCell();

			// Asignar valores a las celdas

			nombreCelda.textContent = paciente._nombre;
			telefonoCelda.textContent = paciente._telefono;
			edadCelda.textContent = paciente._edad;
			fechaIngresoCelda.textContent = paciente._fechaIngreso;
			fechaAltaCelda.textContent = paciente._fechaAlta;
			console.log(paciente)
		}
	}
}

function Resetear() {
	localStorage.clear();
	location.reload();
	console.log('Lista reseteada');
	
}

