const backendIPAddress = "52.20.54.127:3000";
let itemsData;
let PersonalData;
let topics = [];
let contents = [];
let writer = [];
let writer_id = [];
let date = [];
let post_id_list = [];
let main = document.getElementById("kratoo").innerHTML;
let addkratoo =
  ' <input type="text" placeholder="Topic" id="topic" name="name" id="topic" maxlength="60"/><br>\
<textarea id="content" placeholder="Content" rows="4" cols="50"></textarea><br><button id="submit" onclick="addKratoo(PersonalData)">Submit</button></div>';

function updateMain() {
  main = "";
  let i = 0;
  for (t of topics) {
    if (i % 2 == 1) {
      main += `<div class="containers darker" id="${post_id_list[i]}" onclick="toTopic(${i})">`;
    } else {
      main += `<div class="containers" id="${post_id_list[i]}" onclick="toTopic(${i})">`;
    }
    main += '<p class="topic">' + topics[i] + "</p>";
    main += `<span class="author">${writer_id[i]} ${writer[i]}</span>`;
    main += '<span class="author_date">' + date[i] + "</span>";
    main += "</div>";
    i += 1;
    //hello
  }
  return main;
}

function toTopic(n) {
  main = document.getElementById("kratoo");
  main = '<div class="box in-topic-box ' + post_id_list[n] + '">';
  main += '<p class="in-topic">' + topics[n] + "</p>";
  main += '<p class="in-content">' + contents[n] + "</p>";
  main += `<span class="in-author">${writer_id[n]} ${writer[n]} ${date[n]}</span>`;
  if (PersonalData.student.id == writer_id[n]) {
    main += `
      <button class="delete-btn" onclick="deleteKratoo('${post_id_list[n]}')">Delete</button>
    `;
  }
  main += "</div>";
  toMainmenu();
  getCommentFromDB(post_id_list[n]);
}

function toMainmenu() {
  var content = document.getElementById("kratoo");
  content.innerHTML = main;
}

function toAddKratooPage() {
  var content = document.getElementById("kratoo");
  content.innerHTML = addkratoo;
}

const showKratooInTable = (itemsData) => {
  /* เป็น methond เอาไว้ให้แสดงข้อมูลจาก backend คับ อันนี้รบกวนน้องๆเขียน 
    เข้าใจว่าถ้า ใช้อันนี้ตอน refresh กับตอน submit แล้วกลับมาหน้าแรก ข้อมูลจะไม่หาย*/
  topics = [];
  contents = [];
  writer = [];
  date = [];
  post_id_list = [];
  writer_id = [];
  for (data of itemsData) {
    topics.push(data.post_title);
    contents.push(data.post_content);
    writer.push(data.post_author);
    writer_id.push(data.post_author_id);
    date.push(data.post_date);
    post_id_list.push(data.post_id);
  }
  main = updateMain();
  toMainmenu();
};

const getKratooFromDB = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/post`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data.sort(customSort);
    })
    .catch((error) => console.error(error));
  showKratooInTable(itemsData);
};

const getMyKratooFromDB = async (student_id) => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/post/${student_id}`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data.sort(customSort);
    })
    .catch((error) => console.error(error));
  showKratooInTable(itemsData);
};

const addKratoo = async (PersonalData) => {
  const topic = document.getElementById("topic").value;
  const content = document.getElementById("content").value;
  const author_id = PersonalData.student.id;
  const author =
    PersonalData.student.firstname_en + " " + PersonalData.student.lastname_en;
  const itemToAdd = {
    post_content: content,
    post_author: author,
    post_title: topic,
    post_author_id: author_id,
    post_like: 0,
    post_dislike: 0,
  };
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemToAdd),
  };
  await fetch(`http://${backendIPAddress}/post`, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  let doc = document.getElementById("kratoo");
  doc.innerHTML = main;

  await getKratooFromDB();
  showKratooInTable(itemsData);
  location.reload();
};

function toMyKratoo() {
  getMyKratooFromDB(PersonalData.student.id);
}

function toMainKratoo() {
  console.log("toMainKratoo");
  getKratooFromDB();
}

const deleteKratoo = async (post_id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/post/${post_id}`, options)
    .then((response) => response.json())
    .catch((error) => console.error(error)); /* เอาไว้อัพเดตหน้า main */
  // let doc = document.getElementById("kratoo");
  // doc.innerHTML = main;
  await getKratooFromDB();
  showKratooInTable(itemsData);
  location.reload();
  deleteAllCommentByPostID(post_id);
};
/* ---------------------------------------------------- comment part -------------------------------------------------- */

const getCommentFromDB = async (post_id) => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/post/comments/${post_id}`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data.sort(customSort).reverse();
      console.log(itemsData);
      showCommentFromDB(itemsData, post_id);
    })
    .catch((error) => console.error(error));
};

const deleteAllCommentByPostID = async (post_id) => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(`http://${backendIPAddress}/post/comments/${post_id}`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data.sort(customSort).reverse();
      console.log(itemsData);
      for (d of itemsData) {
        justDeleteComment(d.comment_id, post_id);
      }
    })
    .catch((error) => console.error(error));
};

const showCommentFromDB = (itemsData, post_id) => {
  let comments = [];
  for (d of itemsData) {
    let c = [
      d.comment_author,
      d.comment_content,
      d.comment_date,
      d.comment_author_id,
      d.comment_id,
    ];
    comments.push(c);
  }
  main = document.getElementById("kratoo");
  main.innerHTML += `
  <div class="box">
    <textarea
      row="4"
      cols="50"
      placeholder="Wanna say something?"
      type="text"
      id="comment-box"
    ></textarea
    ><br />
    <button id="comment-btn" onclick="addComment('${post_id}')">
      Submit
    </button>
  </div>
  `;
  var x = "";
  for (c of comments) {
    x += `<div class="box comment-box" id="${c[4]}">`;
    x += `<p class="commentor">${c[3]} ${c[0]}</p>`;
    x += `<p class="comment">${c[1]}</p>`;
    x += `<span class="comment-date">${c[2]}</span>`;
    if (PersonalData.student.id == c[3]) {
      x += `<button class="delete-btn" onclick="deleteComment('${c[4]}','${post_id}')">Delete</button>`;
    }
    x += `</div>`;
  }
  main.innerHTML += x;
};

const addComment = async (post_id) => {
  const content = document.getElementById("comment-box").value;
  const author_id = PersonalData.student.id;
  const author =
    PersonalData.student.firstname_en + " " + PersonalData.student.lastname_en;
  const itemToAdd = {
    comment_author: author,
    comment_author_id: author_id,
    comment_content: content,
    comment_dislike: 0,
    comment_like: 0,
  };
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemToAdd),
  };
  await fetch(`http://${backendIPAddress}/post/comments/${post_id}`, options)
    .then((response) => response.json())
    .catch((error) => console.error(error)); /* เอาไว้อัพเดตหน้า comemnt */
  resetCommentChild();
  getCommentFromDB(post_id);
  // showCommentFromDB(itemsData);
};

const deleteComment = async (comment_id, post_id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/post/comments/${post_id}/${comment_id}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error)); /* เอาไว้อัพเดตหน้า comemnt */
  resetCommentChild();
  getCommentFromDB(post_id);
  // showCommentFromDB(itemsData);
  // getMyKratooFromDB(post_id);
};

const justDeleteComment = async (comment_id, post_id) => {
  const options = {
    method: "DELETE",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/post/comments/${post_id}/${comment_id}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error)); /* เอาไว้อัพเดตหน้า comemnt */
};

function resetCommentChild() {
  var parent = document.getElementById("kratoo");
  firstChild = parent.firstChild;
  nextChild = firstChild.nextSibling;
  while (nextChild) {
    parent.removeChild(nextChild);
    nextChild = firstChild.nextSibling;
  }
}
/* ---------------------------------------------------- mcv -------------------------------------------------- */
const getUserProfile = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      PersonalData = data.data;
      putUserProfile(PersonalData);
    })
    .catch((error) => console.error(error));
};

function putUserProfile(data) {
  console.log("update profile");
  document.getElementById(
    "eng-first-name"
  ).innerHTML = `${data.student.firstname_en}`;
  document.getElementById(
    "eng-last-name"
  ).innerHTML = `${data.student.lastname_en}`;
  document.getElementById("student-id").innerHTML = `${data.student.id}`;
  var image = document.getElementById("profile");
  console.log(data.account.profile_pict);
  image.src = `${data.account.profile_pict}`;
}

const customSort = (a, b) => {
  // console.log(a.comment_author);
  // console.log(b.comment_author);
  // console.log(a.second - b.second);
  return parseInt(b.second) - parseInt(a.second);
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
