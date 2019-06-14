## Документация модуля Tools


### Функция `hexToRGB()`
#### Сигнатура:

*Object hexToRGB = (String) => {}*

* имя функции: *hexToRGB*
* возвращаемое значение: *Object*
* принимаемое значение: *String*

#### Назвачение:

Функция принимает цвет в формате *hex* и возвращает его в формате *rgb*


### Функция `floodFillImageData()`
#### Сигнатура:

*Arrray floodFillImageData = (Uint8ClampedArray, Object, Object, Object) => {}*

* имя функции: *floodFillImageData*
* возвращаемое значение: *Array*
* 1. принимаемое значение: *Uint8ClampedArray*
* 2. принимаемое значение: *Object*
* 3. принимаемое значение: *Object*
* 4. принимаемое значение: *Object*

#### Назвачение:

Функция служит промежуточный этапом для заливки определённой области холста.



### Функция `sortByDateNewOld()`
#### Сигнатура:

*Number sortByDateNewOld = (MapIterator, MapIterator) => {}*

* имя функции: *sortByDateNewOld*
* возвращаемое значение: *Number*
* 1. принимаемое значение: *MapIterator*
* 2. принимаемое значение: *MapIterator*

#### Назвачение:

Функция используется как *compareFunction* для метода *Array.prototype.sort()*. Она позволяет сортировать по дате в порядке от более нового к более старому



### Функция `sortByDateOldNew()`
#### Сигнатура:

*Number sortByDateOldNew = (MapIterator, MapIterator) => {}*

* имя функции: *sortByDateOldNew*
* возвращаемое значение: *Number*
* 1. принимаемое значение: *MapIterator*
* 2. принимаемое значение: *MapIterator*

#### Назвачение:

Функция используется как *compareFunction* для метода *Array.prototype.sort()*. Она позволяет сортировать по дате в порядке от более старого к более новому


### Функция `parseKey()`
#### Сигнатура:

*Object parseKey = String => {}*

* имя функции: *parseKey*
* возвращаемое значение: *Object*
* принимаемое значение: *String*

#### Назвачение:

Функция принимет ключ (*localStorage-key*) в формете строки и извлекает оттуда нужные данные:
1. Имя
2. Дату
3. Размеры в формате: *width x height*
Возвращаются эти данные в виде объекта