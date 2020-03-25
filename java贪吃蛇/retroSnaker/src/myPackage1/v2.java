package myPackage1;

public  class v2{
	int x, y;
	public v2(int x,int y){
		this.set(x,y);
	}
	public v2(v2 other){
		this.set(other);
	}
	public void set(v2 other){
		this.x=other.x;
		this.y=other.y;
	}
	public void set(int x,int y){
		this.x=x;
		this.y=y;
	}
}
