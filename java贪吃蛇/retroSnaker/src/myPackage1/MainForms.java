package myPackage1;

import java.awt.Color;
import java.awt.Graphics;
import java.util.Arrays;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

@SuppressWarnings("serial")
public class MainForms extends JFrame implements KeyListener,Runnable{
	public static MainForms main;
	static v2 size=new v2(1080,740);
	public int delay=50;
	public boolean isSuspend=true;
	Sence sence=null;
	private Thread thread=new Thread(this);///������Ҫ�����̣߳���ͼ�Ĳ����߳�
	
	
	public static void main(String[] args){
		new MainForms();
	}
	
	public MainForms(){
		
		main=this;
		this.setTitle("PacMan");
		this.setSize(size.x,size.y);
		int w=Toolkit.getDefaultToolkit().getScreenSize().width;//��õ��Գ���
		int h=Toolkit.getDefaultToolkit().getScreenSize().height;
		this.setLocation((w-1000)/2,(h-770)/2);//����λ�ã������Ͻ�Ϊ׼������Ļ���Ͻ��ǣ�0��0��
		this.setResizable(false);
		InitMaterial init=new InitMaterial();
		InitMaterial.in();
		this.sence=new Sence();
		//this.mali=new Mali(0,480);
		
		
		this.repaint();
		this.addKeyListener(this);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setVisible(true);
		
		//this.thread.start();
	}
	
	public void paint(Graphics g){
		
		//�ص㣡��˫���弼��,������Ļ��С��ͼƬimage������ѡ����ͨ��ԭɫBufferedImage.TYPE_3BYTE_BGR��
		BufferedImage image=new BufferedImage(size.x,size.y,BufferedImage.TYPE_3BYTE_BGR);
		Graphics g2=image.getGraphics();//�������ʶ�������������ͼƬ;	
		g2.drawImage(InitMaterial.pic_bg,0,0,size.x,size.y,this);
		for(int i=0;i<this.sence.ob.size();i++){
			//System.out.println(this.sence.ob.get(i).pos.x+" "+this.sence.ob.get(i).pos.y+"\n");
			g2.drawImage(this.sence.ob.get(i).show,this.sence.ob.get(i).pos.x,this.sence.ob.get(i).pos.y,this);
		}
		for(int i=0;i<this.sence.food.size();i++){
			g2.drawImage(this.sence.food.get(i).show,this.sence.food.get(i).pos.x,this.sence.food.get(i).pos.y,this);
		}
		
		for(int i=0;i<this.sence.snake1.list.size();i++){
			g2.drawImage(this.sence.snake1.list.get(i).show,this.sence.snake1.list.get(i).pos.x
					,this.sence.snake1.list.get(i).pos.y,this);
		}
		g2.setColor(new Color(255,0,0));
		v2 d=new v2(0,0);
		for(int i=0;i<this.sence.snake1.list.size();i++){
			g2.drawString(i+"",this.sence.snake1.list.get(i).pos.x+10,this.sence.snake1.list.get(i).pos.y+20);
		}
		
		for(int i=0;i<this.sence.snake2.list.size();i++){
			g2.drawImage(this.sence.snake2.list.get(i).show,this.sence.snake2.list.get(i).pos.x
					,this.sence.snake2.list.get(i).pos.y,this);
		}
		g.drawImage(image,0,0,this);
	}

	@Override
	public void run() {
		while(true){
			this.repaint();
			if(this.sence.snake1.isDie||this.sence.snake2.isDie){
				try {
					Thread.sleep(100000);
				} catch (InterruptedException e){
					e.printStackTrace();
				}
			}
			for(int i=0;i<this.sence.food.size();i++){//�Ե�ˮ��
				if(this.sence.snake1.list.get(0).VisCollision(this.sence.food.get(i).pos)==true){	
					this.sence.snake1.add(1);
					this.sence.removeFood(i);
					this.sence.addFood();
				}
				if(this.sence.snake2.list.get(0).VisCollision(this.sence.food.get(i).pos)==true){	
					this.sence.snake2.add(1);
					this.sence.removeFood(i);
					this.sence.addFood();
				}
			}
			
		}	
	}

	@Override
	public void keyPressed(KeyEvent e) {
		/*if (e.getKeyCode()==KeyEvent.VK_DOWN ){
            this.sence.snake2.move(new v2(0,1));//�������Ҫ��������������1������-1
        }else if(e.getKeyCode()==KeyEvent.VK_UP){
        	this.sence.snake2.move(new v2(0,-1));
        }else if(e.getKeyCode()==KeyEvent.VK_RIGHT){
        	this.sence.snake2.move(new v2(1,0));
        }else if(e.getKeyCode()==KeyEvent.VK_LEFT){
        	this.sence.snake2.move(new v2(-1,0));
        }else{

        }*/
		if(e.getKeyCode()==32&&this.isSuspend){
			this.thread.start();
			this.sence.snake1.thread.start();
			this.isSuspend=false;
		}else if(e.getKeyCode()==32&&this.isSuspend==false){
			//this.sence.snake1.thread.start();
		}
        this.repaint();
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		// TODO �Զ����ɵķ������
		
	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO �Զ����ɵķ������
		
	}
}
