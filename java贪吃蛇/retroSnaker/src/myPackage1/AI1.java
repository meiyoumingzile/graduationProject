package myPackage1;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class AI1 {
	public class Node{
		v2 pos;
		int len;
		Node[] child;
		Node parent;
		Node(int n){
			this.child=new Node[n];
		}
		Node(v2 pos,int len){
			this.pos=new v2(pos);
			this.len=len;
		}
		Node(int x,int y,int len,int n){
			pos=new v2(x,y);
			this.len=len;
			this.child=new Node[n];
		}
		
		public Node clone(){
			Node node=new Node(this.pos.x,this.pos.y,this.len,this.child.length);
			node.parent=this.parent;
			for(int i=0;i<this.child.length;i++){
				node.child[i]=this.child[i];
			}
			return node;
		}
	}
	
	public class Tree{
		Node head;
		Tree(v2 pos,int n){
			head=new Node(pos.x,pos.y,0,n);
		}
		
	}
	
	
	boolean canArriveFood=false;
	boolean canArriveTail=false;
	int nowArriveLen=0;
	int nowDangerArea=0;
	int dangerValue=0;
	static int INF=1000000;
	int fx[]={0,0,1,-1,1,1,-1,-1};
	int fy[]={1,-1,0,0,1,-1,1,-1};
	Tree loadTree=null;
	Snake selfSnake=null;
	
	public v2 nextStep=new v2(0,0);
	
	public AI1(Snake selfSnake){
		this.selfSnake=selfSnake;
	}
	
	public void search(v2 pos, v2 fp){///////此类里的pos的位置都是数组下标 
		ArrayList<v2> canArriveDot=this.getCanForWordDot(pos, fp);
		if(canArriveDot.size()==0){
			this.nextStep.set(pos.x+1,pos.y);
			return;
		}else if(canArriveDot.size()==1){
			this.nextStep.set(canArriveDot.get(0));
			return;
		}else{
			ArrayList<Node> danger=new ArrayList<Node>();
			ArrayList<Node> security=new ArrayList<Node>();
			//System.out.println(this.selfSnake.list.get(this.selfSnake.list.size()-1).pos.x);
			for(int i=0;i<canArriveDot.size();i++){
				this.bfs(canArriveDot.get(i), getFp(pos,canArriveDot.get(i)));
				//System.out.println(this.canArriveTail);
				if(this.canArriveTail){
					
					security.add(new Node(canArriveDot.get(i),this.nowArriveLen));
					//this.nextStep.set(canArriveDot.get(i));
				}else{
					//System.out.println(this.canArriveTail);
					danger.add(new Node(canArriveDot.get(i),this.nowDangerArea));
					
				}
			}
			int minLen=INF;
			Node minDot=null;
			for(int i=0;i<security.size();i++){
				if(security.get(i).len<minLen){
					minLen=security.get(i).len;
					minDot=security.get(i);
				}
			}
			if(minLen!=INF){//安全路径有果子
				this.nextStep.set(minDot.pos);
			}else if(security.size()>0&&minLen==INF){//安全路径存在且没有果子
				this.nextStep.set(security.get(0).pos);
			}else{
				int maxArea=-1;
				Node maxDot=null;
				for(int i=0;i<danger.size();i++){
					if(danger.get(i).len>maxArea){
						maxArea=danger.get(i).len;
						maxDot=danger.get(i);
					}
				}
				
				/*ArrayList<v2> nextDot=this.getNotForWordDot(maxDot.pos, this.getFp(pos,maxDot.pos));
				if(nextDot.size()>0){
					
				}*/
				this.nextStep.set(maxDot.pos);
				return;
				
			}
			
		}
		
	}
	public void bfs(v2 pos, v2 fp){
		this.canArriveTail=false;
		this.canArriveFood=false;
		this.nowArriveLen=INF;
		this.nowDangerArea=0;
		int maxSnakeNodeOrder=-1;
		//loadTree=new Tree(pos,4); 
		//this.load.clear();
		//que.clear();
		//Node nowNode=loadTree.head;
		//isAlreadyArrive[nowNode.pos.x][nowNode.pos.y]=true;
		boolean[][] vis=new boolean[Sence.mappSize.x][Sence.mappSize.y];
		ArrayList<Node> que=new ArrayList<Node>();
		Node nowDot=new Node(pos,0);
		que.add(nowDot);
		vis[pos.x][pos.y]=true;
		while(que.size()>0){
			this.nowDangerArea++;
			nowDot=que.get(0);
			que.remove(0);
			for(int i=0;i<4;i++){
				int nextX=nowDot.pos.x+this.fx[i];
				int nextY=nowDot.pos.y+this.fy[i];
				if(Sence.mapp[nextX][nextY]=="F"){
					this.canArriveFood=true;
					this.nowArriveLen=Math.min(this.nowArriveLen,nowDot.len);
				}
				if((Sence.mapp[nextX][nextY]==" "||Sence.mapp[nextX][nextY]=="F")&&vis[nextX][nextY]==false){
					vis[nextX][nextY]=true;
					que.add(new Node(new v2(nextX,nextY),nowDot.len+1));
				}
				if(Sence.mapp[nextX][nextY]=="S"){
					maxSnakeNodeOrder=Math.max(maxSnakeNodeOrder,this.selfSnake.order[nextX][nextY]);
				}
			}
		}
		this.dangerValue=this.selfSnake.list.size()-maxSnakeNodeOrder-1-this.nowDangerArea;
		if(this.dangerValue<0){
			this.canArriveTail=true;
		}
	}
	
	
	public v2 forword(v2 pos,v2 fp){
		
		v2 next=new v2(0,1);
		ArrayList<v2> food=this.getHaveFood(pos,fp);
		if(food.size()>0){
			next.set(getFp(pos, food.get(0)));
		}else{
			next.set(getFp(pos, this.nextStep));
		}
		//System.out.println(x+" "+y);
		return next;
	}
	
	
	
	public static v2 toSub(v2 otherPos){
		return (new v2(otherPos.x/30,(otherPos.y-20)/30));
	}
	public static v2 toPos(v2 otherPos){
		return (new v2(otherPos.x*30,otherPos.y*30+20));
	}
	public static v2 getFp(v2 d1,v2 d2){
		return (new v2(d2.x-d1.x,d2.y-d1.y));
	}
	
	public ArrayList<v2>  getCanForWordDot(v2 pos,v2 fp){
		ArrayList<v2> dot=new ArrayList<v2>();
		for(int i=0;i<4;i++){
			if((fp.x==0&&fp.y!=-fy[i])||(fp.y==0&&fp.x!=-fx[i])){
				int x=pos.x+fx[i];
				int y=pos.y+fy[i];
				if(Sence.mapp[x][y]==" "||Sence.mapp[x][y]=="F"){
					dot.add(new v2(x,y));
					//MainForms.main.sence.addOb(this.toPos(new v2(x,y)));
				}
			}
		}
		return dot;
	}
	public ArrayList<v2> getHaveFood(v2 pos,v2 fp){
		ArrayList<v2> dot=new ArrayList<v2>();
		for(int i=0;i<4;i++){
			if((fp.x==0&&fp.y!=-fy[i])||(fp.y==0&&fp.x!=-fx[i])){
				int x=pos.x+fx[i];
				int y=pos.y+fy[i];
				if(Sence.mapp[x][y]=="F"){
					dot.add(new v2(x,y));
					//MainForms.main.sence.addOb(this.toPos(new v2(x,y)));
				}
			}
		}
		return dot;
	}
	public ArrayList<v2> getNotForWordDot(v2 pos,v2 fp){
		ArrayList<v2> dot=new ArrayList<v2>();
		for(int i=0;i<8;i++){
			if((fx[i]==fp.x&&fy[i]==-fp.y)||(fx[i]==-fp.x&&fy[i]==fp.y)){
			}else{
				int x=pos.x+fx[i];
				int y=pos.y+fy[i];
				if(Sence.mapp[x][y]=="S"||Sence.mapp[x][y]=="O"){
					dot.add(new v2(x,y));
					//MainForms.main.sence.addOb(this.toPos(new v2(x,y)));
				}
			}
		}
		return dot;
	}
}
