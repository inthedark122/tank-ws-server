# Сервер для игры в танчики

## Описание

Сервер работает на базе WebSocket

Для ознакомления с WebSocket можно использовать https://www.websocket.org/echo.html

На сервере специально нет базы данных для простоты разворачивания

## Правила игры

Для начала нужно подключиться к серверу по WebSocket.

Для входа в игру нужно отправить запрос с `type: init`, таким образом произойдет регистрация в игре.

Перемещение осуществляются с помощью `type: move`, а выстрел `type: shot`

Для перемещение используются система позиций: `top|right|bottom|left`

## Запуск сервера

Для запуска нужно склонировать репозиторий и поставить пакеты с помощью `npm install`

Запуск происходит с помощью `npm start`

## Сообщения

| type | params                                             | response       | comment                      |
| ---- | -------------------------------------------------- | -------------- | ---------------------------- |
| init | `{"tankId": "string"}`                             | `ref:Response` | Добавление в игру            |
| move | `{"tankId": "string", "position": "ref:Position"}` | `ref:Response` | Нажатие перемещения          |
| shot | `{"tankId": "string"}`                             | `ref:Response` | Выстрел по направлению танка |

### Broadcast - оповещение всех о новых данных

После отправки сообщения происходит отправка всех данных через broadcast

В системе предусмотрена система мониторинга за выстрелами.
Сервер пересчитывает все выстрелы и формирует новые координаты каждые 160 миллисекунд.
Для оповещение используется система уведомления с форматом:

```json
  {
    "type": "refresh",
    "tanks": {
      "tankId": "ref:Tank"
    },
    "bullets": ["ref:Bullet"]
  }
```

### Дополнительные типы данных

**Position:**

```json
"top|right|bottom|left"
```

**Bullet:**

```json
  {
    "tankId": "string",
    "x": 0,
    "y": 0,
    "position": "top|right|bottom|left"
  }
```

**Bullets:**

```json
  ["ref:Bullet"]
```

**Tank:**

```json
  {
    "tankId": "string",
    "x": 0,
    "y": 0,
    "position": "top|right|bottom|left"
  }
```

**Tanks:**

```json
  {
    "tankId": "ref:Tank"
  }
```

**Response:**

```json
  {
    "type": "refresh",
    "tanks": "ref:Tanks",
    "bullets": "ref:Bullets"
  }
```

## Development

Перед созданием commit необходимо запустить форматирование кода `npm run format`
