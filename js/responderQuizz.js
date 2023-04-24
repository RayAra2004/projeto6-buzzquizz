axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

let quizzEscolhido, qtdAcertos = 0, qtdPeguntas = 0, qtdPerguntasRespondidas = 0;
let respostas = [];

function renderizarQuizz(){
    const responder_quizz = document.querySelector('.responder_quizz');
    responder_quizz.style.display = "block";
    const container_home = document.querySelector('.container-home');
    container_home.classList.add('escondido');
    const divTitle = document.querySelector('.title');
    divTitle.innerHTML = `
    <img src="${quizzEscolhido.image}" alt="">
    <p>${quizzEscolhido.title}</p>`;

    const divPerguntas = document.querySelector('.perguntas');
    divPerguntas.innerHTML = '';
    qtdPeguntas = Number(quizzEscolhido.questions.length);
    quizzEscolhido.questions.forEach(question =>{
        divPerguntas.innerHTML += `
            
            <div class="pergunta" data-test="question">
                <div class="title_pergunta" data-test="question-title" style="background-color: ${question.color};">
                    <p>${question.title}</p>
                </div>
                <div class="respostas">
                    
                </div>
            </div>
            
        `;
        respostas = question.answers;
        respostas.sort(comparador);
        respostas.forEach(per => {
            let ultimaPergunta = document.querySelector('.perguntas .pergunta:last-child');
            let divRespostas = ultimaPergunta.querySelector('.respostas');
            divRespostas.innerHTML += `
                <div class="resposta" data-test="answer" onclick="verificarResposta(this)" res=${per.isCorrectAnswer}>
                    <img src="${per.image}" alt="">
                    <p data-test="answer-text">${per.text}</p>
                </div>
            `;
        })
        
    });
    

}

function exibiResultado(){
    const porcetagemAcertos = Math.ceil(qtdAcertos / qtdPeguntas * 100);
    const divResultado = document.querySelector('.resultadoQuizz');
    setTimeout(function(){
        divResultado.style.display = 'flex';
        divResultado.scrollIntoView();
    }, 2000);
    let nivel;
    for(let i = 0; i < quizzEscolhido.levels.length; i++){
        if(i === quizzEscolhido.levels.length - 1){
            nivel = quizzEscolhido.levels[i];
            break
        } else if(quizzEscolhido.levels[i].minValue >= porcetagemAcertos && porcetagemAcertos < quizzEscolhido.levels[i + 1].minValue){
            nivel = quizzEscolhido.levels[i];
            break
        }
    }
    const resultado = divResultado.querySelector('.qtdAcertos');
    resultado.innerHTML = `
        <p class="title_level" data-test="level-title"> ${porcetagemAcertos}% de acerto:${nivel.title}</p>
    `;
    const mensagem = divResultado.querySelector('.mensagem');
    mensagem.innerHTML = `
        <img src="${nivel.image}" alt="" data-test="level-img">
        <p data-test="level-text">${nivel.text}</p>
    `
}

function verificarResposta(res){
    if(!(res.classList.contains('respondido'))){
        const divRespostas = res.parentElement.querySelectorAll('.resposta');
        
        qtdPerguntasRespondidas++;
        if(res.getAttribute('res') === 'true'){
            qtdAcertos++;
        }
        divRespostas.forEach(r =>{
            r.classList.add('respondido');
            if(r.innerHTML !== res.innerHTML){
                r.classList.add('esbranquicado');          
            }
            let p = r.querySelector('p');
            if(r.getAttribute('res') === 'false'){
                p.classList.add('respostaErrada');
            } else{
                p.classList.add('respostaCorreta');
            }
        });
        const proximaPergunta = res.parentElement.parentElement.nextElementSibling;
        if(proximaPergunta !== null){
            setTimeout(function(){
                proximaPergunta.scrollIntoView({behavior:"smooth"});
            }, 2000);     
        }
        if(qtdPeguntas === qtdPerguntasRespondidas){
            exibiResultado();
            console.log('olaaaaaa')
        };
    }
}

function capturaQuizz(divQuizz){
    
        const id = divQuizz.getAttribute('id');
    
    const promise = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`); //TODO: Alterar, pois está capturando 1 quizzEscolhido
    promise.then(res =>{
        quizzEscolhido = res.data;
        renderizarQuizz();
    });

    promise.catch(res =>{
        alert(`Não foi possível carregar os quizzes\n${res.message}`);
    })
}

function capturaQuizzUser(id){
    const promise = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`); //TODO: Alterar, pois está capturando 1 quizzEscolhido
    promise.then(res =>{
        quizzEscolhido = res.data;
        renderizarQuizz();
    });

    promise.catch(res =>{
        alert(`Não foi possível carregar os quizzes\n${res.message}`);
    })
}

function comparador() { 
	return Math.random() - 0.5; 
}

function reiniciaQuizz(){
    const divTitle = document.querySelector('.title');
    divTitle.scrollIntoView();

    const divResultado = document.querySelector('.resultadoQuizz');
    divResultado.style.display = 'none';
    
    document.querySelectorAll('.esbranquicado').forEach( e => e.classList.remove('esbranquicado') );
    document.querySelectorAll('.respostaErrada').forEach( e => e.classList.remove('respostaErrada') );
    document.querySelectorAll('.respostaCorreta').forEach( e => e.classList.remove('respostaCorreta') );
    document.querySelectorAll('.respondido').forEach( e => e.classList.remove('respondido') );
    
    qtdAcertos = 0;
    qtdPerguntasRespondidas = 0;

    //capturaQuizz();

}

function voltarHome(){
    const responder_quizz = document.querySelector('.responder_quizz');
    responder_quizz.style.display = "none";
    const container_home = document.querySelector('.container-home');
    container_home.classList.remove('escondido');
}
