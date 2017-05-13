const gulp = require('gulp');
const kitty = require('vkitty');
const serve = require('kitty-serve');
const loaders = kitty.loaders;

gulp.task('dev',function(){
    loaders.beforeCompile =  function(content){
        content = content.replace(/#cdnurl#/,"");
        return content;
    };
    kitty.watch('./pages/*/*.html')
        .pipe(serve({port:8080}))
});

gulp.task('prod',function(){
    loaders.beforeCompile =  function(content){
        content = content.replace(/#cdnurl#/,"../static");
        return content;
    };
    kitty.src('./pages/*/*.html')
        .pipe(kitty.dest('./build/pages'))
        .pipe(kitty.cdnDest('./build/pages/static'))
});
