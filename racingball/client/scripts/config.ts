/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import * as fs from 'fs';
import { UglifyPlugin, IncrementCompilePlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, RenamePlugin, ConvertResConfigFilePlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { BricksPlugin } from './bricks/bricks';
import { CustomPlugin } from './myplugin';

const config: ResourceManagerConfig = {


    buildConfig: (params) => {

        const { target, command, projectName, version } = params;

        if (command == 'build') {
            const outputDir = '.';
            return {
                outputDir,
                commands: [
                    new EmitResConfigFilePlugin({
                        output: "resource/default.res.json",
                        typeSelector: config.typeSelector,
                        nameSelector: p => path.basename(p),//.replace(/\./gi, "_"),
                        groupSelector: p => {
                            if (p.indexOf('/UI/') > -1) {
                                let arr = p.split('/')
                                return arr[arr.length - 2]
                            } else if (p.indexOf('/assets/') > -1) {
                                return "assets"
                            }
                        }
                    }),
                    new ExmlPlugin('debug'), // 非 EUI 项目关闭此设置
                    new IncrementCompilePlugin(),
                ]
            }
        }
        else if (command == 'publish') {
            const outputDir = `bin-release/web/${version}`;
            return {
                outputDir,
                commands: [
                    new CustomPlugin(),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new UglifyPlugin([{
                        sources: [
                            // "libs/modules/egret/egret.min.js",
                            // "libs/modules/egret/egret.web.min.js",
                            "libs/modules/eui/eui.min.js",
                            "libs/modules/assetsmanager/assetsmanager.min.js",
                            "libs/modules/tween/tween.min.js",
                            "libs/modules/game/game.min.js",
                            "libs/modules/promise/promise.min.js",
                            "libs/lzString/lz-string.min.js",
                            "libs/inflate/inflate.min.js",
                            "libs/three/three.min.js",
                            "libs/threePlus/threePlus.min.js",
                            "libs/vconsole/vconsole.min.js",
                            "resource/default.thm.js",
                            "main.js",
                        ],
                        target: "bundle.min.js"
                        // sources: ["main.js"],
                        // target: "main.min.js"
                    }]),
                    // new TextureMergerPlugin({ textureMergerRoot: ['resource'] }),
                    // new ConvertResConfigFilePlugin({
                    //     resourceConfigFiles: [{ filename: "resource/default.res.json", root: "resource/" }],
                    //     nameSelector: (p) => {
                    //         return path.basename(p).split(".").join("_")
                    //     },
                    //     TM_Verbose: true
                    // }),
                    // new RenamePlugin({
                    //     verbose: true, hash: 'crc32', matchers: [
                    //         { from: "**/*.js", to: "[path][name]_[hash].[ext]" }
                    //     ]
                    // }),
                    new ManifestPlugin({ output: "manifest.json" })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`
        }
    },

    mergeSelector: (path) => {
        if (path.indexOf("assets/bitmap/") >= 0) {
            return "assets/bitmap/sheet.sheet"
        }
        else if (path.indexOf("armature") >= 0 && path.indexOf(".json") >= 0) {
            return "assets/armature/1.zip";
        }
    },

    typeSelector: (path) => {
        const ext = path.substr(path.lastIndexOf(".") + 1);
        const typeMap = {
            "jpg": "image",
            "png": "image",
            "webp": "image",
            "json": "json",
            "fnt": "font",
            "pvr": "pvr",
            "mp3": "sound",
            "zip": "zip",
            "sheet": "sheet",
            "exml": "text",
            "txt": "text",
        }
        let type = typeMap[ext];
        if (type == "json") {
            if (path.indexOf("sheet") >= 0) {
                type = "sheet";
            } else if (path.indexOf("movieclip") >= 0) {
                type = "movieclip";
            };
        }
        return type;
    }
}


export = config;
