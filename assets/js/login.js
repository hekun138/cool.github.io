$(function(){
	var user_name =$('.user_name').val(),user_password = $('.user_password').val();
	//获取当前用户登录时间戳
	var timestamp = Date.parse(new Date())/1000;
	//获取用户名的 value
	$('.user_name').change(function(){
		user_name = $('.user_name').val();
	});
	//获取用户名的密码
	$('.user_password').change(function(){
		user_password = $('.user_password').val();
	});
	//注册按钮的点击事件,跳转到注册页面
	$('.am-btn-default2').click(function(){
		window.location.href = "assets/html/register.html";
		return false;
	});
	//点击登录按钮事件
	$('.am-btn-default1').click(function(){
		if(!user_name || !user_password){
			$('.am-modal-hd').html('请登录')
			$('.am-modal-bd').html('您还没输入帐号密码');
			$('.am-btn-default1').attr("data-am-modal","{target: '#my-alert'}");
		}else{			
			//从json中获取数据
			$.getJSON('data.json',function(data){
				for(var i= 0;i<data.rows.length;i++){
					if((user_name === data['rows'][i]['username'])&&(user_password === data['rows'][i]['passWord'].toString())){
						$('.am-modal-hd').html('已登录');
						$('.am-modal-bd').html('你好，' + user_name);
						var msg = $('.am-btn-default1').attr("data-am-modal","{target: '#my-alert'}");
						setTimeout(function(){
							window.location.href = "assets/html/home.html?" + user_name + '&' + timestamp;
						},2000);
						return;
					}else{
						$('.am-modal-hd').html('请登录');
						$('.am-modal-bd').html('您的帐号密码有误,请重新输入');
						$('.am-btn-default1').attr("data-am-modal","{target: '#my-alert'}");
					}
				}
			});
		}	
	});
});