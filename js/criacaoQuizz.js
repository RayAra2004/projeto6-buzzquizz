axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

let questionQuizz = document.querySelector('.question-Quizz');
const levelQuizz = document.querySelector('.level-Quizz');

let titleQuizz = "", imageQuizz = "";

/*QUIZZ MODELO*/

let buzzQuizz = {
title: "titleQuizz",
image: "imageQuizz",
questions: [
    {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
            {
                text: "Texto da resposta 1",
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Texto da resposta 2",
                image: "https://http.cat/412.jpg",
                isCorrectAnswer: false
            }
        ]
    },
    {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
            {
                text: "Texto da resposta 1",
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Texto da resposta 2",
                image: "https://http.cat/412.jpg",
                isCorrectAnswer: false
            }
        ]
    },
    {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
            {
                text: "Texto da resposta 1",
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Texto da resposta 2",
                image: "https://http.cat/412.jpg",
                isCorrectAnswer: false
            }
        ]
    }
],
levels: [
    {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
    },
    {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
    }
]
}

function openBox (key) {
    const closeBox = key.parentElement;
    closeBox.classList.add("hidden");

    const lookBox = key.parentElement.nextElementSibling;
    lookBox.classList.remove("hidden");
};


/*verificar requisitos para criar Quizz / Renderizar questões */

function infoQuizz () {

    let count = 0;

    titleQuizz = document.querySelector('.title-Quizz').value;
    imageQuizz = document.querySelector('.image-Quizz').value;

    let formatURL = /^https:\/\//i;


    if (titleQuizz.length < 20 || titleQuizz.length > 65){
        alert('O titulo deve ter no mínimo 20 e no máximo 65 caracteres.')
    } else {
        buzzQuizz.title = titleQuizz;
        count++
    };


    if (formatURL.test(imageQuizz)){
        buzzQuizz.image = imageQuizz;
        count++
    } else {
        alert('A imagem deve ter formato de URL.')
    };


    if (questionQuizz.value < 3){
        alert('Deve ter no mínimo 3 perguntas.')
    } else {
        count++
    };


    if (levelQuizz.value < 2){
        alert('Deve ter no mínimo 2 níveis.')
    } else {
        count++
    };


    if (count === 4){
        const containerQuizz = document.querySelector(".container");
        containerQuizz.classList.add("hidden");
        const containerQuestion = document.querySelector(".container-questions");
        containerQuestion.classList.remove("hidden");


        const renderizarQuestions = document.querySelector('.container-questions main');
        renderizarQuestions.innerHTML = "";

        for (let i = 1; i <= questionQuizz.value; i++){
            const questions = `
                <div data-test="question-ctn">
                    <div class="questions">
                        <h1 class="response">Pergunta ${i}</h1>
                        <div  data-test="toggle" onclick="openBox(this)" class="ion-icon">
                            <ion-icon name="create-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="input-questions per${i} hidden">
                        <h1 class="response">Pergunta ${i}</h1>
                        <input data-test="question-input" class="text-question" type="text" placeholder="Texto da pergunta">
                        <input data-test="question-color-input" class="color-question" type="text" class="margin-input2" placeholder="Cor de fundo da pergunta">
                        <h1 class="response">Resposta correta</h1>
                        <input data-test="correct-answer-input" class="text-response" type="text" placeholder="Resposta correta">
                        <input data-test="correct-img-input" class="image-response" type="URL" placeholder="URL da imagem">
                        <h1 class="response">Respostas incorretas</h1>
                        <input data-test="wrong-answer-input" class="response-incorrect" type="text" placeholder="Resposta incorreta 1">
                        <input data-test="wrong-img-input" class="image-incorrect1" type="URL" placeholder="URL da imagem 1">
                        <input data-test="wrong-answer-input" class="response-incorrect2" type="text" placeholder="Resposta incorreta 2">
                        <input data-test="wrong-img-input" class="image-incorrect2" type="URL" placeholder="URL da imagem 2">
                        <input data-test="wrong-answer-input" class="response-incorrect3" type="text" placeholder="Resposta incorreta 3">
                        <input data-test="wrong-img-input" class="image-incorrect3" type="URL" placeholder="URL da imagem 3">
                    </div>
                </div>
        `       
            renderizarQuestions.innerHTML += questions;
        };
    };

    const hiddenClass = document.querySelector('.questions');
    if(hiddenClass !== null){
        hiddenClass.classList.add('hidden');
    };

    const lookClass = document.querySelector('.input-questions');
    if(lookClass !== null){
        lookClass.classList.remove('hidden');
    };
};


/*verificar requisitos para criar Quizz*/


function questionsQuizz (){

    const number = Number(questionQuizz.value);
    let padraoURL = /^https:\/\//i;
    let validateTitle = 0;
    let validateColor = 0;
    let validateResponse = 0;
    let validateImage = 0;
    let validateResponse1 = 0;
    let validateResponse2 = 0;
    let validateResponse3 = 0;

    buzzQuizz.questions = [];


    /*verificar titulo*/
    //criando as questões no quizz zeradas
    for (let i = 0; i < questionQuizz.value; i++) {
        (buzzQuizz.questions).push({
            title: "",
            color: "",
            answers: []
        });
    };
    
    //Preenchimento do título da pergunta
    for (let i = 1; i <= questionQuizz.value; i++) {
        const pergunta = document.querySelector(`.per${i}`);
        const textQuestion = pergunta.querySelector('.text-question');
        if (textQuestion.value.length < 20) {
            alert('Texto da pergunta deve ter no mínimo 20 caracteres!');
        }
        else {
            buzzQuizz.questions[i - 1].title = textQuestion.value;
            validateTitle++ 
        };
    };
    

    /*verificar cor de fundo da pergunta*/ 
    //Preencimento da cor da pergunta
    for (let i = 1; i <= questionQuizz.value; i++) {
        const pergunta = document.querySelector(`.per${i}`);
        const colorQuestion = pergunta.querySelector('.color-question').value;
        if (colorQuestion[0] !== "#") {
            alert('A cor de fundo da Pergunta deve ser digitada no formato Hexadecimal!');
        }

        if (colorQuestion[0] === "#") {
            if (colorQuestion.length !== 7) {
                alert('A cor de fundo da Pergunta deve ser digitada no formato Hexadecimal!');
            }
        }

        if (colorQuestion[0] === "#" && colorQuestion.length === 7) {

            for (let j = 1; j <= (colorQuestion.length - 1); j++) {
                if ((colorQuestion[j] === "A") || (colorQuestion[j] === "a") ||
                    (colorQuestion[j] === "B") || (colorQuestion[j] === "b") ||
                    (colorQuestion[j] === "C") || (colorQuestion[j] === "c") ||
                    (colorQuestion[j] === "D") || (colorQuestion[j] === "d") ||
                    (colorQuestion[j] === "E") || (colorQuestion[j] === "e") ||
                    (colorQuestion[j] === "F") || (colorQuestion[j] === "f") ||
                    (colorQuestion[j] === "0") || (colorQuestion[j] === "1") ||
                    (colorQuestion[j] === "2") || (colorQuestion[j] === "3") ||
                    (colorQuestion[j] === "4") || (colorQuestion[j] === "5") ||
                    (colorQuestion[j] === "6") || (colorQuestion[j] === "7") ||
                    (colorQuestion[j] === "8") || (colorQuestion[j] === "9")) {

                    validateColor++
                }
                else {
                    alert('A cor de fundo da Pergunta deve ser digitada no formato Hexadecimal!');
                    validateColor = 0;
                    break;
                }
            }
            buzzQuizz.questions[i - 1].color = colorQuestion;
        };
    };


    /*verificar respostas
    
    esse trecho iria pro final dessa função
    
    
    */

    for (let i = 1; i <= questionQuizz.value; i++) {
        const pergunta = document.querySelector(`.per${i}`);
        const textResponse = pergunta.querySelector('.text-response').value;


        if (textResponse.length === 0) {
            alert('Textos das respostas não pode estar vazio!');
        }
        else {
            (buzzQuizz.questions[i - 1].answers).push({
                text: textResponse,
                image: "",
                isCorrectAnswer: true
            });
            validateResponse++
        };
    };


    /*termina aqui*/ 












    /*verificar URL da imagem da resposta correta*/

    for (let i = 1; i <= questionQuizz.value; i++) {
        const pergunta = document.querySelector(`.per${i}`);
        const imageResponse = pergunta.querySelector('.image-response').value;

        if (padraoURL.test(imageResponse)) {
            buzzQuizz.questions[i - 1].answers[0].image = imageResponse;
            validateImage++
        }
        else {
            alert('As imagens das respostas corretas devem ter formato de URL!');
        };
    };


    /*verificar se há pelo menos 1 resposta incorreta*/

    for (let i = 1; i <= questionQuizz.value; i++) {
        const pergunta = document.querySelector(`.per${i}`);
        const responseIncorrect = pergunta.querySelector('.response-incorrect').value;
        const responseIncorrect2 = pergunta.querySelector('.response-incorrect2').value;
        const responseIncorrect3 = pergunta.querySelector('.response-incorrect3').value;

        const imageIncorrect = pergunta.querySelector('.image-incorrect1').value;
        const imageIncorrect2 = pergunta.querySelector('.image-incorrect2').value;
        const imageIncorrect3 = pergunta.querySelector('.image-incorrect3').value;

        if ((responseIncorrect === "") && (responseIncorrect2 === "") && (responseIncorrect3 === "")) {
            alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
        }
        else if ((responseIncorrect !== "") && (responseIncorrect2 === "") && (responseIncorrect3 === "")) {
            if (padraoURL.test(imageIncorrect)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect,
                    image: imageIncorrect,
                    isCorrectAnswer: false
                });
                validateResponse1++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else if ((responseIncorrect === "") && (responseIncorrect2 !== "") && (responseIncorrect3 === "")) {
            if (padraoURL.test(imageIncorrect2)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect2,
                    image: imageIncorrect2,
                    isCorrectAnswer: false
                });
                validateResponse2++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else if ((responseIncorrect === "") && (responseIncorrect2 === "") && (responseIncorrect3 !== "")) {
            if (padraoURL.test(imageIncorrect3)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect3,
                    image: imageIncorrect3,
                    isCorrectAnswer: false
                });
                validateResponse3++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else if ((responseIncorrect !== "") && (responseIncorrect2 !== "") && (responseIncorrect3 === "")) {
            if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect2)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect,
                    image: imageIncorrect,
                    isCorrectAnswer: false
                }, {
                    text: responseIncorrect2,
                    image: imageIncorrect2,
                    isCorrectAnswer: false
                });
                validateResponse1++
                validateResponse2++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else if ((responseIncorrect !== "") && (responseIncorrect2 === "") && (responseIncorrect3 !== "")) {
            if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect3)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect,
                    image: imageIncorrect,
                    isCorrectAnswer: false
                }, {
                    text: imageIncorrect3,
                    image: responseIncorrect3,
                    isCorrectAnswer: false
                });
                validateResponse1++
                validateResponse3++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else if ((responseIncorrect === "") && (responseIncorrect2 !== "") && (responseIncorrect3 !== "")) {
            if (padraoURL.test(imageIncorrect2) && padraoURL.test(imageIncorrect3)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect2,
                    image: imageIncorrect2,
                    isCorrectAnswer: false
                }, {
                    text: responseIncorrect3,
                    image: imageIncorrect3,
                    isCorrectAnswer: false
                });
                validateResponse2++
                validateResponse3++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
        }
        else {
            if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect2) && padraoURL.test(imageIncorrect3)) {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: responseIncorrect,
                    image: imageIncorrect,
                    isCorrectAnswer: false
                }, {
                    text: responseIncorrect2,
                    image: imageIncorrect2,
                    isCorrectAnswer: false
                }, {
                    text: responseIncorrect3,
                    image: imageIncorrect3,
                    isCorrectAnswer: false
                });
                validateResponse1++
                validateResponse2++
                validateResponse3++
            }
            else {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            };
        };
    };
    
    
    if ((validateTitle === number) && ((validateColor % number) === 0)
    && (validateResponse === number) && (validateImage === number)
    && ((validateResponse1 === number) || (validateResponse2 === number)
        || (validateResponse3 === number))) {

    const elementValidate = document.querySelector(".container-questions");
    elementValidate.classList.add("hidden");


    /*Renderizar níveis*/

    const levels = document.querySelector(".container-level");
    levels.classList.remove("hidden");


    const divLevel = document.querySelector(".container-level .content-level ul");
    divLevel.innerHTML = "";

    for (let i = 1; i <= levelQuizz.value; i++){

        const levelsQuizz = `
            <div data-test="level-ctn">
                <div class="level">
                    <h1 class="response">Nivel ${i}</h1>
                    <div data-test="toggle" onclick="openBox(this)" class="ion-icon">
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                </div>
                <div class="input-level nivel${i} hidden">
                    <h1 class="response">Nível ${i}</h1>
                    <input data-test="level-input" class="title-level" type="text" placeholder="Título do nível">
                    <input data-test="level-percent-input" class="percent-level" type="number"  placeholder="% de acerto mínima">
                    <input data-test="level-img-input" class="image-level" type="URL" class="margin-input2" placeholder="URL da imagem do nível">
                    <input data-test="level-description-input" class="info-level" type="text" class="margin-input2" placeholder="Descrição do nível">
                </div>
            </div>
        `
            divLevel.innerHTML += levelsQuizz;
        };
    };
            const hiddenDiv = document.querySelector('.level');
            hiddenDiv.classList.add('hidden');

            const lookDiv = document.querySelector('.input-level');
            lookDiv.classList.remove('hidden');
};


/*Verificar requisitos dos níveis*/

function checkLevel () {

    const selectLevel = document.querySelectorAll(".level");
    let validateLevel = 0
    let padraoURL = /^https:\/\//i;
    let zeroPercentual = 0;

    buzzQuizz.levels = [];

    for (let i = 1; i < selectLevel.length + 1; i++) {
        
        let countLevel = 0;
        let nivel = document.querySelector(`.nivel${i}`)
        let titleLevel = nivel.querySelector('.input-level .title-level').value;
        let percentLevel = nivel.querySelector('.input-level .percent-level').value;
        let imageLevel = nivel.querySelector('.input-level .image-level').value;
        let infoLevel = nivel.querySelector('.input-level .info-level').value;

        if (titleLevel.length >= 10) {
            countLevel++;
        }
        else {
            alert('O titulo do nível precisa ter pelo menos 10 caracteres!');
        }
        /*
        if (Number(zeroPercentual) === 0 ) {
            if(Number(percentLevel) === 0){
                
                zeroPercentual = 1;
            } else {
                alert('A porcentagem do nível deve ser 0 em pelo menos 1 caso!');
            }
        }*/

        if (Number(percentLevel) >= 0 && Number(percentLevel) <= 100) {
            countLevel++;
        } else {
            alert('A porcentagem do nível deve ser entre 0 e 100!');
        }


        if (padraoURL.test(imageLevel)) {
            countLevel++;
        }
        else {
            alert('Imagem do nível deve ter formato de URL!');
        }


        if (infoLevel.length >= 30) {
            countLevel++;
        }
        else {
            alert('A descrição do nível precisa ter pelo menos 30 caracteres!');
        }


        if (countLevel >= 4) {
            (buzzQuizz.levels).push({
                title: titleLevel,
                image: imageLevel,
                text: infoLevel,
                minValue: percentLevel,
            })
            validateLevel++;
        }
    } 

    if (validateLevel === selectLevel.length) {
        alert("Tudo pronto para criação do seu BuzzQuizz!");
        const promisePOST = axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", buzzQuizz);
        promisePOST.then(completQuizz);
        promisePOST.catch(errorQuizz);

    }
    else {
        buzzQuizz.levels = []
        alert("OPS! Preencha corretamente os campos para finalizar seu BuzzQuizz");
    };
};

const quizzesUser = [];

function completQuizz (response){
    console.log(response);
    obj = {"id": response.data.id};
    quizzesUser.push(obj);
    const q = JSON.stringify(quizzesUser);
    localStorage.setItem('user', q);

    const sucesso = document.querySelector('.container-success');
    sucesso.classList.remove('hidden');

    const levelDiv = document.querySelector('.container-level');
    levelDiv.classList.add('hidden');

    const imgSucesso = document.querySelector('.imagemSucesso');

    imgSucesso.innerHTML = `
        <img src="${buzzQuizz.image}">
        <p> ${buzzQuizz.title} </p>
    
    `;

    sucesso.innerHTML += `
    <button onclick="capturaQuizzUser(${id = response.data.id})" data-test="go-quiz">Acessar Quizz</button>
    
    <span onclick="voltaHomee()" data-test="go-home">Voltar pra home</span>`;
    

};

function voltaHomee(){
    const sucesso = document.querySelector('.container-success');
    sucesso.classList.add('hidden');

    const home = document.querySelector('.container-home');
    home.classList.remove('escondido');
    
}


function errorQuizz (response){
    console.log('Quizz não adicionado');
};