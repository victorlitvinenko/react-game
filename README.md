# react-game
Сама игра доступна по [ссылке](https://victorlitvinenko-react-game.netlify.app/).
## Правила
Игра представляет собой пазл-головоломку. Управление в игре при помощи мыши. Клик по фигуре вращает ее, перетаскиванием (drag & drop) можно перемещать фигуры.

Для выигрыша необходимо собрать все фигуры так, чтобы они были корректно соединены между собой.

Фигуры делятся на разные типы. Некоторые можно вращать, другие перемещать, некоторые и вращать и перемещать, а отдельный тип фигур невозможно ни перемещать ни вращать.
## Типы фигур
Фигура | Описание
--- | ---
| ![](https://github.com/victorlitvinenko/react-game/blob/react-game/src/images/red.png?raw=true) | Такие фигуры невозможно ни `двигать` ни `вращать`
| ![](https://github.com/victorlitvinenko/react-game/blob/react-game/src/images/blue.png?raw=true) | Такие фигуры можно только `вращать`
| ![](https://github.com/victorlitvinenko/react-game/blob/react-game/src/images/green.png?raw=true) | Такие фигуры можно только `двигать`
| ![](https://github.com/victorlitvinenko/react-game/blob/react-game/src/images/orange.png?raw=true) | Такие фигуры можно и `вращать` и `двигать`
