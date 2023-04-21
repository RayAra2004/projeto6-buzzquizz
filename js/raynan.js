axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

let quizz, qtdAcertos = 0, qtdPeguntas = 0, qtdPerguntasRespondidas = 0;
let respostas = [];

function renderizaQuizz(){
    const divTitle = document.querySelector('.title');
    divTitle.innerHTML = `
    <img src="${quizz.image}" alt="">
    <p>${quizz.title}</p>`;

    const divPerguntas = document.querySelector('.perguntas');
    divPerguntas.innerHTML = '';
    qtdPeguntas = Number(quizz.questions.length);
    quizz.questions.forEach(question =>{
        divPerguntas.innerHTML += `
            
            <div class="pergunta">
                <div class="title_pergunta" style="background-color: ${question.color};">
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
                <div class="resposta" onclick="verificarResposta(this)" res=${per.isCorrectAnswer}>
                    <img src="${per.image}" alt="">
                    <p>${per.text}</p>
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
    for(let i = 0; i < quizz.levels.length; i++){
        if(i === quizz.levels.length - 1){
            nivel = quizz.levels[i];
            break
        } else if(quizz.levels[i].minValue >= porcetagemAcertos && porcetagemAcertos < quizz.levels[i + 1].minValue){
            nivel = quizz.levels[i];
            break
        }
    }
    const resultado = divResultado.querySelector('.qtdAcertos');
    resultado.innerHTML = `
        <p class="title_level"> ${porcetagemAcertos}% de acerto:${nivel.title}</p>
    `;
    const mensagem = divResultado.querySelector('.mensagem');
    mensagem.innerHTML = `
        <img src="${nivel.image}" alt="">
        <p>${nivel.text}</p>
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

function capturaQuizz(){
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/3'); //TODO: Alterar, pois está capturando 1 quizz
    promise.then(res =>{
        quizz = res.data;
        renderizaQuizz();
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
    qtdPeguntas = 0;
    qtdPerguntasRespondidas = 0;

    capturaQuizz();

}


capturaQuizz();

