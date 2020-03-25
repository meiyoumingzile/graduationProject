package myPackage1;

import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import javax.swing.JOptionPane;


public class Snake implements Runnable{
	public String name="";
	public boolean isDie=false;
	private int type;
	private int nowLen;
	public v2 pos=new v2(0,0);
	public v2 fp=new v2(0,0);
	public int[][] order=new int[Sence.mappSize.x][Sence.mappSize.y];
	public ArrayList<SnakeNode> list=new ArrayList<SnakeNode>();
	
	public int willRiseLen=0;//将要增长的长度
	
	public Thread thread=new Thread(this);///这里需要加入线程，绘图的操作线程
	AI1 myAI1=new AI1(this);
	
	public Snake(v2 myPos,v2 fp,int len,int type,String name){
		this.name=name;
		this.pos.set(myPos);
		this.fp.set(fp);
		int kind=fp.y==0?0:1;
		SnakeNode head=new SnakeNode(myPos.x,myPos.y,kind);
		this.arriveDot(myPos.x,myPos.y,"H");
		this.list.add(head);
		if(this.fp.y==0){
			for(int i=1;i<len;i++){
				this.arriveDot(myPos.x-30*i*fp.x,myPos.y,"S");
				this.list.add(new SnakeNode(this.pos.x-30*i*fp.x,this.pos.y,2));
				
			}
		}else if(this.fp.x==-1&&this.fp.y==0){
			
		}
		for(int i=0;i<Sence.mappSize.x;i++){//初始化-1非蛇占有的点都是最小点
			for(int j=0;j<Sence.mappSize.y;j++){
				this.order[i][j]=-1;
			}
		}
		//this.thread.start();
	}
	@Override
	public void run() {
		while(true){
			try {
				Thread.sleep(MainForms.main.delay);
			} catch (InterruptedException e){
				e.printStackTrace();
			}
			if(this.isDie==false){
				if(this.name=="snake1"){
					//System.out.println(0);
					v2 num=this.myAI1.toSub(this.list.get(0).pos);
					//System.out.println(0);
					this.myAI1.search(num,this.fp);
					v2 nextStep=this.myAI1.forword(num,this.fp);
					//System.out.println(nextStep.x+" "+nextStep.y);
					
					if(this.move(nextStep)){
						this.over(this.name+"死了");
					}
				}else{
					/*if(this.move()){
						this.over(this.name+"死了");
					}*/
				}
			}else{
				break;
			}
		}
	}
	
	public boolean move(){//正常的移动，
		if(this.visWillDie(this.fp)){
			this.updateSnakeNodeOrder();
			return true;
		}
		SnakeNode head=this.list.get(0);
		head.setType(2);//头变身子
		this.list.add(0,new SnakeNode(head.pos.x+30*this.fp.x,head.pos.y+30*this.fp.y,(this.fp.y==0?0:1)));
		this.arriveDot(head.pos.x+30*this.fp.x,head.pos.y+30*this.fp.y,"S");
		if(this.willRiseLen==0){
			int x=this.list.get(this.list.size()-1).pos.x;
			int y=this.list.get(this.list.size()-1).pos.y;
			this.leaveDot(x, y);
			this.list.remove(this.list.size()-1);
		}else{
			this.willRiseLen--;
		}
		this.updateSnakeNodeOrder();
		return false;
	}
	
	public boolean move(v2 fp){//控制方向的的移动，
		if(this.fp.x==0&&this.fp.y==-fp.y||this.fp.y==0&&this.fp.x==-fp.x){
			this.updateSnakeNodeOrder();
			return false;
		}
		if(this.visWillDie(fp)){
			this.updateSnakeNodeOrder();
			return true;
		}
		this.fp=fp;
		SnakeNode head=this.list.get(0);
		head.setType(2);
		this.list.add(0,new SnakeNode(head.pos.x+30*fp.x,head.pos.y+30*fp.y,(fp.y==0?0:1)));
		this.arriveDot(head.pos.x+30*fp.x,head.pos.y+30*fp.y,"S");
		if(this.willRiseLen==0){
			int x=this.list.get(this.list.size()-1).pos.x;
			int y=this.list.get(this.list.size()-1).pos.y;
			this.leaveDot(x, y);
			this.list.remove(this.list.size()-1);
		}else{
			this.willRiseLen--;
		}
		this.updateSnakeNodeOrder();
		return false;
	}
	public void arriveDot(int x,int y,String ch){
		for(int i=0;i<Sence.blankDot.size();i++){
			//System.out.println(Sence.blankDot.get(i).x+" "+Sence.blankDot.get(i).y);
			if(Sence.blankDot.get(i).x==x&&Sence.blankDot.get(i).y==y){
				Sence.blankDot.remove(i);
				Sence.mapp[x/30][(y-20)/30]=ch;
				break;
			}
		}
	}
	public void leaveDot(int x,int y){
		Sence.mapp[x/30][(y-20)/30]=" ";
		Sence.blankDot.add(new v2(x,y));
	}
	public void add(int willRiseLen){//吃到东西
		this.willRiseLen=willRiseLen;
	}
	public boolean visWillDie(v2 fp){//判断死亡
		int x=this.list.get(0).pos.x/30+fp.x;
		int y=(this.list.get(0).pos.y-20)/30+fp.y;
		if(this.list.get(this.list.size()-1).pos.x==x&&this.list.get(this.list.size()-1).pos.y==y){
			return false;//下一个点是尾巴不死
		}
		if(Sence.mapp[x][y]=="O"||Sence.mapp[x][y]=="S"){
			return true;
		}
		return false;
	}
	public void over(String s){
		this.isDie=true;
		JOptionPane.showMessageDialog(null, s, "结束", JOptionPane.ERROR_MESSAGE);		
		System.exit(0);
	}
	public void addAi(){
		
	}
	public void updateSnakeNodeOrder(){
		for(int i=0;i<Sence.mappSize.x;i++){//初始化-1非蛇占有的点都是最小点
			for(int j=0;j<Sence.mappSize.y;j++){
				this.order[i][j]=-1;
			}
		}
		v2 d=new v2(0,0);
		for(int i=0;i<this.list.size();i++){
			d.set(this.list.get(i).pos.x,this.list.get(i).pos.y);
			d.set(AI1.toSub(d));
			this.order[d.x][d.y]=i;
		}
	}
}
