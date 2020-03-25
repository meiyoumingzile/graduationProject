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
	private int Gi=0;//ѭ����ͼ��������
	private int lim=450;//�ܵ�����Ļ�ļ���
	public int  getmapx() {	return mapx;}
	public void setmapx(int mapx) {	this.mapx = mapx;}
	public int  getmapy() {	return mapy;}
	public void setmapy(int mapy) {	this.mapy = mapy;}

	public static int  nowx=0;
	//һ��Ground���������//�����Ż��峡��
	BufferedImage image;
	private List<Ground>allBG=new ArrayList<Ground>();//һ��Ground����
	
	private Mali mali=null;
	
	private boolean begin=false;
	
	public boolean isbegin(){	return begin;	}
	public void setbegin(boolean begin) {	this.begin = begin;}

	//��ǰҪ��ʵ�ĳ�����
	private Ground now=null;
	private Thread t=new Thread(this);///������Ҫ�����̣߳���ͼ�Ĳ����߳�
	
	public static void main(String[] args){
		new malipro();
		//new Ground().ground(1,true);
	}
	
	public static void play(){
		
		}
	
	public malipro(){	
		
		// AudioClip sound1 = java.applet.Applet.newAudioClip(file1); 
		 // sound1.play();
		this.setTitle("������������������");
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
		this.mali.setbg(now);//�����Ŀǰ�ϰ����Mali���е�bg������Ҫע��˲���������ÿ�λ�ͼ֮ǰ������ᵼ�½��̳�ͻ
		this.repaint();
		this.addKeyListener(this);
		
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setVisible(true);
		
		t.start();
		
	}
	
	
	public void paint(Graphics g) {
		//�ص㣡��˫���弼��,������Ļ��С��ͼƬimage������ѡ����ͨ��ԭɫBufferedImage.TYPE_3BYTE_BGR��
		BufferedImage image=new BufferedImage(900,600,BufferedImage.TYPE_3BYTE_BGR);
		Graphics g2=image.getGraphics();//�������ʶ�������������ͼƬ;	
		//g2.drawImage(this.now.getbg(),0,0,900,600,0,0,900,600,this);//���Ʊ���
		g2.drawImage(Sucai.f,0,0,900,600,0+this.mapx,0,225+this.mapx,150,this);
		g2.drawString("������"+this.mali.getlife(),200,100);
		g2.drawString("����"+this.mali.getfen(),400,100);
		
		//����Ƿ�ʼ=false;
		if(!begin){
			g2.drawImage(Sucai.start,0,0,900,600,0,0,900,600,this);
		//	g2.drawImage(Sucai.start,0,0,900-mapx,600,0,0,900,600,this);
		}else{
		/*�����������ϰ���
		�Ȼ��Ƶذ�
		 */
		//����
		//Iterator<Foe>iterFoe=this.now.getdr().iterator();
		//while(iterFoe.hasNext()){
		for(int i=0;i<this.now.getdr().size();i++){
			Foe e=this.now.getdr().get(i);
			if(e.getx()>=-300&&e.gety()>=-300&&e.getx()<=1200&&e.gety()<=900)
				g2.drawImage(e.getshow(),e.getx(),e.gety(),this);
		}
		//�����ϰ���
		Iterator<OB>iter=this.now.getzaw().iterator();
		while(iter.hasNext()){
			OB obb=iter.next();
			if(obb.getx()>=-300&&obb.gety()>=-300&&obb.getx()<=1200&&obb.gety()<=900)
				g2.drawImage(obb.getshow(),obb.getx(),obb.gety(),this);
		}
		//��������������ȫ��ͼƬ
		    g2.drawImage(this.mali.getshow(),this.mali.getx(),this.mali.gety(),this);
		
		//����ȫ������,������Ҫ�ù��ӵ�ס������Ҫ�����ϰ���ǰ�Ȼ���ˣ�����еĵ�����Ҫ��������ȫ���Է��ŵ���������
		//Iterator<Foe>iterFoe=this.now.getdr().iterator();
		//while(iterFoe.hasNext()){
		//	Foe e=iterFoe.next();
		//	g2.drawImage(e.getshow(),e.getx(),e.gety(),this);
		//}
				
		//��������Ҫ�ɻ���ͼƬ����������:
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
		//�жϰ���
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
			if(this.mali.getx()>=lim){//�����������л�һ������
				//this.now=this.allBG.get(this.now.getgsort());
				//�������ƶ�һ��
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
				JOptionPane.showMessageDialog(this,"��Ϸ������");
					System.exit(0);
				}
		} catch (InterruptedException e){
			e.printStackTrace();
		}
		}
	}
}
