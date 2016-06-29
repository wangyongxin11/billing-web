define('app/jsp/salableproduct/addSalableProduct', function (require, exports, module) {
    'use strict';
    var $=require('jquery'),
    Widget = require('arale-widget/1.2.0/widget'),
	AjaxController=require('opt-ajax/1.0.0/index'),
	Dialog=require('artDialog/src/dialog'),
	moment = require('moment/2.9.0/moment'),
	Calendar = require('arale-calendar/1.1.2/index');

    require("jsviews/jsrender.min");
    require("jsviews/jsviews.min");

    //实例化AJAX控制处理对象
    var ajaxController = new AjaxController();
    
    //定义页面组件类
    var AddSalableProductPager = Widget.extend({
    	//属性，使用时由类的构造函数传入
    	attrs: {
			tableDiv:''
    	},
    	Statics: {
    		DEFAULT_PAGE_SIZE: 6
    	},
    	//事件代理
    	events: {
    		//key的格式: 事件+空格+对象选择器;value:事件方法
			"click :button.cancel":"_clickCancelBtn"
        },
    	//重写父类
    	setup: function () {
			AddSalableProductPager.superclass.setup.call(this);
			this._setMenu();
			this._bindCalendar();
			this._bindEvents();
			this._getServiceType();
			this._getUnitType();
			//this._getCycleType();
    	},

		_setMenu:function () {
			setBreadCrumb("套餐产品管理","套餐产品添加");
			$("#mnu_bmc_config").addClass("current");
		},
		_clickCancelBtn:function(){
			window.location.href = _base + "/salableProduct/list";
		},
		_bindCalendar:function(){
			$(".nsp-calendar").each(function(){
				new Calendar({trigger: $(this)});
			});
			$(".icon-calendar").each(function(index){
				new Calendar({
					trigger: $(this),
					output:".nsp-calendar:eq("+index+")",
					align: {
						selfXY: [0, 0],
						baseElement:$(this).parent().siblings("input"),
						baseXY: [0, '100%']
					}
				});
			});
		},
		_bindEvents:function(){
			var _this = this;
			//绑定效果
			/*$(".steps>img").bind('click',function(){
				var parentDiv = $(this).parents(".tab-table-bg");
				//var tableDiv = $(this).parents(".table-cnt").next();
				var tableDiv = _this.get("tableDiv");
				var tableNum = parentDiv.children(".table-cnt").not(":hidden").size();
				if(tableNum==1){
					//tableDiv.show(300);
					$(this).parents(".table-cnt").next().show(300);
				}else if(tableNum==2){
					var d = Dialog({
						content:"最多支持2条资费配置",
						ok:function(){
							this.close();
						}
					});
					d.show();
				}else{
					tableDiv.clone(true).insertAfter(parentDiv.children(".table-cnt").last()).hide().show(300);
				}
			});
			$(".stepc>img").bind('click',function(){
				$(this).parents(".table-cnt").hide(300);
			});*/
			//隐藏添加按钮
			$(".steps>img").hide();
			$(".Increase>a").bind('click',function(){
				var parentDiv = $(this).parents(".management-tab-cnt");
				var tableTab = parentDiv.children(".radio-tab:not(:hidden)");
				var lastTableDiv = $(this).parent().prev();
				var bigTableDiv = _this.get("bigTableDiv");
				var tableNum = tableTab.children(".tab-cnt-table").not(":hidden").size();
				var billingType = parentDiv.find("input[name=billingType]").val();
				var pricingType = parentDiv.find("input[name=pricingType]").val();
				if('STANDARD_GROUP_TYPE'==billingType&&'NO'==pricingType){
					bigTableDiv = _this.get("bigPriceTableDiv");
				}
				if(tableNum==1){
					lastTableDiv.show(300);
				}else{
					var cloneDiv = bigTableDiv.clone(true);
					if('STANDARD_GROUP_TYPE'==billingType){
						cloneDiv.find(".UnitPrice").remove();
					}else {
						if('YES'==pricingType){
							cloneDiv.find(".UnitPrice").children(".priceDesc").text("总价");
							cloneDiv.find(".UnitPrice").children("input[name=price]").attr("tip","总价");
						}
					}
					cloneDiv.insertAfter(lastTableDiv).hide().show(300);
				}
			});
			$(".table-bg-title img").bind('click',function(){
				$(this).parents(".tab-cnt-table").hide(300);
			});
			//绑定保存
			$(":button.save").click(function () {
				var parent = $(this).parents(".management-tab-cnt");
				var tableTab = parent.children(".radio-tab:not(:hidden)");
				var hideTableTab = parent.children(".radio-tab:hidden");
				//var exclude = parent.children(":not(:hidden)").find(":hidden").find("input,select");
				//var mainProduct = parent.find(".main-product").find(".table-cnt:not(:hidden)").find("input,select").serializeArray();
				var validateFlag = true;
				parent.find(".sp_require").not(hideTableTab.find(".sp_require")).not(tableTab.children(".tab-cnt-table:hidden").find(".sp_require")).not(tableTab.find(".tab-cnt-table:not(:hidden)").find(".table-cnt:hidden").find(".sp_require")).each(function () {
					var that = this;
					if($.trim($(this).val())==""){
						var tip = $(this).attr("tip");
						var d = Dialog({
							content:tip+"不能为空",
							okValue:"确定",
							ok:function () {
								this.close();
								$(that).focus();
								return;
							}
						});
						d.show();
						validateFlag = false;
						return false;
					}
				});
				var productName = $.trim(parent.find("input[name=productName]").val());
				if(productName.length>15){
					var de = Dialog({
						content:"产品名称长度不能超过15",
						okValue:"确定",
						ok:function () {
							this.close();
							parent.find("input[name=productName]").focus();
						}
					});
					de.show();
					validateFlag = false;
					return;
				}
				var beginDate = $.trim(tableTab.find("input[name=activeDate]").val());
				var endDate = $.trim(tableTab.find("input[name=invalidDate]").val());
				if(beginDate!=""&&endDate!=""){
					var begin = moment(beginDate,"YYYY-MM-DD");
					var end = moment(endDate,"YYYY-MM-DD");
					if(end.diff(begin)<=0){
						var dc = Dialog({
							content:"失效日期必须大于生效日期",
							okValue:"确定",
							ok:function () {
								this.close();
								tableTab.find("input[name=invalidDate]").focus();
							}
						});
						dc.show();
						validateFlag = false;
						return;
					}
				}
				var tableInfo = new Array();
				var billingType = parent.find("input[name=billingType]").val();
				tableTab.find(".tab-cnt-table:not(:hidden)").find(".table-cnt:not(:hidden)").each(function (index) {
					var serviceType = $(this).find("select[name=serviceType]").val();
					var serviceTypeDetail = $(this).find("select[name=serviceTypeDetail]").val();
					var value =  serviceType+","+serviceTypeDetail;
					if(tableInfo.length==0){
						tableInfo[index] = value;
					}else{
						if(tableInfo[index]){//该table已存在,允许修改
							tableInfo[index] = value;
						}else{//table不存在，判断值是否相同
							for(var i=0;i<tableInfo.length;i++){
								if(billingType=='STANDARD_GROUP_TYPE'){
									if(tableInfo[i]==value&&i!=index){
										var de = Dialog({
											content:"产品业务类型及细分不能同已配置产品重复",
											okValue:"确定",
											ok:function () {
												this.close();
											}
										});
										de.show();
										validateFlag = false;
										return false;
									}else{
										tableInfo[index] = value;
									}
								}else{
									if(tableInfo[i]!=value){
										var df = Dialog({
											content:"产品业务类型及细分必须同已配置产品一致",
											okValue:"确定",
											ok:function () {
												this.close();
											}
										});
										df.show();
										validateFlag = false;
										return false;
									}
								}
							}
						}
					}
				});
				if(validateFlag){
					var mainProduct = new Array();
					tableTab.find(".tab-cnt-table:not(:hidden)").each(function () {
						var mainPrice = $(this).find(".UnitPrice input").serializeArray();
						$(this).find(".table-cnt:not(:hidden)").each(function () {
							var mainVo = $(this).find("input,select").serializeArray();
							if(mainPrice){
								mainVo = mainVo.concat(mainPrice);
							}
							mainProduct.push(_this.serializeObjectToJson(mainVo));
						});
					});
					/*var minorProduct = new Array();
					 parent.find(".minor-product:not(:hidden)").each(function () {
					 var price = $(this).find(".UnitPrice input").serializeArray();
					 $(this).find(".table-cnt:not(:hidden)").each(function () {
					 var minorVo = $(this).find("input,select").serializeArray();
					 var newVoArr = minorVo.concat(price);
					 minorProduct.push(_this.serializeObjectToJson(newVoArr));
					 });
					 });*/
					//var minorProduct = parent.find(".minor-product:not(:hidden)").find(".table-cnt:not(:hidden)").find("input,select").serializeArray();
					var productParams = parent.find(".radio-tab:not(:hidden) .tab-form,.tab-cnt-title,.tab-cnt-input").find("input:text,input:hidden,input:checked").serializeArray();
					//var data = parent.children("div:not(:hidden)").find("input:text,select,input:checked,input:hidden").not(exclude).serializeArray();
					ajaxController.ajax({
						type: "post",
						dataType: "json",
						processing: true,
						message: "正在提交，请等待...",
						url: _base+"/salableProduct/addSalableProduct",
						data:{
							productParams:JSON.stringify(_this.serializeObjectToJson(productParams)),
							mainProducts:JSON.stringify(mainProduct)
						},
						success: function(data){
							if(data){
								var d = Dialog({
									content:data.statusInfo,
									okValue:"确定",
									ok:function () {
										this.close();
										window.location.href = _base + "/salableProduct/list";
									}
								});
								d.show();
							}
						}
					});
				}
			});
			
			//禁止输入法切换
			$("input.wh40,input.wh50").attr("style","ime-mode:disabled");
		},
		_getServiceType: function() {
			var _this = this;
			this.setSelectValue(_base + '/param/getServiceType', function(data){
				var json = eval(data);
				$.each(json,function(index, item) {
							// 循环获取数据
							var paramName = json[index].paramName;
							var paramCode = json[index].paramCode;
							$(".serviceType").append('<option cid="'+json[index].id+'" value="'+paramCode+'">'+paramName+'</option>');
						});
				$(".serviceType").append("<label id='accesstype_error'></label>");
				_this._getServiceDetail();
			});
		},
		_getServiceDetail: function() {
			var _this = this;
			var serverId = $(".serviceType").find("option:selected").attr('cid');
			var childObj = $(".serviceType").parent().siblings().children(".serviceTypeDetail");
			_this.setSelectValue(_base + '/param/getServiceDetail?serverId='+serverId, function(data){
				var json = eval(data);
				$.each(json,function(index, item) {
					// 循环获取数据
					var paramName = json[index].paramName;
					var paramCode = json[index].paramCode;
					childObj.append('<option value="'+paramCode+'">'+paramName+'</option>');
				});
				childObj.append("<label id='accesstype_error'></label>");
			});

			$(".serviceType").change(function () {
				var serverId = $(this).find("option:selected").attr('cid');
				var childObj = $(this).parent().siblings().children(".serviceTypeDetail");
				_this.setSelectValue(_base + '/param/getServiceDetail?serverId='+serverId, function(data){
					childObj.empty();
					var json = eval(data);
					$.each(json,function(index, item) {
						// 循环获取数据
						var paramName = json[index].paramName;
						var paramCode = json[index].paramCode;
						childObj.append('<option value="'+paramCode+'">'+paramName+'</option>');
					});
					childObj.append("<label id='accesstype_error'></label>");
				});
			});

			$(".serviceTypeDetail").change(function (e) {
				var parent = $(this).parents(".management-tab-cnt");
				var tableTab = parent.children(".radio-tab:not(:hidden)");
				var serviceTypeDetail = $(this).val();
				var serviceType = $(this).parent().siblings().children(".serviceType").val();
				var billingType = parent.find("input[name=billingType]").val();
				var theTable = $(this).parents(".table-cnt");
				var thisIndex = tableTab.find(".tab-cnt-table:not(:hidden)").find(".table-cnt:not(:hidden)").index(theTable);
				var thisValue = serviceType+","+serviceTypeDetail;
				tableTab.find(".tab-cnt-table:not(:hidden)").find(".table-cnt:not(:hidden)").each(function (index) {
					if(thisIndex!=index){
						var serviceTypeTemp = $(this).find("select[name=serviceType]").val();
						var serviceTypeDetailTemp = $(this).find("select[name=serviceTypeDetail]").val();
						var value =  serviceTypeTemp+","+serviceTypeDetailTemp;
						if(billingType=='STANDARD_GROUP_TYPE'){
							if(thisValue==value){
								var de = Dialog({
									content:"产品业务类型及细分不能同已配置产品重复",
									okValue:"确定",
									ok:function () {
										this.close();
									}
								});
								de.show();
								return false;
							}
						}else{
							if(thisValue!=value){
								var df = Dialog({
									content:"产品业务类型及细分必须同已配置产品一致",
									okValue:"确定",
									ok:function () {
										this.close();
									}
								});
								df.show();
								return false;
							}
						}
					}
				});
			});
		},
		_getCycleType: function() {
			var _this = this;
			_this.setSelectValue(_base + '/param/getCycleType', function(data){
				var json = eval(data);
				$.each(json,function(index, item) {
					// 循环获取数据
					var paramName = json[index].paramName;
					var paramCode = json[index].paramCode;
					$("select[name=cycleType]").append('<option value="'+paramCode+'">'+paramName+'</option>');
				});
				$("select[name=cycleType]").append("<label id='accesstype_error'></label>");
			});
		},
		_getUnitType: function() {
			var _this = this;
			_this.setSelectValue(_base + '/param/getUnitType', function(data){
				var json = eval(data);
				$.each(json,function(index, item) {
					// 循环获取数据
					var paramName = json[index].paramName;
					var paramCode = json[index].paramCode;
					$("select[name=unit]").append('<option value="'+paramCode+'">'+paramName+'</option>');
				});
				$("select[name=unit]").append("<label id='accesstype_error'></label>");
			});
		},
		setSelectValue: function(url, func){
			$.ajax({
					url : url,
					type : "post",
					async : true,
					dataType : "html",
					timeout : "10000",
					error : function() {
						alert("服务加载出错");
					},
					success : function(data) {
						func(data);
					}
				});
		},
		serializeObjectToJson:function(obj){
			var o={};
			$.each(obj,function(index,e){
				if(o[e.name]){
					if(!o[e.name].push){
						o[e.name] = [o[e.name]];
					}
					o[e.name].push(e.value||'');
				}else{
					o[e.name] = e.value||'';
				}
			});
			return o;
		},
    });
    
    module.exports = AddSalableProductPager
});
