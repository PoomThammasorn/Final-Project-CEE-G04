let main=document.getElementById("kratoo").innerHTML;
let topics=[
    '<div class="kratoo"><h2>topic1 : problem1</h2><div>how to ... problem1?</div></div>',
    '<div class="kratoo"><h2>topic2 : problem2</h2><div>how to ... problem2?</div></div>',
    '<div class="kratoo"><h2>topic3 : problem3</h2><div>how to ... problem3?</div></div>',
    '<div class="kratoo"><h2>topic4 : problem4</h2><div>how to ... problem4?</div></div>',
    '<div class="kratoo"><h2>topic5 : problem5</h2><div>how to ... problem5?</div></div>',
    '<div class="kratoo"><h2>topic6 : problem6</h2><div>how to ... problem6?</div></div>',
    '<div class="kratoo"><h2>topic7 : problem7</h2><div>how to ... problem7?</div></div>',
    '<div class="kratoo"><h2>topic8 : problem8</h2><div>how to ... problem8?</div></div>'
];
function toTopic(n){
    var sth=document.getElementById("kratoo");
    sth.innerHTML=topics[n];
}
function toMainmenu(){
    var sth=document.getElementById("kratoo");
    sth.innerHTML=main;
}