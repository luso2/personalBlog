
// 内容互换显示
var personalMsg = document.getElementById('personalMsg');
var personalBlog = document.getElementById('personalBlog');
var myAttention = document.getElementById('myAttention');

var myAttentionClass = document.getElementById('cAttention');
var personalBlogClass = document.getElementById('cPersonalBlog');
var personalMsgClass = document.getElementById('cPersonalMsg');

// 用于信息修改
var  oldname = $("#name").val();
var  oldsex = $("#sex").val();
var  oldprofession = $("#profession").val();
var  oldintroduction = $("#introduction").val();

// //博客分页
// var lastPage = document.getElementById("lastPage");
// var nextPage = document.getElementById("nextPage");
// var currentPage = document.getElementById("currentPage");
// var endPage = document.getElementById("endPage");
// var allPage = document.getElementById("pageNum");
// var blogUl = document.getElementById("blog-ul");


window.onload = function (){
    personalMsg.onclick = function() {
        myAttentionClass.style.display = 'none';
        personalBlogClass.style.display = 'none';
        personalMsgClass.style.display = 'block';
    }

    personalBlog.onclick = function() {
        myAttentionClass.style.display = 'none';
        personalBlogClass.style.display = 'block';
        personalMsgClass.style.display = 'none';
    }
    myAttention.onclick = function() {
        myAttentionClass.style.display = 'block';
        personalBlogClass.style.display = 'none';
        personalMsgClass.style.display = 'none';
    }

    // if(pageNum.innerHTML == 0){
    //     lastPage.style.display = "none";
    //     nextPage.style.display = "none";
    //     endPage.style.display = "none";
    // }
    // lastPage.click() = clickLastPage();
    // nextPage.click() = clickNextPage();
    // endPage.click() = clickEndPage();
}


function updateHeadProtrait() {
    var hd = $("#head-portrait");
    hd.click();
    hd.change(function () {
        uploadHeadPortrait();
    })
}
//  头像上传
function uploadHeadPortrait() {
    var fileObj = document.getElementById("head-portrait").files[0]; // 获取文件对象
    var FileController = getContextPath()+"/uploadhead";                    // 接收上传文件的后台地址
    // FormData 对象
    var form = new FormData();
    form.append("headProtrait", fileObj);                           // 文件对象
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var uri = xhr.responseText;
            if(uri == "更换头像失败，头像格式需为png、jpg或gif"){
                alert("更换头像失败，头像格式需为png、jpg或gif");
            }else{
                var headImg = document.getElementById('head-img');
                var headerImg = document.getElementById('header-img');
                headImg.src = uri;
                headerImg.src = uri;
            }
        }
    };
    xhr.open("post", FileController, true);
    xhr.onload = function () {
        // alert("上传完成!");
    };
    xhr.send(form);
}
// 获取上下文路径 //
function getContextPath(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}
// 信息修改
function updateMsg() {
    var  id = $("#bloggerId").val();
    var  name = $("#name").val();
    var  sex = $("#sex").val();
    var  profession = $("#profession").val();
    var  introduction = $("#introduction").val();
    var path = getContextPath()+'/home';

    //  对信息进行了修改
    if (oldname != name || oldsex != sex || oldprofession != profession || oldintroduction != introduction){
        if (name == "" || sex == "" || profession == "" || introduction == ""){
            alert("修改信息不能为空");
        }else {
                $.post(path,
                    {
                        id: id,
                        name:  name,
                        sex: sex,
                        profession: profession,
                        introduction: introduction
                    },
                    function (data,status) {
                    if (data == "修改成功"){
                        oldname = name;
                        oldsex = sex;
                        oldprofession =profession;
                        oldintroduction = introduction;
                    }
                        alert(data);
                    }
                )
        }
    }else {
        alert("您未对信息进行修改");
    }
}

// 博文分页
var firstPage = document.getElementById("first-page");
var lastPage = document.getElementById("lastPage");
var nextPage = document.getElementById("nextPage");
var currentPage = document.getElementById("currentPage");
var endPage = document.getElementById("endPage");
var allPage = document.getElementById("pageNum");
var blogUl = document.getElementById("blog-ul");

// 如果当前页为第一页，首页键不显示
if (currentPage.innerHTML==1){
    firstPage.style.display = "none";
}
//	记录页数为0或为1
if(allPage.innerHTML==0 || allPage.innerHTML==1){
    lastPage.style.display = "none";
    nextPage.style.display = "none";
    endPage.style.display = "none";
    allPage.innerHTML = 1;
    firstPage.style.display = "none";
}
// 将当前页码数据存入page
var page = new Object();
page.bloggerId = 1;
page.type = 9;
page.onePageNum = 10;
page.currentPage = currentPage.innerHTML;
page.allPage = parseInt(allPage.innerHTML);
// 点击首页
function clickFirstPage() {
    page.currentPage = 1;
    currentPage.innerHTML = page.currentPage;
    lastPage.style.display = "none";
    if(nextPage.style.display =="none"){
        nextPage.style.display = "inline-block";
    }
    if (endPage.style.display == "none"){
        endPage.style.display = "inline-block";
    }
    uploadPage(page);
}
//	点击上一页
function clickLastPage() {
    page.currentPage = currentPage.innerHTML-1;
    currentPage.innerHTML = page.currentPage;
    if (currentPage.innerHTML <= 1){
        lastPage.style.display = "none";
    }
    if(nextPage.style.display =="none"){
        nextPage.style.display = "inline-block";
    }
    if (currentPage.innerHTML==1){
        firstPage.style.display = "none";
    }
    if (endPage.style.display == "none"){
        endPage.style.display = "inline-block";
    }
    uploadPage(page);
}
// 点击下一页
function clickNextPage() {
    page.currentPage = parseInt(currentPage.innerHTML)+1;
    currentPage.innerHTML = page.currentPage;
    if (currentPage.innerHTML >= allPage.innerHTML){
        nextPage.style.display = "none";
    }
    if (lastPage.style.display =="none"){
        lastPage.style.display = "inline-block";
    }
    if (firstPage.style.display == "none"){
        firstPage.style.display = "inline-block"
    }
    if (currentPage.innerHTML == allPage.innerHTML){
        endPage.style.display = "none";
    }
    uploadPage(page);
}
// 点击跳至尾页
function clickEndPage() {
    page.currentPage = allPage.innerHTML;
    currentPage.innerHTML = page.currentPage;
    nextPage.style.display = "none";
    if (currentPage.innerHTML!=1 && lastPage.style.display == "none"){
        lastPage.style.display = "inline-block"
    }
    if (firstPage.style.display == "none"){
        firstPage.style.display = "inline-block"
    }
    if(currentPage.innerHTML == allPage.innerHTML){
        endPage.style.display = "none";
    }
    uploadPage(page);
}

//	提交页码
function uploadPage(p) {
    $.ajax({
        url:"paging",
        data:JSON.stringify(p),
        type:"post",
        contentType: "application/json;charset=UTF-8",
        dataType:"text",
        success:function (data) {
            acceptDate(data);
        }
    })
}
// 	接收数据并展示数据
function acceptDate(d) {
    var blogList = JSON.parse(d);
    var contextPath = getContextPath();
    var str = "";
    for(var i=0;i<blogList.length;i++) {
        str += "<li><a href="+getContextPath()+"/read?id="+blogList[i].id+">"+blogList[i].title+"</a></li><a class=\"delete\" onclick='deleteBlog("+blogList[i].id+")'>删除</a>";
    }
    blogUl.innerHTML = str;
}
//  博文删除
function deleteBlog(id) {
    var i = confirm("确定删除？");
    if(i==true){
        var liNum = $("#blog-ul").children("li").length;
        if (liNum == 1 && page.currentPage > 1){
            page.currentPage = page.currentPage -1;
        }
        if (liNum == 1 && page.currentPage == 1){
            blogUl.innerHTML = "";
        }
        $.post(
            getContextPath()+"/home/delete",
            {deleteBlogId:id},
            function (data) {
                if (data == "删除成功"){
                    uploadPage(page);
                }
            })
    }

}
// 关注分页
var firstPageAtt = document.getElementById("att-first-page");
var lastPageAtt = document.getElementById("att-lastPage");
var nextPageAtt = document.getElementById("att-nextPage");
var currentPageAtt = document.getElementById("att-currentPage");
var endPageAtt = document.getElementById("att-endPage");
var allPageAtt = document.getElementById("att-pageNum");
var mainBody = document.getElementById("mainBody");

// 如果当前页为第一页，首页键不显示
if (currentPageAtt.innerHTML==1){
    firstPageAtt.style.display = "none";
}
//	记录页数为0或为1
if(allPageAtt.innerHTML==0 || allPageAtt.innerHTML==1){
    lastPageAtt.style.display = "none";
    nextPageAtt.style.display = "none";
    endPageAtt.style.display = "none";
    allPageAtt.innerHTML = 1;
    firstPageAtt.style.display = "none";
}
// 将当前页码数据存入page
var pageAtt = new Object();
pageAtt.bloggerId = 1;
pageAtt.type = 11;
pageAtt.onePageNum = 12;
pageAtt.currentPage = currentPageAtt.innerHTML;
pageAtt.allPage = parseInt(allPageAtt.innerHTML);
// 点击首页
function clickFirstPageAtt() {
    pageAtt.currentPage = 1;
    currentPageAtt.innerHTML = pageAtt.currentPage;
    lastPageAtt.style.display = "none";
    if(nextPageAtt.style.display =="none"){
        nextPageAtt.style.display = "inline-block";
    }
    if (endPageAtt.style.display == "none"){
        endPageAtt.style.display = "inline-block";
    }
    uploadPageAtt(pageAtt);
}
//	点击上一页
function clickLastPageAtt() {
    pageAtt.currentPage = currentPageAtt.innerHTML-1;
    currentPageAtt.innerHTML = pageAtt.currentPage;
    if (currentPageAtt.innerHTML <= 1){
        lastPageAtt.style.display = "none";
    }
    if(nextPageAtt.style.display =="none"){
        nextPageAtt.style.display = "inline-block";
    }
    if (currentPageAtt.innerHTML==1){
        firstPageAtt.style.display = "none";
    }
    if (endPageAtt.style.display == "none"){
        endPageAtt.style.display = "inline-block";
    }
    uploadPageAtt(pageAtt);
}
// 点击下一页
function clickNextPageAtt() {
    pageAtt.currentPage = parseInt(currentPageAtt.innerHTML)+1;
    currentPageAtt.innerHTML = pageAtt.currentPage;
    if (currentPageAtt.innerHTML >= allPageAtt.innerHTML){
        nextPageAtt.style.display = "none";
    }
    if (lastPageAtt.style.display =="none"){
        lastPageAtt.style.display = "inline-block";
    }
    if (firstPageAtt.style.display == "none"){
        firstPageAtt.style.display = "inline-block"
    }
    if (currentPageAtt.innerHTML == allPageAtt.innerHTML){
        endPageAtt.style.display = "none";
    }
    uploadPageAtt(pageAtt);
}
// 点击跳至尾页
function clickEndPageAtt() {
    pageAtt.currentPage = allPageAtt.innerHTML;
    currentPageAtt.innerHTML = pageAtt.currentPage;
    nextPageAtt.style.display = "none";
    if (currentPageAtt.innerHTML!=1 && lastPageAtt.style.display == "none"){
        lastPageAtt.style.display = "inline-block"
    }
    if (firstPageAtt.style.display == "none"){
        firstPageAtt.style.display = "inline-block"
    }
    if(currentPageAtt.innerHTML == allPageAtt.innerHTML){
        endPageAtt.style.display = "none";
    }
    uploadPageAtt(pageAtt);
}

//	提交页码
function uploadPageAtt(p) {
    $.ajax({
        url:"paging",
        data:JSON.stringify(p),
        type:"post",
        contentType: "application/json;charset=UTF-8",
        dataType:"text",
        success:function (data) {
            acceptDateAtt(data);
        }
    })
}
// 	接收数据并展示数据
function acceptDateAtt(d) {
    var bloggerList = JSON.parse(d);
    var contextPath = getContextPath();
    var str = "";
    for(var i=0;i<bloggerList.length;i++) {
        str += "<div class="+"blogger"+">"
            +"<div class=\"blogger-photo\">"
            +"<a href=\""+getContextPath()+"/personal?id="+bloggerList[i].id+"\"><img src=\""+bloggerList[i].headPortrait+"\"></a>"
            +"</div>"
            +"<div class=\"blogger-msg\">"
            +"<p>"+bloggerList[i].name+"</p>"
            +"<p>"+bloggerList[i].profession+"</p>"
            +"</div>"
            +"<div class=\"introduction\">"
            +"<p>"+bloggerList[i].introduction+"</p>"
            +"</div>"
            +"</div>";
    }
    mainBody.innerHTML = str;
}
//	获取上下文路径
function getContextPath(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}
