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

    retryButton.hide();
    secret.hide();

    let qna = [
        {
            "Q": {
                "Q": "You came into an SOS backlog of 18,738 units.  You are projected to ship 25,162 units during your shift using 719 total labor hours and expecting an additional 17,814 units of charge during shift.  In a meeting prior to your shift, your Senior OM strokes his beard and asks you to ensure that you leave the next shift with at least 20,000 units in the backlog.  Assuming you achieve a target TPH of 35.0, what would be the best course of action, if any? ",
                "A": [
                    "A : Full send with no VTO because TPH goal is always top priority",
                    "B : Increase indirect HC to miss on TPH since preserving backlog is more of a priority",
                    "C : VTO as many hours as possible to hand the highest backlog possible to the next shift",
                    " D : VTO 25 TMs for the entire shift",
                    "E : VTO 20 TMs for the entire shift",
                    "F : VTO 15 TMs for the entire"
                ]
            },
        }, {
            "Q": {
                "Q": "You are asked to provide an update on how many total hours will be utilized by the end of the shift with 4 hours until EOS.  The current HC is 72 with 7 TMs opting for EOA 2.5 hours prior to EOS.  The shift has currently logged a total of 623 hours until this point.  What is the best estimate for total hours at EOS?",
                "A": [
                    "A : 782 hours",
                    " B : 894 hours",
                    "C : 882 hours",
                    "D : 1012 hours"
                ]
            },
        }, {
            "Q": {
                "Q": "You are a Singles AM.  The Singles Pack team finished the shift at a UPH of 82.3 vs a target of 90 UPH.  The shift spent a total of 183.2 hours in the singles pack function.  How many units were lost due to missing pack UPH target?",
                "A": [
                    "A : 872 units",
                    " B : 1410 units",
                    "C : 1189 units",
                    "D : 1300 units"
                ]
            },
        }, {
            "Q": {
                "Q": "The total planned hours for the shift per 21DP are 432.  The total indirect % goal for the shift is 31.0%.  How much impact would 1 TM unnecessarily placed in an indirect function for the full shift (10 hours) have on the shifts total indirect %?",
                "A": [
                    " A : Increase indirect % by 2.31%",
                    "B : Decrease indirect % by 1.80%",
                    "C : Increase indirect % by 2.92%",
                    "D : Increase indirect % by 0.92%"
                ]
            },
        }, {
            "Q": {
                "Q": "The prior shift left a singles pack/stage required handoff of 1428 containers.  Your team is expected to leave a singles pack/stage required handoff of 1192 containers.  Assuming a singles UPC of 1.54 and your team leaves exactly what is expected for the next shift, about how many extra units will be able to be packed out without needing to be picked?",
                "A": [
                    " A : 363 units",
                    "B : 402 units",
                    "C : 292 units",
                    "D : 352 units"
                ]
            }
        }
    ]

    aDiv.on('click', '#ans', function (e) {
        let answer = e.target.value;
        answer === "c" ? correct++ : incorrect++;
        qDiv.empty();
        aDiv.empty();
        loadQuestion();
    });

    loadQuestion = function () {
        qDiv.show();
        aDiv.show();
        if (qCounter === 5) {
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
                        console.log(code);
                        secret.hide();
                        if (code === "dbbaa") {
                            aDiv.append("<h1>You are doing a great job.</h1>")
                            document.body.style.backgroundColor = "green";
                            aDiv.append("<img src='ted.PNG'/>")
                        }
                        else {
                            document.body.style.backgroundColor = "red";
                            aDiv.append("<h1>Incorrect code.  Please do better.</h1>")
                        }
                    }
                });
            }
            else{
                aDiv.append("<h1>Not quite there...please try again!</h1>")
            }
        }
        else {
            qna.map((item, index) => {
                if (index === qCounter) {
                    qDiv.append(item.Q.Q)
                    item.Q.A.map(item => {
                        let itemChars = item.split(" ")
                        let first = itemChars[0]
                        if (first === "A" || first === "B" || first === "C" || first === "D" || first === "E" || first === "F") {
                            aDiv.append("<button type='button' class='btn btn-primary' id='ans' value='i'>" + item + "</button>")
                        }
                        else {
                            aDiv.append("<button type='button' class='btn btn-primary' id='ans' value='c'>" + item + "</button>")
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