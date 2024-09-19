# JORANG 여행에 대한 모든 것✈️

## <br> 📃 핵심 기능
### 1. 여행기, 경비, 계획 작성 및 공유

- 날짜별 여행기, 경비 작성 및 공유
- Google cloud storage를 이용하여 사진 업로드 및 가져오기
- 이미지 슬라이더 구현
- 경비를 도표로 구현
- 여행 일지 최신순, 좋아요순 정렬 및 여행 기간에 따른 여행 일지 필터 구현
- 유저 아이디, 이메일 변경 시 이메일로 임시 비밀번호 발송

### <br>전체 프로젝트 소개
https://github.com/jinho9482/JORANG-TRAVEL

### Main server (Java with Spring boot)
https://github.com/encore-full-stack-5/JORANG-TRAVEL-BE

### Langchain server
https://github.com/encore-full-stack-5/JORANG-TRAVEL-FE

## <br>📃 화면 구성 및 기능 소개 (Video)
### 1. 나라별 여행 일지 확인 ###

https://github.com/user-attachments/assets/a2ea9a2e-9f42-490c-aff8-9575c6e234fd

### <br> 2. 전체 여행 일지 확인 ###

https://github.com/user-attachments/assets/b5763e68-649d-4c56-b9f9-6a492f1f1b8f

### <br> 3. 여행 일지 작성 및 공유 ###

https://github.com/user-attachments/assets/a62dcd25-fe13-4b7b-92ee-a55645de2555

### <br> 4. 여행 일지 임시 저장 및 수정 ###

https://github.com/user-attachments/assets/bb1a542d-729c-4390-8eb5-7b50abc26043

### <br> 5. 여행 챗봇 ###

https://github.com/user-attachments/assets/5277301b-6221-4451-9c30-7a4ac4897c13

## <br> ⚙️ 기술스택

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)<br><br>

### 🔧 트러블 슈팅

<br>

**1. 경비에서 expenses를 지울 때 savedExpenses도 같이 지워짐 (∵ shallow copy)<br><br>**
> * 원인 : 변수를 copy할 때, 아래와 같이 shallow copy를 하게 되면 그 안의 array나 object들은 기존에 copy된 변수의 주소를 바라본다.<br>
>```javascript
>   const savedExpenses = [...expenses]
>```
> * 해결 : structuredClone()으로 아예 동일하게 <br>
>```javascript
> ======================= Shallow copy ============================
>
>const original = { name: "Alice", address: { city: "Wonderland" } };
>
>// Shallow copy using the spread operator
>const shallowCopy = { ...original };
>
>shallowCopy.name = "Bob"; // Changes only shallowCopy
>shallowCopy.address.city = "Paris"; // This will change both shallowCopy and original
>
>console.log(original); 
>// Output: { name: "Alice", address: { city: "Paris" } } 
>// Notice how the `city` property of the `address` object has changed in `original`.
>
>======================= Deep copy ============================
>
>const original = { name: "Alice", address: { city: "Wonderland" } };
>
>// Deep copy using structuredClone (ES2021+)
>const deepCopy = structuredClone(original);
>
>deepCopy.name = "Bob"; // Changes only deepCopy
>deepCopy.address.city = "Paris"; // Only changes deepCopy, not the original
>
>console.log(original); 
>// Output: { name: "Alice", address: { city: "Wonderland" } } 
>// The original object remains unchanged.
>```

<br>

**2. Pagination 을 처리하면서 발생한 문제<br><br>**
> 1. 기간을 고르면 각 페이지에서 필터됨 (포스트가 각 페이지에 배속되지 않게 필요)<br>
> → 전체 post를 가져와서 front에서 필터 처리함 (Server에서 paging처리하면 전체 post에서 필터처리할 수 없음)
> 2. 새로고침 했을 때 현재 페이지에서 머물러야 함<br>
> → localStorage에 현재 페이지 저장
> 3. 기간 설정 시 page번호도 변경이 필요하다.<br>
> → 바뀐 post를 받아서 page 번호 구성을 변경
> 4. 페이지 번호가 처음 렌더링 할 때 부터 나와야 한다. <br>
> → useEffect 처리 (useState의 기본값으로 설정했을 때는 나오지 않는다.)
> 5. 2 페이지에서 기간 설정해서 포스트 갯수가 줄어들면 1 페이지로 넘어와야 하는데 2페이지에서 머문다.<br>
> → 기간 설정 후 re-rendering될 때 현재 페이지를 1 페이지로 바꾼다.
> 6. 다른 URL 에 들어갔다가 다시 왔을 때 원래 꺼에 머물러 있다.<br>
> → 다른 page로 이동했을 때 localStorage의 현재 페이지 삭제

<br>

**3. 여행 일지 (여행기, 경비)를 작성하는 페이지를 구성하면서 발생한 문제<br><br>**
> 1. 버튼 배치의 어려움<br>
> → 여행기 및 경비 모두 여행 일지 table의 child table이기 때문에 부모 table인 여행 일지 entity를 먼저 생성해줘야 한다.<br>
> → 여행기 및 경비 작성 전에 여행 일지를 생성하는 page를 따로 만듦<br>
> → 하지만 해당 페이지에 들어오고 여행기, 경비 작성을 하지 않는 경우가 많기 때문에 DB에 해당 post_id row에 null 값이 많이 들어감<br>
> → 임시 저장 및 발행할 때 부모 table부터 차례로 저장하도록 api 호출<br>
>**→ 즉, 버튼 1개 당 1개의 api 만 호출해야한다고 착각해서 발생한 문제**<br>

> 2. 임시 저장 및 발행 구현의 어려움<br>
> → 여행기 혹은 경비 둘 중 하나만 있으면 발행이 가능하고 임시 저장은 여행일지 제목만 있으면 가능하다. 또한, 비어있는 칸을 alert 처리하는 여러 케이스가 존재한다.<br>
> → 임시 저장 및 발행 버튼 모두 save (최초 저장)와 update (임시 저장 후 발행 혹은 저장) 둘 다 가능하기 때문에 이 과정에서 server에서 id를 받아서 각 여행기와 경비에 배속을 해주고 이에 따라 save, update를 분리해서 api 호출<br>

> 3. 사진 저장 구현의 어려움<br>
> → Front에서 file type으로 보낼 때, FormData 형식으로 보내고 server에서는 Multipart type으로 받아서 처리<br>
> → 사진을 삭제할 때 DB에 이미 사진이 존재하는 경우엔 기존 사진과 google cloud storage에 있는 사진들을 모두 지우고 새로 저장한다. 이 때 여행기 삭제 버튼을 눌러서 지우는 경우엔 cascade처리로 사진을 자동 삭제하고자 하였으나, google cloud storage의 사진은 삭제되지 않아, 사진 삭제 api 를 추가로 생성해서 호출하는 것으로 변경

**4. 여행 일지를 가져올 때 child entity인 여행기, 경비, 사진을 한 번에 불러오면서 list안에 list가 있는 구조 문제<br><br>**
> * 원인 : 부모, 자식 table이 양방향 맵핑이 되어있어, 부모를 가져올 때도 자식의 list를 전부 가져옴
> * 해결 방향
>   1) 전부 가져온 list에서 여행기, 경비, 사진들을 따로 state를 분리 <br>
>   2) table을 단방향 mapping으로 바꾸고, 부모에서 자식 table로의 cascade처리를 없애고 isDeleted column을 생성하여 data 삭제 대신 해당 column을 가지고 삭제 제어
<br>

