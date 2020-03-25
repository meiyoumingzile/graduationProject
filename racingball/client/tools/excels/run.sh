# set -e -u;
#  author: @terran

dir=$(cd `dirname $0`; pwd);
proj_dir=$(cd $dir/../../ && pwd);

outPath=${1-$proj_dir/src/config}
echo $outPath

mkdir -p $outPath
# rm -f $outPath/*.ts
svninfo="https://59.110.13.69/ds/balls_racing_cehua/excel/"

function deal(){
	excelName=$(basename $1) && shift;
    out_name=${excelName%_*}.ts
	echo $out_name;

    rm -rf $dir/temp && mkdir -p $dir/temp;
	svn export "$svninfo/$excelName" $dir/temp/$excelName --force
	out=$outPath/${out_name} 
	python $dir/excel2js.py $dir/temp/$excelName $out 0 1 2 3 "$@" || exit 1;

    rm -rf $dir/temp;
}

deal DB_skin_皮肤.xlsx id
