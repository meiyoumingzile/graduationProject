package cn.com.lttc.loginui;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;
import android.support.v7.app.AlertDialog;
import net.tsz.afinal.FinalActivity;
import net.tsz.afinal.FinalHttp;
import net.tsz.afinal.annotation.view.ViewInject;
import net.tsz.afinal.http.AjaxCallBack;
import net.tsz.afinal.http.AjaxParams;
import android.os.Bundle;
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
import java.util.Set;

public class rememberActivity extends FinalActivity implements View.OnTouchListener,GestureDetector.OnGestureListener {
    int dataCnt=10,beginID=0;
    int FLING_MIN_VELOCITY=100;//触摸时候的移动速度
    @ViewInject(id=R.id.myLayout_id)LinearLayout mylayout;
    private GestureDetector mGestureDetector;
    String keyList[]={"id","op_time","car_id","user_name","operate_name"};//,"electricity","Remarks"
    @ViewInject(id=R.id.bt_page_left, click="bn_page_left_onClick")
    Button bn_page_left;
    @ViewInject(id=R.id.bt_page_right, click="bn_page_right_onClick")
    Button bn_page_right;
    @ViewInject(id=R.id.tx_page)TextView tx_page;
    final int txID[]={R.id.tx_id,R.id.tx_time, R.id.tx_cid, R.id.tx_name,R.id.tx_op};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_remember);
        //overridePendingTransition(R.drawable.in_from_right, R.drawable.out_to_left);
        this.flushData();
        findView();
    }

    private void findView() {
        mylayout.setOnTouchListener(this);
        mylayout.setLongClickable(true);
        mGestureDetector = new GestureDetector(this, this);
    }

    public void tu(String s){
        Toast.makeText(this, s, Toast.LENGTH_SHORT).show();
        Looper.loop();
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
    void flushData(){
        if(beginID<0)
            beginID=0;;
        FinalHttp fh=new FinalHttp();
        String url = MainActivity.selfip+"car/getMyremember.php";
        AjaxParams params = new AjaxParams();
        params.put("beginID",beginID+"");
        params.put("dataCnt", dataCnt+"");
        params.put("user_name", readFile("/mnt/sdcard/stateName.txt"));
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
                try {
                    JSONArray jsonArray =new JSONArray(t);
                    ViewGroup tableTitle = (ViewGroup) findViewById(R.id.table_title);
                    tableTitle.setBackgroundColor(Color.rgb(177, 173, 172));
                    List<Map> list = new ArrayList<Map>();
                    for(int i=0;i<jsonArray.length();i++){
                        JSONObject obj=jsonArray.getJSONObject(i);
                        String[] str=new String[keyList.length];
                        Map<String,String> dir = new HashMap<String,String>();
                        for(int j=0;j<keyList.length;j++){
                            dir.put(keyList[j],obj.getString(keyList[j]));
                        }
                        list.add(dir);
                    }
                    if(list.size()>0){
                        ListView tableListView = (ListView) findViewById(R.id.list);

                        // final TableAdapter adapter = new TableAdapter( DisplayActivity.this,keyList,list,list);
                        final TableAdapter adapter = new TableAdapter(rememberActivity.this,R.layout.rem_list_item,txID,keyList,list);
                        tableListView.setAdapter(adapter);
                        tx_page.setText("page:"+(beginID/dataCnt+1));
                        tableListView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener(){

                            @Override
                            public boolean onItemLongClick(final AdapterView<?> parent, View view,
                                                           final int position, long id) {
                                //定义AlertDialog.Builder对象，当长按列表项的时候弹出确认删除对话框
                                AlertDialog.Builder builder=new AlertDialog.Builder(rememberActivity.this);
                                builder.setMessage("确定删除数据id="+adapter.list.get(position).get("id"));
                                builder.setTitle("提示");
                                // tu(id+"");
                                //添加AlertDialog.Builder对象的setPositiveButton()方法
                                builder.setPositiveButton("确定", new AlertDialog.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        deleteData(adapter.list.get(position).get("id")+"");
                                    }
                                });

                                //添加AlertDialog.Builder对象的setNegativeButton()方法
                                builder.setNegativeButton("取消", new AlertDialog.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) { }
                                });

                                builder.create().show();
                                return false;
                            }
                        });
                    }else{
                        beginID-=dataCnt;
                        if(beginID<0)
                            beginID=0;
                    }
                } catch (JSONException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(Throwable t, int errorNo, String strMsg) {
                // TODO Auto-generated method stub
                super.onFailure(t, errorNo, strMsg);
                tu("网络异常");
            }
        });
    }
    void deleteData(String s){
        FinalHttp fh=new FinalHttp();
        String url = MainActivity.selfip+"car/delMyremember.php";
        AjaxParams params = new AjaxParams();
        params.put("condition","id="+s);
        fh.post(url, params,new AjaxCallBack<String>() {
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

                flushData();
            }

            @Override
            public void onFailure(Throwable t, int errorNo, String strMsg) {
                super.onFailure(t, errorNo, strMsg);
                tu("网络异常");
            }

        });
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
            startActivity(new Intent(rememberActivity.this, DisplayActivity.class));
            finish();
        }else if(Math.abs((int) (e1.getX() - e2.getX())) > FLING_MIN_DISTANCE && velocityX < -FLING_MIN_VELOCITY){//左滑跳到记录界面
            startActivity(new Intent(rememberActivity.this, controlActivity.class));
            finish();
        }
        return false;
    }

    //实现OnTouchListener接口中的方法
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        return mGestureDetector.onTouchEvent(event);
    }





    void bn_page_left_onClick(View view){
        beginID-=dataCnt;
        flushData();
    }
    void bn_page_right_onClick(View view){
        beginID+=dataCnt;
        flushData();
    }

}
