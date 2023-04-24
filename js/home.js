axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';
let quizzes;
let quizz = [];



function renderizaQuizz() {
    const divQuizzes = document.querySelector('.quizz-row');
    divQuizzes.innerHTML = "";

    for (let i = 0; i < quizz.length; i++) {
        quizzes = quizz[i];
        //deve haver um onclick na div do quizz direcionando para a Pagina de um Quizz.
        divQuizzes.innerHTML += `
         <div class="quizz" data-test="others-quiz" id="${quizzes.id}" onclick="capturaQuizz(this)"">
    <img src="${quizzes.image}">
    <p> ${quizzes.title} </p> 
    </div> `
}
 

}
 

function obterQuizz() {
    
    const promessa = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');

    promessa.then(res=>{
        quizz = res.data
        renderizaQuizz();
    
    });
    promessa.catch(erro => {
        alert('Erro ao buscar quizzes no servidor, tente novamente mais tarde!');
    });
}

obterQuizz();
