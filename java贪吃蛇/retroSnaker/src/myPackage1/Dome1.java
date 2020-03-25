package myPackage1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Dome1 {
	public ArrayList<Integer> a=new ArrayList<Integer>();
	public static void main(String[] args) {
		new Dome1();
	}
	Dome1(){
		this.a.add(0);
		this.a.add(1);
		this.a.remove(0);
		this.a.remove(0);
		System.out.println(a.size());
	}

}
