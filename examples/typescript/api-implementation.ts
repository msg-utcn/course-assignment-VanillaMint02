// without tsconfig it will be a mess


function getJoke() {
    /*axios({
        method: "get",
        url: "https://official-joke-api.appspot.com/random_joke"
    }).then((response: { data: { setup: string ,punchline:string} }) => {
        console.log(response.data.setup);
    });
    */
    return fetch("https://official-joke-api.appspot.com/random_joke")
        .then(function (response) { return response.json()})
        .then(function(response)
        {
        document.getElementById("Joke").innerHTML=response.punchline.toString();
        document.getElementById("Setup").innerHTML=response.setup.toString();
        });
}