const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "";
//messageTwo.textContent = "";

//even argument
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;

  console.log("Testing", location);

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location + ".";
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
