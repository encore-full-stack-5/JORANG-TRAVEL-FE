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
import travelCountries from "../travelCountries";
import axios from "axios";
import { api } from "../config/network";
// import {usesParams} from "react-router-dom";
// import {
//   saveExpenses
// } from "../config/traveldiaryApi";
// const saveExpenseDetailbyExpenseId = async () => {
//   try{
//     console.log("------" + id);
//     const response = await saveExpenses (id);
//     console.log(response);
    
//   }
// } 
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
    image: {},
  });
  const [diary, setDiary] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseDate, setselectedExpenseDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [modalIsOpendiary, setModalIsOpenDiary] = useState(false);
  const [modalIsOpenSaveTravelDiary, setModalIsOpenSaveTravelDiary] = useState(false);
  const [isTravelDiaryOpen, setIsTravelDiaryOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDiaryDate, setSelectedDiaryDate] = useState(null);
  const [selectedDiartDateGet, setSelectedDiaryDateGet] = useState(null);
  const [selectedDiaryDates, setSelectedDiaryDates] = useState([]);
  const [expenseInputs, setExpenseInputs] = useState([
    { id: Math.random(), amount: "", location: "" },
  ]);

  const [diaryInputs, setDiaryInputs] = useState([
    {
      id: Math.random(),
      diarytTitle: "",
      date: null,
      description: "",
      image: {},
    },
  ]);

  const [modalContent, setModalContent] = useState({
    date: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  console.log(diaryInputs[0].image);

  // 새로운 여행 항목 추가
  const addEntry = () => {
    if (newEntry.description !== "" || newEntry.image !== null) {
      // travelContent에 새로운 항목 추가
      setTravelContent([...travelContent, newEntry]);
      // 새 입력 칸 초기화
      setNewEntry({ diaryTitle: "", date: null, description: "", image: null });
    }
  };

  
 


  // const handleSaveTravelDiary = async() => {
  // const test = await api(`api/v1/expense-details`,"post", {
  //   setExpenses([
  //     ...expenses,
  //     ...expenseInputs.map((input) => ({    
  //       // "expenseId": 96,
  //       cost: "input.amoount",
  //       place: "input.location",
  //       "category": "입장료",
  //       "scope": "PUBLIC",
  //       "country": "일본"}) 
  //     ]);
  //   })
  //   setModalIsOpenSaveTravelDiary(true);

  // };
  const handleSaveTravelDiary = () => {
    setModalIsOpen(true);
  };
  // handleSave
  // handleSaveTravelDiary
  const handleSave = async () => {
    // `expenseInputs`가 `amount`와 `location`을 포함한 객체 배열이라고 가정합니다.
    const newExpenses = expenseInputs.map(input => ({
      cost: input.amount, // "input.amount"에서 input.amount로 변경
      place: input.location, // "input.location"에서 input.location로 변경
      category: "입장료",
      scope: "PUBLIC",
      country: "일본"
    }));
  
    // 새로운 경비를 저장하기 위해 API 호출
    const response = await api(`api/v1/expense-details`, "post", newExpenses);
  
    // API 호출이 성공한 후에만 상태 업데이트
    if (response.ok) { // API가 성공 시 'ok' 속성을 반환한다고 가정
      setExpenses([
        ...expenses,
        ...newExpenses
      ]);
  
      // 경비 업데이트 후 모달 오픈
      setModalIsOpen(true);
    } else {
      console.error('경비 저장 실패', response);
    }
  };
  
 
  const handleSaveTravelDiaryPublic = () => {
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
        if(window.confirm("여행기를 발행 하시겠습니까?")){
          setModalIsOpenSaveTravelDiary(true);
        }
        // alert("발행되었습니다.");
      
     else {
      alert("발행이 취소되었습니다");
    }
  }
}
  };
  const finalizePublication = () => {
    alert("발행되었습니다");
    setModalIsOpenSaveTravelDiary(false);
  }

  // 경비 추가 함수
  const addExpense = () => {
    setExpenses([
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
      })),
    ]);
    // // 입력 필드 초기화
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

  // const handleImageChange = (key, file, id, type = "diary") => {
  //   console.log(key, file);
  //   console.log(id);
  //   console.log(diaryInputs);
  //   if (file) {
  //     if (type === "diary") {
  //       setDiaryInputs(
  //         diaryInputs.map((input) =>
  //           input.id === id ? { ...input, image: {...(input.image), [key] : file} } : input
  //         )
  //       );
  //     } else {
  //       setTravelContent(
  //         travelContent.map((entry, index) =>
  //           index === id ? { ...entry, image: {...(entry.image), [key] : file} } : entry
  //         )
  //       );
  //     }
  //   }
  //   let copyEntry = newEntry;
  //   copyEntry.image = {...(copyEntry.image), [key] : file};
  //   setNewEntry(copyEntry);
  // };
  // function ImageUploader({ diaryInputs, setDiaryInputs, travelContent, setTravelContent, newEntry, setNewEntry }) {
    // 이미지 변경 처리 함수
    const handleImageChange = (index, file, id, type = "diary") => {
      if (file) {
        if (type === "diary") {
          setDiaryInputs(diaryInputs.map(input =>
            input.id === id ? { ...input, image: { ...(input.image || {}), [index]: file } } : input
          ));
        } else {
          setTravelContent(travelContent.map(entry =>
            entry.id === id ? { ...entry, image: { ...(entry.image || {}), [index]: file } } : entry
          ));
        }
      }
  
      // newEntry 상태 업데이트 예시
      const updatedEntry = { ...newEntry, image: { ...(newEntry.image || {}), [index]: file } };
      setNewEntry(updatedEntry);
    };
  // };
  
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
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        if (type === "diary") {
          setDiaryInputs(
            diaryInputs.map((input, i) =>
              i === index ? { ...input, image: {...(input.image), [i] : file} } : input
            )
          );
        } else {
          setTravelContent(
            travelContent.map((entry, i) =>
              i === index ? { ...entry, image: {...(entry.image), [i] : file} } : entry
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
        <div style={{ textAlign: "right" }}>
          <button onClick={handleSaveTravelDiaryPublic} className="save-button">
            발행
          </button>
        </div>
      
        <div className="public">
          {/* <button onClick={handleSaveTravelDiaryPublic} className="save-travel-diary">
            발행 */}
            <Modal
          isOpen={modalIsOpenSaveTravelDiary}
          onRequestClose={() => setModalIsOpenSaveTravelDiary(false)}
          className="modaldiary"
          overlayClassName="overlaydiary"
        >
          <select>
            <option>나라 선택</option>
            {Object.entries(travelCountries).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
          </select>

          <button onClick={() => {
          // alert("발행되었습니다.");
            setModalIsOpenSaveTravelDiary(false);
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
                if(window.confirm("여행기를 발행 하시겠습니까?")){
                  setModalIsOpenSaveTravelDiary(false);
                }
                // alert("발행되었습니다.");
              
             else {
              alert("발행이 취소되었습니다");
              setModalIsOpenSaveTravelDiary(false);
            }
          }
        }
          }}>완료</button>
        
        </Modal>
        {/* </button> */}
    
          







        </div>
        <div className="travel-diary">
          {/* <div className="select-diary-date">
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
          </div> */}
          {travelContent.map((entry, index) => (
            <div key={index} className="preview-entry-layout">
              {/* {console.log(entry.image)} */}
              {entry.image && (
                <img
                  src={URL.createObjectURL(entry.image[index])}
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
                {/* <div className="image-upload-container">
                  {[0,1,2,3,4].map((el,i) => (
                  <div className="image-upload-section image-box" key={i}>
                
                    <input
                      key={i}
                      type="file"
                      onChange={(e) =>{
                        handleImageChange(i, e.target.files[0], input.id)}
                      }
                      placeholderText="사진"
                    />  
                    {input.image && (
                      <img
                        src={URL.createObjectURL(input.image[i])}
                        alt="Uploaded"
                        className="preview-image"
                      />
                    )}
                   

                  </div>
                  ))}
                </div> */}
                <div className="image-upload-container">
      {[0, 1, 2, 3, 4].map((el, i) => (
        <div className="image-upload-section image-box" key={i}>
          <input
            type="file"
            onChange={(e) => handleImageChange(i, e.target.files[0], input.id)}
          />
          {/* 이미지 미리보기 로직 수정 */}
          {diaryInputs.some(input => input.image && input.image[i]) && (
            diaryInputs.map((input, idx) => (
              input.image && input.image[i] && (
                <img
                  key={idx}
                  src={URL.createObjectURL(input.image[i])}
                  alt="Uploaded"
                  className="preview-image"
                />
              )
            ))
          )}
        </div>
      ))}
    </div>
              </div>
            </div>
          ))}
        <div className="buttonAddEntry">
          <button onClick={addDiary} className="add-button">
            +
          </button>
        </div>
        <div style={{ textAlign: "right" }}>
          <button onClick={handleSaveTravelDiary} className="save-button">
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
            {Object.entries(travelCountries).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
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
            {/* <div className="saveExpense" style={{ textAlign: "right" }}>
              <button onClick={addExpense} className="save-button-expense">
                저장
              </button>
            </div> */}
            <div style={{ textAlign: "right" }}>
            <button onClick={addExpense} className="save-button">
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
            {/* <select>
            <option>나라 선택</option>
            {Object.entries(travelCountries).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
            </select> */}
            <button onClick={() => setModalIsOpen(false)}>완료</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TravelDiary;
