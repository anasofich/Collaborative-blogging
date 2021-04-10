function getData() {
  fetch("https://keadatabase-99c6.restdb.io/rest/posts", {
    method: "GET",
    headers: {
      "x-apikey": "603420035ad3610fb5bb6527",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
getData();

function showPosts(posts) {
  console.log(posts);
  //grab the template
  const template = document.querySelector(".frontpageList").content;

  posts.forEach((post) => {
    //clone
    const copy = template.cloneNode(true);

    //adjust stuff
    copy.querySelector("a.postLink").href = `article.html?article=${post._id}`;
    copy.querySelector("h3").textContent = post.title;
    copy.querySelector("h4 span").textContent = post.username;

    //append
    document.querySelector("#postsSec").appendChild(copy);
  });
}
