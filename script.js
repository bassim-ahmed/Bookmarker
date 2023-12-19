var siteNameInput= document.getElementById("siteName");
var siteUrlInput= document.getElementById("siteUrl");
var btn= document.getElementById("btn");
var tableRows= document.getElementById("tableRow");


btn.onclick=function(){
addBook();
clear();
}
var bookList= [];
if(localStorage.getItem("books")){
    bookList=JSON.parse(localStorage.getItem("books"));
    display();
}
function addBook(){
    if(nameRegex() || urlRegex()){
        var books={
            siteName:siteNameInput.value,
            siteUrl:siteUrlInput.value
            }
            bookList.push(books);
            localStorage.setItem("books",JSON.stringify(bookList));
            display();   
    }else{
        alert("please enter valid name and url");
    }

}
function display(){
     var box='';
     for(var i=0;i<bookList.length;i++){
          box+=`<tr>
          <td>${i+1}</td>
          <td>${bookList[i].siteName}</td>
          <td><button class="btn btn-success" onclick="visit(${i})"><i class="fa fa-eye"></i> visit</button></td>
          <td><button class="btn btn-danger" onclick="deleteBook(${i})"><i class="fa fa-trash"></i> delete</button></td>
          </tr>`
     }
     tableRows.innerHTML=box;

}
function clear() {
    siteNameInput.value='';
    siteUrlInput.value='';
}
function deleteBook(index){
    bookList.splice(index,1);
    localStorage.setItem("books",JSON.stringify(bookList));

    display();
}
function visit(index){
    window.open(bookList[index].siteUrl);
}

function nameRegex() {

    var regex = /^[A-Za-z\s]+$/;
    if (regex.test(siteNameInput.value)) {
        return true;
    } else {
        return false;
    }
}
function urlRegex() {
    var regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regex.test(siteUrlInput.value)) {
        return true;
    } else {
        return false;
    }
}