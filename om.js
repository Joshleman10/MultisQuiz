window.onload = function () {

    let body = $('#mainBody');
    let startButton = $('#startQuiz');
    let retryButton = $('#retry')
    let qDiv = $('#qDiv');
    let aDiv = $('#aDiv');
    let secret = $("#secret");
    let qCounter = 0;
    let correct = 0;
    let incorrect = 0;
    let userAnswers = [];
    let codeAns = [];
    let replenData = "<img src='replenData.PNG'/>";

    retryButton.hide();
    secret.hide();

    let qna = [
        {
            "Q": {
                "Q": "Replen TPH has improved WOW for the last 4 weeks from 4.21 to 4.77 TPH due to an improved focus on zone compliance.  The last 4 weeks replen data looks as follows:<br>" + replenData + "<br>Which WOW performance showed the largest increase?",
                "A": [
                    "A : Week 36 to week 37",
                    "B : Week 37 to week 38",
                    "C : Week 38 to week 39 ",
                    "D : Week 39 to week 40"
                ]
            },
        }, {
            "Q": {
                "Q": "The docks team finished the shift at 197 CPLH using 56 labor hours.  Assuming a maximum threshold of 250 CPLH, how many more units could the shift have produced with a shift TPH target of 36.5 at the maximum CPLH threshold?",
                "A": [
                    "A : 425 units",
                    "B : 372 units",
                    "C : 433 units ",
                    "D : 684 units"
                ]
            },
        }, {
            "Q": {
                "Q": "Your team ended the shift at an indirect % of 33.2% while utilizing 657 labor hours.  You have identified a miss on shift that could have placed 17 additional hours in direct paths.  What would the shifts indirect % have been had these labor hours been placed in direct paths?",
                "A": [
                    "A : 30.6% ",
                    "B : 30.9%",
                    "C : 29.8%",
                    "D : 31.2%"
                ]
            },
        }, {
            "Q": {
                "Q": "The total planned hours for the shift per 21DP are 432.  The total indirect % goal for the shift is 31.0%.  How much impact would 1 TM unnecessarily placed in an indirect function for the full shift (10 hours) have on the shifts total indirect %?",
                "A": [
                    "A : 71 units ",
                    "B : 153 units",
                    "C : 98 units",
                    "D : -38 units"
                ]
            },
        }, {
            "Q": {
                "Q": "Singles bin density over the last 4 weeks averaged 68.7.  Your team faced a bin density of 61.4 while utilizing 143 hours in singles pick.  How many more units would have been generated had the team landed at the 4wk average?",
                "A": [
                    "A : 1234 units",
                    "B : 1077 units",
                    "C : 1128 units",
                    "D : 1044 units "
                ]
            }
        }
    ]

    aDiv.on('click', '#ans', function (e) {
        let userAns = e.target.innerHTML;
        let answer = e.target.value;
        let letterOfAns = userAns.split("");
        answer === "c" ? correct++ : incorrect++;
        answer === "c" ? codeAns.push(letterOfAns[0]) : "";
        userAnswers.push({ ans: userAns, IorC: answer });
        qDiv.empty();
        aDiv.empty();
        loadQuestion();
    });

    loadQuestion = function () {
        qDiv.show();
        aDiv.show();
        if (qCounter === 5) {
            aDiv.append('<h1 id="score">Your answers were:</h1>')
            userAnswers.map(item => {
                if (item.IorC === "c") {
                    aDiv.append('<h4 class="p-3 mb-2 bg-success text-white" id="answers"> ' + item.ans + '</h4>')
                }
                else {
                    aDiv.append('<h4 class="p-3 mb-2 bg-danger text-white" id="answers"> ' + item.ans + '</h4>')
                }
            })
            retryButton.show();
            let sum = correct + incorrect;
            let percent = correct / sum * 100
            let score = ("You scored a " + percent + "%");
            body.append('<h1 id="score">' + score + '</h1>')
            if (score === "You scored a 100%") {
                secret.show();
                $(document).keyup(function (event) {
                    if (event.which === 13) {
                        let code = secret.val().trim().toLowerCase();
                        let userResponse = codeAns.join("").toLowerCase().toString();
                        secret.hide();
                        if (code === userResponse) {
                            aDiv.append("<h1>You are doing a great job.</h1>")
                            document.body.style.backgroundColor = "lightgreen";
                            aDiv.append("<img src='fred.jpg'/>")
                        }
                        else {
                            document.body.style.backgroundColor = "#ff6961";
                            aDiv.append("<h1>Incorrect code.  Please do better.</h1>")
                        }
                    }
                });
            }
            else {
                aDiv.append("<h1>Not quite there...please try again!</h1>")
            }
        }
        else {
            qna.map((item, index) => {
                if (index === qCounter) {
                    qDiv.append(item.Q.Q)
                    item.Q.A.map(item => {
                        let itemChars = item.split(" ")
                        let last = (itemChars.slice(-1) + "~")
                        if (last === "~") {
                            aDiv.append("<button type='button' class='btn btn-primary' id='ans' value='c'>" + item + "</button>")
                        }
                        else {
                            aDiv.append("<button type='button' class='btn btn-primary' id='ans' value='i'>" + item + "</button>")
                        }
                    })
                }
            })
        }
        qCounter++;
    }

    startButton.click(function () {
        startButton.hide();
        qDiv.hide();
        aDiv.hide();
        loadQuestion();
    });

    retryButton.on('click', function () {
        location.reload();
    })
}