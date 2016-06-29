<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1" />
    <title>账单查询</title>
    <%@ include file="/inc/inc.jsp"%>
</head>
<body>
<div class="main-right">
    <div class="zuhu-title">
        <ul>
            <li>账单查询</li>
        </ul>
    </div>
    <div class="query">
        <ul>
            <li>
                <p>租户名称</p>
                <span><input class="int-large" type="text"></span>
            </li>
            <li>
                <p>租户ID</p>
                <span><input class="int-large" type="text"></span>
            </li>
        </ul>
        <ul>
            <li>
                <p>支付状态</p>
                <span><select class="set-large"><option>请选择</option></select></span>
            </li>
            <li>
                <p>账单月</p>
                <span><select class="set-large"><option>2016年06月</option></select></span>
            </li>
        </ul>
        <ul>
            <li>
                <p>账单金额</p>
                <span><input class="int-large" type="text">&nbsp;元</span>
                <b>～</b>
                <span><input class="int-large" type="text">&nbsp;元</span>
            </li>
        </ul>
        <ul>
            <li>
                <p>&nbsp;</p>
                <button class="btn-query">查 询</button>
            </li>
        </ul>
    </div>
    <div class="query-list">
        <table class="table">
            <thead>
            <tr>
                <td>序号</td>
                <td>租户ID</td>
                <td>租户名称</td>
                <td>账期月</td>
                <td>账单应缴金额（元）</td>
                <td>支付状态</td>
                <td>备注</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr class="bg-block">
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr class="bg-block">
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr class="bg-block">
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1629028993</td>
                <td>中信集团</td>
                <td>2016年6月</td>
                <td>1,000,000.00</td>
                <td>待支付</td>
                <td>消费</td>
            </tr>
            </tbody>
        </table>
    </div>
    <nav class="page">
        <ul class="pagination">
            <li><a href="#">首页</a></li>
            <li><a href="#">上一页</a></li>
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">下一页</a></li>
            <li><a href="#">末页</a></li>
        </ul>
    </nav>
</div>
</body>
</html>