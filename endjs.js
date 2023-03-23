const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText =  mostRecentScore;


saveHighScore = () => {
    console.log("clicked the save button");
    e.preventDeafault();

};
