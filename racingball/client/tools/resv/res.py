#!/usr/bin/env python
# coding=utf-8
# author: @terran

import os.path
import sys
import json;
import commands;
import fnmatch;
import re;
from PIL import Image;

# import codecs

def getFileList(root, patterns='*', encludePatterns=None, single_level=False, yield_folders=False):
    pj = os.path.join
    result = []
    patterns = patterns.split(';')
    for path, subdirs, files in os.walk(root):
        if yield_folders:
            files.extend(subdirs)
        result.extend([pj(path, name) for name in sorted(files) for pattern in patterns if fnmatch.fnmatch(pj(path, name), pattern)])
        if single_level:
            break
    if encludePatterns:
        encludePatterns = encludePatterns.split(';')
        enclude = [n for n in result for p in encludePatterns if fnmatch.fnmatch(n, p)]
        return [f for f in result if f not in enclude]
    return result

def readString(path):
    if not os.path.exists(path):
        return ""
    f = open(path, "r")
    r = f.read()
    f.close()
    return r


def writeString(path, content):
    path = os.path.abspath(path)
    parent = os.path.dirname(path);
    if not os.path.exists(parent):os.makedirs(parent);
    
    # f = codecs.open(path, "w", encoding='utf8')
    f = open(path, "w")
    f.write(content);
    f.close();

def shell(cmd,errorMsg):
    suc,result=commands.getstatusoutput(cmd);
    if(suc !=0): error_exit(errorMsg+" "+result);
    return result;

def encodeJson(path):
    print "encodeJson:%s"%path;
    shell("json2msgpack -i %s -o /tmp/data.pack"%path,"json2msg failed");
    result = shell("base64 -i /tmp/data.pack","base64 failed");
    writeString(path,result);


def error_exit(msg):
    print msg;
    exit(1);

def renameFile(path,dist):
    suc,result = commands.getstatusoutput('md5 -q "%s"'%path);
    if(suc != 0):error_exit("md5 error:"+result);
    result = result+str(os.path.getsize(path));
    if(path.endswith(".mp3")):result+="_";
    if(path.endswith(".css")):result+=".css";
    if(path.endswith(".ttf")):result+=".ttf";
    if(path.endswith(".js")):result+=".js";
    suc,_ = commands.getstatusoutput("mv -v %s %s"%(path,os.path.join(dist,result)));
    if(suc != 0):error_exit("mv error:"+_);
    return '%s'%result

class publish():
    def __init__(self, args):
        while len(args)<5:args.append("");
        print len(args);
        print args;
        [self.runtime,self.dir,self.version,self.ossContext,self.oss] = args;
        resNameList = self.dealResouces();
        if self.runtime == "native":
            jsNameList = self.dealNativeJS();
        else:
            jsNameList = self.dealJS();
        
        if self.runtime != "fb":
            all = resNameList+jsNameList;
            self.updload(all);

    
    def dealNativeJS(self):
        dir = self.dir;
        version = self.version;
        
        zipPath = os.path.join(dir,"game_code_%s.zip"%version);
        codePath=os.path.join(dir,"code");
        shell("rm -rf %s"%codePath,"clean code");
        shell("unzip -q %s -d %s && rm -rf %s"%(zipPath,codePath,zipPath),"unzip error");
        indexPath=os.path.join(codePath,"launcher/native_require.js")
        print indexPath;
        nameList=[];
        indexContent = readString(indexPath);
        def rep(m):
            filePath=m.group(1);
            print filePath;
            if(str(filePath).endswith(".json")):
                encodeJson(os.path.join(dir,filePath))
                newPath = renameFile(os.path.join(dir,filePath),os.path.join(dir,"resource"))
                nameList.append([filePath,"resource/"+newPath])
                return '"resource/%s"'%newPath
            
            newPath = renameFile(os.path.join(codePath,filePath),os.path.join(codePath,"libs"))
            # nameList.append([filePath,"libs/"+newPath])
            return '"libs/%s"'%newPath
        
        content = re.sub(r'"([^\r\n\t\f" ]+\.(?:js|json))"',rep,indexContent)
        
        content = content.replace('#version#',version)
        writeString(indexPath, content)
        shell("find %s -empty -type d -delete"%codePath,"rm empty error");
        shell("cd %s && zip -rq %s . && cd - && rm -rf %s"%(codePath,zipPath,codePath),"zip error")
        nameList.append(["game_code.zip","game_code_%s.zip"%version])
        
        return nameList
    
    def dealJS(self):
        dir = self.dir;
        version = self.version
        
        indexContent = readString(os.path.join(dir,"index.html"));
        nameList=[];
        
        def rep(m):
            filePath=m.group(1);
            if(str(filePath).endswith(".json")):
                encodeJson(os.path.join(dir,filePath))
            
            newPath = renameFile(os.path.join(dir,filePath),os.path.join(dir,"libs"))
            nameList.append([filePath,"libs/"+newPath])
            return '"libs/%s"'%newPath
        
        content = re.sub(r'"([^\r\n\t\f" ]+\.(?:js|json|css|ttf))"',rep,indexContent)
        
        content = content.replace('#version#',version)
        writeString(os.path.join(dir,"index_%s.html"%version), content)
        nameList.append(["index.html","index_%s.html"%version])
        
        return nameList
    
    def dealResouces(self):
        dir = self.dir
        nameList=[];
        resfilePath = os.path.join(dir,"resource/default.res.json");
        obj = json.loads(readString(resfilePath));
        arr = obj["resources"];
        for res in arr:
            url = res["url"];
            # if(url.find("packs0/")!=-1 and url.endswith(".png")):url=url.replace(".png",".jpg");
            path = os.path.join(dir,"resource",url);
            newPath = renameFile(path,os.path.join(dir,"resource"));
            res["url"] = newPath;
            nameList.append([url,"resource/"+newPath]);

        # fonts = getFileList(os.path.join(dir,"resource/fonts"),"*.*");
        # for font in fonts:
        #     fontName="resource/fonts/"+font.split("/resource/fonts/")[1]
        #     nameList.append([fontName,fontName]);
        
        writeString(resfilePath,json.dumps(obj));
        return nameList;
    
    def updload(self,fileList):
        ossContext = self.ossContext;
        version = self.version;
        dir = self.dir;
        suc,ossList = commands.getstatusoutput("%s listallobject %s"%(self.oss,ossContext));
        if(suc != 0):error_exit("osscmd listallobject error");
        ossObjectMap = {str(line).split(ossContext+"/").pop().strip():True for line in str(ossList).splitlines() if str(line).find(ossContext)>-1};
        # resources = getFileList(os.path.join(dir,"resource"));
        # resources.extend(getFileList(os.path.join(dir,"libs")));
        # resources.append(os.path.join(dir,"index.html"));
        
        logfile = os.path.join(dir,"logs","%s.log"%version);
        writeString(logfile,json.dumps(fileList));
        fileList.append([logfile,"logs/%s.log"%version]);
        
        for [old,path] in fileList:
            res = os.path.join(dir,path);
            if ossObjectMap.has_key(path): continue
            print "uploading...",old,path
            _,ext = os.path.splitext(old);
            content_type="application/octet-stream";
            if ext == ".js":content_type="application/javascript";
            if ext == ".json":content_type="text/plain";
            if ext == ".css":content_type="text/css";
            if ext == ".html":content_type="text/html";
            if ext == ".mp3":content_type="audio/mp3";
            if ext == ".png":content_type="image/png";
            if ext == ".jpg":content_type="image/jpeg";
            if ext == ".webp":content_type="image/webp";
            if ext == ".zip":content_type="application/zip";

            headerStr="";
            headers=[];
            if ext == ".html":headers.append("Cache-Control:no-store");
            if len(headers)>0:headerStr ="--headers "+"#".join(headers);

            suc,result = commands.getstatusoutput("%s put %s %s/%s --content-type=%s %s"%(self.oss,res,ossContext,path,content_type,headerStr));
            if(suc != 0):error_exit("oss put error:"+path);
        
        print "upload finished!!"

def package(args):
    [dir] = args;
    resfilePath = os.path.join(dir,"resource/default.res.json")
    obj = json.loads(readString(resfilePath));
    arr = obj["resources"];
    for res in arr:
        url = res["url"];
        path = os.path.join(dir,"resource",url);
        newPath = renameFile(path,os.path.join(dir,"resource"));
        res["url"] = newPath;
        nameList.append([url,"resource/"+newPath]);
    
    writeString(resfilePath,json.dumps(obj));
    return nameList;

def gen_res(args):
    [dir] = args;
    res_dir = os.path.join(dir,"resource")
    resfilePath = os.path.join(res_dir,"default.res.json")
    obj = json.loads(readString(resfilePath));
    arr = obj["resources"];
    s9_map={res["name"]:res["scale9grid"] for res in arr if res.has_key("scale9grid")}
    s_map ={res["name"]:res["subKeys"] for res in arr if res.has_key("subKeys")}

    typeMap = {
        ".png":"image",
        ".jpg":"image",
        ".fnt":"font",
        ".mp3":"sound",
        ".json":"sheet",
        ".txt":"text",
    }
    print "fuck";

    mapGroup={};
    for f in ["UI"]:
        for path, subdirs, files in os.walk(os.path.join(res_dir,f)):
            for n in files:
                file = os.path.join(path,n);
                extension =os.path.splitext(file)[1].lower();
                if(extension not in typeMap):continue;

                url = file.replace(res_dir+"/","");
                arr = url.split("/");
                if len(arr)<2:continue;

                group_name=arr[1];
                if group_name not in mapGroup:mapGroup[group_name] = [];

                name = os.path.basename(file).replace(".","_")
                type = typeMap[extension];
                if extension == ".json" and file.find("/ani/")>-1:type="ani"
                item = {
                    "name":name,
                    "url":url,
                    "type":type
                }
                if name in s9_map:item["scale9grid"] = s9_map[name];
                if name in s_map:item["subKeys"] = s_map[name];
                
                mapGroup[group_name].append(item);
    result = {
        "groups":sorted([{"name":groupName,"keys":",".join(sorted([item["name"] for item in items]))} for (groupName,items) in mapGroup.items()],key=lambda a:a["name"]),
        "resources":sorted(reduce(lambda a,b: a+b,mapGroup.values()),key=lambda a:a["name"]),
    };

    # writeString(resfilePath,json.dumps(result,indent=4,sort_keys=True,ensure_ascii=False, encoding='utf8'));
    writeString(resfilePath,json.dumps(result,indent=4,sort_keys=True).decode('unicode_escape').encode("u8"));

def create_w8_html(args):
    [index_path,res_host] = args;
    # args={"platform":"4399","pl_host":"http://devpl.capjoy.cn","runtime":"web","pt":40,"res_host":res_host}
    # args={"platform":"meng","pl_host":"https://testpl.capjoy.cn","runtime":"web","pt":0,"res_host":res_host}
    # args={"platform":"4399","pl_host":"https://devpl.capjoy.cn","runtime":"web","pt":40,"game":"ppyx","appid":1106294122,"res_host":res_host}
    args={"platform":"4399","pl_host":"https://pl.capjoy.cn","runtime":"web","pt":40,"game":"ppyx","appid":1106294122,"res_host":res_host}
    content = readString(index_path);
    content = re.sub(r'\$T_RES_HOST\s*=\s*".*"','$T_RES_HOST="%s"'%res_host,content);
    content = re.sub(r'\$T_GAME_ARGS\s*=\s*\{.*?\}','$T_GAME_ARGS=%s'%json.dumps(args),content);
    content = re.sub(r'"(libs/\w+)"','"%s/\g<1>"'%res_host ,content)
    writeString(index_path,content);

def gen_font(args):
    [dir] = args;
    result = shell("curl -s https://fonts.googleapis.com/css?family=Roboto:400,700","font failed");
    print result;
    def encode(m):
        url=m.group(1);
        content=shell("curl -s %s | base64"%url,"base64 error")
        return "url(data:font/truetype;charset=utf-8;base64,%s)"% content
    result = re.sub(r'url\((.+?)\)',encode,result);
    writeString(os.path.join(dir,"resource","fonts","Roboto.css"),result);

# https://jaicab.com/localFont/
# https://onlinefontconverter.com/
def gen_font2(args):
    [dir,name] = args;
    name = name or "MaaxRounded";

    content = '''
    @font-face {{
        font-family: '{name}';
        font-style: normal;
        font-weight: 700;
        src: local('MaaxRounded'), local('{name}-Bold'), url("tools/font/{name}-Bold.ttf")
    }}
    @font-face {{
        font-family: '{name}';
        font-style: normal;
        font-weight: 400;
        src: local('{name}'), local('{name}-Regular'), url("tools/font/{name}-Regular.ttf")
    }}
    '''.format(name=name)

    def encode(m):
        url=m.group(1);
        b64=shell("base64 -i %s"%url,"base64 error")
        return "url(data:font/truetype;charset=utf-8;base64,%s)"% b64
    result = re.sub(r'url\((.+?)\)',encode,content);
    writeString(os.path.join(dir,"resource","fonts","%s.css"%name),result);

def resize(args):
    [file,size] = args;
    im = Image.open(file);
    [w,h]=[int(v) for v in size.split("x")];
    if im.size[0] == w and im.size[1] == h: return;

    # pecent = min(float(w)/im.size[0],float(h)/im.size[1],1)
    # if pecent < 1:
    #     s=[int(v*pecent) for v in im.size]
    #     im = im.resize(s,Image.ANTIALIAS);

    if im.size[0]>w or im.size[1] >h:
        im.thumbnail((w,h),Image.ANTIALIAS);
    
    nim = Image.new("RGBA",(w,h),(0,0,0,0));
    nim.paste(im,((w-im.size[0])/2,(h-im.size[1])/2))
    nim.save(file);

if __name__ == "__main__":
    if len(sys.argv)<2:
        error_exit("wrong arguments!!");
    action=sys.argv[1];
    globals()[action](sys.argv[2:]);