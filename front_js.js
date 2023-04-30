const backendIPAddress = "52.20.54.127:3000";
let itemsData;
let PersonalData;
let topics = [];
let contents = [];
let writer = [];
let writer_ID = [];
let date = [];
let main = document.getElementById("kratoo").innerHTML;
let addkratoo =
  ' <input type="text" placeholder="Topic" id="topic" name="name" id="topic" maxlength="60"/><br>\
<textarea id="content" placeholder="Content" rows="4" cols="50"></textarea><br><button id="submit" onclick="addKratoo(PersonalData)">Submit</button></div>';
function updateMain() {
  let main = "<ul>";
  let i = 0;
  for (t of topics) {
    main += '<a href="#" onclick="toTopic(' + i + ')">';
    main += '<li class="topic">';
    main += "<h2>" + topics[i] + "</h2>";
    main += "</li></a>";
    i += 1;
  }
  main += "</ul>";
  return main;
}
function toTopic(n) {
  var content = document.getElementById("kratoo");
  content.innerHTML = "<div>" + writer[n] + ":"+writer_ID[n]+" " + date[n] + "</div>";
  content.innerHTML +=
    "<h2>" + topics[n] + "</h2><div>" + contents[n] + "</div>";
  content.innerHTML +=
    '<span>answer this question : <br><br></span><input type="text" id="content"><br>' +
    '<button id="submit" onclick="addComment()">Submit</button>';
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
  writer_ID=[];
  for (data of itemsData) {
    topics.push(data.post_title);
    contents.push(data.post_content);
    writer.push(data.post_author);
    date.push(data.post_date);
    writer_ID.push(data.post_author_id);
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
  showKratooInTable(itemsData);
};
const addKratoo = async (PersonalData) => {
  const topic = document.getElementById("topic").value;
  const content = document.getElementById("content").value;
  const author_id = PersonalData.student.id;
  const author = PersonalData.student.firstname_en + " " + PersonalData.student.lastname_en;
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
};
// function toMyKratoo() { ต้องแก้ให้เรียกจาก author/author id (มั้ง)
//   let myList = "<ul>";
//   for (m of myKratoo) {
//     i = topics.indexOf(m);
//     myList += '<a href="#" onclick="toTopic(' + i + ')">';
//     myList += '<li class="topic">';
//     myList += "<h2>" + topics[i] + "</h2>";
//     myList += '<button id="delete" onclick="deleteKratoo()">Delete</button>';
//     myList += "</li></a>";
//   }
//   myList += "</ul>";
//   document.getElementById("kratoo").innerHTML = myList;
// }
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
    })
    .catch((error) => console.error(error));
};

const addComment = async (post_id, PersonalData) => {
  const content = document.getElementById("content").value;
  const author_id = PersonalData.student.id;
  const author = PersonalData.student.firstname_en + " " + PersonalData.student.lastname_en;
  const itemToAdd = {
    comment_author: "from mcv",
    comment_author_id: "from mcv",
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
  // await getCommentFromDB(post_id);
  // showItemsFromDB(itemsData);
};
const deleteCoemment = async (comment_id, post_id) => {
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
  /*await getCommentFromDB(post_id);  
    showItemsFromDB(itemsData);*/
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
}

const customSort = (a, b) => {
  // console.log(a.post_title);
  // console.log(b.post_title);
  // console.log(a.second - b.second);
  return parseInt(b.second) - parseInt(a.second);
};
