var pdf = require('phantomjs-pdf'); //Плагин который собственно и делает наш PDF используя HTML  и CSS
var swig = require('swig'); //серверный шаблонизатор это также может быть EJS или HAML или Handlebars, главное чтобы умел рендерить шаблон в переменную




router.get('/pdf', function(req, res) {
    var completeHTML = swig.compileFile(__dirname + '/../../../src/app/home/calc.tpl.html')({
        categories: [{
            name: 'cat1'
        }]
    });
    var completeCSS = swig.compileFile(__dirname + '/../../../build/assets/AirCarbonEmmissions-0.3.2.css');
    pdf.convert({
        "html": completeHTML,
        "css": completeCSS.tokens[0],
    }, function(result) {

        /* Using a buffer and callback */
        //result.toBuffer(function(returnedBuffer) {});

        /* Using a readable stream */
        var stream = result.toStream();
        res.setHeader('Content-disposition', 'attachment; filename=helloWorld.pdf'); //указываем имя файла

        //res.setHeader('Content-type', stream.headers['content-type']);

        stream.pipe(res);

        /* Using the temp file path */
        //var tmpPath = result.getTmpPath();

        /* Using the file writer and callback */
        //    result.toFile("/path/to/file.pdf", function() {});
    });
});
