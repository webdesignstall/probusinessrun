export default function pdfTemplate(canvas) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Document</title>
</head>
<body>
    <div style="width: ${canvas.width}px; height: ${canvas.height}px;"><img width="100%" src="${canvas}" /></div>
</body>
</html>`;
}
