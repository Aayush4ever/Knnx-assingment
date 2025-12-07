const prompt = require("prompt-sync")({ sigint: true });


// Squad: Question
class Question {
    constructor(text, category, difficulty, answer) {
        this.text = text;
        this.category = category;
        this.difficulty = difficulty;
        this.answer = answer;
    }
}



// Squad: Player
class QuizPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}



// Squad: Quiz Master
class QuizMaster {
    constructor() {
        this.questions = [];
        this.player = null;
    }

    addQuestion(q) {
        this.questions.push(q);
    }

    chooseCategory() {
        console.log("\nCategories: Science, History, Fun");
        const cat = prompt("Pick a category: ");
        return cat;
    }

    chooseDifficulty() {
        console.log("\nDifficulty levels: Easy, Medium, Hard");
        const diff = prompt("Difficulty? ");
        return diff;
    }

    start() {
        console.log("Welcome to Quiz Master 3000!");
        console.log("A quiz so smart it occasionally insults you.");

        const name = prompt("Your name? ");
        this.player = new QuizPlayer(name);

        const category = this.chooseCategory();
        const difficulty = this.chooseDifficulty();

        const selected = this.questions.filter(
            q => q.category.toLowerCase() === category.toLowerCase() &&
                 q.difficulty.toLowerCase() === difficulty.toLowerCase()
        );

        if (selected.length < 10) {
            console.log("Not enough questions in this category & difficulty. I blame HR.");
            return;
        }

        let asked = selected.slice(0, 10);

        for (let q of asked) {
            console.log("\nQ: " + q.text);
            const ans = prompt("Your answer: ");

            this.evaluateAnswer(q, ans);
        }

        this.showScore();
    }

    evaluateAnswer(question, ans) {
        const diff = question.difficulty.toLowerCase();
        let points = 0;
        let penalty = 0;

        if (diff === "easy") { points = 5; penalty = -2; }
        if (diff === "medium") { points = 10; penalty = -5; }
        if (diff === "hard") { points = 15; penalty = -7; }

        if (ans.trim().toLowerCase() === question.answer.toLowerCase()) {
            this.player.score += points;
            console.log("Correct! Look at you, being all smart.");
        } else {
            this.player.score += penalty;
            console.log("Wrong. Creative… but wrong.");
        }
    }

    showScore() {
        const score = this.player.score;

        console.log("\nFinal Score: " + score);

        if (score >= 80) {
            console.log("Rank: Quiz Royalty. Bow down, mortals.");
        } else if (score >= 50) {
            console.log("Rank: Quiz Master in training. Keep those neurons warm.");
        } else {
            console.log("Rank: Better luck next time, champ.");
        }
    }
}


const quiz = new QuizMaster();

quiz.addQuestion(new Question(
    "What is the chemical symbol for water?",
    "Science",
    "Easy",
    "H2O"
));

quiz.addQuestion(new Question(
    "Who discovered gravity?",
    "Science",
    "Easy",
    "Newton"
));

quiz.addQuestion(new Question(
    "Who was the first President of the USA?",
    "History",
    "Medium",
    "George Washington"
));

quiz.start();
