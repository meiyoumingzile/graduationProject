#!/usr/bin/env bash
# @terran
# set -e -u
# set -e
trap '{ echo "pressed Ctrl-C.  Time to quit." ; exit 1; }' INT

dir=$(cd `dirname $0`; pwd);
tmp=$dir/.tmp;mkdir -p $tmp;
function error_exit(){ echo "【ERROR】::${1:-"Unknown Error"}" 1>&2 && exit 1;}

function compressImages(){
	local cache=false
	local path;
	while [ "$#" -gt 0 ]; do
		case "$1" in
			-c|--cache) cache=true;;
			--cache=*) cache="${1#*=}";;
			*) path="$1";;
		esac;shift
	done
	
	local cache_dir=$tmp/imageCache;mkdir -p $cache_dir;
	for file in `find $path -name "*.png" -o -name "*.jpg"`;do
		if $cache; then
			local fileMD5=`md5 -q ${file}`
			local cache_file=$cache_dir/$fileMD5;
			if [[ -e $cache_file ]];then
				cp -f $cache_file $file
				continue;	
			fi	
		fi

		if [[ $file == thumb_*.png ]]; then
			echo "pass"
		elif [[ $file == *.png ]]; then #--quality 50-80
			local color=256;
			if [[ $file == */ani/* ]]; then color=128; fi
			if [[ $file == *common-* ]]; then color=256; fi
			pngquant --ext ".png" --skip-if-larger --strip --force $color $file
			# pngquant --ext ".png" --skip-if-larger --strip --force --quality 65-80 $file
		# elif [[ $file == *.jpg ]]; then 
		# 	jpegoptim -s -m60 -q $file
		fi

		if $cache; then cp -fv $file $cache_file;fi
	done
	echo "image compress finished!"
}
function compressMP3s(){
	local cache=false
	local path;
	while [ "$#" -gt 0 ]; do
		case "$1" in
			-c|--cache) cache=true;;
			--cache=*) cache="${1#*=}";;
			*) path="$1";;
		esac;shift
	done
	
	local cache_dir=$tmp/mp3Cache;mkdir -p $cache_dir;
	for file in `find $path -name "*.mp3"`;do
		local fileMD5=`md5 -q ${file}`
		local cache_file=$cache_dir/$fileMD5;
		if [[ -e $cache_file ]];then
			cp -f $cache_file $file
		else
			lame --silent --abr 48 --resample 44.1 "${file}" $tmp/mp3 && mv $tmp/mp3 "${file}"
			if $cache; then cp -fv $file $cache_file;fi
		fi
	done
	echo "mp3 compress finished!"
}

function excel(){
	cd $dir/tools/excels && sh run.sh
}

fb_app_id=578524932929486;
fb_app_secret="8533dd7240e919af2baa243d6b652da3";
fb_app_token="578524932929486|cfKANvj88qs_FM_7l1XIyyxEjkw";
function fbgame(){
	local upload=false;
	while [ "$#" -gt 0 ]; do
	case "$1" in
		-v|--version) version="$2";shift;;
		--version=*) version="${1#*=}";;
		-u|--upload) upload=true;;
	esac;shift
	done
	if [ -z ${version+x} ]; then 
		version=`cat $dir/fb_version 2>/dev/null || echo 0.0.0`;
		echo $version
		version=`node -p "a=\"${version}\".split('.');a[a.length-1]=+a[a.length-1]+1;a.join('.')"`
		echo "version absent, auto generate ${version}"
	fi
	if [ -z ${version+x} ]; then error_exit "need version";fi
	
	# node scripts/updateVersion.js $version
	
	local dist=$dir/bin-release/web/$version;
	
	egret publish --runtime html5 -fbgame --version $version;
	perl -pi -e 's|<!--instant SDK-->|<script src="//connect.facebook.net/en_US/fbinstant.6.2.js"></script>|g' $dist/index.html
	perl -pi -e "s|#version#|${version}|g" $dist/index.html
	
	# npm install node_texture_packer -g;
	resm $dist/resource "png" "assets,shareLazy" 1024 || error_exit "resm failed"
	# node scripts/autoMerger.js

	# javascript-obfuscator $dist/js/bundle.min.js --output $dist/js/bundle.min.js --config ./tools/obfuscator.json
	
	cp $dir/fbapp-config.json $dist/fbapp-config.json
	# cp $dir/template/web/raven.min.js $dist/raven.min.js
	compressImages -c $dist;
	# compressMP3s -c $dist/resource/res/audio;

	rm -rf $dir/game.zip;
	(cd $dist && zip -qr $dir/game.zip .)
	rm -rf $dir/bin-release

	if $upload; then 
		uploadfb --version $version
	fi

	echo $version > $dir/fb_version;
}

function uploadfb(){
	local version="";
	while [ "$#" -gt 0 ]; do
	case "$1" in
		-v|--version) version="$2";shift;;
		--version=*) version="${1#*=}";;
		*) version="$1";;
	esac;shift
	done
	echo "uploading ....";
	# export http_proxy=127.0.0.1:1087
	local comment="匹配时间4秒"; 
	curl -X POST https://graph-video.facebook.com/$fb_app_id/assets \
	--progress-bar \
	# --socks5 127.0.0.1:1086 \
	-F "access_token=$fb_app_token" \
	-F 'type=BUNDLE' \
	-F "asset=@$dir/game.zip" \
	-F "comment=#${version}# ${comment}"||error_exit "upload post failed";
	echo "";
}
function genToken(){
	curl -X GET "https://graph.facebook.com/oauth/access_token?client_id=$fb_app_id&client_secret=$fb_app_secret&grant_type=client_credentials"
}
function testfb(){
	local path=".";
	while [ "$#" -gt 0 ]; do
	case "$1" in
		*) path="$1";;
	esac;shift
	done
	echo https://www.facebook.com/embed/instantgames/$fb_app_id/player?game_url=https://localhost:8080
	local key=$dir/tools/key
	http-server $path -S -C $key/cert.pem -K $key/key.pem -c1
}

function update_art() {
	rm -rf ./resource/assets/*
	cp -rf /Users/jiaheng/Documents/workspace/occupy_cehua/art/* ./resource/assets/
}

token="EAAYsfZAxiFmMBAFHrW7qaXydZCy73DirZARMH1PZBQrJlZB9yOvbszbePVTZBPHMEZChAZAiIDYPHqBFEJGTqgLT2kxgrO6HFnL7nHU3ZBxtTNsA9gVh2sVQqrxb6bSYorqf5OEX9jBGEyYSuSkfpWmn0ScuBymRidbCmucwGut3FogZDZD";
function resetLB() {
	timestamp=`date +%s`
	curl -X POST https://graph.facebook.com/$fb_app_id/leaderboards_reset \
	--progress-bar \
	-F "access_token=$token" \
	-F "name=rank" \
	-F "reset_time=$timestamp";
}

export http_proxy=http://127.0.0.1:1080;export https_proxy=http://127.0.0.1:1080;
if test $# -lt 1; then error_exit "wrong arguments"; fi;
cmd=$1 && shift
echo $cmd $@
$cmd $@