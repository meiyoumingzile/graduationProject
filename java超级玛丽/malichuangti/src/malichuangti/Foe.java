package malichuangti;

import java.awt.image.BufferedImage;

public class Foe implements Runnable{//�����ǻᶯ�ģ���Ҫ�̣߳�
	private int x,y,type;
	public void setx(int x) 	  {	this.x = x;		 }
	public void sety(int y) 	  {	this.y = y;		 }
	public void settype(int type) {	this.type = type;}
	public int getx() {		return x;	}
	public int gety() {		return y;	}
	public int gettype(){	return type;}
	
	private int uptime=0;
	public static int dieting=0,diex,diey; 
	
	String st_dog;
	public String getst_dog() 			 {		return st_dog;	}
	public void setst_dog(String st_dog) {	this.st_dog = st_dog;}

	private String sst;//��ʼ�ķ���
	private int ysudu_dog=5;
	private int xsudu_dog=5;
	
	private String st_hua;
	
	private int sx,sy;//��ʼλ��
	private int rilimx=0,uplimy=0;//////��������
	private int lelimx=0,downlimy=0;
	public int getsx() {	return sx;}
	public void setsx(int sx) {	this.sx = sx;}
	public int getsy() {	return sy;}
	public void setsy(int sy) {	this.sy = sy;}
	public int getrilimx() {	return rilimx;}
	public void setrilimx(int rilimx) {	this.rilimx = rilimx;}
	public int getuplimy() {	return uplimy;}
	public void setuplimy(int uplimy) {	this.uplimy = uplimy;}
	public int getlelimx() {	return lelimx;}
	public void setlelimx(int lelimx) {	this.lelimx = lelimx;}
	public int getdownlimy() {	return downlimy;}
	public void setdownlimy(int downlimy) {	this.downlimy = downlimy;}

	
	private BufferedImage show=null;
	public BufferedImage getshow() {	return show;}
	
	private Ground bg;
	public Ground getBg() {	        return bg;   }
	public void setBg(Ground bg){  this.bg=bg;   }

	//private boolean fp=true;//true��false��
	private int foenum=0;
	Thread t=new Thread(this);
	
	//
	public Foe(int x,int y,String st_dog,int type,Ground bg){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.sst=st_dog;
		this.type=type;
		this.bg=bg;
		this.x+=this.xsudu_dog;
		

		
		if(type==1){
			this.show=Sucai.dog.get(0);		
		}
		this.st_dog=st_dog;
		t.start();	
		t.suspend();//���̹߳һ�	
		
	}
	//���ع��췽������ʳ�˻�
	public Foe(int x,int y,String st_hua,int type,int uplimy,
			int downlimy,Ground bg		){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.sst=st_hua;
		this.uplimy=uplimy;
		this.downlimy=downlimy;
		this.st_hua="up";
		this.type=type;
		this.bg=bg;
		if(type==2){
			this.show=Sucai.hua.get(0);
			
		}
		t.start();
	}
	
	
	public void rimove(){
		if(this.st_dog.indexOf("zou")!=-1||this.st_dog!="stop"){
			xsudu_dog=0;
			this.st_dog="stop";
		}else if(this.st_dog=="stop"){
			xsudu_dog=10;
			this.st_dog="stop_right";	
		}
	}
	

	public void lemove(){
		if(this.st_dog.indexOf("zou")!=-1||this.st_dog!="stop"){
			xsudu_dog=0;
			this.st_dog="stop";
		}else if(this.st_dog=="stop"){
			xsudu_dog=-10;
			this.st_dog="stop_left";	
		}
		
	}
	
	
	public void jump(){

		
	}
	
	public int dogdown(){						
		ysudu_dog=10;				
		return ysudu_dog;
	}
	 
	
	public void run() {
	
		while(true){
			boolean canri=true,canle=true,//�жϿɷ��ƶ�������
					canupzhan=false,candown=false;
			if(type==1){//�жϵ������͸���������ʾ
				if(this.st_dog.indexOf("left")!=-1){//������
					this.x-=5;
				}else if(this.st_dog.indexOf("right")!=-1){//������
					this.x+=5;
				}
				
				//������ʾ����ͼƬ��,��
				if(st_dog=="die"){
					foenum=2;
				}else if(foenum==0){
					foenum=1;
				}else{
					foenum=0;
				}
				
				//�����Ƕ�������꼫��λ�ã�����Ҳ���԰�����ײ������
				/*if(this.fp&&this.x==this.lelimx){
					this.fp=false;//����������ж�fpΪfalse��x+=2;
				}
				if(!this.fp&&this.x==this.rilimx){
					this.fp=true;//����������ж�fpΪfalse��x+=2;
				}*/
				
				//�����ж��Ƿ������
				for(int i=0;i<this.bg.getzaw().size();i++){//������ָ��Ҫ�ж�ÿ���ϰ����Ƿ����ߣ���һ����ס�Ͳ��߰�can**��Ϊfalse
					OB ob=this.bg.getzaw().get(i);
					//��������������ϰ�����ڵ�x������ֹ��
					if(ob.getx()==this.x+50&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
						canri=false;
					}
					//��������������ϰ�����ڵ�x������ֹ��
					if(ob.getx()==this.x-50&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
						canle=false;
					}	
					//�赲������
					if(ob.gety()==this.y+60&&(ob.getx()+60>this.x
							&&ob.getx()-60<this.x)&&st_dog!="die"){				
						canupzhan=true;
					}
		
				}
				
				//�Ƿ�����ȥ
				if(!canupzhan){			
					this.y=this.y+dogdown();
				}
				if(this.x>1080||this.x<-360){
					this.x=this.sx;
				}else if(!canle&&this.st_dog.indexOf("left")!=-1||this.x==-360){///////////���������������������Ѿ����������
					this.st_dog="right";
				}else if(!canri&&this.st_dog.indexOf("right")!=-1||this.x==1080){//�������Ҳ����������ң����Ѿ��������ұ�
					this.st_dog="left";
				}
								
					
				
						this.show=Sucai.dog.get(foenum);
				
			}
					
			if(type==2){
				if(this.st_hua.indexOf("up")!=-1){
					this.y-=3;
				}else if(this.st_hua.indexOf("down")!=-1){
					this.y+=3;
				}
				
				//������ʾ����ͼƬ��,ʳ�˻�
				if(foenum==0){
					foenum=1;
				}else if(foenum==1){
					foenum=0;
				}
				
				
				//��������Ｋ������
				if(this.st_hua.indexOf("up")!=-1&&this.y==this.uplimy){
					this.st_hua="down";//����������ж�fpΪfalse��y+=2;
				}
				if(this.st_hua.indexOf("down")!=-1&&this.y==this.downlimy){
					this.st_hua="up";//����������ж�fpΪfrue��y+=2;
				}
				this.show=Sucai.hua.get(foenum);
			}
				
			
			if(type==3){//���͹���ͬһ�����췽��/////////////
					//�жϵ������͸���������ʾ
					this.x+=this.xsudu_dog;
					
					
					//�����ж��Ƿ������
					for(int i=0;i<this.bg.getzaw().size();i++){//������ָ��Ҫ�ж�ÿ���ϰ����Ƿ����ߣ���һ����ס�Ͳ��߰�can**��Ϊfalse
						OB ob=this.bg.getzaw().get(i);
						//��������������ϰ�����ڵ�x������ֹ��
						if(ob.getx()<=this.x+60&&ob.getx()-this.x>=40&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
							canri=false;
						}
						//��������������ϰ�����ڵ�x������ֹ��
						if(ob.getx()>=this.x-60&&ob.getx()-this.x<=40&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
							canle=false;
						}	
						//�赲������
						if(ob.gety()==this.y+60&&(ob.getx()+60>this.x
								&&ob.getx()-60<this.x)){				
							canupzhan=true;
						}
					
					}
					
					//�Ƿ�����ȥ
					if(!canupzhan){			
						this.y=this.y+dogdown();
					}
					
					
					if(this.x>1080||this.x<-360){
						this.x=this.sx;
						this.y=this.sy;
					}else if(!canle&&this.st_dog.indexOf("left")!=-1||this.x==-360){///////////���������������������Ѿ����������
						if(this.st_dog.indexOf("zou")!=-1){
							xsudu_dog=5;
							this.st_dog="zou_right";
						}else{
							xsudu_dog=10;
							this.st_dog="stop_right";
						}
					}
					if(!canri&&this.st_dog.indexOf("right")!=-1||this.x==1080){//�������Ҳ����������ң����Ѿ��������ұ�
						if(this.st_dog.indexOf("zou")!=-1){
							xsudu_dog=-5;
							this.st_dog="zou_left";
						}else{
							xsudu_dog=-10;
							this.st_dog="stop_left";
						}
					}
						
					//������ʾ����ͼƬ
					if(this.st_dog.indexOf("zou_left")!=-1){
						xsudu_dog=-5;
						if(foenum==0){
							foenum=1;
						}else if(foenum==1){
							foenum=0;
						}else{
							foenum=0;
						}
					}else if(this.st_dog.indexOf("zou_right")!=-1){
						xsudu_dog=5;
						if(foenum==2){
							foenum=3;
						}else if(foenum==3){
							foenum=2;
						}else{
							foenum=2;
						}
					}else if(this.st_dog.indexOf("stop")!=-1){
						foenum=4;
					}
						
					//if()
					this.show=Sucai.gui.get(foenum);			
			}
			
			
			
 
			
			 
			
			
			
			
			try {
 				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}	
			///if(st_dog=="die")
			///	this.die();
		}
	}
	
	public void startrun(){
		
			t.resume();//�����һ����߳�
	}
	
	public void reFoe() {
		this.x=sx;
		this.y=sy;
		this.st_dog=sst;
		this.st_hua=sst;
		//������ͼƬ����
		if(this.type==1){
			this.show=Sucai.dog.get(0);
		}else if(this.type==2){
			this.show=Sucai.hua.get(0);
		}else if(this.type==3){
			this.show=Sucai.gui.get(0);
		}
		
	}
	//public void die(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     /// 	
	//	this.bg.getdr().remove(this);
		//this.bg.getdiedr().add(this);
	//}
}
