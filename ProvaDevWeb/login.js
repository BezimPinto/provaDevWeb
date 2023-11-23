const correctPasswordHash = "e8d95a51f3af4a3b134bf6bb680a213a"; // Senha: 'senha'

function submitLogin() {
    const passwordInput = document.getElementById('password').value;
    const md5Input = hex_md5(passwordInput);

    if (md5Input === correctPasswordHash) {
        // Autenticação bem-sucedida, armazenar token (pode ser uma variável global, localStorage, sessionStorage, etc.)
        localStorage.setItem('authToken', 'seu_token_aqui');

        // Redirecionar para a página principal
        window.location.href = 'pagina.html';
    } else {
        alert('Senha incorreta. Tente novamente.');
    }
}