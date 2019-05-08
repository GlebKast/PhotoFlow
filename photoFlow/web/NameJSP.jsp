<%--
  Created by IntelliJ IDEA.
  User: Gleb Kastsiukevich
  Date: 27.04.2019
  Time: 22:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>NameJSP</title>
</head>
<body>
    <% String name = request.getParameter("name"); %>
    <%= "Name is " + name %>
</body>
</html>
