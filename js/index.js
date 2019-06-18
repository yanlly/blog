$(function(){
	
/****** 登录界面 ******/

	$(".self").click(function(){
		$(".msg_box").fadeToggle();			
	})

	$(".msg_out").click(function(){
		$(".msg_box").fadeOut();			
	})
	
	$(".user-info-top").click(function(){
		$(".profile").hide();
		$(".loginInner").show();	
	})
	
	$(".go_back").click(function(){
		$(".loginInner").hide();
		$(".profile").show();	
	})

	$(".log").click(function(){
		$(".reg").removeClass("on");
		$(".reg_box").removeClass("on");
		$(".log").addClass("on");
		$(".log_box").addClass("on");	
	})

	$(".reg").click(function(){
		$(".log").removeClass("on");
		$(".log_box").removeClass("on");
		$(".reg").addClass("on");
		$(".reg_box").addClass("on");	
	})
	
	$(".self").click(function(){
		$(".navbar-collapse").attr({
			"aria-expanded":"false",
			"style":"height: 1px"
		});
		$(".navbar-collapse").removeClass("in");
	})
/****** /登录界面 ******/

/****** 给aside一个粘性定位 ******/

    $(window).scroll(function(){
		 $("html").scrollTop()>320?$(".about").addClass("about1"):$(".about").removeClass("about1");
	})
	//其他页面的粘性定位
	$(window).scroll(function(){
		$("html").scrollTop()>111?$(".tag").addClass("tag1"):$(".tag").removeClass("tag1");
   })
/****** /给aside一个粘性定位 ******/

/******* 每篇文章看过的次数 *******/

	$("body").delegate(".blogtitle","click",function(){
		$(this).parent("h2").siblings(".blogmsg").find(".view_num").text(parseInt($(this).parent("h2").siblings(".blogmsg").find(".view_num").text())+1);	
	});
	
/******* /每篇文章看过的次数 *******/	

/******* 利用ajax生成文章 *******/

	//调用函数生成文章
	getBlogList();

	//设置生成文章函数
	var k=0; //页码编号
	var n=3; //每页多少篇文章
	function getBlogList(){
		$.ajax({
			type:"get",
			url:"https://yanlly.github.io/blog/bloglist.json",			
			success: function (data) {				
				if (k<(data.length/n)){
					for(i=(0+k*n);i<(n+k*n);i++){
						var item=creatItem(i,data);
						$(".bloglist").prepend(item);												 
					}
				}
				else{ //翻到最后一页则不能继续翻页
					k-=1;
					for(i=(0+k*3);i<(3+k*3);i++){
						var item=creatItem(i,data);
						$(".bloglist").prepend(item);											 
					}						
				}				
			},
			error: function(err){
				console.log(err);
			}
		})
	}
	
	//设置文章模板
	function creatItem(i,blog){
		var item = (`			
			<div class="blogs row">
				<h2><a href="#" class="blogadr">${blog[i].blogadr}</a><a href="learn.html" target="_blank" class="blogtitle">${blog[i].blogtitle}</a></h2>
				<a class="blogpic col-xs-4 col-md-4" href="javascript:;" title=""><img src="${blog[i].blogpic}" alt="" class="img-responsive"></a>
				<div class="blogmsg col-xs-8 col-md-8">                        
					<p class="blogtext text-muted">${blog[i].blogtext}</p>                
					<ul class="bloginfo hidden-xs">
						<li class="blog_author"><a href="javascript:;">${blog[i].bloginfo[0]}</a></li>
						<li class="blog_time">${blog[i].bloginfo[1]}</li>
						<li class="blog_view"><span class="view_num">0</span>已阅读</li>
					</ul> 
				</div>                      
			</div>
		`);
		return item;
	}

	//设置翻页
	$(".nextpage").click(function(){//下一页
		k+=1;
		$(".blogs").remove();
		getBlogList();
	})

	$(".prepage").click(function(){//上一页
		if(k>0){
			k-=1;
			$(".blogs").remove();
			getBlogList();
		}
	})
/******* /利用ajax生成文章 *******/	

/******* 评论模块 *******/	
	$(".send").click(function(){
		if($(".comment").val().trim().length ===0 || $(".name_input").val().trim().length ===0){
			return; //不填写内容无法评论
		}
		var $text = $(".comment").val();
		var $name = $(".name_input").val();
		var $comment = createEle($text,$name);
		$(".comment_msg").prepend($comment);
		$(".comment").val("");
	});
	//每条评论的样式
	function createEle(text,name){
		var $com = $(`
		<div class="comment_text">
			<p class="info_text">${text}</p>
			<p class="info_msg">
				<span class="msg_time">${getTime()}</span>
				<span class="msg_name"><a href="#">${name}</a></span>
			</p>
		</div>`);
		return $com;
	}
	//生成当前时间
	function getTime(){
		var myDate = new Date();
		var year = myDate.getFullYear();
		var mon = myDate.getMonth() + 1; 
		var date = myDate.getDate(); 
		var h = myDate.getHours();
		var m = myDate.getMinutes();
		var s = myDate.getSeconds();
		var t=year+"-"+mon+"-"+date+" "+h+":"+m+":"+s;
		return t;
	}
/******* /评论模块 *******/
})

