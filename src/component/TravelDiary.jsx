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
import { deleteDiary, saveDiary, updateDiary } from "../config/diaryApi";
import { useParams } from "react-router-dom";
import { saveExpense } from "../config/traveldiaryApi";

import { savePhotos } from "../config/photoApi";
import travelCountries from "../travelCountries";
import axios from "axios";
import { api } from "../config/network";
Modal.setAppElement("#root");

const TravelDiary = () => {
  const [expenseEntries, setExpenseEntries] = useState([]);


  const [title, setTitle] = useState("");

  const [publish, setPublish] = useState(false);
  const [travelContent, setTravelContent] = useState([]);
  const [travelContent1, setTravelContent1] = useState([]);
  const [traveldate, setTravelDate] = useState([]);
  const [newEntry, setNewEntry] = useState({
    diaryTitle: "",
    date: null,
    description: "",
    scope: "PUBLIC",
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
  const [showPostTitle, setShowPostTitle] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [initDiary, setInitDiary] = useState(true);
  const [initExpense, setInitExpense] = useState(true);
  const params = useParams();
  const postId = params.id;
  // const [scope, setScope] = useState();

  const [expenseInputs, setExpenseInputs] = useState([
    { id: Math.random(), amount: "", location: "" ,scope:"",category:"",country:""},
  ]);

  const [diaryInputs, setDiaryInputs] = useState([
    {
      id: "",
      diarytTitle: "",
      date: null,
      description: "",
      scope: "PUBLIC",
      image: {},
    },
  ]);

  const [modalContent, setModalContent] = useState({
    date: "",
    description: "",
    image: null,
  });

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

  const handleSaveDiary = () => {
    setModalIsOpenDiary(true);
  };
  // const handleSave = () => {
  //   setModalIsOpen(true);
  // };
 

  const handleSaveTravelDiary = () => {
    setModalIsOpen(true);
  };
  // handleSave
  // handleSaveTravelDiary
  const handleSave = async () => {
    // setExpenseEntries([
      
    //   ...expenseInputs.map((input) => ({
    //     date: selectedExpenseDate,
    //     amount: input.amount,
    //     location: input.location,
    //     scope:input.scope,
    //     category:input.category,
        
    //   })),
    // ]);
    const newExpenses = expenseEntries.map(entry => ({
      cost: entry.amount, 
      place: entry.location, 
      category: "입장료",
      // scope:entry.scope,
      scope:"public",
      country: "일본"
    }));
    // const newExpenses = expenseInputs.map(input => ({
    //   cost: input.amount, 
    //   place: input.location, 
    //   category: "입장료",
    //   // scope:input.scope,
    //   scope:"public",
    //   country: "일본"
    // }));
  
    // 새로운 경비를 저장하기 위해 API 호출
    const response = await api(`api/v1/expense-details`, "post", newExpenses);
    setModalIsOpen(true);
    // API 호출이 성공한 후에만 상태 업데이트
    if (response.ok) { // API가 성공 시 'ok' 속성을 반환한다고 가정
      setExpenses([
        ...expenses,
        ...newExpenses
      ]);
  
      // 경비 업데이트 후 모달 오픈
     
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
  const addExpense = async() => {
    setExpenseEntries([
      
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
        scope:input.scope,
        category:input.category,
        
      })),
    ]);
    setExpenses([
      
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
        scope:input.scope,
      })),
    ]);
      setExpenseEntries([
      
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
        scope:input.scope,
        category:input.category,
        
      })),
    ]);
    

    // const response = await saveExpense();
    // // 입력 필드 초기화
    setExpenseInputs([{ id: Math.random(), amount: "", location: "" }]);
    setIsExpenseModalOpen(false);
  };

  //다이어리 추가
  const addDiary = async () => {
    setDiary([
      ...diary,
      ...diaryInputs.map((input) => ({
        diaryTitle: input.diarytTitle,
        date: input.date,
        description: input.description,
        scope: input.scope,
        image: input.image,
      })),
    ]);
    const res = await saveDiary(postId);
    //입력 필드 추가
    setDiaryInputs([
      ...diaryInputs,
      {
        id: res,
        diarytTitle: "",
        date: null,
        description: "",
        scope: "PUBLIC",
        image: {},
      },
    ]);
  };


  // 날짜를 클릭했을 때 실행되는 함수
  // const handleDateClick = (date) => {
  //   setselectedExpenseDate(date);
  //   const expensesForDate = expenses.filter((exp) => {
  //     const expenseDate = new Date(exp.date).toISOString().split("T")[0];
  //     return expenseDate === date.toISOString().split("T")[0];
  //   });
  //   // 날짜에 해당하는 경비 항목이 있으면 그 항목들을, 없으면 빈 입력 필드를 설정
  //   setExpenseInputs(
  //     expensesForDate.length > 0
  //       ? expensesForDate
  //       : [{ id: Math.random(), amount: "", location: "" }]
  //   );
    
  //   setIsExpenseModalOpen(true);
  //   createExpenseId();
  // };
  const handleDateClick = async (date) => {
  setselectedExpenseDate(date);
  const expensesForDate = expenses.filter((exp) => {
    const expenseDate = new Date(exp.date).toISOString().split("T")[0];
    return expenseDate === date.toISOString().split("T")[0];
  });
  
  // 날짜에 해당하는 경비 항목이 있으면 그 항목들을, 없으면 빈 입력 필드를 설정
  setExpenseInputs(
    expensesForDate.length > 0
      ? expensesForDate
      : [{ id: Math.random(), amount: "", location: "", date: date.toISOString().split("T")[0]  }]
  );
  
  setIsExpenseModalOpen(true);
  
  // 새로운 경비 ID 생성
  await createExpenseId(date);
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
            input.id === id ? { ...input, image: { ...(input.image), [index]: file } } : input
          ));
        } else {
          setTravelContent(travelContent.map(entry =>
            entry.id === id ? { ...entry, image: { ...(entry.image), [index]: file } } : entry
          ));
        }
      }
  
      // newEntry 상태 업데이트 예시
      const updatedEntry = { ...newEntry, image: { ...(newEntry.image), [index]: file } };
      setNewEntry(updatedEntry);
    };
  // };
  
  const handleDiaryTitleChange = (title, id) => {
    setDiaryInputs(
      diaryInputs.map((input) =>
        input.id === id ? { ...input, diarytTitle: title } : input
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
      diaryInputs.map((input) => (input.id === id ? { ...input, date: date } : input))
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
  //공개범위
  const handleScopeChange = (id,newScope) =>{
    setExpenseInputs(
      expenseInputs.map(input =>
        input.id === id ? {...input, scope:newScope} : input
      )
    )
  }
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
  const deleteDiaryInput = async (id) => {
    await deleteDiary(id);
    const updatedInputs = diaryInputs.filter((input) => input.id !== id);
    setDiaryInputs(updatedInputs);
  };

  const handleOpenModal = (entry) => {
    setModalContent(entry);
    setModalIsOpen(true);
  };

  const createDiaryId = async () => {
    const res = await saveDiary(postId);
    setDiaryInputs([
      {
        id: res,
        diarytTitle: "",
        date: null,
        description: "",
        scope: "PUBLIC",
        image: {},
      },
    ]);
  }
  console.log(diaryInputs);

  //  const createExpenseId = async (date) => {
  //   const response = await saveExpense(date);
  //   setExpenseInputs([
  //     { 
  //       // id:response ,
  //      id: Math.random(),
  //        amount: "", 
  //        date : response,
  //        location: "",

  //     },
  //   ]);
  //  }
//   const createExpenseId = async (date) => {
//     try {
//         const response = await saveExpense(date); 
//         if (response && response.id) { 
//             setExpenseInputs([
//                 ...expenseInputs,
//                 { 
//                     id: response.id,  
//                     amount: "", 
//                     date: date.toISOString().split('T')[0], 
//                     location: "",
//                 },
//             ]);
//         }
//     } catch (error) {
//         console.error("Error creating expense:", error);
//     }
// }

//    console.log(expenseInputs);
const createExpenseId = async (date) => {
  try {
    const response = await saveExpense(date);
    if (response && response.id) {
      setExpenseInputs((prevInputs) => [
        ...prevInputs,
        {
          id: response.id,
          amount: "",
          date: date.toISOString().split('T')[0],
          location: "",
        },
      ]);
    }
  } catch (error) {
    console.error("Error creating expense:", error);
  }
};
// createExpense 함수가 saveExpense를 트리거한다고 가정
// const createExpenseId = async () => {
//   const response = await saveExpense();
//   try {
//     const expenseData = {
//       date: new Date(), // 현재 날짜나 관련 데이터를 넘기려고 한다고 가정
//       postId: postId, // postId 상태나 prop이 사용 가능하다고 가정
//     };
//     // const response = await api(`api/v1/expense`,"post",expenseData);
//     console.log('경비 저장 성공:', response);
//     // 경비 저장 후 추가적인 로직 처리, 상태나 UI 업데이트 등
//   } catch (error) {
//     console.error('경비 생성 중 오류:', error);
//   }
// }

  const createDiary = () => {
    setShowPostTitle(true);
    setShowDiary(true);
    setInitDiary(false);
    createDiaryId();
  }
  
  const createExpense = () => {
    setShowPostTitle(true);
    setShowExpense(true);
    setInitExpense(false);
    // createExpenseId();
  }

  const saveDiaryAndPhoto = async () => {
    const diaryRequestDto = [];
    diaryInputs.forEach((el) => diaryRequestDto.push({id: el.id, title: el.diarytTitle, content: el.description, date: el.date, scope: el.scope}));
    await updateDiary(diaryRequestDto);

    const photoPaths = [];
    const photoRequestDto = [];
    // const formData = new FormData();
    diaryInputs.forEach((el) => {
      const photoIndex = Object.keys(el.image);
      photoIndex.forEach(index => {
        console.log(URL.createObjectURL(el.image[index]).substring(5));
        // formData.append('file', el.image[index]);}
        photoPaths.push(URL.createObjectURL(el.image[index]).substring(5));}
      ); // file 형태로 보내면 에러 뜸
      photoRequestDto.push({diaryId: el.id, paths: photoPaths});
    });
    console.log(photoRequestDto);
    await savePhotos(photoRequestDto);
  }

  const handleDiaryScope = (isChecked, id) => {
    setDiaryInputs(
      diaryInputs.map((input) => 
        {
          if (input.id === id) {
            if (isChecked) return {...input, scope : "PERSONAL"}
            else return {...input, scope : "PUBLIC"}
          } 
        }
      )
    );
  };


  console.log(diaryInputs);

  return (
      <div className="travel">
        {initDiary && 
        <div>
          <p style={{fontSize: "1.6rem"}}>여행기 작성</p>
          <button className="create-diary-button" onClick={createDiary}>+</button>
        </div>
        }
        {showPostTitle && 
        <>
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
            <button onClick={handleSaveTravelDiaryPublic} className="save-travel-diary">
              발행
            </button>
          </div>
        </>
        }
        {showDiary && 
        <div className="travel-diary">
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
                <div className="diary-title">
                  <input
                    placeholder="여행기 제목 입력"
                    // value={input.diarytTitle}
                    onChange={(e) => handleDiaryTitleChange(e.target.value, input.id)}
                    className="diary-title-input"
                  />
                  <input id="diary-scope" type="checkbox" name="PERSONAL" onChange={(e) => handleDiaryScope(e.target.checked, input.id)}/>
                  <label htmlFor="PERSONAL">비공개</label>
                </div>
                <button
                  onClick={() => deleteDiaryInput(input.id)}
                  className="delete-button"
                >
                  x
                </button>
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
                        console.log(e);
                        handleImageChange(i, e.target.files[0], input.id)}
                      }
                      placeholder="사진"
                    />  


                    {input.image && input.image[i] && (

                      <img
                        src={URL.createObjectURL(input.image[i])}
                        alt="Uploaded"
                        className="preview-image"
                      />
                    )}
v
                  </div>
                  ))}
                </div> */}
                <div className="image-upload-container">
                  {[0,1,2,3,4].map((el,i) => (
                  <div className="image-upload-section image-box" key={i}>
                    <input
                      key={i}
                      type="file"
                      onChange={(e) =>{
                        console.log(e);
                        handleImageChange(i, e.target.files[0], input.id)}
                      }
                      placeholder="사진"
                    />  
                    {input.image && input.image[i] && (
                      <img
                        src={URL.createObjectURL(input.image[i])}
                        alt="Uploaded"
                        className="preview-image"
                      />
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
          <button onClick={handleSaveDiary} className="save-button">
            임시 저장
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
      }
      {initExpense && 
        <div>
          <p style={{fontSize: "1.6rem"}}>여행경비 작성</p>
          <button className="create-expense-button" onClick={createExpense}>+</button>
        </div>
      }      
      {showExpense && 
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
            {/* <label>
              <input 
              type="radio"
               name="privacy"
               checked={scope === "PUBLIC"}
               onChange={() => setScope("PUBLIC")} /> 공개
            </label>
            <label>
              <input 
              type="radio" 
              name="privacy"
              checked ={scope === "PERSONAL"}
              onchange={()=> setScope("PERSONAL")} /> 비공개
            </label> */}
            {expenseInputs.map((input,index) => (
              <div key={input.id}>
                <label>
                  <input 
        type="radio" 
        name={`privacy-${input.id}`} 
        checked={input.scope === "PUBLIC"} 
        onChange={() => handleScopeChange(input.id, "PUBLIC")}
      /> 공개
    </label>
    <label>
      <input 
        type="radio" 
        name={`privacy-${input.id}`} 
        checked={input.scope === "PERSONAL"} 
        onChange={() => handleScopeChange(input.id, "PERSONAL")}
      /> 비공개
    </label>
              </div>
            ))}
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
      }
      
    </div>
  );
};

export default TravelDiary;
