module.exports = function getZerosCount(number, base) {

 /*
B -система счисления
N - число
K - простой множитель числа

1. Разложить число B системы счисления на простые множители.
2. Разделить число N на каждый уникальной простой множитель K, домножая K сам на себя до тех пор,
 пока  будет больше единицы, при этом округляя каждый результат до меньшего целого.
3. Если при разложении числа системы счисления мы получили несколько одинаковых простых множителей K,
 то результат выше мы должны разделить на количество одинаковых K - округляем результат до меньшего целого.
4. Из всех делений N на каждый уникальный множитель K выбрать наименьшее частное, которое и будет нашим ответом.
*/

    /*Разложение на простые множители
    1. Пытаемся n разделить на i=2
    2. Если удачно, то вызываем метод еще раз с аргументом n/i
    3. Если не удачно то пытаемся n разделить на i++

    Осталось этот алгоритм ограничить и промежуточные результаты вывести в консоль.
    */

    let zerosCount = 0;

    //раскладываем base на простые множители
    const multipliersArray = [];
    let i = 2;
    const multipliers = factorizeBase();

    function factorizeBase() {
        while (base % i !== 0) {
            i++;
        }

        multipliersArray.push(i);
        base = base / i;

        if (base !== 1) {
            factorizeBase();
        }

        return multipliersArray;
    }

   //пункт 2 алгоритма

    const zerosCountArray = []; // в массив будем заносить результаты по каждому уникальному множителю

    for (i = 0; i < multipliers.length; i++) {
        let numberInArray = number; //передаем значение number каждый раз для новой итерации
        let count = 0; //обнуляем счетчик каждый раз для новой итерации

        while (numberInArray > 0) {
            numberInArray = Math.floor(numberInArray / multipliers[i]);
            count += numberInArray;
        }

        //пункт 3: нужно посчитать, сколько одинаковых простых множителей в массиве multipliers - реализовать!! если повторяются: count/кол-во повторений
        const countOfDuplicates = getNumberOfDuplicatesOfItem(multipliers[i], multipliers);
        count = count / countOfDuplicates;

        zerosCountArray.push(count);
    }


    function getNumberOfDuplicatesOfItem (item, array) {
        let count = 0;

        for(let i = 0; i < array.length; i++) {
           if(item === array[i]) {
                count++;
           }
        }

        return count;
    }


    //пункт 4
    // передаем в zerosCount минимал значение массива zerosCountArray
    zerosCount = Math.min(...zerosCountArray);

    return Math.floor(zerosCount);
};





