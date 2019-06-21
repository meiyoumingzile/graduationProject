package cn.com.lttc.loginui;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Looper;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import net.tsz.afinal.FinalActivity;
import net.tsz.afinal.FinalHttp;
import net.tsz.afinal.annotation.view.ViewInject;
import net.tsz.afinal.http.AjaxCallBack;
import net.tsz.afinal.http.AjaxParams;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class MainActivity extends FinalActivity {
    private String TAG = "ifu25";
    private final int REQUESTCODE = 101;
    @ViewInject(id=R.id.bt_login_submit, click="bn_submit_onClick") Button bn_submit;
    @ViewInject(id=R.id.bt_login_register, click="bn_reg_onClick") Button bn_reg;
    @ViewInject(id=R.id.et_login_username) EditText ed_name;
    @ViewInject(id=R.id.et_login_pwd) EditText ed_pwd;
    @ViewInject(id=R.id.cb_remember_login) CheckBox  cb_reName;
    FinalHttp fh;
    public static String selfip="http://10.0.2.2:8080"+"/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_login);
        ed_name.setText(readFile("/mnt/sdcard/yourUserName.txt"));
        ed_pwd.setText(readFile("/mnt/sdcard/yourUserPwd.txt"));
        fh = new FinalHttp();
    }

    private String readFile(String path) {
        verifyStoragePermissions(this);
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
        verifyStoragePermissions(this);
        try {
            File  file=new File(path);

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
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };
    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(activity, PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE);
        }
    }
    public void tu(String s){
		/*
		 * 在非主线程中使用吐司要加以下代码
		Looper.prepare();Looper.loop();
		Looper用于封装了android线程中的消息循环，默认情况下一个线程是不存在消息循环（message loop）的，
		需要调用Looper.prepare()来给线程创建一个消息循环，调用Looper.loop()来使消息循环起作用，
		使用Looper.prepare()和Looper.loop()创建了消息队列就可以让消息处理在该线程中完成。
		Looper.loop();是把消息放入队列，无限循环，有消息就执行，没有就让出cpu给其他任务
		*/

        Toast.makeText(this, s, Toast.LENGTH_SHORT).show();
        Looper.loop();
    }
    public void bn_submit_onClick(View view) {
        String myname=ed_name.getText().toString();
        String mypwd=ed_pwd.getText().toString();
        if(TextUtils.isEmpty(myname)||TextUtils.isEmpty(mypwd)){//检查字符串是否为空
            Toast.makeText(this, "用户名称或者密码不能是空", Toast.LENGTH_SHORT).show();
        }else{
            this.Save();
            String url = selfip+"car/logon.php";
            AjaxParams params = new AjaxParams();
            params.put("name",  myname);
            params.put("pwd", mypwd);
            fh.post(url, params,new AjaxCallBack<String>(){
                @Override
                public void onStart() {
                    // TODO Auto-generated method stub
                    super.onStart();
                }

                @Override
                public void onLoading(long count, long current) {
                    // TODO Auto-generated method stub
                    super.onLoading(count, current);
                    //请求响应过程中会执行此方法，每隔1秒自动回调一次
                    //ed_name.setText(current + "/" + count);
                }

                @Override
                public void onSuccess(String t) {
                    // TODO Auto-generated method stub
                    super.onSuccess(t);
                    if(t.lastIndexOf("ac")!=-1){
                        writeFile("/mnt/sdcard/stateName.txt",ed_name.getText().toString());
                        startActivity(new Intent(MainActivity.this, DisplayActivity.class));
                        finish();
                    }else{
                        tu(t);
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
    }
    public void bn_reg_onClick(View view) {
        startActivity(new Intent(MainActivity.this, RegisterActivity.class));
    }

    protected void onDestroy() {
        super.onDestroy();
        this.Save();
    }
    /*
     * 登录按钮点击事件,在按钮上添加监听
     */
    public void Save(){
        /*
         * 首先安卓下写文件要到sd卡位置是/mnt/sdcard/
         * 还要注册权限，在AndroidManifest.xml中
         */
        String myname=ed_name.getText().toString();
        String mypwd=ed_pwd.getText().toString();
        writeFile("/mnt/sdcard/yourUserName.txt",cb_reName.isChecked()?myname:"");
        writeFile("/mnt/sdcard/yourUserPwd.txt",cb_reName.isChecked()?mypwd:"");
    }
    /*private void showToast(int msg) {
        if (null != mToast) {
            mToast.setText(msg);
        } else {
            mToast = Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT);
        }

        mToast.show();
    }*/
}
