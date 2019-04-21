
/*
    This file has functions to
    access Wep API with XMLHttpRequest and to save its result into an object.
    The object has question, correct answer, set of answers, and multiple_choice/boolean type.
    Functions also hold counts at user response and respond to requests.
*/

        var url = "https://opentdb.com/api.php?amount=1"; //for loading next question, need a global var.
        var category = "any"; //for loading next question, need a global var.
        var categoryNum = 0; //for loading next question, need a global var.

        //Start the program:
        document.getElementsByClassName("showCategoryPreference")[0].style.visibility = "visible";



        //have the XMLHttpRequest object for API question:
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState==4) {
                if (xhr.status == 200) {
                    res = xhr.response;
                    console.log(mainPartStarted);
                    //mainPartStarted = false;
                    if (mainPartStarted) {
                        doQuestionInteraction (res);
                    }
                }
            }
        }
        

        //read which category is selected and load to XMLHttpRequest object:
        var mainPartStarted = false;
        startMainPart = function () {
            document.getElementsByClassName("mainPart")[0].style.display="inline";
            mainPartStarted = true;
            document.getElementById("start").style.display="inline";
          
            switch (category) {
                case "any":
                    categoryNum=0;
                    break;
                case "General Knowledge":
                    categoryNum=9;
                    break;
                case "Entertainment: Books":
                    categoryNum=10;
                    break;    
                case "Entertainment: Film":
                    categoryNum=11;
                    break;   
                case "Entertainment: Music":
                    categoryNum=12;
                    break;   
                case "Entertainment: Video Games":
                    categoryNum=15;
                    break;   
                case "Entertainment: Board Games":
                    categoryNum=16;
                    break;   
                case "Science & Nature":
                    categoryNum=17;
                    break;   
                case "Science: Computers":
                    categoryNum=18;
                    break;   
                case "Science: Mathematics":
                    categoryNum=19;
                    break;   
                case "Mythology":
                    categoryNum=20;
                    break;   
                case "Sports":
                    categoryNum=21;
                    break;   
                case "Geography":
                    categoryNum=22;
                    break;   
                case "History":
                    categoryNum=23;
                    break;   
                case "Politics":
                    categoryNum=24;
                    break;                                       
            }

            if (categoryNum == 0) {
                //var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&type=boolean";
                var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&type=multiple";
                //var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions;
            } else {
                //var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&category=" + categoryNum;
                var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&category=" + categoryNum + "&type=multiple";
            }
            console.log("url: " + url);
            //var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions;
            xhr.open ("GET", url);
            xhr.responseType = "json";
            xhr.send();
        }



        //have function to get two DIV classes and to remove first and show the second:
        fadeOutDivClass_fadeInDivClass= function (removeDiv,showDiv) {
            document.getElementsByClassName(removeDiv)[0].style.visibility = "hidden";
            document.getElementsByClassName(showDiv)[0].style.visibility = "visible";
        }
        


        //have function to get two DIV IDs and to remove first and show the second:
        fadeOutDivId_fadeInDivId= function (removeDiv,showDiv) {
            document.getElementById(removeDiv).style.display = "none";
            document.getElementById(showDiv).style.display = "inline";
        }





        //set a number of questions for the functions:
        var numberOfQuestions = 1;
        setNumOfQuestions = function (getNumberOfQuestions) {
            numberOfQuestions = getNumberOfQuestions;
            document.getElementById("userNumQuestions").innerHTML = numberOfQuestions + " questions";
        }



        //count user at question:
        var userAtQuestion = 0
        setUserAtQuestionDiv = function (userAtQuestion) {
            document.getElementById("userAtQuestion").innerHTML = "question " + userAtQuestion;
        }



        //see which question the user is at and also present question:
        doQuestionInteraction = function (res) {
            console.log("- received res: " + res);
            userAtQuestion += 1; setUserAtQuestionDiv(userAtQuestion);
            presentQuestionInteraction(res.results[0].question, 
                                        res.results[0].type,
                                        res.results[0].correct_answer,
                                        res.results[0].incorrect_answers)
        }



        //have a random number -- used for placing answer at DIV
        randomPlace = function (howManyPlaces) {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            return Math.ceil( Math.random() * Math.floor(howManyPlaces));
        }



        //Function to show questions.
        //Both multiple and boolean work but multiple choice question has correct DIV placements:
        var rightAnswer = ""; //global so as to be updated in function below, then used in userAnswered function
        presentQuestionInteraction = function ( question, 
                                                type,
                                                correct_answer,
                                                incorrect_answers) {
            console.log ("- " + question, type, ">> " + correct_answer + " <<", incorrect_answers);
            document.getElementById("question").innerHTML = question;
            rightAnswer = correct_answer; //keep right answer for user click at 'show right answer'

            /*if (type == "boolean") {
                    //document.getElementsByClassName("multipleChoice_answerPanel")[0].style.visibility="none";
                    document.getElementsByClassName("multipleChoice_answerPanel")[0].style.display="none";
                    document.getElementsByClassName("boolean_answerPanel")[0].style.visibility="visible";

                    place1of2 = randomPlace(2);
                    fillPlace = place1of2;
                    answerPlaceHolder = "boolean_answerPlaceHolder" + String(fillPlace);
                    document.getElementById(answerPlaceHolder).innerHTML = correct_answer;
                    //also mark this element for right answer:
                    correctAnswerPlaceHolder = answerPlaceHolder;

                    (place1of2 == 1 ? fillPlace = 2 : fillPlace = 1);                  
                    answerPlaceHolder = "boolean_answerPlaceHolder" + String(fillPlace);
                    document.getElementById(answerPlaceHolder).innerHTML = incorrect_answers[0];
            } else if (type == "multiple")  { */
            if (type == "multiple")  {
                //console.log("- multiple choice answers")
                // not need to be 4,
                // if //oneAsnwer correct, placesAvaiable set to how many needed, and num of divs for them available
                    //document.getElementsByClassName("boolean_answerPanel")[0].style.visibility="none";
                    //document.getElementsByClassName("boolean_answerPanel")[0].style.display="none";
                    document.getElementsByClassName("multipleChoice_answerPanel")[0].style.visibility="visible";

                    var placesAvailable = ["empty","empty","empty", "empty"];
                    var countFilled = 0;
                    var correctAnswerPlaced = false;
                    var countIncorrectAnswersPlaced = 0;

                    while (countFilled != placesAvailable.length) {
                        setRandomPlace = randomPlace(placesAvailable.length);
                        // can do an assert so that placesAvailable is not empty array
                        console.log("- setRandomPlace: " + setRandomPlace);
                        
                        if (placesAvailable[setRandomPlace-1] == "empty") {

                            placesAvailable[setRandomPlace-1] = "filled";
                            answerPlaceHolder = "multiple_answerPlaceHolder" + String(setRandomPlace);

                            if (!correctAnswerPlaced) {
                                document.getElementById(answerPlaceHolder).innerHTML = correct_answer;
                                correctAnswerPlaced = true;
                                correctAnswerPlaceHolder = answerPlaceHolder;
                                //alert(answerPlaceHolder);

                            } else {
                                document.getElementById(answerPlaceHolder).innerHTML = incorrect_answers[countIncorrectAnswersPlaced];                                
                                countIncorrectAnswersPlaced += 1;
                            }
                            
                            countFilled += 1;
                        }
                    }
            }
        }



        //highlight right answer on button click
        showRightAnswer = function() {
            document.getElementById(correctAnswerPlaceHolder).style.backgroundColor="green";
        }



        //keep stats of --user answered-- and reply if program finished
        howManyQuestionsAnswered = 0;
        howManyQuestionsAnsweredRight = 0;
        userAnswered = function( userAnswer ) {
            //reset color of previous right answer, if it was clicked
            document.getElementById(correctAnswerPlaceHolder).style.backgroundColor="bisque";
            console.log ("- right answer: " + rightAnswer);
            console.log ("- user said: " + userAnswer);
            howManyQuestionsAnswered += 1;

            if ( userAnswer == rightAnswer ) {
                document.getElementById("resultCheck").innerHTML="correct!";
                howManyQuestionsAnsweredRight += 1;
            }
            else {
                document.getElementById("resultCheck").innerHTML="incorrect!";
            }
            
            if ( howManyQuestionsAnswered == numberOfQuestions ) {
                sayFinish();
                showResults();
                showButtonForRestart();
                showButtonForAbout();
            }
            else {
                loadTheNextQuestion();
            }
        }



        //function to load next question:
        loadTheNextQuestion = function() {
            console.log("- load next question");
            startMainPart();
        }



        //present finish message:
        sayFinish = function() {
            document.getElementById("userAtQuestion").style.display = "none";
            document.getElementById("finish").innerHTML = "Great job!";
            fadeOutDivId_fadeInDivId("start","finish");
        }



        //show a general DIV for result:
        showResults = function() {
            document.getElementsByClassName("mainPart")[0].style.display = "none";
            document.getElementsByClassName("results")[0].style.display = "inline";
            document.getElementsByClassName("results")[0].innerHTML = `
                Results! <br><br>
                ${howManyQuestionsAnswered} Questions answered <br><br>
                ${howManyQuestionsAnsweredRight} Questions answered right <br><br>
                `;
        }



        //show at end the restart button
        showButtonForRestart = function() {
            document.getElementById("restartButton").style.display="inline";
        };
        


        //show at end the about button
        showButtonForAbout = function() {
            document.getElementById("aboutButton").style.display="inline";
        };


        //show the DIV with about details:
        about = function() {
            console.log("- about")
            //document.getElementById("aboutButton").style.display="none";
            //document.getElementById("restartButton").style.display="none";
            document.getElementById("about").style.display="inline";
            document.getElementById("codingResources").style.display="inline";
    
        };
        


        //set user selected category for the functions:
        var category = "";
        setCategory = function (getUserCategory) {
            category = getUserCategory;
            //alert("set category: " + category);
            document.getElementById("userCategory").innerHTML = "category: " + category;
        }



        document.getElementById("multiple_answerPlaceHolder1").addEventListener("click", function() {
            userAnswered(this.innerHTML);
        });
        document.getElementById("multiple_answerPlaceHolder2").addEventListener("click", function() {
            userAnswered(this.innerHTML);
        });
        document.getElementById("multiple_answerPlaceHolder3").addEventListener("click", function() {
            userAnswered(this.innerHTML);
        });
        document.getElementById("multiple_answerPlaceHolder4").addEventListener("click", function() {
            userAnswered(this.innerHTML);
        });


        document.getElementById("numOfQues1").addEventListener("click", function() {
            setNumOfQuestions(1);
        });
        document.getElementById("numOfQues2").addEventListener("click", function() {
            setNumOfQuestions(2);
        });
        document.getElementById("numOfQues3").addEventListener("click", function() {
            setNumOfQuestions(4);
        });
        document.getElementById("numOfQues4").addEventListener("click", function() {
            setNumOfQuestions(5);
        });
        document.getElementById("numOfQues5").addEventListener("click", function() {
            setNumOfQuestions(10);
        });
        document.getElementById("numOfQues6").addEventListener("click", function() {
            setNumOfQuestions(12);
        });
        document.getElementById("numOfQues7").addEventListener("click", function() {
            setNumOfQuestions(15);
        });
        document.getElementById("numOfQues8").addEventListener("click", function() {
            setNumOfQuestions(20);
        });



        //document.getElementById("category1").addEventListener("click", alert1);
        //document.getElementById("category1").addEventListener("click", setCategory());
        //document.getElementById("category1").addEventListener("click", setCategory('any'));
        document.getElementById("category1").addEventListener("click", function() {
            setCategory("any");
        });
        document.getElementById("category2").addEventListener("click", function() {
            setCategory('General Knowledge');
        });
        document.getElementById("category3").addEventListener("click", function() {
            setCategory('Entertainment: Books');
        });
        document.getElementById("category4").addEventListener("click", function() {
            setCategory('Entertainment: Film');
        });
        document.getElementById("category5").addEventListener("click", function() {
            setCategory('Entertainment: Music')
        });
        document.getElementById("category6").addEventListener("click", function() {
            setCategory('Entertainment: Video Games')
        });
        document.getElementById("category7").addEventListener("click", function() {
            setCategory('Entertainment: Board Games')
        });
        document.getElementById("category8").addEventListener("click", function() {
            setCategory('Science & Nature')
        });
        document.getElementById("category9").addEventListener("click", function() {
            setCategory('Science: Computers')
        });
        document.getElementById("category10").addEventListener("click", function() {
            setCategory('Science: Mathematics')
        });
        document.getElementById("category11").addEventListener("click", function() {
            setCategory('Mythology')
        });
        document.getElementById("category12").addEventListener("click", function() {
            setCategory('Sports')
        });
        document.getElementById("category13").addEventListener("click", function() {
            setCategory('Geography')
        });
        document.getElementById("category14").addEventListener("click", function() {
            setCategory('History')
        });
        document.getElementById("category15").addEventListener("click", function() {
            setCategory('Politics')
        });
