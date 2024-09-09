import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createDiary, deleteDiaryById, updateDiary } from "../config/diaryApi";
import { useNavigate } from "react-router-dom";

import {
  deletePhotosByDiaryId,
  savePhotos,
  updatePhotos,
} from "../config/photoApi";
import travelCountries from "../travelCountries";
import { api } from "../config/network";
import {
  createPost,
  createTempPost,
  updatePostById,
  updateTempPost,
} from "../config/postApi";
import { el } from "date-fns/locale";
// Modal.setAppElement("#root");

const TravelDiaryV2 = () => {
  const [savedPostId, setSavedPostId] = useState(null);
  const [savedDiaryId, setSavedDiaryId] = useState([]);
  const [photoSaved, setPhotoSaved] = useState({});
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseDate, setselectedExpenseDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("currentPage");
  }, []);

  const [expenseInputs, setExpenseInputs] = useState([
    { id: "", amount: "", location: "", category: "" },
  ]);

  const [diaries, setDiaries] = useState([
    {
      id: "",
      diaryTitle: "",
      date: null,
      description: "",
      image: {},
    },
  ]);

  const openPublishModal = () => {
    setShowPublishModal(true);
  };

  const saveNewDiaries = async (postId) => {
    const diarySaveRequest = [];
    for (const [i, diary] of diaries.entries()) {
      const diaryInput = {
        postId: postId,
        title: document.getElementById("diary-title" + i).value,
        content: document.getElementById("diary-content" + i).value,
        date: diary.date,
      };
      diarySaveRequest.push(diaryInput);
    }
    const diaryIds = await createDiary(diarySaveRequest);
    return diaryIds;
  };
  // diary를 생성하는 함수 (diaryId가 있다면 diary를 새로 만들고 없다면 업데이트
  // -> diaryId와 status 를 return
  // -> return 값을 이용해서 새로 만든 diaryId를 배정해줄 수 있다.)

  const saveOrUpdateDiaries = async (postId) => {
    const diaryUpdateRequest = [];
    let diaryIds = [];
    console.log(diaries, "diaries before save or update");
    for (let [i, diary] of diaries.entries()) {
      if (!diary.id) {
        const diaryInput = {
          postId: postId,
          title: document.getElementById("diary-title" + i).value,
          content: document.getElementById("diary-content" + i).value,
          date: diary.date,
        };
        console.log(diaryInput, "diaryInput before save or update");
        console.log("****************************");
        const newDiaryId = await createDiary([{ ...diaryInput }]);
        console.log("=========================");
        console.log(newDiaryId, "newDiaryId");
        diaryIds = [...diaryIds, newDiaryId[0]];
        // diaryIds.push(newDiaryId[0]);
      } else {
        const diaryInput = {
          id: diary.id,
          title: document.getElementById("diary-title" + i).value,
          content: document.getElementById("diary-content" + i).value,
          date: diary.date,
        };
        diaryUpdateRequest.push(diaryInput);
        diaryIds = [...diaryIds, diary.id];
        // diaryIds.push(diary.id);
      }
    }
    await updateDiary(diaryUpdateRequest);
    console.log("/////////////////////////");
    console.log(diaryIds, "diaryIds after save");
    return diaryIds;
  };

  // const updateDiaries = async (diaryIds) => {
  //   const diarySaveRequest = [];
  //   diaries.forEach((el, i) => {
  //     const diaryTitle = document.getElementById("diary-title" + i).value;
  //     const diaryContent = document.getElementById("diary-content" + i).value;
  //     const diaryInput = {
  //       id: diaryIds[i],
  //       title: diaryTitle,
  //       content: diaryContent,
  //       date: el.date,
  //     };
  //     console.log(diaryTitle, "diaryTitle");
  //     console.log(diaryContent, "diaryContent");
  //     diarySaveRequest.push(diaryInput);
  //   });
  //   console.log(diarySaveRequest, "diarySaveRequest");
  //   await updateDiary(diarySaveRequest);
  // };

  const savePhotosForDiary = async (postId, diaryIds) => {
    diaries.forEach((el, i) => {
      console.log(el, "image");
      const photoIndex = Object.keys(el.image);
      const formData = new FormData();
      formData.append("postId", postId);
      formData.append("diaryId", diaryIds[i]);
      photoIndex.forEach((index) => {
        if (el.image[index]) formData.append("files", el.image[index]); // 사진이 존재하는 것만 files에 추가함
      });
      console.log(formData, "formData");
      savePhotos(formData);
    });
  };
  // const saveOrUpdatePhotos = async (postId, diaryIds) => {
  //   diaries.forEach((el, i) => {
  //     const photoIndex = Object.keys(el.image);
  //     const formData = new FormData();
  //     formData.append("postId", postId);
  //     formData.append("diaryId", diaryIds[i]);
  //     photoIndex.forEach((index) => {
  //       if (el.image[index]) formData.append("files", el.image[index]); // 사진이 존재하는 것만 files에 추가함
  //     });
  //     console.log(formData, "formData");
  //     updatePhotos(formData);
  //   });
  // };

  const savePost = async () => {
    const postTitle = document.getElementById("post-title").value;
    console.log(postTitle, "postTitle");
    const scope = document.getElementById("public-post").checked
      ? "PUBLIC"
      : "PERSONAL";
    console.log(scope, "scope");
    const country = document.getElementById("post-country").value;
    console.log(country, "country");
    const postId = await createPost({
      scope: scope,
      country: country,
      title: postTitle,
    });
    return postId;
  };

  const saveTempPost = async () => {
    const postTitle = document.getElementById("post-title").value;
    const postId = await createTempPost({
      title: postTitle,
    });
    return postId;
  };

  const updatePost = async () => {
    const postTitle = document.getElementById("post-title").value;
    console.log(postTitle);
    const scope = document.getElementById("public-post").checked
      ? "PUBLIC"
      : "PERSONAL";
    console.log(scope);
    const country = document.getElementById("post-country").value;
    console.log(country);

    await updatePostById(savedPostId, {
      scope: scope,
      country: country,
      title: postTitle,
    });
  };

  const updateTempPost = async () => {
    const postTitle = document.getElementById("post-title").value;
    await updatePostById(savedPostId, {
      title: postTitle,
    });
  };

  const handleDiaryDateChange = (date, diaryIndex) => {
    const updatedDiary = [...diaries];
    updatedDiary[diaryIndex].date = date;
    setDiaries(updatedDiary);
  };

  const deleteDiary = async (diaryIndex) => {
    const updatedDiary = [...diaries];
    const diaryId = updatedDiary[diaryIndex].id;
    console.log(diaryId, "diaryId");
    if (diaryId) {
      await deletePhotosByDiaryId(diaryId); // photo를 먼저 지워야 한다. (foreign key 때문에)
      await deleteDiaryById(diaryId); // id가 발급된 diary는 DB에서 삭제
    }
    updatedDiary.splice(diaryIndex, 1);
    console.log(updatedDiary, "updatedDiary@@@@@");
    setDiaries(updatedDiary);
  };

  const addDiary = async () => {
    //입력 필드 추가
    setDiaries([
      ...diaries,
      {
        id: "",
        diaryTitle: "",
        date: null,
        description: "",
        image: {},
      },
    ]);
  };

  console.log(savedDiaryId, "savedDiaryId");

  const handleImageChange = (photoIndex, file, diaryIndex) => {
    if (file) {
      const updatedDiary = [...diaries];
      updatedDiary[diaryIndex].image[photoIndex] = file;
      setDiaries(updatedDiary);
    }
  };

  const deleteImage = (photoIndex, diaryIndex) => {
    const updatedDiary = [...diaries];
    updatedDiary[diaryIndex].image[photoIndex] = null;
    setDiaries(updatedDiary);
  };

  // 새로 만든 diaryId 를 현재 화면에 있는 diary에 배정해줌
  // -> 나중에 새로 임시저장 또는 발행할 때 save, update여부를 판단할 때 사용
  // -> 또한 이 함수를 거치고 나면 모든 diary가 id를 배정 받은 상태

  const assignNewDiaryId = (diaryIds) => {
    console.log(diaryIds, "diaryIds");
    console.log(diaryIds[0], "diaryIds[0]");
    const updatedDiaries = [...diaries];
    console.log(updatedDiaries, "before assignment");
    for (let diaryId of diaryIds) {
      console.log(diaryId, "왜");
      for (let diary of updatedDiaries) {
        console.log(diary, "diary");
        if (!diary.id) {
          diary.id = diaryId;
          break;
        }
      }
    }
    console.log(updatedDiaries, "after assignment");
    setDiaries(updatedDiaries);
  };

  const isTempPostAndDiaryEmpty = () => {
    const postTitle = document.getElementById("post-title").value;
    if (!postTitle) {
      alert("여행일지의 제목을 작성해주세요");
      return true;
    } else {
      for (const [i, diary] of diaries.entries()) {
        console.log(document.getElementById("diary-title" + i));
        const diaryTitle = document.getElementById("diary-title" + i)
          ? document.getElementById("diary-title" + i).value
          : null;
        const description = document.getElementById("diary-content" + i)
          ? document.getElementById("diary-content" + i).value
          : null;
        console.log(diaryTitle, "diaryTitle");
        const isDiaryEmpty =
          !diaryTitle &&
          !diary.date &&
          !description &&
          Object.keys(diary.image).length === 0;
        if (isDiaryEmpty) {
          alert(
            "모든 여행기의 제목, 날짜, 내용, 사진 중 최소 한 곳을 채워주세요"
          );
          return true;
        }
      }
    }
  };

  const isPostAndDiaryEmpty = () => {
    const postTitle = document.getElementById("post-title").value;
    if (!postTitle) {
      alert("여행일지의 제목을 작성해주세요");
      return true;
    } else {
      for (const [i, diary] of diaries.entries()) {
        console.log(document.getElementById("diary-title" + i));
        const diaryTitle = document.getElementById("diary-title" + i)
          ? document.getElementById("diary-title" + i).value
          : null;
        const description = document.getElementById("diary-content" + i)
          ? document.getElementById("diary-content" + i).value
          : null;
        console.log(diaryTitle, "diaryTitle");
        const isDiaryEmpty =
          !diaryTitle ||
          !diary.date ||
          !description ||
          Object.keys(diary.image).length === 0;
        if (isDiaryEmpty) {
          alert("빈 칸을 채워주세요");
          return true;
        }
      }
    }
  };

  const publishPost = async () => {
    if (window.confirm("여행기를 발행 하시겠습니까?")) {
      const isEmpty = isPostAndDiaryEmpty();
      if (isEmpty) {
        setShowPublishModal(false);
        return;
      }
      if (!savedPostId) {
        const postId = await savePost();
        if (!postId) return;
        const diaryIds = await saveNewDiaries(postId);
        if (!diaryIds) return;
        await savePhotosForDiary(postId, diaryIds);
      } else {
        await updatePost();
        const diaryIds = await saveOrUpdateDiaries(savedPostId);
        if (!diaryIds) return;
        await savePhotosForDiary(savedPostId, diaryIds);
      }
      alert("발행이 완료되었습니다.");
      navigate("/mytrip");
    }
  };

  const saveTemporaryDiary = async () => {
    const isEmpty = isTempPostAndDiaryEmpty();
    if (isEmpty) return;
    if (!savedPostId) {
      const postId = await saveTempPost();
      if (!postId) return;
      setSavedPostId(postId);
      const diaryIds = await saveNewDiaries(postId);
      if (!diaryIds) return;
      setSavedDiaryId(diaryIds);
      assignNewDiaryId(diaryIds);
      await savePhotosForDiary(postId, diaryIds);
    } else {
      await updateTempPost();
      const diaryIds = await saveOrUpdateDiaries(savedPostId);
      if (!diaryIds) return;
      setSavedDiaryId(diaryIds);
      assignNewDiaryId(diaryIds);
      await savePhotosForDiary(savedPostId, diaryIds);
    }
    alert(
      '임시 저장이 완료되었습니다.\n저장된 내용은 "나의 여행"에서 확인하실 수 있습니다.'
    );
  };

  console.log(savedPostId, "postId");
  // const handleDateClick = async (date) => {
  //   console.log("Selected Date: ", date);
  //   setselectedExpenseDate(date);
  //   // const response = await saveExpense(date);
  //   const utcDate = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  //   );
  //   const formattedDate = utcDate.toISOString().split("T")[0];
  //   try {
  //     // 날짜를 기대하는 형식으로 보내야 합니다. API 요구 사항에 맞게 조정하세요
  //     ===================================================================================
  //     const response = await api(`/api/v1/expenses/posts/${postId}`, "post", {
  //       date: formattedDate,
  //     });
  //     ===================================================================================
  //     console.log({ response });
  //     // if (response && response.data && response.data.id) {
  //     if (response.data) {
  //       setExpenseId(response.data);
  //       setExpenseInputs((prevInputs) => [
  //         ...prevInputs,
  //         {
  //           id: response.data,
  //           amount: "",
  //           date: formattedDate,
  //           location: "",
  //           category: "",
  //         },
  //       ]);
  //       setIsExpenseModalOpen(true);
  //     } else {
  //       console.error(
  //         "API에서 ID를 반환하지 않거나 응답이 잘못되었습니다:",
  //         response
  //       );
  //     }
  //   } catch (error) {
  //     console.error("선택된 날짜에 경비 저장 실패:", error);
  //   }

  //   setIsExpenseModalOpen(true);
  //   // await createExpenseId(date);
  // };

  // 경비 입력 필드 추가
  const addExpenseInput = () => {
    setExpenseInputs([
      ...expenseInputs,
      { id: Math.random(), amount: "", location: "" },
    ]);
  };

  // 경비 입력 변경 처리
  const handleExpenseChange = (id, field, value) => {
    console.log(`Updating ${field} for expense with id ${id} to ${value}`);
    setExpenseInputs(
      expenseInputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };

  const saveTemporaryExpense = async () => {
    const newExpenses = expenseEntries.map((entry) => ({
      cost: entry.amount,
      place: entry.location,
      category: entry.category,
      // scope:"public",
      // country:"일본"
    }));
    console.log(expenseInputs[expenseInputs.length - 1].id);
    // 새로운 경비를 저장하기 위해 API 호출
    const response = await api(
      `api/v1/expense-details/expenses/${expenseId}`,
      "post",
      newExpenses
    );
    // setModalIsOpen(true);
    const expenseDetail = expenseEntries.map((entry) => ({
      id: response.data.id,
      cost: entry.amount,
      place: entry.location,
      category: entry.category,
      // scope:"public",
      // country:"일본"
    }));
    if (window.confirm("임시 저장되었습니다")) {
      // API 호출이 성공한 후에만 상태 업데이트
      if (response.ok) {
        // API가 성공 시 'ok' 속성을 반환한다고 가정
        setExpenses([...expenses, ...newExpenses, ...expenseDetail]);

        // 경비 업데이트 후 모달 오픈
      } else {
        console.error("경비 저장 실패", response);
      }
    }
  };

  // 경비 추가 함수
  const addExpense = async () => {
    setExpenseEntries([
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,

        category: input.category,
      })),
    ]);
    setExpenses([
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,
        category: input.category,
      })),
    ]);
    setExpenseEntries([
      ...expenseInputs.map((input) => ({
        date: selectedExpenseDate,
        amount: input.amount,
        location: input.location,

        category: input.category,
      })),
    ]);

    // const response = await saveExpense();
    // // 입력 필드 초기화
    setExpenseInputs([{ id: "", amount: "", location: "", category: "" }]);
    setIsExpenseModalOpen(false);
  };

  //다이어리 추가

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

  return (
    <div className="travel">
      <div className="title-publish">
        <input
          id="post-title"
          type="text"
          placeholder=" 여행일지 제목 입력"
          className="title-input"
        />
      </div>
      <div className="public">
        <button onClick={openPublishModal} className="save-travel-diary">
          발행
        </button>
      </div>

      <Modal
        isOpen={showPublishModal}
        onRequestClose={() => setShowPublishModal(false)}
        className="modaldiary"
        overlayClassName="overlaydiary"
      >
        <label htmlFor="privacy">
          <input id="public-post" type="radio" name="privacy" /> 공개
        </label>
        <label htmlFor="privacy">
          <input id="private-post" type="radio" name="privacy" /> 비공개
        </label>
        <select id="post-country">
          <option>나라 선택</option>
          {Object.keys(travelCountries).map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button onClick={publishPost}>완료</button>
      </Modal>

      <div className="travel-diary">
        {diaries.map((diary, diaryIndex) => (
          <div key={diaryIndex} className="entry-layout">
            <div className="select-diary-date">
              <DatePicker
                selected={diary.date}
                onChange={(date) => handleDiaryDateChange(date, diaryIndex)}
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
                  id={"diary-title" + diaryIndex}
                  className="diary-title-input"
                />
              </div>
              <div>
                <button
                  onClick={() => deleteDiary(diaryIndex)}
                  className="delete-button"
                >
                  X
                </button>
              </div>
            </div>
            <div className="upload-image-content">
              <div className="content-section">
                <textarea
                  className="fixed-size-textarea"
                  placeholder="내용"
                  id={"diary-content" + diaryIndex}
                />
              </div>
              <div className="image-upload-container">
                {[0, 1, 2, 3, 4].map((photo, photoIndex) => (
                  <div
                    className="image-upload-section image-box"
                    key={photoIndex}
                  >
                    {!diary.image[photoIndex] && (
                      <div style={{ fontSize: "2rem" }}>📷</div>
                    )}
                    <input
                      key={photoIndex}
                      type="file"
                      onChange={(e) => {
                        handleImageChange(
                          photoIndex,
                          e.target.files[0],
                          diaryIndex
                        );
                      }}
                    />
                    {diary.image && diary.image[photoIndex] && (
                      <>
                        <img
                          src={URL.createObjectURL(diary.image[photoIndex])}
                          alt="Uploaded"
                          className="preview-image"
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "86%",
                          }}
                        >
                          <button
                            onClick={() => deleteImage(photoIndex, diaryIndex)}
                            style={{
                              backgroundColor: "#216ba5",
                              border: "none",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          >
                            X
                          </button>
                        </div>
                      </>
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
          <button onClick={saveTemporaryDiary} className="save-button">
            임시 저장
          </button>
        </div>
      </div>

      <div className="expenses">
        <div className="travel-expenses">
          <h4 style={{ textAlign: "left" }}>경비</h4>
          <div className="calendar">
            <Calendar tileContent={tileContent} />
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
                <select
                  value={input.category}
                  onChange={(e) =>
                    handleExpenseChange(input.id, "category", e.target.value)
                  }
                >
                  <option>카테고리 선택</option>
                  <option value="교통비">교통비</option>
                  <option value="숙박비">숙박비</option>
                  <option value="식비">식비</option>
                  <option value="관광 및 활동비">관광 및 활동비</option>
                  <option value="쇼핑">쇼핑</option>
                  <option value="통신비">통신비</option>
                  <option value="기타">기타</option>
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
            <button
              onClick={() => saveTemporaryExpense()}
              className="save-button"
            >
              임시 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDiaryV2;
