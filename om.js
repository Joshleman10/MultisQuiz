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
                "Q": "Ashley is looking for a movexx to operate and sees Randy drop his off in the parking area. Since Randy had already completed his equipment checklist this morning, Ashley sees no reason to complete one herself. Which of the following is true?",
                "A": [
                    "A : The equipment was already inspected by another Team Member, so it is safe for Ashley to operate the equipment.",
                    "B : Each individual operator must complete an equipment checklist prior to operating equipment. ",
                    "C : Movexx do not require an equipment checklist.",
                    "D : Equipment checklists are completed by maintenance."
                ]
            },
        }, {
            "Q": {
                "Q": "Which one of the following could be considered a safe pass?",
                "A": [
                    "A : Faith was standing in front of her movexx by 3 feet. Rich made eye contact with her and proceeded to pass.",
                    "B : Faith was picking between her cart and racking. Rich declared he was passing and waited for Faith to stop picking, then proceeded to pass.",
                    "C : Faith was standing on her Movexx talking to a fellow TM.  Rich declared he was passing and made eye contact, then proceeded to pass.",
                    "D : Faith was standing 3 feet in front of her Movexx.  Rich declared he was about to pass.  Both made eye contact and Rich proceeded to pass. "
                ]
            },
        }, {
            "Q": {
                "Q": "Jared is currently the most productive multis picker.  He is observed stepping over the Movexx platform to save time walking around his pick cart.  Which of the following is true?",
                "A": [
                    "A : This is acceptable due to being more efficient.",
                    "B : This is unsafe due to the potential for tripping over the platform. ",
                    "C : If he stepped on the platform first, this considered a safe movement.",
                    "D : If he is the most productive picker, this is ok."
                ]
            },
        }, {
            "Q": {
                "Q": "Duane is picking singles on a center rider, while Marielle is picking multis on a Movexx.  Marielle is following behind Duane by one bay as they travel.  Which of the following is true?",
                "A": [
                    "A : Because Movexx can pass PIT, this is safe.",
                    "B : The 2 bay rule while traveling applies to all equipment ",
                    "C : Movexx cannot pass PIT so this is not allowed.",
                    "D : If there is traffic that exceeds 50 multis pickers, it is ok to follow within 1 bay."
                ]
            },
        }, {
            "Q": {
                "Q": "Sergio is picking in multis using a scan gun instead of a wrist rocket.  As he is traveling, he is holding the scanner in one hand which is also on the steering tiller.  Which of the following is true?",
                "A": [
                    "A : This is considered 4 points of contact while operating.",
                    "B : This is not considered 4 points of contact.",
                    "C : TMs shoud always use wrist rocket while picking multis, if one is available.",
                    "D : B and C "
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
                            aDiv.append("<img src='faithCat.png'/>")
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