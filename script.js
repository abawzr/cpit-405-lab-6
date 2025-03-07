document.addEventListener("DOMContentLoaded", () => {
  let likeCount = getCookie("likes") ? parseInt(getCookie("likes")) : 0;
  let dislikeCount = getCookie("dislikes")
    ? parseInt(getCookie("dislikes"))
    : 0;
  let comments = getCookie("comments") ? JSON.parse(getCookie("comments")) : [];

  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");
  const likeCounter = document.getElementById("likeCount");
  const dislikeCounter = document.getElementById("dislikeCount");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");
  const clearComment = document.getElementById("clearComment");
  const resetBtn = document.getElementById("resetBtn");
  const commentsSection = document.getElementById("commentsSection");

  // Update UI from cookies
  likeCounter.textContent = likeCount;
  dislikeCounter.textContent = dislikeCount;
  comments.forEach((comment) => addCommentToUI(comment));

  // Like Button Click
  likeBtn.addEventListener("click", () => {
    if (!getCookie("voted")) {
      likeCount++;
      likeCounter.textContent = likeCount;
      setCookie("likes", likeCount, 7);
      setCookie("voted", "true", 7);
    } else {
      alert("You have already voted!");
    }
  });

  // Dislike Button Click
  dislikeBtn.addEventListener("click", () => {
    if (!getCookie("voted")) {
      dislikeCount++;
      dislikeCounter.textContent = dislikeCount;
      setCookie("dislikes", dislikeCount, 7);
      setCookie("voted", "true", 7);
    } else {
      alert("You have already voted!");
    }
  });

  // Submit Comment
  submitComment.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
      comments.push(commentText);
      setCookie("comments", JSON.stringify(comments), 7);
      addCommentToUI(commentText);
      commentInput.value = ""; // Clear input
    }
  });

  // Clear Comment Input
  clearComment.addEventListener("click", () => {
    commentInput.value = "";
  });

  // Reset All Choices
  resetBtn.addEventListener("click", () => {
    setCookie("likes", "0", -1);
    setCookie("dislikes", "0", -1);
    setCookie("comments", "", -1);
    setCookie("voted", "", -1);

    likeCount = 0;
    dislikeCount = 0;
    comments = [];

    likeCounter.textContent = likeCount;
    dislikeCounter.textContent = dislikeCount;
    commentsSection.innerHTML = "";

    alert("Your choices and comments have been reset!");
  });

  // Function to Add Comment to UI
  function addCommentToUI(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.textContent = comment;
    commentsSection.appendChild(commentDiv);
  }

  // Function to Set Cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  // Function to Get Cookie
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  }
});
