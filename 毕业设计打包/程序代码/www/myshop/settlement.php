<html>
<head>
 <title>结算</title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <script src="JS/jquery.js"></script>
<script src="JS/jquery.cookie.js"></script>
<script src="JS/public.js"></script>
 <meta name="description" content=""/>
 <meta name="format-detection" content="telephone=no" />
 <meta name=""/>
 <link href="CSS/header.css" type=text/css rel=stylesheet>
<link href="CSS//tasp.css" rel="stylesheet" />
<link href="CSS//orderconfirm.css" rel="stylesheet" />

<style>
#page{width:auto;}
#comm-header-inner,#content{width:950px;margin:auto;}
#logo{padding-top:26px;padding-bottom:12px;}
#header .wrap-box{margin-top:-67px;}
#logo .logo{position:relative;overflow:hidden;display:inline-block;width:140px;height:35px;font-size:35px;line-height:35px;color:#f40;}
#logo .logo .i{position:absolute;width:140px;height:35px;top:0;left:0;background:url(http://a.tbcdn.cn/tbsp/img/header/logo.png);}
</style>

</head>
<body data-spm="1">
    <div id="main_body">
    <?php
    include 'PHP/public.php';
    echo readFileHTML('header.html');
    judgeLog();
    $user_id=$_COOKIE['user_id'];
    
    if(empty($_GET['num'])){
        echo "找不到页面";
        exit();
    }
    ?>
    </div>
    <div id="page">
        <div id="content" class="grid-c">
            <div id="address" class="address" style="margin-top: 20px;" data-spm="2">
            <form name="addrForm" id="addrForm" action="#">
                <ul id="address-list" class="address-list">
                <h3>确认收货地址
                    <span class="manage-address"> <a href="personal.php" target="_blank" title="管理我的收货地址" class="J_MakePoint" >管理收货地址</a></span>
                </h3>
                <?php
                function drawliHTML($arr){
                    $id=$arr['id'];
                    $addr=$arr['addr'];
                    $tel=$arr['tel'];
                    $user_id=$_COOKIE['user_id'];
                    $name=$_COOKIE['loginState'];
                    echo "
                    <li class='J_Addr J_MakePoint clearfix  J_DefaultAddr '>
                    <s class='J_Marker marker'></s>
                    <span class='marker-tip'>寄送至</span>
                    <div class='address-info'>
                        <a href='#' class='J_Modify modify J_MakePoint' data-point-url='http://log.mmstat.com/buy.1.21'>修改本地址</a>
                        <input name='address'
                        class='J_MakePoint '
                        type='radio'
                        value='674944241'
                        id='addr$id'
                        data-point-url='http://log.mmstat.com/buy.1.20'
                        ah:params='id=674944241^^stationId=0^^address=$addr^^postCode=445000^^addressee=$name^^phone=^^mobile=$tel^^areaCode=422801'
                        checked='checked' >
                        <label for='addrId_674944241' class='user-address'>
                                $addr    ($name 收) <em>$tel</em>
                          </label>
                        <em class='tip' style='display: none'>默认地址</em>
                        <a class='J_DefaultHandle set-default J_MakePoint' href='/auction/update_address_selected_status.htm?addrid=674944241' style='display: none' data-point-url='http://log.mmstat.com/buy.1.18'>设置为默认收货地址</a>
                    </div>
                    </li>
                    ";
                }
                $con= consql();
                if( $con){
                    $sql="select * from touch where user_id=$user_id";
                    $res=mysqli_query($con,$sql);
                    while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                        drawliHTML($row);
                    }
                }
                ?>
                </ul>
                <ul id="J_MoreAddress" class="address-list hidden"></ul>
            </form>        
            </div>
            
    <form id="J_Form" name="J_Form" action="/auction/order/unity_order_confirm.htm" method="post">
    <div>
    <h3 class="dib">确认订单信息</h3>
    <table cellspacing="0" cellpadding="0" class="order-table" id="J_OrderTable" summary="统一下单订单信息区域">
        <caption style="display: none">统一下单订单信息区域</caption>
        <thead>
            <tr>
                <th class="s-title">店铺宝贝<hr/></th>
                <th class="s-price">单价(元)<hr/></th>
                <th class="s-amount">数量<hr/></th>
                <th class="s-agio">优惠方式(元)<hr/></th>
                <th class="s-total">小计(元)<hr/></th>
            </tr>
        </thead>
        <tbody data-spm="3" class="J_Shop" data-tbcbid="0" data-outorderid="47285539868"  data-isb2c="false" data-postMode="2" data-sellerid="1704508670">
            <tr class="first"><td colspan="5"></td></tr>
            <tr class="shop blue-line">
                <td colspan="2" class="promo">
                <div> <ul class="scrolling-promo-hint J_ScrollingPromoHint"></ul></div>
                </td>
            </tr>
           <?php
           function drawgoodsHTML($arr){
               $num=$arr['num'];
               $name=$arr['name'];
               $renum=$arr['renum'];
               $price=$arr['price'];
               $img=$arr['img'];
               $img=str_replace("../","",$img);
               $sumPrice=$num*$price;
               echo "<tr class='item' data-lineid='19614514619:31175333266:35612993875' data-pointRate='0'>
                <td class='s-title'>
                    <a href='#' target='_blank' title='$name' class='J_MakePoint' data-point-url='http://log.mmstat.com/buy.1.5'>
                    <span class='title J_MakePoint' data-point-url='http://log.mmstat.com/buy.1.5'>$name</span></a>
                    <div class='props'>
                        <span>剩余数量: $renum </span>
                    </div>
                    <a title='消费者保障服务，卖家承诺商品如实描述' href='#' target='_blank'>
                    <img src='$img'/>
                    </a>
                </td>
                <td class='s-price'>
                    <span class='price '><em class='style-normal-small-black J_ItemPrice'  >$price 元</em></span>
                    <input type='hidden' name='costprice' value='630.00' class='J_CostPrice' />
                </td>
                <td class='s-amount' data-point-url=''>$num
                        <input type='hidden' class='J_Quantity' value='1' name='19614514619_31175333266_35612993875_quantity'/>
                </td>
                <td class='s-agio'>
                    <div class='J_Promotion promotion' data-point-url=''>无优惠</div>
                </td>
                <td class='s-total'>

                  <span class='price '>
                <em class='style-normal-bold-red J_ItemTotal '  >$sumPrice</em>
                 </span>
                   <input id='furniture_service_list_b_47285539868' type='hidden' name='furniture_service_list_b_47285539868'/>
                </td>
            </tr>";
               return $sumPrice;
           }
            $goosdArr=array($_GET['goods_id']);
            $sumPrice=0;
            foreach($goosdArr as $a){
                $sql="select * from goods where id=$a";
                $res=mysqli_query($con,$sql);
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    $row['num']=$_GET['num'];
                     $sumPrice+=drawgoodsHTML($row);
                }
            }
           ?>



    <tr class="item-service">
     <td colspan="5" class="servicearea" style="display: none"></td>
    </tr>
    <tr class="blue-line" style="height: 2px;"><td colspan="5"></td></tr>
    <tr class="other other-line">
        <td colspan="5">
            <ul class="dib-wrap">
                <li class="dib user-info"><ul class="wrap">
                    <li>
                     <div class="field gbook">
                      <label class="label">给卖家留言：</label>
                      <textarea style="width:350px;height:80px;" title="选填：对本次交易的补充说明（建议填写已经和卖家达成一致的说明）" name=""></textarea>
                    </div>
                   </li>
                </ul></li>
                <li class="dib extra-info">
                    <div class="shoparea">
                        <ul class="dib-wrap">
                        <li class="dib title">店铺优惠：</li>
                        <li class="dib sel"><div class="J_ShopPromo J_Promotion promotion clearfix" data-point-url="http://log.mmstat.com/buy.1.16"></div></li>
                        <li class="dib fee">  <span class='price '>
                        -<em class="style-normal-bold-black J_ShopPromo_Result"  >0.00</em>
                         </span>
                        </li></ul>
                    </div>
                    <div class="shoppointarea"></div>
                    <div class="farearea">
                        <ul class="dib-wrap J_farearea">
                        <li class="dib title">运送方式：</li>
                        <li class="dib sel" data-point-url="http://log.mmstat.com/jsclick?cache=*&tyxd=wlysfs">
                            <input type="hidden" name="1704508670:2|actualPaidFee" value="0" class="J_ActualPaidFee" />
                            <input type="hidden" name="1704508670:2|codAllowMultiple" value="true"/>
                            <input type="hidden" name="1704508670:2|codSellerFareFee" value="" class="J_CodSellerFareFee"/>
                            <input type="hidden" name="1704508670:2|codServiceFeeRate" value="" class="J_CodServiceFeeRate"/>
                            <input type="hidden" name="1704508670:2|codPostFee" value="0" class="J_CodPostFee"/>
                              <select name="1704508670:2|post" class="J_Fare">
                                <option data-fare="1500" value=" 2 " data-codServiceType="2" data-level=""  selected="selected"  >
                            快递 30.00元 
                            </option>
                                </select>
                              <em tabindex="0" class="J_FareFree" style="display: none">免邮费</em>
                         </li>
                        <li class="dib fee">  <span class='price '>
                        <em class="style-normal-bold-red J_FareSum"  >30.00</em>
                         </span>
                       </li>
                       
 </ul>
 </div>
   <div class="extra-area">
 <ul class="dib-wrap">
 <li class="dib title">发货时间：</li>
 <li class="dib content">卖家承诺订单在买家付款后，72小时内<a href="#">发货</a></li>
 </ul>
 </div>
   
   <div class="servicearea" style="display: none"></div>
 </li>
 </ul>
 </td>
</tr>

<tr class="shop-total blue-line">
 <td colspan="5">店铺合计(<span class="J_Exclude" style="display: none">不</span>含运费<span class="J_ServiceText" style="display: none">，服务费</span>)：
   <span class='price g_price '>
 <span>&yen;</span><em class="style-middle-bold-red J_ShopTotal"  ><?php echo $sumPrice;?>元</em>
  </span>
  <input type="hidden" name="1704508670:2|creditcard" value="false" />
<input type="hidden" id="J_IsLadderGroup" name="isLadderGroup" value="false"/>

   </td>
</tr>
</tbody>
  <tfoot>
 <tr>
 <td colspan="5">

<div class="order-go" data-spm="4">
<div class="J_AddressConfirm address-confirm">
 <div class="kd-popup pop-back" style="margin-bottom: 40px;">
 <div class="box">
 <div class="bd">
 <div class="point-in">
   
   <em class="t">实付款：</em>  <span class='price g_price '>
 <span>&yen;</span><em class="style-large-bold-red"  id="J_ActualFee"  ><?php echo $sumPrice+30;?>元</em>
  </span>
</div>
     </div>
 </div>
         <a href="personal.php?type=3"
 class="back J_MakePoint" target="_top"
 data-point-url="">返回购物车</a>
       <a id="J_Go" class=" btn-go"  data-point-url=""  tabindex="0" title="点击此按钮，提交订单。">提交订单<b class="dpl-button"></b></a>
  </div>
 </div>

 <div class="J_confirmError confirm-error">
 <div class="msg J_shopPointError" style="display: none;"><p class="error">积分点数必须为大于0的整数</p></div>
 </div>


 <div class="msg" style="clear: both;">
 <p class="tips naked" style="float:right;padding-right: 0">若价格变动，请在提交订单后联系卖家改价，并查看已买到的宝贝</p>
 </div>
 </div>
 </td>
 </tr>
 </tfoot>
 </table>
</div>
  
 <input type="hidden" id="J_useSelfCarry" name="useSelfCarry" value="false" />
 <input type="hidden" id="J_selfCarryStationId" name="selfCarryStationId" value="0" />
 <input type="hidden" id="J_useMDZT" name="useMDZT" value="false" />
 <input type="hidden" name="useNewSplit" value="true" />
 <input type="hidden" id="J_sellerIds" name="allSellIds" value="1704508670" />
</form>
</div>

<div id="footer"></div>
</div>
<div style="text-align:center;">
</div>
<script src="JS/settlement.js"></script>
</body>
</html>
