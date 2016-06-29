package com.ai.citic.billing.web.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * 流量类型转化
 *
 * Date: 2016年5月26日 <br>
 * Copyright (c) 2016 asiainfo.com <br>
 * @author gaogang
 */
public final class GprsTransfer {
	/**
	 * 将Byte转化为MB
	 * @param amount
	 * @return
	 * @author gaogang
	 * @ApiDocMethod
	 * @ApiCode
	 */
	public static String tranferByte(Long amount){
		 if(amount == null || amount == 0){
             return "0.00";
         }
    	 BigDecimal balance = BigDecimal.valueOf(amount).divide(new BigDecimal(1048576L),2,BigDecimal.ROUND_HALF_UP);
         return new DecimalFormat(",###,###0.00").format(balance);
	}
}
