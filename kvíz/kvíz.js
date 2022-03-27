//ezt a scriptet nem teljesen én írtam
(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} pont a ${myQuestions.length} ból`;

      //komment a pontszámodon
      if(numCorrect == 0){
      komment.innerHTML = 'Kicsit jobban odafigyelhettél volna!' ;
      }

      if(numCorrect == 1){
        komment.innerHTML = 'Kicsit jobban odafigyelhettél volna!' ;
        }

      if(numCorrect == 2){
          komment.innerHTML = 'Egész jó pontszám!' ;
          }
          
      if(numCorrect == 3){
            komment.innerHTML = 'Egész jó pontszám!' ;
            }

      if(numCorrect == 4){
              komment.innerHTML = 'Nagyon jó pontszám!' ;
              }

      if(numCorrect == 5){
              komment.innerHTML = 'Tökéletes pontszám!' ;
              }


    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // VariablesS
    const komment = document.getElementById('komment')
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Ki érte el a Master Assassin rangot 25 évesen?",
        answers: {
          a: "Ezio",
          b: "Bayek",
          c: "Altair"
        },
        correctAnswer: "c"
      },
      {
        question: "Hány évesen halt meg Altair?",
        answers: {
          a: "92",
          b: "65",
          c: "54"
        },
        correctAnswer: "a"
      },
      {
        question: "Hány darab játék játszható jelenleg?",
        answers: {
          a: "38",
          b: "36",
          c: "42"
        },
        correctAnswer: "b"
      },
      {
        question: "Melyik karakter nem európai származású?",
        answers: {
          a: "Altair",
          b: "Ezio",
          c: "Edward"
        },
        correctAnswer: "a"
      },
      {
        question: "Hol hordják ikonikus fegyverüket az Assassinok?",
        answers: {
          a: "A csuklójukon.",
          b: "A hátukon.",
          c: "A fejükön."
        },
        correctAnswer: "a"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  