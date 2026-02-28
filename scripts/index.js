

$(document).ready(() => {
    $.ajax({
        url: 'http://localhost:3000/users',
        method: 'GET',
        success: (data) => {
            data.forEach(user => {
                $('#users').append(`
                    <li>${user.name} - ${user.email}</li>
                `);
            });
        },
        error: (err) => {
            console.error('Error fetching users:', err);
        }
    })
})