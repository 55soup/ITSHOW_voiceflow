# voiceflow
소리와 몸짓으로 직접 참여하는 아케이드 게임들🎮🕹

### 라이브러리: [face-api.js](https://github.com/justadudewhohacks/face-api.js/), [react-speech-kit](https://github.com/MikeyParton/react-speech-kit)

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</div>

<br />
<br />

## 🛠기능
### 🎤속담 이어말하기
*음성인 텍스트 변환을 활용하여 속담을 이어 말합니다.*
- react-speech-kit를 이용한 음성인식 텍스트변환 기능
- 맞춘 후 점수는 1~100점 랜덤으로 합산
- 문제 pass 3번 가능

### 😳직접 움직여라! 참참참
*얼굴방향을 감지하여 참참참게임을 합니다*
- face-api.js를 활용해 왼쪽, 오른쪽 얼굴면을 감지

### 🥨냠냠쩝쩝 과자이름 맞추기
*음성인 텍스트 변환을 활용하여 과자이름을 맞춥니다.*
- react-speech-kit를 이용한 음성인식 텍스트변환 기능
- 문제 pass 3번 가능

### ✏점수입력
- 정규표현식으로 전화번호 형식인지 확인
- 점수 입력 후 mongoDB에 데이터 삽입

### 📃각 게임 등수
- local storage에 저장된 점수와 게임 정보를 바탕으로 내림차순 정렬

<br />
<br />

## 🎞게임화면
| 메인화면 | 게임선택 | 점수입력 | 각 게임 등수 |
|---|---|---|---|
|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/f6397dfe-986b-4dc4-93f5-959b114fc5aa)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/5aef8bfb-6035-4dc4-a7bc-97dc3d21d88c)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/9530da03-2d03-4622-bd41-6c7a2ac0b8f7)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/cb7288a3-a4e6-4597-bb5f-3950903af51e)


### 속담이어말하기
|튜토리얼|인게임|인게임|
|---|---|---|
|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/b543152a-1ecd-4d22-9b24-ae6b2d8fc443)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/1a93fb6b-7c80-405e-986c-8471a1df8823)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/849ac29d-cc07-4569-81a3-0351cc97252e)|


### 직접 움직여라! 참참참
|튜토리얼|인게임|인게임|
|---|---|---|
|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/390725f2-85c3-4673-98ff-c3655c5c9473)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/62b30475-0b82-4c8c-b480-ac51c88b8680)|


### 냠냠쩝쩝 과자 맞추기
|튜토리얼|인게임|인게임|
|---|---|---|
|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/e49f97f2-aab4-4c1f-bf5e-ebec5807a061)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/734587be-e388-478b-8a1a-0dd770a92a7e)|![image](https://github.com/55soup/itshow-voiceflow/assets/86298664/42ae8487-602a-427b-ba2c-d28f6a354149)|

<br />
<br />

## 🙋‍♀️팀원

<a href="https://github.com/55soup/itshow-voiceflow/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=55soup/itshow-voiceflow" />
</a>
