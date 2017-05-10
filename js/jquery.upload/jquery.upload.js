/**
 * 自定义文件上传插件
 * 任意jquery对象都可调用此插件，从而转换成上传控件
 */
(function(){

	var fd = new FormData();// html5新增的对象,可以包装字符,二进制信息
	var $ELEMENT = null;
	var xhr = new XMLHttpRequest();
	var response = null;
	var MAXFILENUMBER = 5;

	$("#file").change(function(){
		
		var files = this.files;
		var html = '';
		var fileAttrs = [];
		var fl = Math.min(files.length, MAXFILENUMBER);

		fd.append("from", "file");
		fd.append("httptype", "1");
		fd.append("Token", "797f6ce491baa29c295b31b4cde4bf796fda229e:eN_OGRjI_beIRSNvC9fnsZXqgSQ=:eyJkZWFkbGluZSI6MTQ5NDM5NzQ1MSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNjk5NiIsImFpZCI6IjE1NzM3IiwiZnJvbSI6ImZpbGUifQ==");
		
		var fileName = files[0].name;
		var fileSize = files[0].size;
		var fileType = files[0].type;
		fd.append(this.name, files[0]);

		var reader = new FileReader();
		reader.readAsDataURL(files[0]);
        	reader.onload = function (e) {
        	$("#local-img").attr("src", this.result);
        }

		setTimeout(function(){
			$(".file-list-box").html(html);
			$(".preview-box-footer").show();
		}, 500);
	})

	$("button.start").click(function(){
		upload(fd);
	})
	

	function upload(fd) {
		xhr.open('POST', "http://up.imgapi.com/", true);
		// 异步传输  xhr.upload 这是html5新增的api,储存了上传过程中的信息
		xhr.upload.onprogress = function(ev) {
			var percent = 0;
			if (ev.lengthComputable) {
				percent = 100 * ev.loaded / ev.total;
				$('.percent').text(parseInt(percent) + "%");
				$(".progress-bar").width(percent + '%');

				var newPro = percent >= 100 ? 88 : percent;
				$('.percent')[0].style.left = newPro + "%";
			}
		};
		xhr.onload = function(e){
			//$ELEMENT.val(null);
			response = JSON.parse(e.target.response);
			layer.msg("上传成功！");
			$(".preview-box-footer").fadeOut("slow", function(){
				$(".progress-bar").width(0);
			});
			$(".show").show();
			for(var i in response){
        		$(".show #" + i).text(response[i]);
        	}
		}

		xhr.onerror = function(e){
			//$ELEMENT.val(null);
			layer.msg("上传错误！", {icon: 2}, function(){
				layer.closeAll();
			});
		}
		xhr.send(fd);
	}

	var preTimer = null;
	$("body").on("mouseenter", ".is-img-file", function(e){
		var _this = this;
		preTimer = setTimeout(function(){
			var base64 = _this.style["background-image"].split('"')[1];
			if($("#preImg").length){
				$("#preImg").attr("src", base64);
			}else{
				$("body").append('<img src="'+base64+'" id="preImg" style="position:absolute;top:100px;left:100px;width:400px;box-shadow:0 0 20px 2px rgba(100,100,100,.6);z-index:999999999;">');
			}
		},300)
	}).on("mouseleave", ".is-img-file", function(e){
		clearTimeout(preTimer);
		$("#preImg").remove();
	})

})(jQuery);
