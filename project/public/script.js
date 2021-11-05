let listaFilmes = [];
let pag = 1;
const busca = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1"
// HTML Filmes //
function cardsHTML(movie) {
    return innerHTML = 
    `
    <button onclick="iniciaModal(${listaFilmes.indexOf(movie)})" class="btn-cards">
        <div class="card-filme">
            <img class="logo-filmes" src="${movie.poster_path == null ? `./imagens/imagem_não_encontrada.png`: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}" alt="${movie.original_title}">
            <h3>${movie.title}</h3>
        </div>
    </button>
    `
}

async function getData(pag) {
    const response = await fetch(`/api/${pag}`)
    const data = await response.json()
    listaFilmes = []
    data.results.forEach(movie => {
        listaFilmes.push(movie)
    })

    data.results.forEach((movie) => {
        document.getElementById('container-filmes').innerHTML += cardsHTML(movie)
    })
}

// Copyright automatico //
let ano = new Date().getFullYear();
let data = `© ${ano} Erick Ferreira. All rights reserved.`
document.getElementById('copyright').innerHTML = data

// Renderizar site //
getData()

// voltar para a pagina inicial //
const logo = document.getElementById('logo-area')
logo.addEventListener('click', () => {
    reload()
    getData()
    indicadorpag.innerHTML = `Página: ${pag}/500`
    pagAtual = pag
})

// ferramenta de Busca //
async function pesquisa(busca) {
    const apiPesquisa = await fetch(busca)
    const dataPesquisa = await apiPesquisa.json()
    listaFilmes = []
    console.log(listaFilmes)
    dataPesquisa.results.forEach(movie => {
        listaFilmes.push(movie)
    })

    dataPesquisa.results.forEach((movie) => {
        document.getElementById('container-filmes').innerHTML += cardsHTML(movie)
    })
}

const procurar = document.getElementById('input-procurar')
procurar.addEventListener('keyup', (event) => {
    event.preventDefault()
    const query = procurar.value
    if (event.keyCode === 13 && query == "") {
        alert('Campo de busca vazio')
    }
    else if (event.keyCode === 13 && query != "") {
        reload()
        pesquisa(busca+'&query='+query)
        limpaInput()
    }
})

const btnBuscar = document.getElementById('btn-procurar')
btnBuscar.addEventListener('click', () => {
    const query = procurar.value
    if (query == "") {
        alert('Campo de busca vazio')
    }
    else {
        reload()
        pesquisa(busca+'&query='+query)
        limpaInput()
    }
})

function limpaInput() {
    inputpag.value = ""
    procurar.value = ""
}

// Selecionar página //
let pagAtual = 1

function reload() {
    document.getElementById('container-filmes').innerHTML = ''
}

function erroPagina() {
    return innerHTML = `
    <style>
        #area-filmes #pag-aviso{
            color: white;
            font-size: 4rem;
            text-align: center;
        }
    </style>
    <div id="container-filmes" class="container"><h3 id="pag-aviso">PÁGINA NÃO ENCONTRADA</h3></div>
    `
}

const indicadorpag = document.getElementById('indicador-pagina')
indicadorpag.innerHTML = ` Página: ${pag}/500`
const inputpag = document.getElementById('input-pagina')
const btnPagina = document.getElementById('btn-pagina')
btnPagina.addEventListener('click', () => {
    let pag = inputpag.value
    if (pag == "") {
        pag = 1
        reload()
        getData(pag)
        limpaInput()
        indicadorpag.innerHTML = `Página: ${pag}/500`
        pagAtual = pag
    }
    else if (pag < 1 || pag > 500) {
        limpaInput()
        alert('A página que você procura não existe')
    }
    else {
        reload()
        getData(pag)
        limpaInput()
        indicadorpag.innerHTML = `Página: ${pag}/500`
        pagAtual = pag
    }
})

inputpag.addEventListener('keyup', (event) => {
    let pag = inputpag.value
    if (event.keyCode === 13 && pag >= 1 && pag <=500) {
        event.preventDefault()
        reload()
        getData(pag)
        limpaInput()
        indicadorpag.innerHTML = `Página: ${pag}/500`
        pagAtual = pag
    }
    else if ( event.keyCode === 13 && pag == "") {
        pag = 1
        reload()
        getData(pag)
        limpaInput()
        indicadorpag.innerHTML = `Página: ${pag}/500`
        pagAtual = pag
    } 
    else if (event.keyCode === 13 && (pag < 1 || pag > 500)){
        limpaInput()
        alert('A página que você procura não existe')
    }
})

const avancar = document.getElementById('btn-avancar')
const voltar = document.getElementById('btn-voltar')
voltar.addEventListener('click', () => {
    if (pagAtual > 1) {
        pagAtual -= 1
        reload()
        getData(pagAtual)
        indicadorpag.innerHTML = `Página: ${pagAtual}/500`
    }
    else {
        alert('Não é possível voltar além disso')
    }
})
avancar.addEventListener('click', () => {
    if (pagAtual >= 1 && pagAtual < 500) {
        pagAtual ++
        reload()
        getData(pagAtual)
        indicadorpag.innerHTML = `Página: ${pagAtual}/500`
    }
    else {
        alert('Não é possível ir além disso')
    }
})

// Modal dos Filmes //
function iniciaModal(indexFilme) {
    let filme = listaFilmes[indexFilme]
    const modalHTML = document.getElementById('modal-filme').innerHTML = `
    <div id="modal" class="modal">
        <button id="btn-fechar" class="fechar">X</button>
        <img src="${filme.backdrop_path == null ? `./imagens/imagem_não_encontrada.png`: `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}" alt="poster">
        <h3>${filme.title}</h3>
        <div id="filme-info">
            <p><span>Titulo original:</span> ${filme.original_title}</p>
            <p><span>Lançado em:</span> ${filme.release_date}</p>
            <p><span>Linguagem:</span> ${filme.original_language.toUpperCase()}</p>
            <p><span>Sinopse:</span> ${filme.overview}</p>
            <p><span>Nota:</span> ${filme.vote_average}</p>
        </div>
    </div>
    `
    const modal = document.getElementById('modal-filme');
    modal.classList.add('mostrar');
    modal.addEventListener('click', (e) => {
        if(e.target.id == 'btn-fechar' || e.target.id == 'modal-filme') {
            modal.classList.remove('mostrar');
        }
    })
}