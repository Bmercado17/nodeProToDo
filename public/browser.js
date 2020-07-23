document.addEventListener("click", function (e) {
  //delete feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("are you sure you want to delete this item?")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.parentElement.parentElement.remove();
        })
        .catch(function () {
          console.log("please try again later.");
        });
    }
  }

  //update feature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "enter what you want to remeber/do",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/update-item", {
          text: userInput,
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch(function () {
          console.log("please try again later.");
        });
    }
  }
});
