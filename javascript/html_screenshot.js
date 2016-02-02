  html2canvas(document.body, {
      onrendered: function(canvas) {

      	//  document.body.appendChild(canvas); - вставить канвас на страницу
          var imgData = canvas.toDataURL(
              'image/png');
          var doc = new jsPDF('l', 'mm'); //ориетнация p или l, метрическая система - mm
          doc.addImage(imgData, 'PNG', 5, 10, 287, 200); // отступ слева и справа, ширина и высота
          doc.save('sample-file.pdf'); //Запросит файл на сохранение
      }
  });