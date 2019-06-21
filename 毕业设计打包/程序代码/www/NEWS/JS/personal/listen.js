window.onload = function(){ 
    //echo(document.cookie);
    var bt_logout = document.getElementById("logout"); 
    bt_logout.onclick = function(){
        delCookie("logonState");
        delCookie("jur");
        url="myNewsHome_html.php";
        window.location.href=url;
        
    }
}