// const { Console } = require("console");
const backendIPAddress = "52.20.54.127:3000";
let itemsData;
let PersonalData;
let topics = [];
let contents = [];
let writer = [];
let date = [];
let main = document.getElementById("kratoo").innerHTML;
let addkratoo =
  ' <input type="text" placeholder="Topic" id="topic" name="name" id="topic" maxlength="60"/><br>\
<textarea id="content" placeholder="Content" rows="4" cols="50"></textarea><br><button id="submit" onclick="addKratoo(PersonalData)">Submit</button></div>';

function updateMain() {
  main = "";
  let i = 0;
  for (t of topics) {
    if (i % 2 == 1) {
      main += '<div class="containers darker" onclick="toTopic(' + i + ')">';
    } else {
      main += '<div class="containers" onclick="toTopic(' + i + ')">';
    }
    main += '<p class="topic">' + topics[i] + "</p>";
    main += '<span class="author">By ' + writer[i] + "</span>";
    main += '<span class="author">' + date[i] + "</span>";
    main += "</div>";
    i += 1;
  }
  return main;
}

function toTopic(n) {
  main = document.getElementById("kratoo");
  // content.innerHTML = "<div>" + writer[n] + " " + date[n] + "</div>";
  // content.innerHTML +=
  //   "<h2>" + topics[n] + "</h2><div>" + contents[n] + "</div>";
  main = '<div class="box in-topic-box">';
  main += '<p class="in-topic">' + topics[n] + "</p>";
  main += '<p class="in-content">' + contents[n] + "</p>";
  main += '<span class="in-author">By ' + writer[n] + " " + date[n] + "</span>";
  main += "</div>";
  // content.innerHTML +=
  //   '<span>Answer this question : <br><br></span><input type="text" id="content"><br>' +
  //   '<button id="submit" onclick="addComment()">Submit</button>';
  toMainmenu();
  getCommentFromDB("ad3a30ba-4e85-4f25-9d63-7de170c8f00a");
  // showCommentFromDB(itemsData);
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
  for (data of itemsData) {
    topics.push(data.post_title);
    contents.push(data.post_content);
    writer.push(data.post_author);
    date.push(data.post_date);
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
      // console.log(data);
      // console.log(data.sort(customSort));
    })
    .catch((error) => console.error(error));
  // console.log(itemsData);
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
  // console.log(itemsData);
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
  let doc = document.getElementById("kratoo");
  doc.innerHTML = main;
  await getKratooFromDB();
  showItemsFromDB(itemsData);
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
      itemsData = data.sort(customSort);
      console.log(itemsData);
      showCommentFromDB(itemsData, post_id);
    })
    .catch((error) => console.error(error));
};

const showCommentFromDB = (itemsData, post_id) => {
  let comments = [];
  for (d of itemsData) {
    let c = [d.comment_author, d.comment_content, d.comment_date];
    comments.push(c);
  }
  var content = document.getElementById("kratoo");
  let m = "";
  for (c of comments) {
    m += '<div class="box comment-box">';
    m += '<p class="commentor">' + c[0] + "</p>";
    m += '<p class="comment">' + c[1] + "</p>";
    m += '<span class="comment-date">' + c[2] + "</span>";
    m += "</div>";
  }
  content.innerHTML += m;
  content.innerHTML +=
    '<div class="box">' +
    '<textarea rows="4" cols="50" placeholder="Wanna say something?" type="text" id="comment-box"></textarea><br>' +
    '<button id="comment-btn" onclick="addComment(post_id)">Submit</button></div>';
};

const addComment = async (post_id) => {
  const content = document.getElementById("content").value;
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
  await getCommentFromDB(post_id);
  showCommentFromDB(itemsData);
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
  getCommentFromDB(post_id);
  showCommentFromDB(itemsData);
};
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
