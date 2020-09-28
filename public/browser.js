document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-me')) {
        let userInput = prompt('enter your modified task')
        axios.post("/update-item", {
            text: userInput
        }).then(function () {
            //do some in the next video
        }).catch(function () {
            console.log('try again later.')
        })
    }
})