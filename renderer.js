let estudiantes = [];

function guardarEstudiante() {
  const cuenta = document.getElementById('cuenta').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const asignatura = document.getElementById('asignatura').value.trim();
  const nota1Txt = document.getElementById('nota1').value;
  const nota2Txt = document.getElementById('nota2').value;
  const nota3Txt = document.getElementById('nota3').value;
  const indexEditar = document.getElementById('index-editar').value;

  if (cuenta === "" || nombre === "" || asignatura === "" || nota1Txt === "" || nota2Txt === "" || nota3Txt === "") {
    alert("No se permiten campos vacios.");
    return;
  }

  const nota1 = parseFloat(nota1Txt);
  const nota2 = parseFloat(nota2Txt);
  const nota3 = parseFloat(nota3Txt);

  if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100) {
    alert("Las notas deben estar entre 0 y 100.");
    return;
  }

  const promedio = parseFloat(((nota1 + nota2 + nota3) / 3).toFixed(2));
  const estado = promedio >= 70 ? "Aprobado" : "Reprobado";

  const datosEstudiante = { cuenta, nombre, asignatura, nota1, nota2, nota3, promedio, estado };

  if (indexEditar === "") {
    estudiantes.push(datosEstudiante);
  } else {
    estudiantes[parseInt(indexEditar)] = datosEstudiante;
  }

  limpiarFormulario();
  actualizarTabla();
}

function actualizarTabla() {
  const tbody = document.querySelector('#tabla-estudiantes tbody');
  const filtro = document.getElementById('buscar').value.toLowerCase();
  tbody.innerHTML = '';

  let totalAprobados = 0;
  let totalReprobados = 0;
  let sumaPromedios = 0;
  let conteoValidos = 0;

  estudiantes.forEach((estudiante, index) => {
    
    if (estudiante.estado === "Aprobado") totalAprobados++;
    if (estudiante.estado === "Reprobado") totalReprobados++;
    sumaPromedios += estudiante.promedio;
    conteoValidos++;

    if (estudiante.nombre.toLowerCase().includes(filtro)) {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${estudiante.cuenta}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.asignatura}</td>
        <td>${estudiante.nota1}</td>
        <td>${estudiante.nota2}</td>
        <td>${estudiante.nota3}</td>
        <td>${estudiante.promedio}</td>
        <td class="${estudiante.estado.toLowerCase()}">${estudiante.estado}</td>
        <td>
          <button class="btn-editar" onclick="cargarEditar(${index})">Editar</button>
          <button class="btn-eliminar" onclick="eliminarEstudiante(${index})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    }
  });

  const promedioGeneral = conteoValidos > 0 ? (sumaPromedios / conteoValidos).toFixed(2) : 0;

  document.getElementById('resumen-total').innerText = estudiantes.length;
  document.getElementById('resumen-aprobados').innerText = totalAprobados;
  document.getElementById('resumen-reprobados').innerText = totalReprobados;
  document.getElementById('resumen-promedio').innerText = promedioGeneral;
}

function cargarEditar(index) {
  const estudiante = estudiantes[index];

  document.getElementById('cuenta').value = estudiante.cuenta;
  document.getElementById('nombre').value = estudiante.nombre;
  document.getElementById('asignatura').value = estudiante.asignatura;
  document.getElementById('nota1').value = estudiante.nota1;
  document.getElementById('nota2').value = estudiante.nota2;
  document.getElementById('nota3').value = estudiante.nota3;
  document.getElementById('index-editar').value = index;

  document.getElementById('btn-guardar').innerText = "Actualizar Registro";
  document.getElementById('btn-cancelar').style.display = "inline-block";
}

function eliminarEstudiante(index) {
  if (confirm("¿Seguro que quiere eliminar este registro?")) {
    estudiantes.splice(index, 1);
    limpiarFormulario();
    actualizarTabla();
  }
}

function limpiarFormulario() {
  document.getElementById('cuenta').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('asignatura').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';
  document.getElementById('index-editar').value = '';

  document.getElementById('btn-guardar').innerText = "Agregar Registro";
  document.getElementById('btn-cancelar').style.display = "none";
}