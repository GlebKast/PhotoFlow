<%--
  Created by IntelliJ IDEA.
  User: Gleb Kastsiukevich
  Date: 27.04.2019
  Time: 22:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>CheckJSP</title>
</head>
<body>
<%
    boolean success = false;
    if(response.getStatus() == 200)
        success = true;
%>
<%= "{ 'success' : " + success + " }" %>
</body>
</html>
