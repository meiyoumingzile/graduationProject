package malichuangti;
import java.awt.image.BufferedImage;


//�ϰ�����
public class OB implements Runnable{
	public int uplimy, dolimy, rilimx,lelimx;
	private int x,y,type,stype,//�ϰ�������
				sx,sy;//��ʼλ�ã����ڳ��������ĺ���������
	int xsu=0;
	int ysu=0;
	private int q;
	public int getxsu() {		return sx;}
	public void setxsu(int sx) {	this.sx = sx;}
	public int getysu() {	return sy;}
	public void setysu(int sy) {	this.sy = sy;}
	public int getq() {	return q;}
	public void setq(int q) {	this.q = q;}
	public int getsx() {	return sx;}
	public void setsx(int sx) {	this.sx = sx;}
	public int getsy() {	return sy;	}
	public void setsy(int sy) {		this.sy = sy;	}
	public void setx(int x) {	this.x = x;}
	public void sety(int y) {	this.y = y;}
	public void settype(int type) {	this.type = type;}
	public void setstype(int stype) {	this.stype = stype;}
	public int  gettype(){return type;}
	public int  getx() 	{return x;}
	public int  gety() 	{return y;}
	
	String st_ob="";//��ʼ״̬//�ı�
	private String sst_ob="";//����Ҫ���ص�״̬
	private String fst="";//��ʾ�ƶ�����
	
	private boolean Bo=false;
	public boolean isBo() {	return Bo;}
	

	private BufferedImage show=null;//һ����ʱ��ʾ�ϰ����ͼƬ
	public void setshow(BufferedImage show) {this.show = show;}
	public BufferedImage getshow() {return show;}
	
	private Ground bg;
	
	Thread t=new Thread(this);
	
	//������ʾͼƬ�ط���������ͬ���ط���
	public OB(int x,int y,int type){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.type=type;
		this.stype=type;
		this.st_ob="";
		
		gengxinOB();
	}
	public OB(int x,int y,int type,String st_ob,String fst,int uplimy,
			int dolimy,int lelimx,int rilimx,int q){//���ط������ᶯ���ϰ�
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.q=q;
		this.uplimy=uplimy;
		this.dolimy=dolimy;
		this.lelimx=lelimx;
		this.rilimx=rilimx;
		this.type=type;
		this.stype=type;
		this.st_ob=st_ob;
		this.sst_ob=st_ob;
		this.fst=fst;
		gengxinOB();
		t.start();
	}
	//�����ϰ���ط����γɶ���
	public void gengxinOB(){
		show=Sucai.ob.get(type);//����������ʾ�ϰ���ͼƬ��ob��list��type��	
	}
	
	public void range_move(){//����ط���
		if(this.x==rilimx){
			xsu=-xsu;
			st_ob=st_ob.replace("right","left");
		}
		if(this.x==lelimx){
			xsu=-xsu;
			st_ob=st_ob.replace("left","right");
		}
		if(this.y==uplimy){
			ysu=-ysu;
			st_ob=st_ob.replace("up","down");
		}
		if(this.y==dolimy){
			ysu=-ysu;
			st_ob=st_ob.replace("down","up");
		}
	}
	
	public void die(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     /// 	
		this.bg.getzaw().remove(this);
		this.bg.getdiezaw().add(this);
	}
	
	public void move(){
		if(this.st_ob.indexOf("up")!=-1){
		
			this.ysu=-q;
		}else if(this.st_ob.indexOf("down")!=-1){
			
			this.ysu=q;
		}
		if(this.st_ob.indexOf("right")!=-1){
			this.xsu=q;
			
		}else if(this.st_ob.indexOf("left")!=-1){
			this.xsu=-q;
		
		}
	}
    
	//������Ҫ�����ϰ���
	public void reOB(){	
		this.x=sx;
		this.y=sy;
		Bo=false;
		this.st_ob=sst_ob;
		this.type=stype;//��ɳ�ʼͼƬ����
		this.gengxinOB();//�ı���ʾһ��ͼƬ
		
	}
	
	
	
	public void run() {
		while(true){
			if(this.x>1200||this.x<-300||this.y>900||this.y<-300)
				st_ob+="-stop";
			else{
				st_ob=st_ob.replace("stop","");
			}
			if(this.st_ob.indexOf("stop")==-1){
			boolean canri=true,canle=true,//�жϿɷ��ƶ�������
					canupzhan=false,candown=false;
			if(fst=="m"){
				this.move();
				this.range_move();	
				this.x+=xsu;
				this.y+=ysu;
			}else if(fst=="s"){//s�������������߻����ש
				if(this.y==Mali.gety()+60&&this.x+40>Mali.getx()
						&&this.x-40<Mali.getx()||Bo){
					Bo=true;
					this.move();
					this.range_move();	
					this.x+=xsu;
					this.y+=ysu;
					}
			}else if(fst=="u"){//u�������ӵ����߶���ש
				if(Mali.gety()-this.y<=160&&this.x+40>Mali.getx()
						&&this.x-40<Mali.getx()||Bo){
					Bo=true;
					this.move();
					this.range_move();	
					this.x+=xsu;
					this.y+=ysu;;
					}
				//System.out.println(ysu);
			}
			
			///if(this.st_ob=="die")
			///	this.die();
			
			show=Sucai.ob.get(type);
			try {
 				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			}
		}	
	}
}
