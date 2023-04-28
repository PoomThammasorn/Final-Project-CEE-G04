let main=document.getElementById("kratoo").innerHTML;
let topics=["Tips for web design?",
"Help my ComProg homework please",
"i don't understand backend development. someone helpppppp",
"Should I drop ComEngEss???"];
let contents=["I wanna try to create a website. Anybody got some tips for making a good site?",
"I don't understand the NumPy homework in ComProg class. Can someone help me asap?",
"I need to create a web as my final project, but I don't know how to connect to database.",
"I don't think I've been doing well in comengess, was thinking about dropping wdyt?"];
let myKratoo = [];
let addkratoo='<span>Topic :</span><input type="text" id="topic"><br><span>Question :</span>\
<textarea id="content" rows="4" cols="50"></textarea><br><button id="submit" onclick="addKratoo()">Submit</button></div>'
function updateMain(){
    main="<ul>";
    let i=0;
    for (t of topics) {
        main += '<a href="#" onclick="toTopic('+i+')">';
        main += '<li class="topic">';
        main += '<h2>'+topics[i]+'</h2>';
        main += '</li></a>';
        i += 1;
    }
    main += "</ul>";
}
function toTopic(n){
    var content=document.getElementById("kratoo");
    content.innerHTML='<h2>'+topics[n]+'</h2><div>'+contents[n]+'</div>';
}
function toMainmenu(){
    var content=document.getElementById("kratoo");
    content.innerHTML=main;
}
function toAddKratooPage(){
    var content=document.getElementById("kratoo");
    content.innerHTML=addkratoo;
}
function addKratoo(){
    let topic = document.getElementById("topic").value;
    let content = document.getElementById("content").value;
    topics.unshift(topic);
    contents.unshift(content);
    myKratoo.unshift(topic);
    updateMain();
    document.getElementById("kratoo").innerHTML=main; 
}
function toMyKratoo() {
    let myList="<ul>";
    for (m of myKratoo) {
        i=topics.indexOf(m);
        myList += '<a href="#" onclick="toTopic('+i+')">';
        myList += '<li class="topic">';
        myList += '<h2>'+topics[i]+'</h2>';
        myList += '<button id="delete" onclick="deleteKratoo()">Delete</button>'
        myList += '</li></a>';
    }
    myList += "</ul>";
    document.getElementById("kratoo").innerHTML = myList;
}
// function deleteKratoo()