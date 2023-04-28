const backendIPAddress = "52.20.54.127:3000";
let itemsData
let main = document.getElementById("kratoo").innerHTML;
let topics = ["Tips for web design?",
    "Help my ComProg homework please",
    "i don't understand backend development. someone helpppppp",
    "Should I drop ComEngEss???"];
let contents = ["I wanna try to create a website. Anybody got some tips for making a good site?",
    "I don't understand the NumPy homework in ComProg class. Can someone help me asap?",
    "I need to create a web as my final project, but I don't know how to connect to database.",
    "I don't think I've been doing well in comengess, was thinking about dropping wdyt?"];
let myKratoo = [];
let addkratoo = '<span>Topic :</span><input type="text" id="topic"><br><span>Question :</span>\
<textarea id="content" rows="4" cols="50"></textarea><br><button type="submit" onclick="addKratoo()">Submit</button></div>'
function updateMain() {
    let main = "<ul>";
    let i = 0;
    for (t of topics) {
        main += '<a href="#" onclick="toTopic(' + i + ')">';
        main += '<li class="topic">';
        main += '<h2>' + topics[i] + '</h2>';
        main += '</li></a>';
        i += 1;
    }
    main += "</ul>";
}
function toTopic(n) {
    var content = document.getElementById("kratoo");
    content.innerHTML = '<h2>' + topics[n] + '</h2><div>' + contents[n] + '</div>';
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
};
const getKratooFromDB = async () => {
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/post`, options)
        .then((response) => response.json())
        .then((data) => {
            itemsData = data
        })
        .catch((error) => console.error(error));

};
const addKratoo = async () => {
    const topic = document.getElementById("topic").value;
    const content = document.getElementById("content").value;
    const author_id = 'from mcv';
    const author = 'from mcv';
    const itemToAdd = {
        "post_content": content,
        "post_author": author,
        "post_title": topic,
        "post_author_id": author_id,
        "post_like": 0,
        "post_dislike": 0
    }
    const options = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemToAdd)
    }
    await fetch(`http://${backendIPAddress}/post`, options)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    /*await getKratooFromDB();  
    showItemsFromBD(itemsData);*/  /* เอาไว้อัพเดตหน้า mian */
    topics.unshift(topic);
    contents.unshift(content);
    myKratoo.unshift(topic);
    /*main = updateMain();*/
    let doc = document.getElementById("kratoo");
    doc.innerHTML = main;
}
function toMyKratoo() {
    let myList = "<ul>";
    for (m of myKratoo) {
        i = topics.indexOf(m);
        myList += '<a href="#" onclick="toTopic(' + i + ')">';
        myList += '<li class="topic">';
        myList += '<h2>' + topics[i] + '</h2>';
        myList += '</li></a>';
    }
    myList += "</ul>";
    document.getElementById("kratoo").innerHTML = myList;
}
const deleteKratoo = async (post_id) => {
    const options = {
        method: "DELET",
        credentials: "include",
    }
    await fetch(`http://${backendIPAddress}/post/${post_id}`, options)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    /*await getKratooFromDB();
   showItemsFromBD(itemsData);*/ /* เอาไว้อัพเดตหน้า mian */
};
