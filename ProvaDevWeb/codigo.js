const url = "https://botafogo-atletas.mange.li";

//const numero_jogador = 54;

document.getElementById('show-all').addEventListener('click', function() {
    showAllAthletes();
});
document.getElementById('show-male').addEventListener('click', function() {
    showMaleAthletes();
});
document.getElementById('show-female').addEventListener('click', function() {
    showFemaleAthletes();
});


const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';


const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const button = document.createElement('button'); // Botão para mostrar descrição

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;

    container.style.width = '15em';
    container.style.backgroundColor = 'gray';
    container.style.textAlign = 'center';
    container.style.margin = 'auto';

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    button.innerText = 'Mostrar Descrição';
    button.onclick = () => showDescription(atleta);

    container.appendChild(titulo);
    container.appendChild(imagem);
    container.appendChild(button); // Adiciona o botão

    container.onclick = handleClick;

    document.body.appendChild(container);
};

const showDescription = (atleta) => {
    const urlParams = new URLSearchParams();
    urlParams.set('id', atleta.id);

    window.location.href = `detalhes.html?${urlParams.toString()}`;
};



const showAllAthletes = async () => {
    const entrada = await pegar_coisas(`${url}/all`);
    clearAthletes(); // Limpa os atletas existentes
    for (atleta of entrada) {
        preenche(atleta);
    }
};

const showMaleAthletes = async () => {
    const entrada = await pegar_coisas(`${url}/masculino`);
    clearAthletes();
    for (atleta of entrada) {
        preenche(atleta);
    }
};

const showFemaleAthletes = async () => {
    const entrada = await pegar_coisas(`${url}/feminino`);
    clearAthletes();
    for (atleta of entrada) {
        preenche(atleta);
    }
};

const showDetails = async (atletaId) => {
    try {
        const atleta = await pegar_coisas(`${url}/${atletaId}`);
        // Substitua esta linha pela lógica para exibir os detalhes na página
        console.log(atleta);
    } catch (error) {
        alert('Erro ao obter detalhes do atleta. Por favor, tente novamente mais tarde.');
    }
        document.cookie = `id=${artigo.dataset.id}`;
        document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
        document.cookie = `nascimento=${artigo.dataset.nascimento}`;
        document.cookie = `altura=${artigo.dataset.altura}`;

};




const clearAthletes = () => {
    // Limpa os atletas existentes
    const articles = document.querySelectorAll('article');
    articles.forEach(article => article.remove());
}

const handleClick = async (e) => {
    const artigo = e.target.closest('article');
    const atletaId = artigo.dataset.id;

    const isAuthorized = await checkAuthorization();

    if (isAuthorized) {
        // Remova essas linhas daqui e mova para o final da função showDetails
        // document.cookie = `id=${artigo.dataset.id}`;
        // document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
        // document.cookie = `nascimento=${artigo.dataset.nascimento}`;
        // document.cookie = `altura=${artigo.dataset.altura}`;

        // localStorage
        localStorage.setItem('id', artigo.dataset.id);
        localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
        localStorage.setItem('nascimento', artigo.dataset.nascimento);
        localStorage.setItem('altura', artigo.dataset.altura);
        localStorage.setItem('dados-original', artigo.dataset);
        localStorage.setItem('dados', JSON.stringify(artigo.dataset));

        // sessionStorage
        sessionStorage.setItem('id', artigo.dataset.id);
        sessionStorage.setItem('nome_completo', artigo.dataset.nome_completo);
        sessionStorage.setItem('nascimento', artigo.dataset.nascimento);
        sessionStorage.setItem('altura', artigo.dataset.altura);
        sessionStorage.setItem('dados-original', artigo.dataset);
        sessionStorage.setItem('dados', JSON.stringify(artigo.dataset));

        console.log(acha_cookie('nome_completo'));
        console.log(localStorage.getItem('id'));
        console.log(JSON.parse(localStorage.getItem('dados')).altura);

        // Movidas da função handleClick
        window.location = `outra.html?id=${atleta.dataset.id}&nome_completo=${atleta.dataset.nome_completo}`;
    }
};


const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
}


const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}



const comparePasswords = (inputPassword, storedHash) => {
    const md5Input = md5(inputPassword);
    return md5Input === storedHash;
};

const checkAuthentication = () => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
        console.log('Usuário autenticado.');
        return true;
    } else {
        console.log('Usuário não autenticado.');
        // Redirecionar de volta para a página de login se não estiver autenticado
        window.location.href = 'index.html';
        return false;
    }
};

let isAuthorizationChecked = false;

const authorizeUser = async () => {
    // Verifica se já foi autorizado antes de pedir a senha novamente
    if (isAuthorizationChecked) {
        console.log('Usuário já autorizado.');
        return;
    }

    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
        isAuthorizationChecked = true;
    }
};

document.getElementById('show-all').addEventListener('click', async function() {
    await authorizeUser();
    showAllAthletes();
});
document.getElementById('show-male').addEventListener('click', async function() {
    await authorizeUser();
    showMaleAthletes();
});
document.getElementById('show-female').addEventListener('click', async function() {
    await authorizeUser();
    showFemaleAthletes();
});

// Executar a autorização assim que a página carregar
authorizeUser();


console.log('assíncrono');


document.getElementById('logout').addEventListener('click', function() {
    // Remova o token de autenticação
    localStorage.removeItem('authToken');
    
    // Redirecione para a página de login
    window.location.href = 'index.html';
});
