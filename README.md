# ParadigmShifty FeedApp

NodeJS, ExpressJS RESTful FeedApp API.

- 본 프로젝트는 개발 환경으로만 사용할 것

# Development Environment

해당 프로젝트는 NodeJS 12.14.1 버전에서 개발되었음.

# DB

typicode의 LowDB를 사용하여 구현되었음. [LowDB](https://github.com/typicode/lowdb)
서버 시작시 자동으로 DB 파일이 `db/db.json`로 생성된다.
데이터베이스를 초기화하고 싶을 경우, 해당 파일을 지운 뒤 서버를 재시작하면 정상적으로 초기화된다.

## DB 구조

자동 생성된 db.json 파일에는 `feeds` 항목이 생성된다.

# API

yarn을 사용하여 dependency를 설치한 뒤 서버를 시작해주면 된다.

```bash
yarn
PORT=8080 yarn start
```

# API Specifications

## [Feed](#feed)

- [List](#feed-list)
- [Create](#feed-create)


# <span id="feed">Feed</span>

## <span id="feed-list">List</span>

### Summary

전체 피드 리스트를 가져온다 
페이지네이션을 지원하며, 공개범위를 설정해서 가져올 수 있습니다.

### URL

- GET /feeds


### Query Parameters

| Name      | Default | Description                           |
| --------- | ------- | ------------------------------------- |
| page | 0   | 현재 페이지 넘버 |
| pageSize | 10   | 가져오는 페이지의 데이터 숫자 |
| isPublic | true   | 가져올 일기의 공개 범위 |

### Request Example

GET /feeds?page=0&pageSize=5&isPublic=true

### Response

- 피드 리스트 전체

| Level1    |
| --------- |
| id        |
| isPublic  |
| content   |
| imageUrl   |
| exerciseKind|
| updatedAt |
| createdAt |

### Response Example

```json
{
  "data": [
    {
      "exerciseKind": "걷기",
      "content": "오늘도 열심히 걸었다.",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/heroines-88ce2.appspot.com/o/pedometerDefaultImage%2FwalkingURL.png?alt=media&token=7e17b117-cc74-4017-98c4-153698490fac",
      "id": "Cb-9rbqii",
      "isPublic": true,
      "createdAt": "2024-04-08T03:54:11.417Z",
      "updatedAt": "2024-04-08T03:54:11.417Z"
    },
    {
      "exerciseKind": "헬스",
      "content": "오늘도 헬스장 도착",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/heroines-88ce2.appspot.com/o/pedometerDefaultImage%2FwalkingURL.png?alt=media&token=7e17b117-cc74-4017-98c4-153698490fac",
      "id": "hFmcsRn6g",
      "isPublic": true,
      "createdAt": "2024-04-08T03:54:18.890Z",
      "updatedAt": "2024-04-08T03:54:18.890Z"
    }
  ]
}
```

### Error Response

- 500

### Error Response Example

```json
{
  "details": "Unable to retrieve data from server"
}
```

## <span id="feed-create">Create</span>

### Summary

새로운 피드를 생성한다

### URL

- POST /feeds

### Parameters

### Request Body

| Level1 | Required | Default | Description |
| ------ | -------- | ------- | ----------- |
| content  | O        | -       | 일기 내용 |
| imageUrl  | O        | -       | 이미지 url |
| isPublic  | O        | -       | 공개 / 비공개 여부 |
| exerciseKind  | O        | -       | 운동 종목 |

### Request Example

POST /feeds

```json
{
    "content" :"오늘은 헬스 5일차입니다",
    "exerciseKind" : "헬스",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/heroines-88ce2.appspot.com/o/pedometerDefaultImage%2FwalkingURL.png?alt=media&token=7e17b117-cc74-4017-98c4-153698490fac",
    "isPublic": false
}
```

### Response

- 새롭게 생성된 피드 정보

| Level1    |
| --------- |
| id        |
| isPublic  |
| content   |
| imageUrl   |
| exerciseKind|
| updatedAt |
| createdAt |

### Response Example

```json
{
    "data": {
        "content" :"오늘은 헬스 5일차입니다",
        "exerciseKind" : "헬스",
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/heroines-88ce2.appspot.com/o/pedometerDefaultImage%2FwalkingURL.png?alt=media&token=7e17b117-cc74-4017-98c4-153698490fac",
        "isPublic": false,
        "id": "e2pYCm3EK",
        "createdAt": "2024-04-08T05:17:42.141Z",
        "updatedAt": "2024-04-08T05:17:42.141Z"
    }
}
```

### Error Response

- 400

### Error Response Example

```json
{
  "details": "must provide a valid data"
}
```
