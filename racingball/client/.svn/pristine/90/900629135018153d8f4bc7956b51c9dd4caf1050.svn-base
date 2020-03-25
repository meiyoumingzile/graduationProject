#!/usr/bin/env python
# coding=utf-8
# author: @terran 

import xlrd
import os.path
import sys
import re
import json
import commands;
from jinja2 import Template,Environment;

reload(sys)
sys.setdefaultencoding('utf-8')

def error_exit(msg):
    print msg;
    exit(1);

def readString(path):
    if(not os.path.exists(path)):
        return "";
    f = open(path,"rb");
    r = f.read();
    f.close();
    return r;

def writeString(path, content):
    p = os.path.split(path)[0];
    if(not os.path.exists(p)):
        os.makedirs(os.path.split(path)[0]);
        
    f = open(path, "w");
    f.write(content);
    f.close();

def shell(cmd,errorMsg):
    suc,result=commands.getstatusoutput(cmd);
    if(suc !=0): error_exit(errorMsg+" "+result);
    return result;

# json2msgpack/msgpack2json:brew install https://ludocode.github.io/msgpack-tools.rb
def encode(data):
	path="/tmp/data.json";
	writeString(path,data);
	print data;
	shell("json2msgpack -i %s -o /tmp/data.pack"%path,"json2msg failed");
	result = shell("base64 -i /tmp/data.pack","base64 failed");
	# return result;
	return data;

def decode(data):
	writeString("/tmp/data.b",data);
	shell("base64 -D -i /tmp/data.b -o /tmp/data.pack","unbase64 error");
	result = shell("msgpack2json -i /tmp/data.pack","msgpack2json error");
	return result;

#将被忽略的列
SKIP_COL_NAMES = ("辅助列", "deleted", "")

def getCellValue(sheet,row,column,_type):
	value = sheet.cell_value(row, column);

	if type(value) == unicode:
		value = value.encode("u8");
	elif type(value) == float and int(value) == value:
		value = int(value);

	_type = _type.lower();
	if _type == "string":
		value = '"'+str(value).strip().replace('"','\\"')+'"';
		value = "\\n".join(value.splitlines());
	elif _type == "int":
		value = value!="" and str(int(value)) or "0"; 
	elif _type == "double" or _type == "float":
		value = value!="" and str(float(value)) or "0"; 
	elif _type == "boolean":
		value = value in [1,"true","1"] and "true" or "false";  
	else:
		raise NameError,"unknow type:%s"%_type
	
	return value;

ts_format = '''
interface I{{name}} {
	{%- for (name,value,desc) in fileds %}
	{{name}}:{{value}}; //{{desc}}
	{%- endfor %}
}
class {{name}}{
	public static get(...args):I{{name}} { return {{name}}.getDB().get(...args); }
	public static getall() {return {{name}}.getDB().getall(); }

	private static _db:DB;
	private static getDB():DB{
		if({{name}}._db) return {{name}}._db;
		
			let _keys:string[] = [{% for name,value,desc in fileds %}"{{name}}",{% endfor %}];
			let _datas = {
				{%- for name,value in datas %}
				"{{name}}":[{{value}}]{% if not loop.last %},{%endif %}
				{%- endfor %} 
			}
			{{name}}._db = new DB(_keys,_datas);
			return {{name}}._db;
	} 
}
'''
	
if __name__ == "__main__":
	work_dir = os.path.dirname(sys.argv[0]);
	xls_path = sys.argv[1]
	out_path = sys.argv[2]
	headRow = int(sys.argv[3]) or 0
	descRow = int(sys.argv[4]) or 1
	typeRow = int(sys.argv[5]) or 2
	startRow = int(sys.argv[6]) or 3

	keys = sys.argv[7:]

	if not os.path.isfile(xls_path):
		raise NameError, "%s is	not	a valid	filename" % (xls_path)
	
	book = xlrd.open_workbook(xls_path)
	sheet = book.sheets()[0]
	if sheet.nrows < startRow + 1:
		print "没有数据"
		exit(1);

	key_names = [];
	types = {};
	type_names = [];
	key_descs = [];
	
	validFun = lambda value: value not in SKIP_COL_NAMES and not value.startswith("s_") and not value.startswith("#")
	valid_columns = [cidx for cidx in xrange(sheet.ncols) if validFun(sheet.cell_value(headRow, cidx))];
	for cidx  in valid_columns:
		key_names.append(sheet.cell_value(headRow, cidx).strip());
		key_descs.append(sheet.cell_value(descRow, cidx).strip().replace("\n",""));
		types[cidx]=sheet.cell_value(typeRow, cidx).strip();
		type_names.append(types[cidx]);
	
	# print colNames;
	# print keys;

	keyIndexs = [key_names.index(name) for name in keys];

	allRows = [];
	for ridx in xrange(startRow, sheet.nrows):
		rowData = [getCellValue(sheet,ridx, cidx,types[cidx]) for cidx in valid_columns];
		rowKey = "_".join(str(rowData[i]) for i in keyIndexs).replace('"',"");
		allRows.append([rowKey,",".join(rowData)]);
	
	base64keys = encode(json.dumps(key_names));
	jsonStr ="{%s}"%(",".join("\"%s\":[%s]"%(name,value) for (name,value) in allRows))
	writeString("/tmp/data2.json",jsonStr);
	base64Content = encode(jsonStr);

	template = Template(ts_format,extensions=['jinja2.ext.do'])
	content = template.render(name = os.path.basename(out_path).split(".")[0],
		fileds = zip(key_names,type_names,key_descs),
		datas = allRows,
		base64keys = base64keys,
		base64Content=base64Content);
	
	# content = content.replace("##base64Content##",base64Content,1);
	
	writeString(out_path,content);
	print ">>>"+out_path 
