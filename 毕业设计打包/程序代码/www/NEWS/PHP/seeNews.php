<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="http://localhost/NEWS/CSS/seeNews.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
    </head>
    <body>
    <?php 
        include 'public.php';
        function drawHTML($dir){
            echo "<div id=\"ptitle\" class=\"text_div\"><p class=\"text_p\">".$dir['ptitle']."</p></div><br>";
            $path=$dir['ppicture'];
            echo "<div id=\"ppicture\" class=\"text_div\"><img class=\"text_p\" src=\"$path\"  alt=\"加载错误\" /></div>";
            
            echo "<div id=\"pcontent\" class=\"text_div\"><p class=\"text_p\">".$dir['pcontent']."</p></div><br>";
            echo "<div id=\"info\" class=\"text_div\"><p class=\"text_p\">发布单位:".$dir['pdepartment']."</p>";
            echo "<p class=\"text_p\">发布人:".$dir['uname']."</p>";
            echo "<p class=\"text_p\">发布日期:".$dir['pdate']."</p></div>";
        }
        $sqlKeyList=array("pid","ptitle","pcontent","pdepartment","pdate","ppicture","uname","cid","clnum",'review');
        $pid=$_GET['pid'];
        if(empty($pid)){
            echo "出错了";
            exit();
        }
        $sql="select * from press,category  where category.cid=press.cid&&pid=$pid";
        $conn=consql();
        if($conn){
            $res=mysqli_query($conn,$sql);
            $row= mysqli_fetch_array($res,MYSQL_ASSOC);
            echo "<script>document.title = \"".$row['ptitle']."\" </script>";
            drawHTML($row);
        }
        
    ?>
    </body>
</html>


