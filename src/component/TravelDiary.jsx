// import React, { useState } from "react";
import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
Modal.setAppElement("#root");

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TravelDiary = () => {
  const [title, setTitle] = useState("");

  const [publish, setPublish] = useState(false);
  const [travelContent, setTravelContent] = useState([]);
  const [travelContent1, setTravelContent1] = useState([]);
  const [traveldate, setTravelDate] = useState([]);
  const [newEntry, setNewEntry] = useState({
    diaryTitle: "",
    date: null,
    description: "",
    image: null,
  });
  const [diary, setDiary] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseDate, setselectedExpenseDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [modalIsOpendiary, setModalIsOpenDiary] = useState(false);
  const [isTravelDiaryOpen, setIsTravelDiaryOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDiaryDate, setSelectedDiaryDate] = useState(null);
  const [selectedDiartDateGet, setSelectedDiaryDateGet] = useState(null);

  const [expenseInputs, setExpenseInputs] = useState([
    { id: Math.random(), amount: "", location: "" },
  ]);

  const [diaryInputs, setDiaryInputs] = useState([
    {
      id: Math.random(),
      diarytTitle: "",
      date: null,
      description: "",
      image: null,
    },
  ]);
  const fileInputRef = useRef(null);

  // 새로운 여행 항목 추가
  const addEntry = () => {
    if (newEntry.description !== "" || newEntry.image !== null) {
      // travelContent에 새로운 항목 추가
      setTravelContent([...travelContent, newEntry]);
      // 새 입력 칸 초기화
      setNewEntry({ diaryTitle: "", date: null, description: "", image: null });
    }
  };
  const handleSaveDiary = () => {
    setModalIsOpenDiary(true);
  };
  const handleSave = () => {
    setModalIsOpen(true);
  };
  // const handleSaveTravelDiary = () => {
  //   if (window.confirm("여행기를 발행 하시겠습니까?")) {
  //     const isDiaryInputsEmpty = diaryInputs.some(
  //       (input) =>
  //         input.diarytTitle || !input.date || !input.description || !input.image
  //     );
  //     const isNewEntryEmpty =
  //       !newEntry.diaryTitle ||
  //       !newEntry.date ||
  //       !newEntry.description ||
  //       !newEntry.image;

  //     if (isDiaryInputsEmpty || isNewEntryEmpty) {
  //       alert("아직 내용이 입력되지 않았습니다. 계속해서 내용을 작성해주세요");

  //       // if (diaryInputs.length === 0 || newEntry.description === "") {
  //       //   alert("아직 내용이 입력되지 않았습니다. 계속해서 내용을 작성해주세요");
  //       // }
  //     } else {
  //       alert("발행되었습니다.");
  //     }
  //   } else {
  //     alert("발행이 취소되었습니다");
  //   }
  // };
  const handleSaveTravelDiary = () => {
    if (window.confirm("여행기를 발행 하시겠습니까?")) {
      // 다이어리 입력 항목 중 하나라도 비어있는지 확인
      const isDiaryInputsEmpty = diaryInputs.some((input) => {
        const isEmpty =
          // !input.diarytTitle ||
          !input.date || !input.description || !input.image;
        // if (!input.diarytTitle) {
        //   console.log("Empty diary title:", input);
        // }
        if (!input.date) {
          console.log("Empty diary date:", input);
        }
        if (!input.description) {
          console.log("Empty diary description:", input);
        }
        if (!input.image) {
          console.log("Empty diary image:", input);
        }
        return isEmpty;
      });

      const isNewEntryEmpty =
        !newEntry.diaryTitle ||
        !newEntry.date ||
        !newEntry.description ||
        !newEntry.image;
      if (!newEntry.diaryTitle) {
        console.log("Empty new entry title:", newEntry);
      }
      if (!newEntry.date) {
        console.log("Empty new entry date:", newEntry);
      }
      if (!newEntry.description) {
        console.log("Empty new entry description:", newEntry);
      }
      if (!newEntry.image) {
        console.log("Empty new entry image:", newEntry);
      }

      if (isDiaryInputsEmpty || isNewEntryEmpty) {
        alert("아직 내용이 입력되지 않았습니다. 계속해서 내용을 작성해주세요");
      } else {
        alert("발행되었습니다.");
      }
    } else {
      alert("발행이 취소되었습니다");
    }
  };

  // 경비 추가 함수
  const addExpense = () => {
    setExpenses([
      ...expenses,
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
      })),
    ]);
    // 입력 필드 초기화
    setExpenseInputs([{ id: Math.random(), amount: "", location: "" }]);
    setIsExpenseModalOpen(false);
  };

  //다이어리 추가
  const addDiary = () => {
    setDiary([
      ...diary,
      ...diaryInputs.map((input) => ({
        diaryTitle: input.diarytTitle,
        date: input.date,
        description: input.description,
        image: input.image,
      })),
    ]);
    //입력 필드 추가
    setDiaryInputs([
      ...diaryInputs,
      {
        id: Math.random(),
        diarytTitle: "",
        date: "",
        description: "",
        image: "",
      },
    ]);
  };

  // 날짜를 클릭했을 때 실행되는 함수
  const handleDateClick = (date) => {
    setselectedExpenseDate(date);
    const expensesForDate = expenses.filter((exp) => {
      const expenseDate = new Date(exp.date).toISOString().split("T")[0];
      return expenseDate === date.toISOString().split("T")[0];
    });
    // 날짜에 해당하는 경비 항목이 있으면 그 항목들을, 없으면 빈 입력 필드를 설정
    setExpenseInputs(
      expensesForDate.length > 0
        ? expensesForDate
        : [{ id: Math.random(), amount: "", location: "" }]
    );
    setIsExpenseModalOpen(true);
  };

  // 일일 경비 합계 계산
  const getDailyExpensesTotal = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0];
      return expenseDate === dateString
        ? sum + parseFloat(expense.amount || 0)
        : sum;
    }, 0);
  };

  // 날짜 타일에 경비 합계 표시
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const total = getDailyExpensesTotal(date);
      return (
        <div className="expenses-total">
          {total > 0 && <p>${total.toFixed(2)}</p>}
        </div>
      );
    }
  };

  const handleImageChange = (file, id, type = "diary") => {
    if (file) {
      if (type === "diary") {
        setDiaryInputs(
          diaryInputs.map((input) =>
            input.id === id ? { ...input, image: file } : input
          )
        );
      } else {
        setTravelContent(
          travelContent.map((entry, index) =>
            index === id ? { ...entry, image: file } : entry
          )
        );
      }
    }
    let nes = newEntry;
    nes.image = file;
    setNewEntry(nes);
  };
  const handleDiaryTitleChange = (title, id) => {
    setDiaryInputs(
      diaryInputs.map((input) =>
        input.id === id ? { ...input, title } : input
      )
    );
    //newEntry의 제목 변경
    setNewEntry({ ...newEntry, diaryTitle: title });

    let ti = newEntry;
    ti.diaryTitle = title;
    setNewEntry(ti);
  };
  const [selectedDiaryDates, setSelectedDiaryDates] = useState([]);
  const handleDiaryDateChange = (date, id) => {
    setDiaryInputs(
      diaryInputs.map((input) => (input.id === id ? { ...input, date } : input))
    );
    // 선택된 날짜를 상태에 추가
    setSelectedDiaryDates((prevDates) => {
      const updatedDates = [...prevDates];
      const index = diaryInputs.findIndex((input) => input.id === id);
      updatedDates[index] = date;

      let ne = newEntry;
      ne.date = prevDates;
      setNewEntry(ne);

      return updatedDates;
    });
  };
  // 설명 변경 처리
  // const handleDescriptionChange = (description) => {
  //   setNewEntry({ ...newEntry, description });
  // };
  const handleDescriptionChange = (description, id, type = "diary") => {
    if (type === "diary") {
      setDiaryInputs(
        diaryInputs.map((input) =>
          input.id === id ? { ...input, description } : input
        )
      );
    } else {
      setTravelContent(
        travelContent.map((entry, index) =>
          index === id ? { ...entry, description } : entry
        )
      );
    }
    let de = newEntry;
    de.description = type === "diary";
    setNewEntry(de);
  };

  // 경비 입력 필드 추가
  const addExpenseInput = () => {
    setExpenseInputs([
      ...expenseInputs,
      { id: Math.random(), amount: "", location: "" },
    ]);
  };

  // 경비 입력 변경 처리
  const handleExpenseChange = (id, field, value) => {
    setExpenseInputs(
      expenseInputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };
  //다이어리 입력 필드 추가
  // const addDiaryInput = () => {
  //   setDiaryInputs;
  // };
  //날짜 선택 시 newEntry의 날짜를 업데이트
  // const handleDateChage = (date) => {
  //   setNewEntry({ ...newEntry, date });
  // };

  const handleImageClick = (index, type = "diary") => {
    fileInputRef.current.click();
    fileInputRef.current.onchange = (e) => {
      const file = e.target.files;
      console.log(file);
      if (file) {
        if (type === "diary") {
          setDiaryInputs(
            diaryInputs.map((input, i) =>
              i === index ? { ...input, image: file } : input
            )
          );
        } else {
          setTravelContent(
            travelContent.map((entry, i) =>
              i === index ? { ...entry, image: file } : entry
            )
          );
        }
      }
    };
  };
  const deleteDiaryInput = (id) => {
    const updatedInputs = diaryInputs.filter((input) => input.id !== id);
    setDiaryInputs(updatedInputs);
  };
  const [modalContent, setModalContent] = useState({
    date: "",
    description: "",
    image: null,
  });
  const handleOpenModal = (entry) => {
    setModalContent(entry);
    setModalIsOpen(true);
  };

  return (
    <div className="travel">
      <div className="title-publish">
        <input
          type="text"
          placeholder=" 여행일지 제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
      </div>
      <div className="public">
        <button onClick={handleSaveTravelDiary} className="save-travel-diary">
          발행
        </button>
      </div>
      <div className="travel-diary">
        <div className="select-diary-date">
          {travelContent1.map((entry, index) => (
            <div>
              <DatePicker
                selected={(setSelectedDiaryDate, entry.date)}
                onChange={
                  ((date) => setSelectedDiaryDate(date), index, "travel")
                }
                dateFormat="yyyy/MM/dd"
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
                className="date-block"
                placeholderText="날짜"
              />
            </div>
          ))}
        </div>
        {travelContent.map((entry, index) => (
          <div key={index} className="preview-entry-layout">
            {console.log(entry.image)}
            {entry.image && (
              <img
                src={URL.createObjectURL(entry.image)}
                alt="Uploaded"
                className="preview-image"
                onClick={() => handleImageClick(index, "travel")}
              />
            )}
            <div className="preview-description" style={{ textAlign: "left" }}>
              <textarea
                className="fixed-size-textarea"
                value={entry.description}
                onChange={(e) =>
                  handleDescriptionChange(e.target.value, index, "travel")
                }
              />
            </div>
          </div>
        ))}
        {diaryInputs.map((input) => (
          <div key={input.id} className="entry-layout">
            <div className="select-diary-date">
              <DatePicker
                selected={input.date}
                onChange={(date) => handleDiaryDateChange(date, input.id)}
                dateFormat="yyyy/MM/dd"
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
                className="date-block"
                placeholderText="날짜"
              />
            </div>
            <div className="upload-image-content">
              <div className="image-upload-section">
                <input
                  type="file"
                  onChange={(e) => {
                    // console.log(e);
                    handleImageChange(e.target.files, input.id);
                  }}
                  placeholderText="사진"
                  multiple
                  className="temp"
                />
                {input.image && (
                  <div className="image-slider-container">
                    <Slider {...settings}>
                      {Object.keys(input.image).map((key) => (
                        <div key={key}>
                          <img
                            src={URL.createObjectURL(input.image[key])}
                            alt="Uploaded"
                            className="preview-image"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
              <div className="upload-image-content">
                <div className="image-upload-section">
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleImageChange(e.target.files[0], input.id)
                    }
                    placeholderText="사진"
                  />
                  {/* handleImageChange(e.target.files[0], input.id) */}
                  {input.image && (
                    <img
                      src={URL.createObjectURL(input.image)}
                      alt="Uploaded"
                      className="preview-image"
                    />
                  )}
                </div>
                <div className="content-section">
                  <textarea
                    className="fixed-size-textarea"
                    placeholder="내용"
                    value={input.description}
                    onChange={(e) =>
                      handleDescriptionChange(e.target.value, input.id)
                    }
                  />
                </div>
              </div>

              {/* <div className="buttonAddEntry">
                <button onClick={addDiary} className="add-button">
                  +
                </button>
              </div> */}
            </div>
          </div>
        ))}

        <div className="buttonAddEntry">
          <button onClick={addDiary} className="add-button">
            +
          </button>
        </div>
        <div style={{ textAlign: "right" }}>
          <button onClick={handleSaveDiary} className="save-button">
            저장
          </button>
        </div>

        <Modal
          isOpen={modalIsOpendiary}
          onRequestClose={() => setModalIsOpenDiary(false)}
          className="modaldiary"
          overlayClassName="overlaydiary"
        >
          {selectedDiaryDates.map((date, index) => (
            <p key={index}>
              날짜: {date ? date.toDateString() : "선택된 날짜 없음"}
              <label>
                <input type="checkbox" /> 비공개
              </label>
            </p>
          ))}
          <select>
            <option>나라 선택</option>
            <option>미국</option>
            <option>일본</option>
            <option>중국</option>
            <option>호주</option>
            <option>아르메니아</option>
            <option>아제르바이잔</option>
            <option>바레인</option>
            <option>방글라데시</option>
            <option>부탄</option>
            <option>브루나이</option>
            <option>캄보디아</option>
            <option>사이프러스</option>
            <option>조지아</option>
            <option>인도</option>
            <option>인도네시아</option>
            <option>이란</option>
            <option>이라크</option>
            <option>이스라엘</option>
            <option>요르단</option>
            <option>카자흐스탄</option>
            <option>쿠웨이트</option>
            <option>키르기스스탄</option>
            <option>라오스</option>
            <option>레바논</option>
            <option>말레이시아</option>
            <option>몰디브</option>
            <option>몽골</option>
            <option>미얀마</option>
            <option>네팔</option>
            <option>북한</option>
            <option>오만</option>
            <option>파키스탄</option>
            <option>필리핀</option>
            <option>카타르</option>
            <option>러시아</option>
            <option>사우디아라비아</option>
            <option>싱가포르</option>
            <option>대한민국</option>
            <option>스리랑카</option>
            <option>시리아</option>
            <option>타이완</option>
            <option>타지키스탄</option>
            <option>태국</option>
            <option>동티모르</option>
            <option>터키</option>
            <option>투르크메니스탄</option>
            <option>아랍에미리트</option>
            <option>우즈베키스탄</option>
            <option>베트남</option>
            <option>예멘</option>
            <option>오스트레일리아</option>
            <option>뉴질랜드</option>
            <option>파푸아뉴기니</option>
            <option>피지</option>
            <option>솔로몬 제도</option>
            <option>바누아투</option>
            <option>사모아</option>
            <option>키리바시</option>
            <option>통가</option>
            <option>미크로네시아 연방</option>
            <option>팔라우</option>
            <option>나우루</option>
            <option>투발루</option>
            <option>마셜 제도</option>
            <option>알제리</option>
            <option>앙골라</option>
            <option>베냉</option>
            <option>보츠와나</option>
            <option>부르키나파소</option>
            <option>부룬디</option>
            <option>카보베르데</option>
            <option>카메룬</option>
            <option>중앙아프리카 공화국</option>
            <option>차드</option>
            <option>코모로</option>
            <option>콩고 공화국</option>
            <option>콩고 민주 공화국</option>
            <option>지부티</option>
            <option>이집트</option>
            <option>적도 기니</option>
            <option>에리트레아</option>
            <option>에스와티니</option>
            <option>에티오피아</option>
            <option>가봉</option>
            <option>감비아</option>
            <option>가나</option>
            <option>기니</option>
            <option>기니비사우</option>
            <option>케냐</option>
            <option>레소토</option>
            <option>라이베리아</option>
            <option>리비아</option>
            <option>마다가스카르</option>
            <option>말라위</option>
            <option>말리</option>
            <option>모리타니</option>
            <option>모리셔스</option>
            <option>모로코</option>
            <option>모잠비크</option>
            <option>나미비아</option>
            <option>니제르</option>
            <option>나이지리아</option>
            <option>르완다</option>
            <option>상투메 프린시페</option>
            <option>세네갈</option>
            <option>세이셸</option>
            <option>시에라리온</option>
            <option>소말리아</option>
            <option>남아프리카 공화국</option>
            <option>남수단</option>
            <option>수단</option>
            <option>탄자니아</option>
            <option>토고</option>
            <option>튀니지</option>
            <option>우간다</option>
            <option>잠비아</option>
            <option>짐바브웨</option>
            <option>알바니아</option>
            <option>안도라</option>
            <option>오스트리아</option>
            <option>벨라루스</option>
            <option>벨기에</option>
            <option>보스니아 헤르체고비나</option>
            <option>불가리아</option>
            <option>크로아티아</option>
            <option>체코</option>
            <option>덴마크</option>
            <option>에스토니아</option>
            <option>핀란드</option>
            <option>프랑스</option>
            <option>독일</option>
            <option>그리스</option>
            <option>헝가리</option>
            <option>아이슬란드</option>
            <option>아일랜드</option>
            <option>이탈리아</option>
            <option>라트비아</option>
            <option>리히텐슈타인</option>
            <option>리투아니아</option>
            <option>룩셈부르크</option>
            <option>몰타</option>
            <option>몰도바</option>
            <option>모나코</option>
            <option>몬테네그로</option>
            <option>네덜란드</option>
            <option>북마케도니아</option>
            <option>노르웨이</option>
            <option>폴란드</option>
            <option>포르투갈</option>
            <option>루마니아</option>
            <option>산마리노</option>
            <option>세르비아</option>
            <option>슬로바키아</option>
            <option>슬로베니아</option>
            <option>스페인</option>
            <option>스웨덴</option>
            <option>스위스</option>
            <option>우크라이나</option>
            <option>영국</option>
            <option>바티칸 시국</option>
            <option>앤티가 바부다</option>
            <option>바하마</option>
            <option>바베이도스</option>
            <option>벨리즈</option>
            <option>캐나다</option>
            <option>코스타리카</option>
            <option>쿠바</option>
            <option>도미니카</option>
            <option>도미니카 공화국</option>
            <option>엘살바도르</option>
            <option>그레나다</option>
            <option>과테말라</option>
            <option>아이티</option>
            <option>온두라스</option>
            <option>자메이카</option>
            <option>멕시코</option>
            <option>니카라과</option>
            <option>파나마</option>
            <option>세인트키츠 네비스</option>
            <option>세인트루시아</option>
            <option>세인트빈센트 그레나딘</option>
            <option>트리니다드 토바고</option>
            <option>아르헨티나</option>
            <option>볼리비아</option>
            <option>브라질</option>
            <option>칠레</option>
            <option>콜롬비아</option>
            <option>에콰도르</option>
            <option>가이아나</option>
            <option>파라과이</option>
            <option>페루</option>
            <option>수리남</option>
            <option>우루과이</option>
            <option>베네수엘라</option>
          </select>

          <button onClick={() => setModalIsOpenDiary(false)}>완료</button>
        </Modal>
      </div>

      <div className="expenses">
        <div className="travel-expenses">
          <h4 style={{ textAlign: "left" }}>경비</h4>
          <div className="calendar">
            <Calendar onClickDay={handleDateClick} tileContent={tileContent} />
          </div>
          <Modal
            isOpen={isExpenseModalOpen}
            onRequestClose={() => setIsExpenseModalOpen(false)}
            contentLabel="Add Expense"
            className="modal"
            overlayClassName="overlay"
          >
            {selectedExpenseDate && (
              <h3>{selectedExpenseDate.toDateString()} 경비 추가</h3>
            )}
            {expenseInputs.map((input) => (
              <div key={input.id} className="expenseInput">
                <input
                  type="text"
                  placeholder="장소"
                  value={input.location}
                  onChange={(e) =>
                    handleExpenseChange(input.id, "location", e.target.value)
                  }
                />
                <select>
                  <option>카테고리 선택</option>
                  <option>교통비</option>
                  <option>숙박비</option>
                  <option>식비</option>
                  <option>관광 및 활동비</option>
                  <option>쇼핑</option>
                  <option>통신비</option>
                  <option>기타</option>
                </select>
                <input
                  type="text"
                  placeholder="금액"
                  value={input.amount}
                  onChange={(e) =>
                    handleExpenseChange(input.id, "amount", e.target.value)
                  }
                />
              </div>
            ))}
            <button onClick={addExpenseInput} className="add-button">
              +
            </button>
            <div className="saveExpense" style={{ textAlign: "right" }}>
              <button onClick={addExpense} className="save-button-expense">
                저장
              </button>
            </div>
          </Modal>
          <div style={{ textAlign: "right" }}>
            <button onClick={handleSave} className="save-button">
              저장
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modaldiary"
            overlayClassName="overlaydiary"
          >
            <label>
              <input type="radio" name="privacy" /> 공개
            </label>
            <label>
              <input type="radio" name="privacy" /> 비공개
            </label>
            <select>
              <option>나라 선택</option>
              <option>미국</option>
              <option>일본</option>
              <option>중국</option>
              <option>호주</option>
              <option>아르메니아</option>
              <option>아제르바이잔</option>
              <option>바레인</option>
              <option>방글라데시</option>
              <option>부탄</option>
              <option>브루나이</option>
              <option>캄보디아</option>
              <option>사이프러스</option>
              <option>조지아</option>
              <option>인도</option>
              <option>인도네시아</option>
              <option>이란</option>
              <option>이라크</option>
              <option>이스라엘</option>
              <option>요르단</option>
              <option>카자흐스탄</option>
              <option>쿠웨이트</option>
              <option>키르기스스탄</option>
              <option>라오스</option>
              <option>레바논</option>
              <option>말레이시아</option>
              <option>몰디브</option>
              <option>몽골</option>
              <option>미얀마</option>
              <option>네팔</option>
              <option>북한</option>
              <option>오만</option>
              <option>파키스탄</option>
              <option>필리핀</option>
              <option>카타르</option>
              <option>러시아</option>
              <option>사우디아라비아</option>
              <option>싱가포르</option>
              <option>대한민국</option>
              <option>스리랑카</option>
              <option>시리아</option>
              <option>타이완</option>
              <option>타지키스탄</option>
              <option>태국</option>
              <option>동티모르</option>
              <option>터키</option>
              <option>투르크메니스탄</option>
              <option>아랍에미리트</option>
              <option>우즈베키스탄</option>
              <option>베트남</option>
              <option>예멘</option>
              <option>오스트레일리아</option>
              <option>뉴질랜드</option>
              <option>파푸아뉴기니</option>
              <option>피지</option>
              <option>솔로몬 제도</option>
              <option>바누아투</option>
              <option>사모아</option>
              <option>키리바시</option>
              <option>통가</option>
              <option>미크로네시아 연방</option>
              <option>팔라우</option>
              <option>나우루</option>
              <option>투발루</option>
              <option>마셜 제도</option>
              <option>알제리</option>
              <option>앙골라</option>
              <option>베냉</option>
              <option>보츠와나</option>
              <option>부르키나파소</option>
              <option>부룬디</option>
              <option>카보베르데</option>
              <option>카메룬</option>
              <option>중앙아프리카 공화국</option>
              <option>차드</option>
              <option>코모로</option>
              <option>콩고 공화국</option>
              <option>콩고 민주 공화국</option>
              <option>지부티</option>
              <option>이집트</option>
              <option>적도 기니</option>
              <option>에리트레아</option>
              <option>에스와티니</option>
              <option>에티오피아</option>
              <option>가봉</option>
              <option>감비아</option>
              <option>가나</option>
              <option>기니</option>
              <option>기니비사우</option>
              <option>케냐</option>
              <option>레소토</option>
              <option>라이베리아</option>
              <option>리비아</option>
              <option>마다가스카르</option>
              <option>말라위</option>
              <option>말리</option>
              <option>모리타니</option>
              <option>모리셔스</option>
              <option>모로코</option>
              <option>모잠비크</option>
              <option>나미비아</option>
              <option>니제르</option>
              <option>나이지리아</option>
              <option>르완다</option>
              <option>상투메 프린시페</option>
              <option>세네갈</option>
              <option>세이셸</option>
              <option>시에라리온</option>
              <option>소말리아</option>
              <option>남아프리카 공화국</option>
              <option>남수단</option>
              <option>수단</option>
              <option>탄자니아</option>
              <option>토고</option>
              <option>튀니지</option>
              <option>우간다</option>
              <option>잠비아</option>
              <option>짐바브웨</option>
              <option>알바니아</option>
              <option>안도라</option>
              <option>오스트리아</option>
              <option>벨라루스</option>
              <option>벨기에</option>
              <option>보스니아 헤르체고비나</option>
              <option>불가리아</option>
              <option>크로아티아</option>
              <option>체코</option>
              <option>덴마크</option>
              <option>에스토니아</option>
              <option>핀란드</option>
              <option>프랑스</option>
              <option>독일</option>
              <option>그리스</option>
              <option>헝가리</option>
              <option>아이슬란드</option>
              <option>아일랜드</option>
              <option>이탈리아</option>
              <option>라트비아</option>
              <option>리히텐슈타인</option>
              <option>리투아니아</option>
              <option>룩셈부르크</option>
              <option>몰타</option>
              <option>몰도바</option>
              <option>모나코</option>
              <option>몬테네그로</option>
              <option>네덜란드</option>
              <option>북마케도니아</option>
              <option>노르웨이</option>
              <option>폴란드</option>
              <option>포르투갈</option>
              <option>루마니아</option>
              <option>산마리노</option>
              <option>세르비아</option>
              <option>슬로바키아</option>
              <option>슬로베니아</option>
              <option>스페인</option>
              <option>스웨덴</option>
              <option>스위스</option>
              <option>우크라이나</option>
              <option>영국</option>
              <option>바티칸 시국</option>
              <option>앤티가 바부다</option>
              <option>바하마</option>
              <option>바베이도스</option>
              <option>벨리즈</option>
              <option>캐나다</option>
              <option>코스타리카</option>
              <option>쿠바</option>
              <option>도미니카</option>
              <option>도미니카 공화국</option>
              <option>엘살바도르</option>
              <option>그레나다</option>
              <option>과테말라</option>
              <option>아이티</option>
              <option>온두라스</option>
              <option>자메이카</option>
              <option>멕시코</option>
              <option>니카라과</option>
              <option>파나마</option>
              <option>세인트키츠 네비스</option>
              <option>세인트루시아</option>
              <option>세인트빈센트 그레나딘</option>
              <option>트리니다드 토바고</option>
              <option>아르헨티나</option>
              <option>볼리비아</option>
              <option>브라질</option>
              <option>칠레</option>
              <option>콜롬비아</option>
              <option>에콰도르</option>
              <option>가이아나</option>
              <option>파라과이</option>
              <option>페루</option>
              <option>수리남</option>
              <option>우루과이</option>
              <option>베네수엘라</option>
            </select>
            <button onClick={() => setModalIsOpen(false)}>완료</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TravelDiary;
