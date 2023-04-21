axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

let quizz;
let respostas = [];

function renderizaQuizz(){
    const divTitle = document.querySelector('.title');
    divTitle.innerHTML = `
    <img src="${quizz.image}" alt="">
    <p>${quizz.title}</p>`;

    const divPerguntas = document.querySelector('.perguntas');
    
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

function verificarResposta(res){
    const divRespostas = res.parentElement.querySelectorAll('.resposta');
    divRespostas.forEach(r =>{
        r.removeAttribute('onclick');
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
            proximaPergunta.scrollIntoView();
        }, 2000);
        
    };
}

function capturaQuizz(){
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/3'); //TODO: Alterar, pois está capturando 1 quizz
    promise.then(res =>{
        quizz = res.data;
        console.log(quizz);
        renderizaQuizz();
    });

    promise.catch(res =>{
        alert(`Não foi possível carregar os quizzes\n${res.message}`);
    })
}

function comparador() { 
	return Math.random() - 0.5; 
}


capturaQuizz();

