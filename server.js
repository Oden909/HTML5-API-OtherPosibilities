const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    let filePath = request.url.substring(1) || "index.html";
    const contentType = filePath.endsWith(".css") ? "text/css" : "text/html";
    response.setHeader("Content-Type", `${contentType}; charset=utf-8`);
    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.end("<h1>Ошибка!</h1>");
        } else {
            response.end(data);
        }
    });
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));
