$(function(){
	
/****** 登录界面 ******/
//登录页面
function login(){
	var $text = $(`
			<div class="form_box">
					<form action="" method="post" class="log_box">
							<div class="log_top">
									<a href="javascript:;" class="form_close">关闭</a>
									<a href="javascript:;" class="log_reg">注册</a>
							</div>
							<div class="log_info">
									<input type="text" class="log_name_info" id="log_name">
									<label for="log_name" class="log_name">用户名</label>   
							</div>
							<div class="log_info">
									<input type="password" class="log_pwd_info" id="log_pwd">
									<label for="log_pwd" class="log_pwd">密码</label>
							</div>
							<div class="log_btn"><button type="button" class="log">登录</button></div>
					</form>
			</div>
	`);
	return $text; 
}
//注册页面
function register(){
	var $text = $(`
			<div class="form_box">
					<form action="" method="post" class="log_box">
							<div class="log_top">
									<a href="javascript:;" class="form_close">关闭</a>
									<a href="javascript:;" class="reg_log">登录</a>
							</div>
							<div class="log_info">
									<input type="text" class="reg_name_info" id="reg_name">
									<label for="reg_name" class="reg_name">用户名</label>
							</div>
							<div class="log_info">
									<input type="password" class="reg_pwd_info" id="reg_pwd">
									<label for="reg_pwd" class="reg_pwd">密码</label>
							</div>
							<div class="reg_btn"><button type="button" class="reg">注册</button></div>
							<div class="reg_foot">注册则代表同意<a href="javascript:;" class="foot_ag">注册协议</a>
							</div>
					</form>
			</div> 
	`);
	return $text;
}
//警告页面
function warn(text){
	var $text = $(`
			<div class="warn_box">
					<div class="warning">
							<p class="warn_msg">${text}</p>
							<a href="javascript:;" class="warn_close">我知道了</a>
					</div>
			</div>
			`)
	return $text;
}
//页面切换
$(".login").click(function(){
	$("body").prepend(login());
})
$("body").delegate(".log_reg","click",function(){
		$(".form_box").remove();
		$("body").prepend(register());
})
$("body").delegate(".reg_log","click",function(){
		$(".form_box").remove();
		$("body").prepend(login());
})
$("body").delegate(".form_close","click",function(){
		$(".form_box").remove();
})
$("body").delegate(".warn_close","click",function(){
		$(".warn_box").remove();
})
//填写内容时输入框的改变
$("body").delegate(".log_info input","change",function(){
	if($.trim($("#log_name").val()).length !==0 || $.trim($("#log_pwd").val()).length !==0){
			$(this).css("border-radius", "10px");
			$(this).next().css("left", "25px");	
	};
	if($.trim($("#reg_name").val()).length !==0 || $.trim($("#reg_pwd").val()).length !==0){
		$(this).css("border-radius", "10px");
		$(this).next().css("left", "25px");	
	}
})

//各种警告
$("body").delegate(".log","click",function(){
	if($.trim($("#log_name").val()).length ===0 || $.trim($("#log_pwd").val()).length ===0){
			$("body").prepend(warn("用户名或密码错误！"))
			return false;
	}else{
		$(".form_box").remove();
	}
	
})
						
$("body").delegate(".reg","click",function(){
		if($.trim($("#reg_name").val()).length === 0 || $.trim($("#reg_pwd").val()).length === 0){
				$("body").prepend(warn("请填写完每一项！"))
				return false;
		}else{
			$(".form_box").remove();
			$("body").prepend(login());
		}
		
})
	
	$(".login").click(function(){
		$(".navbar-collapse").attr({
			"aria-expanded":"false",
			"style":"height: 1px"
		});
		$(".navbar-collapse").removeClass("in");
	})
/****** /登录界面 ******/

/****** 给aside一个粘性定位 ******/

    $(window).scroll(function(){
		 $("html").scrollTop()>363?$(".about").addClass("about1"):$(".about").removeClass("about1");
	})
	//其他页面的粘性定位
	$(window).scroll(function(){
		$("html").scrollTop()>63?$(".tag").addClass("tag1"):$(".tag").removeClass("tag1");
   })
/****** /给aside一个粘性定位 ******/

/******* 利用ajax生成文章 *******/

	//调用函数生成文章
	getBlogList();

	//设置生成文章函数
	var k=0; //页码编号
	var n=3; //每页多少篇文章
	function getBlogList(){
		$.ajax({
			type:"get",
			url:"https://github.com/yanlly/blog/blob/master/bloglist.json",			
			success: function (data) {
				if(data.length-k*n<n){  //最后一页渲染剩余的文章篇数
					for(i=(0+k*n);i<data.length;i++){
						var item=creatItem(i,data);
						$(".bloglist").prepend(item);												 
					}
				}else{       //其他页渲染规定的文章篇数
					for(i=(0+k*n);i<(n+k*n);i++){
						var item=creatItem(i,data);
						$(".bloglist").prepend(item);												 
					}
				}	
							
				if (k===Math.ceil(data.length/n)-1){//如果当前在最后一页就隐藏下一页按钮
					$(".nextpage").hide();
				}			
			},
			error: function(err){
				throw err;
			}
		})
	}
	
	//设置文章模板
	function creatItem(i,blog){
		var item = (`			
		<div class="blogs row">
		<div><a href="learn.html" class="blogtitle">${blog[i].blogtitle}</a></div>
		<div>
		  <ul class="bloginfo">      
			<li><span class="iconfont">&#xe6ce;</span>${blog[i].blogtime}</li>
			<li><span class="iconfont">&#xe8cd;</span>0</li>
			<li><span class="iconfont">&#xe93c;</span>0</li>
		  </ul> 
		</div>
		<p class="blogtext text-muted">${blog[i].blogtext}</p>
		<div><a href="learn.html" class="more">阅读更多</a></div>
	  </div>
		`);
		return item;
	}

	//设置翻页
	$(".prepage").hide(); //如果当前在第一页，就隐藏上一页按钮

	$(".nextpage").click(function(){//下一页
		$(".prepage").show();
		k+=1;
		$(".blogs").remove();
		getBlogList();
	})

	$(".prepage").click(function(){//上一页
		$(".nextpage").show();
		k-=1;
		$(".blogs").remove();
		getBlogList();
		if(k===0){
			$(".prepage").hide();
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

