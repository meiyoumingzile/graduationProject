package cn.com.lttc.loginui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Looper;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import net.tsz.afinal.FinalActivity;
import net.tsz.afinal.FinalHttp;
import net.tsz.afinal.annotation.view.ViewInject;
import net.tsz.afinal.http.AjaxCallBack;
import net.tsz.afinal.http.AjaxParams;

import java.util.HashMap;

public class RegisterActivity extends FinalActivity {
    @ViewInject(id=R.id.et_register_tel) EditText ed_tel;
    @ViewInject(id=R.id.et_register_username) EditText ed_name;
    @ViewInject(id=R.id.et_register_pwd_input) EditText ed_pwd;
    @ViewInject(id=R.id.et_register_agpwd_input) EditText ed_agpwd;
    @ViewInject(id=R.id.bt_register_submit, click="bn_reg_onClick")
    Button bn_reg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_register_step_two);
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
    public void bn_reg_onClick(View view) {
        String tel=ed_tel.getText().toString();
        String name=ed_name.getText().toString();
        String pwd=ed_pwd.getText().toString();
        String agpwd=ed_agpwd.getText().toString();
        if(tel.equals("")){
            tu("填写手机号");
        }else if(name.equals("")){
            tu("填写用户名");
        }else if(pwd.length()<6){
            tu("密码太短");
        }else if(!pwd.equals(agpwd)){
            tu("两次密码必须一致");
        }else{
            FinalHttp fh = new FinalHttp();
            String url = MainActivity.selfip+"car/register.php";
            AjaxParams params = new AjaxParams();
            params.put("name",  name);
            params.put("tel", tel);
            params.put("pwd",  pwd);
            params.put("jur", "1");
            params.put("__key", "name,tel,pwd,jur");
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
                    if(t.lastIndexOf("yes")!=-1){
                        Toast.makeText(RegisterActivity.this, "注册成功", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(RegisterActivity.this, MainActivity.class));
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
       // startActivity(new Intent(RegisterActivity.this,MainActivity.class));
    }
}