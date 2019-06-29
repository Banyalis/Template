# Frontend-template

## Особенности
* Именование классов по [БЭМ](https://ru.bem.info/)
* Использование препроцессора [Pug](https://pugjs.org/api/getting-started.html)
* Использование препроцессора [SCSS](https://sass-lang.com/)
* Использование транспайлера [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах
* Использование [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей

## Установка
* Установите [Yarn](https://yarnpkg.com/en/docs/install)
* Скачайте сборку с помощью [Git](https://git-scm.com/downloads): ```git clone https://github.com/Banyalis/Template```
* Установите ```gulp``` и ```bem-tools-core``` глобально: ```yarn global add gulp-cli bem-tools-core```
* Скачайте необходимые зависимости: ```yarn```
* Чтобы начать работу, введите команду: ```yarn run dev``` (Режим разработки)
* Чтобы собрать проект, введите команду ```yarn run build``` (Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер)

## Файловая структура

```
Frontend-template
├── dist
├── app
│   ├── blocks
│   ├── fonts
│   ├── images
│   ├── pages
│   ├── scripts
│   ├── styles
│   ├── views
│   └── .htaccess
├── .babelrc.js
├── .bemrc.js
├── .eslintrc.json
├── .gitignore
├── gulpfile.babel.js
├── package.json
└── webpack.config.js
```

* Папка ```app``` - используется во время разработки:
	* БЭМ-блоки и компоненты: ```app/blocks```
	* шрифты: ```app/fonts```
	* изображения: ```app/images```
	* страницы сайта: ```app/pages```
	* JS-файлы: ```app/scripts```
	* SCSS-файлы: ```app/styles```
	* Pug-файлы: ```app/views```
	* конфигурационный файл веб-сервера Apache с настройками [gzip](https://habr.com/ru/post/221849/) (сжатие без потерь): ```app/.htaccess```

* Папка ```dist``` - папка, из которой запускается локальный сервер для разработки (при запуске ```yarn run dev```)

* Корень папки:
	* ```.babelrc.js``` — настройка ES6
	* ```.bemrc.js``` — настройка БЭМ
	* ```.eslintrc.json``` — настройка ESLint
	* ```.gitignore``` – запрет на отслеживание файлов Git'ом
	* ```gulpfile.babel.js``` — настройки Gulp
  * ```package.json``` — список зависимостей
  * ```webpack.config.js``` — настройки Webpack

## Рекомендации по использованию
* придерживайтесь компонентного подхода к разработке сайтов
	* каждый БЭМ-блок имеет свою папку внутри ```app/blocks/modules```
	* папка одного БЭМ-блока содержит в себе один Pug-файл, один SCSS-файл и один JS-файл
	* Pug-файл блока импортируется в файл ```app/views/index.pug```
	* SCSS-файл блока импортируется в файл ```app/blocks/modules/_modules.scss```, который в свою очередь импортируется в файл ```app/styles/app.scss```
	* JS-файл блока импортируется в ```app/scripts/import/modules.js```, который в свою очередь импортируется в файл ```app/scripts/app.js```
* компоненты оформляются в Pug с помощью примесей
	* каждый компонент имеет свою папку внутри ```app/blocks/components```
	* папка одного компонента содержит в себе один Pug-файл, один SCSS-файл и один JS-файл
	* Pug-файл компонента импортируется в файл ```app/views/layouts/default.pug```, который в свою очередь импортируется в файл ```app/views/index.pug```
	* SCSS-файл компонента импортируется в файл ```app/blocks/components/_components.scss```, который в свою очередь импортируется в файл ```app/styles/app.scss```
	* JS-файл компонента импортируется в файл ```app/scripts/import/components.js```, который в свою очередь импортируется в файл ```app/scripts/app.js```
* страницы сайта находятся в папке ```app/pages```
	* каждая страница наследует шаблон ```app/views/layouts/default.pug```
	* главная страница: ```app/views/index.pug```
* шрифты находятся в папке ```app/fonts```
* изображения находятся в папке ```app/images```
	* изображение для генерации фавиконок должно находиться в папке ```app/images``` и иметь размер не менее ```100px x 100px```
* все сторонние библиотеки устанавливаются в папку ```node_modules```
	* для их загрузки воспользуйтеcь командой ```yarn add package_name```
	* для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла БЭМ-блока (то есть тот БЭМ-блок, который использует скрипт), например: 
	```javascript 
	import $ from "jquery";
	```
	* для подключения стилевых файлов библиотек импортируйте их в файл ```app/styles/_libs.scss``` (который в свою очередь импортируется в файл 
	```app/styles/app.scss```)
* в вёрстку подключаются только минифицированные CSS и JS-файлы.

## БЭМ
В сборке используется компонентный подход к разработке сайтов по методолгии БЭМ, когда каждый БЭМ-блок имеет свою папку, внутри которой находятся один Pug-файл, один SCSS-файл и
один JS-файл. Чтобы вручную не создавать соответствующие папку и файлы, достаточно в консоли прописать следующие команды: 
* ```bem create my-block``` - для создания папки БЭМ-блока, где ```my-block``` - имя БЭМ-блока
* ```bem create my-component -l app/blocks/components``` для создания компонента
* ```bem create my-component -l app/blocks/components && bem create my-block``` - создать всё вместе

Для более удобного написания разметки по БЭМ используется [bemto](https://github.com/kizu/bemto)

**Pug**
```jade
+b.block1
  +e.element1 Foo
  +b.block2
    +e.A(href="#bar").element Bar
  +e.element2 Baz
```
**Результат**
```html
<div class="block1">
  <div class="block1__element1">
    Foo
  </div>
  <div class="block2">
    <a class="block2__element" href="#bar">Bar</a>
  </div>
  <div class="block1__element2">
    Baz
  </div>
</div>
```
