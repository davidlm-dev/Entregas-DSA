$(document).ready(function () {
    // Al enviar el formulario, prevenir el comportamiento predeterminado y ejecutar la búsqueda
    $('#githubForm').on('submit', function (e) {
        e.preventDefault(); // Prevenir recarga de la página

        // Limpiar la tabla de repositorios
        $('#repoTableBody').empty();

        // Obtener el nombre de usuario ingresado
        var username = $('#username').val();

        // Mostrar el nombre de usuario de GitHub
        $('#githubUsername').text(username);

        // Si no se proporciona un nombre de usuario, mostrar un mensaje de error
        if (!username) {
            $('#repoTableBody').append('<tr><td colspan="3" class="text-center">No se proporcionó ningún nombre de usuario</td></tr>');
            return;
        }

        // Llamar a la API de GitHub para obtener los repositorios del usuario
        $.ajax({
            url: `https://api.github.com/users/${username}/repos`,
            type: 'GET',
            success: function (repos) {
                // Verificar si el usuario no tiene repositorios
                if (repos.length === 0) {
                    $('#repoTableBody').append('<tr><td colspan="3" class="text-center">No se encontraron repositorios</td></tr>');
                    return;
                }

                // Insertar cada repositorio en la tabla con un enlace al repositorio
                repos.forEach(function (repo) {
                    $('#repoTableBody').append(`
                        <tr>
                            <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
                            <td>${repo.description || 'No hay descripción disponible'}</td>
                            <td>${repo.stargazers_count}</td>
                        </tr>
                    `);
                });
            },
            error: function () {
                // Manejar el error si el usuario de GitHub no se encuentra
                $('#repoTableBody').append('<tr><td colspan="3" class="text-center">Usuario no encontrado</td></tr>');
            }
        });
    });
});