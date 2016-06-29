define('app/jsp/datamanage/queryUrlPort', function (require, exports, module) {
    'use strict';
    var $=require('jquery'),
    Widget = require('arale-widget/1.2.0/widget'),
    //AjaxController=require('opt-ajax/1.0.0/index');
    Dialog = require("artDialog/src/dialog"),
    //Paging = require('paging/0.0.1/paging'),
    Calendar = require('arale-calendar/1.1.2/index'),
    AjaxController = require('opt-ajax/1.0.0/index');
    require("jsviews/jsrender.min");
    require("jsviews/jsviews.min");
    require("app/util/jsviews-ext");
    
    //实例化AJAX控制处理对象
    //var ajaxController = new AjaxController();
    
    //定义页面组件类
    var QueryUrlPortPager = Widget.extend({
    	//属性，使用时由类的构造函数传入
    	attrs: {
    	},
    	Statics: {
    		DEFAULT_PAGE_SIZE: 6
    	},
    	//事件代理
    	events: {
    		//key的格式: 事件+空格+对象选择器;value:事件方法
           
        },
    	//重写父类
    	setup: function () {
    		QueryUrlPortPager.superclass.setup.call(this);
    		this._initPage();
    		this._setDataTestUrl();
    		this._setDataFormalUrl();
    		this._setDataPassword();
    		this._setDataLimitUpnum();
    	},
    	_initPage: function(){
    		setBreadCrumb("资料管理","地址和端口查询");//导航
      		$("#mnu_bmc_config").addClass("current");//左侧菜单选中样式
      	},
    	//公共方法，加载账单优惠类型下拉菜单
		_setDataTestUrl: function() {
			
			this._setSelectValue(_base + '/param/getDataTestUrl', null, function(data){
				if(data){
					var data = eval(data);
					if(data!=null && data[0].paramCode!=null){
						$('#testUrl').val(data[0].paramCode);
					}
				}
			});
		},
		_setDataFormalUrl: function() {
			this._setSelectValue(_base + '/param/getDataFormalUrl', null, function(data){
				if(data){
					var data = eval(data);
					if(data!=null && data[0].paramCode!=null){
						$('#formalUrl').val(data[0].paramCode);
					}
				}
			});
		},
		_setDataPassword: function() {
			this._setSelectValue(_base + '/param/getDataPassword', null, function(data){
				if(data){
					var data = eval(data);
					if(data!=null && data[0].paramCode!=null){
						$('#passowrd').val(data[0].paramCode);
					}
				}
			});
		},
		_setDataLimitUpnum: function() {
			this._setSelectValue(_base + '/param/getDataLimitUpnum', null, function(data){
				if(data){
					var data = eval(data);
					if(data!=null && data[0].paramCode!=null){
						$('#upnumLimited').html('b.  测试URL在系统集成和联调期间使用，可处理'+data[0].paramCode+'条数据；');
					}
				}
			});
		},
		//公共方法，加载下拉菜单
    	_setSelectValue: function(url, data, callback){
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				success : function(data) {
					callback.call(this, data);
				}
			});
		},
    });
    
    module.exports = QueryUrlPortPager
});
