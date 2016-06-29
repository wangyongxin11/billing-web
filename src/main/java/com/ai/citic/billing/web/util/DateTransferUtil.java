package com.ai.citic.billing.web.util;

/**
 * 时间转换工具类
 *
 * Date: 2016年5月26日 <br>
 * Copyright (c) 2016 asiainfo.com <br>
 * @author gaogang
 */
public final class DateTransferUtil {

	
    /**
     * 将秒转换为时分秒
     * @return
     * @author gaogang
     * @ApiDocMethod
     * @ApiCode
     */
    public static String tranferSec(Long sec){
    	
    	
    	Long second=sec%60;
    	
    	Long totalMinute=sec/60;
    	
    	Long minutes=totalMinute%60;
    	
    	
    	Long hour=totalMinute/60;
    	
    	String time=hour+"小时"+minutes+"分钟"+second+"秒";
    	
    	return time;
    }
    
    public static void main(String[] args) {
		System.out.println(tranferSec(63L));
	}
}
