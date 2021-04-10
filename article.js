const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article");

fetch(
  "https://keadatabase-99c6.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "603420035ad3610fb5bb6527",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector("h2").textContent = data.title;
  document.querySelector("h4 span").textContent = data.username;
  document.querySelector(".date").textContent = data.date;
  document.querySelector(".content").textContent = data.content;

  //connecting comments
  const commentsTemplate = document.querySelector(".commentsTemplate").content;
  data.comments.forEach((comment) => {
    const copy = commentsTemplate.cloneNode(true);

    copy.querySelector(".singleComment h4").textContent = comment.username;
    copy.querySelector(".singleComment p").textContent = comment.content;
    copy.querySelector(".commentDate").textContent = comment.date;

    document.querySelector(".commentsList").appendChild(copy);
  });
  if (data.comments.length === 0) {
    const copy = commentsTemplate.cloneNode(true);
    copy.querySelector(".singleComment h4").textContent =
      "No comments yet. Be the first!";
    document.querySelector(".commentsList").appendChild(copy);
  }
}

const form = document.querySelector(".commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    content: form.elements.content.value,
    date: Date.now(),
  };
  console.log(payload);

  fetch(`https://keadatabase-99c6.restdb.io/rest/posts/${articleId}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "603420035ad3610fb5bb6527",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      const commentsTemplate = document.querySelector(".commentsTemplate")
        .content;

      const copy = commentsTemplate.cloneNode(true);

      copy.querySelector(".singleComment h4").textContent = data.username;
      copy.querySelector(".singleComment p").textContent = data.content;
      copy.querySelector(".commentDate").textContent = data.date;

      document.querySelector(".commentsList").appendChild(copy);
    });
}
