var gulp = require("gulp");
var datas = require("./src/data/data.json");
var servers = require("gulp-webserver"); // 起服务

var fs=require("fs");
var url=require("url");
var path=require("path");
var querystring = require("querystring");

var sass= require("gulp-sass");//scss-->css
var clean = require("gulp-clean-css");//压缩css文件
var concat = require("gulp-concat");//合并css文件

//转css文件，压缩，合并
gulp.task("all",function(){
    return gulp.src("./src/**/*.scss")
    .pipe(sass())
    .pipe(clean())
    .pipe(concat("all.css"))
    .pipe(gulp.dest("./src/css"));
})
gulp.task("watchs",function(){  //监听scss的变化
    return gulp.watch("./src/**/*.scss",gulp.series("all"));
})


//开发环境
gulp.task("servers",function(){
    return gulp.src("src")
    .pipe(servers({
        port : 8889,
        middleware : function(req,res,next){
            
            if(req.url == "/favicon.ico"){
                return res.end();
            }
            if(req.url === "/"){
                res.end(fs.readFileSync(path.join(__dirname,"src/index.html")));
            }
            var pathname = require("url").parse(req.url).pathname;//文件路劲
            if(path.extname(req.url)){   //是否path.extname  路径的后缀名
                res.end(fs.readFileSync(path.join(__dirname,"src",pathname)));
            }else{
                if(pathname === "/api/data"){
                    res.end(JSON.stringify(datas))
                }else if(pathname === "/api/serche"){
                    
                    // var str = "";
                    // req.on("data",function(chunk){
                    //     str += chunk;
                    // })
                    // req.on("end",function(){
                    //     res.end("12")
                    // })
                    var s = url.parse(req.url,true).query;
                    var arr = [];
                    datas.forEach((file)=> {
                        if(file.name.match(s.name)){
                            arr.push(file);
                        }
                    });
                    console.log(arr)
                    res.end(JSON.stringify(arr));
                }
            }
            
        }
    }))
})



//执行所有任务
gulp.task("default",gulp.series("servers","watchs"))