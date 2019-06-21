package cn.com.lttc.loginui;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import android.content.Context;
import android.text.Layout;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View; 
import android.view.ViewGroup; 
import android.widget.BaseAdapter; 
import android.widget.TextView; 
  
  
public class TableAdapter extends BaseAdapter {
  public List<Map> list;
  private LayoutInflater inflater; 
  String keyList[]=null;
  int txID[]=null;
  int layoutID;
  public TableAdapter(Context context,int layoutID,int txID[],String keyList[],List<Map> list){//
	this.keyList=keyList;
    this.list = list;
    inflater = LayoutInflater.from(context);
    this.txID= txID;
    this.layoutID=layoutID;
  } 
  
  @Override
  public int getCount() { 
    int ret = 0; 
    if(list!=null){ 
      ret = list.size(); 
    } 
    return ret; 
  } 
  
  @Override
  public Object getItem(int position) { 
    return list.get(position); 
  } 
  
  @Override
  public long getItemId(int position) { 
    return position; 
  } 
  
  @Override
  public View getView(int position, View convertView, ViewGroup parent) {
	Map<String,String> dir= (Map<String,String>)this.getItem(position);
	ViewHolder viewHolder=null;
    if(convertView == null){
    	convertView = inflater.inflate(layoutID, null);
        TextView tx[]=new TextView[txID.length];
        for(int i=0;i<txID.length;i++){
    	    tx[i]=(TextView) convertView.findViewById(txID[i]);
        }
    	viewHolder = new ViewHolder(keyList,tx);
        convertView.setTag(viewHolder);
    }else{ 
      viewHolder = (ViewHolder) convertView.getTag(); 
    } 
    Set set = dir.entrySet();
    Map.Entry[] ent = (Map.Entry[])set.toArray(new Map.Entry[set.size()]);
    for (int i=0;i<ent.length;i++){
    	TextView tx=viewHolder.dir.get(ent[i].getKey().toString());
    	tx.setText(ent[i].getValue().toString());
        tx.setTextSize(13);
    }
    return convertView; 
  } 
    
  public static class ViewHolder{ 
	  Map<String,TextView> dir=new HashMap<String,TextView>();
	  ViewHolder(String keyList[],TextView valList[]){
		  for(int i=0;i<keyList.length;i++){
			  dir.put(keyList[i],valList[i]);
		  }
	  }  
 
  } 
} 