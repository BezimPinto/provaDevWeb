document.addEventListener('DOMContentLoaded', () => {
    const detalhesContainer = document.getElementById('detalhes-container');
    const imagem = document.createElement('img');
    const nomeCompleto = document.createElement('h2');
   

    const nascimento = document.createElement('p');
    

    const altura = document.createElement('p');
    

    const descricao = document.createElement('p');
    

    detalhesContainer.appendChild(imagem);
    detalhesContainer.appendChild(nomeCompleto);
    detalhesContainer.appendChild(nascimento);
    detalhesContainer.appendChild(altura);
    detalhesContainer.appendChild(descricao);

    const urlParams = new URLSearchParams(window.location.search);

    
    const id = urlParams.get('id')
    const url = "https://botafogo-atletas.mange.li/" + id;
    const pegar_coisas = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }
    const obterDadosPop = async () => {
        const atleta = await pegar_coisas(url);
        imagem.src = atleta.imagem;
        imagem.alt = 'Imagem do Jogador';
        nomeCompleto.innerText = atleta.nome_completo;
        nascimento.innerText = `Nascimento: ${atleta.nascimento}`;
        altura.innerText = `Altura: ${atleta.altura}`;
        descricao.innerText = `Descrição: ${atleta.descricao}`;
    }
    obterDadosPop();
});