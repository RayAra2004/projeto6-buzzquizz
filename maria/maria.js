axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

/*verificar requisitos para criar Quizz / Renderizar questões */

function openBox () {
    
    const openInput = document.querySelector(".input-questions");
    openInput.classList.remove("hidden");

    const hiddenBox = document.querySelector(".questions");
    hiddenBox.classList.add("hidden");
};

function infoQuizz () {

    let count = 0;

    const titleQuizz = document.querySelector('.title-Quizz');
    const imageQuizz = document.querySelector('.image-Quizz').value;
    const questionQuizz = document.querySelector('.question-Quizz');
    const levelQuizz = document.querySelector('.level-Quizz');

    let formatURL = /^https:\/\//i;

    if (titleQuizz.value.length < 20 || titleQuizz.value.length > 65){
        alert('O titulo deve ter no mínimo 20 e no máximo 65 caracteres.')
    } else {
        count++
    };


    if (formatURL.test(imageQuizz)){
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
                <div class="questions">
                    <h1 class="response">Pergunta ${i}</h1>
                    <div onclick="openBox(this)" class="ion-icon">
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                </div>

                <div class="input-questions hidden">
                    <h1 class="response">Pergunta ${i}</h1>
                    <input class="text-question" type="text" placeholder="Texto da pergunta">
                    <input class="color-question" type="text" class="margin-input2" placeholder="Cor de fundo da pergunta">

                    <h1 class="response">Resposta correta</h1>

                    <input class="text-response" type="text" placeholder="Resposta correta">
                    <input class="image-response" type="URL" placeholder="URL da imagem">

                    <h1 class="response">Respostas incorretas</h1>

                    <input class="response-incorrect" type="text" placeholder="Resposta incorreta 1">
                    <input class="image-incorrect1" type="URL" placeholder="URL da imagem 1">

                    <input class="response-incorrect2" type="text" placeholder="Resposta incorreta 2">
                    <input class="image-incorrect2" type="URL" placeholder="URL da imagem 2">

                    <input class="response-incorrect3" type="text" placeholder="Resposta incorreta 3">
                    <input class="image-incorrect3" type="URL" placeholder="URL da imagem 3">
                </div>
        `       
            renderizarQuestions.innerHTML += questions;
        };
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

        
        /*verificar titulo*/
        
        for (let i = 1; i <= questionQuizz.value; i++) {
            const textQuestion = document.querySelector('.text-question');
            if (textQuestion.value.length < 20) {
                alert('Texto da pergunta deve ter no mínimo 20 caracteres!');
            }
            else {
                validateTitle++ 
            };
        };
        

        /*verificar cor*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const colorQuestion = document.querySelector('.color-question'); 
            const regexp = /[G-Z]/gi;
            const validaCor = colorQuestion[i].value.toLowerCase().substring(1, 7);
            const matches_array = validaCor.match(regexp);

            if (colorQuestion[i].value.length !== 7 || colorQuestion[i].value.indexOf('#') !== 0 || matches_array !== null) {
                alert('A cor de fundo da Pergunta deve ser digitada no formato Hexadecimal!');
            } else {
                validateColor++ 
            };  
        };


        /*verificar respostas*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const textResponse = document.querySelector('.text-response').value;
    
            if (textResponse.length === 0) {
                alert('Textos das respostas não pode estar vazio.!');
            }
            else {
                validateResponse++
            };
        };


        /*verificar URL da imagem da resposta correta*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const imageResponse = document.querySelector('.image-response').value;

            if (padraoURL.test(imageResponse)) {
                validateImage++
            }
            else {
                alert('As imagens de resposta correta deve ter formato de URL.');
            };
        };


        /*verificar se há pelo menos 1 resposta incorreta*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const responseIncorrect = document.querySelector('.response-incorrect').value;
            const responseIncorrect2 = document.querySelector('.response-incorrect2').value;
            const responseIncorrect3 = document.querySelector('.response-incorrect3').value;
    
            const imageIncorrect = document.querySelector('.image-incorrect').value;
            const imageIncorrect2 = document.querySelector('.image-incorrect2').value;
            const imageIncorrect3 = document.querySelector('.image-incorrect3').value;

            if ((responseIncorrect === "") && (responseIncorrect2 === "") && (responseIncorrect3 === "")) {
                alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
            }
            else if ((responseIncorrect !== "") && (responseIncorrect2 === "") && (responseIncorrect3 === "")) {
                if (padraoURL.test(imageIncorrect)) {
                    validateResponse1++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else if ((responseIncorrect === "") && (responseIncorrect2 !== "") && (responseIncorrect3 === "")) {
                if (padraoURL.test(imageIncorrect2)) {
                    validateResponse2++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else if ((responseIncorrect === "") && (responseIncorrect2 === "") && (responseIncorrect3 !== "")) {
                if (padraoURL.test(imageIncorrect3)) {
                    validateResponse3++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else if ((responseIncorrect !== "") && (responseIncorrect2 !== "") && (responseIncorrect3 === "")) {
                if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect2)) {
                    validateResponse1++
                    validateResponse2++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else if ((responseIncorrect !== "") && (responseIncorrect2 === "") && (responseIncorrect3 !== "")) {
                if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect3)) {
                    validateResponse1++
                    validateResponse3++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else if ((responseIncorrect === "") && (responseIncorrect2 !== "") && (responseIncorrect3 !== "")) {
                if (padraoURL.test(imageIncorrect2) && padraoURL.test(imageIncorrect3)) {
                    validateResponse2++
                    validateResponse3++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                }
            }
            else {
                if (padraoURL.test(imageIncorrect) && padraoURL.test(imageIncorrect2) && padraoURL.test(imageIncorrect3)) {
                    validateResponse1++
                    validateResponse2++
                    validateResponse3++
                }
                else {
                    alert('Deve haver pelo menos 1 resposta incorreta e a imagem deve ter formato de URL.');
                };
            };
        };
       
        
        if ((validateTitle === number) && (validateColor % number === 0)
        && (validateResponse === number) && (validateImage === number)
        && ((validateResponse1 === number) || (validateResponse2 === number)
            || (validateResponse3 === number))) {
        const elementValidate = document.querySelector(".container-questions");

        elementValidate.classList.add("hidden");

        renderizarLevel();
    };
};


    /*Renderizar níveis*/

    function renderizarLevel() {
        
    }