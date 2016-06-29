package com.ai.citic.billing.web.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class AmountUtil {
    
    /**  
     * 将厘为单位的转换为元 （除1000）  
     *   
     * @param amount  
     * @return  
     * @throws Exception   
     */    
    public static double changeL2Y(String amount) throws Exception{    
        BigDecimal balance = BigDecimal.valueOf(Long.valueOf(amount)).divide(new BigDecimal(1000L),2,BigDecimal.ROUND_HALF_UP);
        return balance.doubleValue();
    }  
    
    /**  
     * 将厘为单位的转换为元 （除1000）  
     *   
     * @param amount  
     * @return  
     * @throws Exception   
     */    
    public static double changeL2Y(Long amount) throws Exception{
        BigDecimal balance = BigDecimal.valueOf(amount).divide(new BigDecimal(1000L),2,BigDecimal.ROUND_HALF_UP);
        return balance.doubleValue();
    }
    
    /** 
     * 将厘为单位的转换为元 （除1000）  
     * @author liangbs
     */
    public static String Li2Yuan(Long amount){
        if(amount == null || amount == 0){
            return "0.00";
        }
        BigDecimal balance = BigDecimal.valueOf(amount).divide(new BigDecimal(1000L),2,BigDecimal.ROUND_HALF_UP);
        return new DecimalFormat(",###,##0.00").format(balance);
    }
    
    /**  
     * 将厘为单位的转换为元 （除1000） 
     * @author liangbs
     */    
    public static String Li2Yuan(Double amount){
        String result = "0.00";
        if(amount != null && amount != 0){
            BigDecimal balance = BigDecimal.valueOf(amount).divide(new BigDecimal(1000L),2,BigDecimal.ROUND_HALF_UP);
            result = new DecimalFormat(",###,##0.00").format(balance);
        }
        return result;
    } 
    /**
     * 将千分之一厘转换为元（除以1000000），采用的是四舍五入
     * @author gaogang
     */
    public static String Li2Y(Long amount){
    	 if(amount == null || amount == 0){
             return "0.00";
         }
    	 BigDecimal balance = BigDecimal.valueOf(amount).divide(new BigDecimal(1000000L),2,BigDecimal.ROUND_HALF_UP);
         return new DecimalFormat(",###,##0.00").format(balance);
    }
    public static void main(String[] args) {
		System.out.println(Li2Y(12312312312312312L));
	}
}
