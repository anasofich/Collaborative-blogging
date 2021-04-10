const form = document.querySelector("form");
// console.log((form.elements.content.value = "hello world"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.content.value);

  const payload = {
    title: form.elements.title.value,
    username: form.elements.username.value,
    content: form.elements.content.value,
  };

  document.querySelector("input[type=submit]").disabled = true;

  //   we're ready
  fetch("https://keadatabase-99c6.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "603420035ad3610fb5bb6527",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector("input[type=submit]").disabled = false;
      form.elements.title.value = "";
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector(".receivedText").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
});
