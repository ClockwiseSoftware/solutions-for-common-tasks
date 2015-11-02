/**
 * @param object {object} - объект в котором будем искать свойство
 * @param property {string} - имя свойства которое мы ждем пока оно загрузится
 * @param timeout {number}[optional, default:3000] - ms, время ожидания до выброса ошибки, если объект так и не загрузился
 * @param errorMessage {string}[optional: default: 'data not availible'] - Сообщение об ошибке
 * @param interval {number}[optional, default: 100] - ms, интервал проверки свойства
 */
function waitData(object, property, timeout, errorMessage, interval) {
    timeout = timeout || 3000;
    interval = interval || 100;
    errorMessage = errorMessage || 'data not availible';
    return new Promise(function(resolve, reject) {
        function tmp(object, property, count) {
            count = count || 0;
            if (count > timeout / interval) {

                reject(errorMessage);
            } else if (!object[property]) {
                setTimeout(function() {
                    tmp(object, property, count + 1);
                }, interval);
            } else {
                resolve(object[property]);
            }
        }
        tmp(object, property);
    }
    );
}



waitData(window, 'google', 3000, 'Не удалось загрузить данные', 100).then(function(data) {
    alert(data);
}).catch(function(error) {
    alert(error);
}
);
