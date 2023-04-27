let main=document.getElementById("kratoo").innerHTML;
let topics=["0",
    '<h2>topic1 : problem1</h2><div>how to ... problem1?</div>',        //ปกติเค้าทำไงกันครับเนี่ยยยยยยยยยย
    '<h2>topic2 : problem2</h2><div>how to ... problem2?</div>',
    '<h2>topic3 : problem3</h2><div>how to ... problem3?</div>',
    '<h2>topic4 : problem4</h2><div>how to ... problem4?</div>',
    '<h2>topic5 : problem5</h2><div>how to ... problem5?</div>',
    '<h2>topic6 : problem6</h2><div>how to ... problem6?</div>',
    '<h2>topic7 : problem7</h2><div>how to ... problem7?</div>',
    '<h2>topic8 : problem8</h2><div>how to ... problem8?</div>'
];
let addkratoo='<span>TOPIC :</span><input type="text" id="topic"><br><span>QUESTION :</span><textarea id="content" rows="4" cols="50"></textarea><br><button type="submit" onclick="addKratoo()">submit</button></div> '
function toTopic(n){
    var content=document.getElementById("kratoo");
    content.innerHTML=topics[n];
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
    console.log(main.slice(0,main.search("</ul>")));
    main=main.slice(0,main.search("</ul>"))+'<a href="#" onclick="toTopic('+(topics.length)+')"><li class="topic"><h2>topic'+(topics.length)+' : problem'+(topics.length)+'</h2><div>how to ... problem'+(topics.length)+'?</div></li></a>'+'</ul>';
    topics.push('<h2>'+topic+' : problem'+(topics.length)+'</h2><div>'+content+'</div>');
    console.log(main.slice(0,main.search("</ul>")));
    // console.log(topics);
    // console.log(main);
    content=document.getElementById("kratoo");
    content.innerHTML=main;
 }