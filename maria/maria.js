axios.defaults.headers.common['Authorization'] = 'q2ieOg8Y10hTP78k4DXPL5S4';

/*verificar requisitos para criar Quizz / Renderizar questões */

let questionQuizz = document.querySelector('.question-Quizz');

function openBox (key) {
    const closeBox = key.parentElement;
    closeBox.classList.add("hidden");

    const lookBox = key.parentElement.nextElementSibling;
    lookBox.classList.remove("hidden");
};

function infoQuizz () {

    let count = 0;

    const titleQuizz = document.querySelector('.title-Quizz');
    const imageQuizz = document.querySelector('.image-Quizz').value;
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

    const primeiraPergunta = document.querySelector('.questions');
    primeiraPergunta.classList.add('hidden');

    const segundaPergunta = document.querySelector('.input-questions');
    segundaPergunta.classList.remove('hidden');
};


/*verificar requisitos para criar Quizz*/

let buzzQuizz = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
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

        for (let i = 0; i < questionQuizz.value; i++) {
            (buzzQuizz.questions).push({
                title: "Título da pergunta 1",
                color: "#123456",
                answers: []
            });
        };
        
        for (let i = 1; i <= questionQuizz.value; i++) {
            const textQuestion = document.querySelector('.text-question');
            if (textQuestion.value.length < 20) {
                alert('Texto da pergunta deve ter no mínimo 20 caracteres!');
            }
            else {
                buzzQuizz.questions[i - 1].title = textQuestion.value;
                validateTitle++ 
            };
        };
        

        /*verificar cor de fundo da pergunta*/ 

        for (let i = 1; i <= questionQuizz.value; i++) {
            const colorQuestion = document.querySelector('.color-question');
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


        /*verificar respostas*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const textResponse = document.querySelector('.text-response').value;
    
            if (textResponse.length === 0) {
                alert('Textos das respostas não pode estar vazio!');
            }
            else {
                (buzzQuizz.questions[i - 1].answers).push({
                    text: elemento3,
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                });
                validateResponse++
            };
        };


        /*verificar URL da imagem da resposta correta*/

        for (let i = 1; i <= questionQuizz.value; i++) {
            const imageResponse = document.querySelector('.image-response').value;

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
                    (buzzQuizz.questions[i - 1].answers).push({
                        text: incorreta1,
                        image: incorretaImagem1,
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
                        text: incorreta2,
                        image: incorretaImagem2,
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
                        text: incorreta3,
                        image: incorretaImagem3,
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
                        text: incorreta1,
                        image: incorretaImagem1,
                        isCorrectAnswer: false
                    }, {
                        text: incorreta2,
                        image: incorretaImagem2,
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
                        text: incorreta1,
                        image: incorretaImagem1,
                        isCorrectAnswer: false
                    }, {
                        text: incorreta3,
                        image: incorretaImagem3,
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
                        text: incorreta2,
                        image: incorretaImagem2,
                        isCorrectAnswer: false
                    }, {
                        text: incorreta3,
                        image: incorretaImagem3,
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
                        text: incorreta1,
                        image: incorretaImagem1,
                        isCorrectAnswer: false
                    }, {
                        text: incorreta2,
                        image: incorretaImagem2,
                        isCorrectAnswer: false
                    }, {
                        text: incorreta3,
                        image: incorretaImagem3,
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
        const level = document.querySelector(".container-level");
        level.classList.remove("hidden");

        const divLevel = document.querySelector(".container-level .containerConteudo main");
    }