package malichuangti;

import java.applet.Applet;
import java.applet.AudioClip;
import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class malipro extends JFrame implements KeyListener,Runnable{
	
	private int mapx=0,mapy;
	private int Gi=0;//循环地图背景次数
	private int lim=450;//能到达屏幕的极限
	public int  getmapx() {	return mapx;}
	public void setmapx(int mapx) {	this.mapx = mapx;}
	public int  getmapy() {	return mapy;}
	public void setmapy(int mapy) {	this.mapy = mapy;}

	public static int  nowx=0;
	//一个Ground类的容器，//用来放缓冲场景
	BufferedImage image;
	private List<Ground>allBG=new ArrayList<Ground>();//一个Ground数组
	
	private Mali mali=null;
	
	private boolean begin=false;
	
	public boolean isbegin(){	return begin;	}
	public void setbegin(boolean begin) {	this.begin = begin;}

	//当前要现实的场景；
	private Ground now=null;
	private Thread t=new Thread(this);///这里需要加入线程，绘图的操作线程
	
	public static void main(String[] args){
		new malipro();
		//new Ground().ground(1,true);
	}
	
	public static void play(){
		
		}
	
	public malipro(){	
		
		// AudioClip sound1 = java.applet.Applet.newAudioClip(file1); 
		 // sound1.play();
		this.setTitle("超级玛丽！！！！！");
		this.setSize(900,600);
		int w=Toolkit.getDefaultToolkit().getScreenSize().width;
		int h=Toolkit.getDefaultToolkit().getScreenSize().height;
		this.setLocation((w-900)/2,(h-600)/2);
		this.setResizable(false);
		Sucai f=new Sucai();
		Sucai.in();
		//this.mali=new Mali(0,480);
		for(int i=1;i<=3;i++){
			this.allBG.add(new Ground(i,i==3?true:false));		
		}
		this.mali=new Mali(0,0);
		this.now=this.allBG.get(0);
		this.mali.setbg(now);//把面板目前障碍物给Mali类中的bg对象，需要注意此操作必须在每次绘图之前，否则会导致进程冲突
		this.repaint();
		this.addKeyListener(this);
		
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setVisible(true);
		
		t.start();
		
	}
	
	
	public void paint(Graphics g) {
		//重点！！双缓冲技术,缓冲屏幕大小的图片image，类型选择普通三原色BufferedImage.TYPE_3BYTE_BGR；
		BufferedImage image=new BufferedImage(900,600,BufferedImage.TYPE_3BYTE_BGR);
		Graphics g2=image.getGraphics();//创建画笔对象来接收所有图片;	
		//g2.drawImage(this.now.getbg(),0,0,900,600,0,0,900,600,this);//绘制背景
		g2.drawImage(Sucai.f,0,0,900,600,0+this.mapx,0,225+this.mapx,150,this);
		g2.drawString("生命："+this.mali.getlife(),200,100);
		g2.drawString("分数"+this.mali.getfen(),400,100);
		
		//如果是否开始=false;
		if(!begin){
			g2.drawImage(Sucai.start,0,0,900,600,0,0,900,600,this);
		//	g2.drawImage(Sucai.start,0,0,900-mapx,600,0,0,900,600,this);
		}else{
		/*接下来绘制障碍物
		先绘制地板
		 */
		//敌人
		//Iterator<Foe>iterFoe=this.now.getdr().iterator();
		//while(iterFoe.hasNext()){
		for(int i=0;i<this.now.getdr().size();i++){
			Foe e=this.now.getdr().get(i);
			if(e.getx()>=-300&&e.gety()>=-300&&e.getx()<=1200&&e.gety()<=900)
				g2.drawImage(e.getshow(),e.getx(),e.gety(),this);
		}
		//绘制障碍物
		Iterator<OB>iter=this.now.getzaw().iterator();
		while(iter.hasNext()){
			OB obb=iter.next();
			if(obb.getx()>=-300&&obb.gety()>=-300&&obb.getx()<=1200&&obb.gety()<=900)
				g2.drawImage(obb.getshow(),obb.getx(),obb.gety(),this);
		}
		//接下来会致玛丽全部图片
		    g2.drawImage(this.mali.getshow(),this.mali.getx(),this.mali.gety(),this);
		
		//绘制全部敌人,由于需要用管子挡住花则需要绘制障碍物前先绘敌人，如果有的敌人需要后画这里完全可以分着单独画敌人
		//Iterator<Foe>iterFoe=this.now.getdr().iterator();
		//while(iterFoe.hasNext()){
		//	Foe e=iterFoe.next();
		//	g2.drawImage(e.getshow(),e.getx(),e.gety(),this);
		//}
				
		//接下来还要吧缓冲图片画到窗口中:
		}
		g.drawImage(image,0,0,this);
	}
	
	public void keyPressed(KeyEvent e) {
		if(begin){
			if(e.getKeyCode()==39){
				this.mali.rimove();	
			}
			
			if(e.getKeyCode()==37){
				this.mali.lemove();	
			}
			
			if(e.getKeyCode()==32){
				this.mali.jump(15,15);
				
			}else if(e.getKeyCode()==38){
				this.mali.jump(10,10);
				
			}
			
		}else{
			if(e.getKeyCode()==10)
				begin=true;
				this.mali.setlife(3);
				this.mali.setfen(0);
				this.now.foebegin();
		}
	}

	public void keyReleased(KeyEvent e) {
		//判断按键
		if(begin){
			if(e.getKeyCode()==39){			
				this.mali.ristop();
				
			}
			if(e.getKeyCode()==37){
				this.mali.lestop();
			}
		
		}
		
	}

	public void keyTyped(KeyEvent arg0){}
	
	public void run() {
		while(true){
		this.repaint();
		try {
			Thread.sleep(50);		
			if(this.mali.getx()>=lim){//满足条件则切换一个场景
				//this.now=this.allBG.get(this.now.getgsort());
				//将场景移动一个
				this.mali.setx(this.mali.getx()-5);
				if(Gi<=4){
					this.mapx+=5;
					this.nowx+=5;
					if(mapx>=675){
						Gi++;
						mapx=0;
					}
				}else {
					lim=901;
					
				}
				//System.out.println(this.now.getzaw().get(67).getx());
				for(int i=0;i<this.now.getzaw().size();i++){
					
					this.now.getzaw().get(i).setx(this.now.getzaw().get(i).getx()-5);
					this.now.getzaw().get(i).setsx(this.now.getzaw().get(i).getsx()-5);
					this.now.getzaw().get(i).rilimx-=5;
					this.now.getzaw().get(i).lelimx-=5;
					
				}
				for(int i=0;i<this.now.getdr().size();i++){				
					this.now.getdr().get(i).setx(this.now.getdr().get(i).getx()-5);	
					this.now.getdr().get(i).setsx(this.now.getdr().get(i).getsx()-5);
				}
			
			}
			if(this.mali.getx()>=900){
				this.now.setgsort(2);
				this.mali.setx(0);
				this.mali.sety(480);
			}
			if(this.mali.isdead()){
				JOptionPane.showMessageDialog(this,"游戏结束！");
					System.exit(0);
				}
		} catch (InterruptedException e){
			e.printStackTrace();
		}
		}
	}
}
