package cn.com.lttc.loginui;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.view.Display;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Toast;

import net.tsz.afinal.FinalActivity;
import net.tsz.afinal.FinalHttp;
import net.tsz.afinal.annotation.view.ViewInject;
import net.tsz.afinal.http.AjaxCallBack;
import net.tsz.afinal.http.AjaxParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class controlActivity extends FinalActivity implements WheelView.WheelClickListener ,View.OnTouchListener,GestureDetector.OnGestureListener{
    int FLING_MIN_VELOCITY=100;//触摸时候的移动速度
    @ViewInject(id=R.id.myLayout_id)LinearLayout mylayout;
    private GestureDetector mGestureDetector;

    @ViewInject(id=R.id.et_cid)
    EditText et_cid;
    @ViewInject(id=R.id.bt_shoot, click="bn_onClick") Button bn_shoot;
    @ViewInject(id=R.id.bt_drive, click="bn_onClick") Button bn_drive;
    @ViewInject(id=R.id.bt_photo, click="bn_onClick") Button bn_photo;
    @ViewInject(id=R.id.bt_sensor, click="bn_onClick") Button bn_sensor;
    private WheelView wheel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_control);
        wheel = (WheelView) findViewById(R.id.ctrls);
        wheel.setWheelClickListener(this);
        mylayout.setOnTouchListener(this);
        mylayout.setLongClickable(true);
        mGestureDetector = new GestureDetector(this, this);
    }

    @Override
    public void onWheelClick(int type) {
        switch (type) {
            case WheelView.CLICK_BOTTOM_DOWN:
                //下面按钮按下的时候
                issue("behind");
                break;
            case WheelView.CLICK_LEFT_DOWN:
                //左边按钮按下的时候
                issue("left");
                break;
            case WheelView.CLICK_RIGHT_DOWN:
                //右边按钮按下的时候
                issue("right");
                break;
            case WheelView.CLICK_TOP_DOWN:
                //上面按钮按下的时候
                issue("front");
                break;
            case WheelView.CLICK_BOTTOM_UP:
                //下面按钮按下抬起的时候
                break;
            case WheelView.CLICK_LEFT_UP:
                //左边按钮按下抬起的时候
                break;
            case WheelView.CLICK_RIGHT_UP:
                //右边按钮按下抬起的时候
                break;
            case WheelView.CLICK_TOP_UP:
                //上面按钮按下抬起的时候
                break;
        }
    }

    public void bn_onClick(View view) {
        if(et_cid.length()==0){
            return ;
        }
        if( view.getId()==R.id.bt_shoot){
            if(bn_shoot.getText().toString().equals("开启视频")){
                bn_shoot.setText("关闭视频");
                issue("open_shoot");
            }else if(bn_shoot.getText().toString().equals("关闭视频")){
                bn_shoot.setText("开启视频");
                issue("close_shoot");
            }
        }else if(view.getId()==R.id.bt_drive){
            if(bn_drive.getText().toString().equals("自动驾驶")){
                bn_drive.setText("关闭自动驾驶");
                issue("open_drive");
            }else if(bn_drive.getText().toString().equals("关闭自动驾驶")){
                bn_drive.setText("自动驾驶");
                issue("close_drive");
            }
        }else if(view.getId()==R.id.bt_photo){
            issue("photo");
        }else if(view.getId()==R.id.bt_sensor){
            if(bn_sensor.getText().toString().equals("开启传感器")){
                bn_sensor.setText("关闭传感器");
                issue("open_sensor");
            }else if(bn_sensor.getText().toString().equals("关闭传感器")){
                bn_sensor.setText("开启传感器");
                issue("close_sensor");
            }
        }
    }

    //按下就触发
    @Override
    public boolean onDown(MotionEvent e){
        //flushData();
        return false;
    }

    //短按触摸屏
    @Override
    public void onShowPress(MotionEvent e) {}

    //点击屏幕后抬起时触发该事件
    @Override
    public boolean onSingleTapUp(MotionEvent e) {
        return false;
    }

    //在屏幕上拖动控件
    @Override
    public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
        return false;
    }

    //长按触摸屏
    @Override
    public void onLongPress(MotionEvent e) { }

    //滑屏，用户按下触摸屏、快速移动后松开，由1个MotionEvent ACTION_DOWN, 多个ACTION_MOVE, 1个        //ACTION_UP触发；参数分别表示：按下事件、抬起事件、x方向移动速度、y方向移动速度。   
    @Override
    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
        final int FLING_MIN_DISTANCE = 100;
        if (Math.abs((int) (e1.getX() - e2.getX())) > FLING_MIN_DISTANCE && velocityX > FLING_MIN_VELOCITY) {//右滑跳到控制界面
            startActivity(new Intent(controlActivity.this, rememberActivity.class));
            finish();
        }else if(Math.abs((int) (e1.getX() - e2.getX())) > FLING_MIN_DISTANCE && velocityX < -FLING_MIN_VELOCITY){//左滑跳到记录界面
            startActivity(new Intent(controlActivity.this, DisplayActivity.class));
            finish();
        }
        return false;
    }

    //实现OnTouchListener接口中的方法
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        return mGestureDetector.onTouchEvent(event);
    }



    private String readFile(String path) {
        MainActivity.verifyStoragePermissions(this);
        File file = new File(path);
        //如果path是传递过来的参数，可以做一个非目录的判断
        if (file.isDirectory()) {
            // Log.d("TestFile", "The File doesn't not exist.1");
        }else {
            try {
                InputStream instream = new FileInputStream(file);
                if (instream != null) {
                    InputStreamReader inputreader = new InputStreamReader(instream);
                    BufferedReader buffreader = new BufferedReader(inputreader);
                    String line=buffreader.readLine();
                    instream.close();
                    return line;
                }
            } catch (java.io.FileNotFoundException e) {
                //Log.d("TestFile", "The File doesn't not exist.2");
            } catch (IOException e) {
                //Log.d("TestFile", e.getMessage());
            }
        }
        return "";
    }
    public  void writeFile(String path,String str){
        /*
         * 首先安卓下写文件要到sd卡位置是/mnt/sdcard/
         * 还要注册权限，在AndroidManifest.xml中
         */
        MainActivity.verifyStoragePermissions(this);
        try {
            File file=new File(path);

            FileOutputStream outStream = new FileOutputStream(file);
            outStream.write(str.getBytes());
            outStream.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    void issue(String order){
        if(order.length()==0)
            return ;
        String cid=et_cid.getText().toString();
        FinalHttp fh=new FinalHttp();
        String url = MainActivity.selfip+"car/addMyremember.php";
        AjaxParams params = new AjaxParams();
        params.put("op_time", "now()");
        params.put("car_id",cid);
        params.put("user_name", readFile("/mnt/sdcard/stateName.txt"));
        params.put("operate_name", order);
        params.put("__key", "op_time,car_id,user_name,operate_name");
        fh.post(url, params,new AjaxCallBack<String>(){
            @Override
            public void onStart() {
                super.onStart();
            }

            @Override
            public void onLoading(long count, long current) {
                super.onLoading(count, current);
            }

            @Override
            public void onSuccess(String t) {
                // TODO Auto-generated method stub
                super.onSuccess(t);
            }

            @Override
            public void onFailure(Throwable t, int errorNo, String strMsg) {
                // TODO Auto-generated method stub
                super.onFailure(t, errorNo, strMsg);
                tu("网络异常");
            }
        });
    }
    public void tu(String s){
        Toast.makeText(this, s, Toast.LENGTH_SHORT).show();
        Looper.loop();
    }
}
