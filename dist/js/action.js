var backgrounds = {
	img_arr:[],
	wheight:document.documentElement.clientHeight-15,
	init : function(imglength){
		//生成图片列表
		for ( var i = 1;i<=imglength; i++ ){
			var imgName = "bg_"+i+".jpg";
			this.img_arr.push(imgName);
		}
		//定义菜单高度
		this.menuHeight();
		//将图片生成到菜单里面s
		this.menuHtml();
		//绑定需要用到的事件
		this.ononon();
		//判断cookie里面是否有图片
		if ($.cookie('background') !== undefined){
			this.changeBackground($.cookie('background'));
		}
	},
	ononon : function () {
		//处理上下文
		var th = this;
		$('.img-list img').live('click', function(action){
			var _ = $(this).attr('src');
			th.changeBackground(_);
		});

		$('#start-menu i').on('click', function(){
			$(this).hide();
			$('#menu-panel').show('400');
		});

		$('.contion').on('click', function(){
			$('#start-menu i').show('400');
			$('#menu-panel').hide('400');
		});
	},
	//改变背景图片
	changeBackground : function(_){
		$('body').css({
			'background':'url('+_+')',
			'background-size': '100% 100%',
			'background-position' : 'center',
			'background-attachment' :'fixed',
			'background-repeat' : 'no-repeat',
		});
		//改变背景的同时，修改页面span的背景颜色， 颜色为背景图片主色
		RGBaster.colors(_, {
		  success: function(payload) {
		    $('span').css('background',payload.dominant);
		  }
		});
		console.log(_);
		$.cookie('background',_,{ expires: 7 });
	},
	//定义菜单的高度
	menuHeight : function(){
		$('#menu-panel').css('height',this.wheight);
	},
	//生成html代码
	menuHtml : function(){
		html = '';
		for (var i = 0; i<this.img_arr.length; i++){
			html += "<div class='img-list'>";
			html += "<img src='background/"+this.img_arr[i]+"' />";
			html += "</div>";
		}
		$('#menu-panel').append(html);
	},
	//入口函数
	main : function(imglength){
		this.init(imglength);
		// console.log(this.img_arr);
	},

}
$('.i').append("<i class='icon-2x icon-ok'></i>");

$('li').each(function (){
	if (!$(this).attr('class')) {
		$(this).append("<i class='icon-2x icon-spinner icon-spin'></i>")
	}
});

backgrounds.main(14);
