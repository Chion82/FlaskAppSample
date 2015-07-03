/*index的模块加载文件*/
/*尝试加载一个自定义的mymath模块*/

require.config({
    paths:{
        'jquery':'/public/jquery/dist/jquery.min',
        'mymath':'/public/common/js/mymath'
    }
});

require(['jquery','mymath'],function($,math){
    console.log(math.add(1,1));
    $('#add').click(function(event) {
        $('#about').append('!');
    });
});