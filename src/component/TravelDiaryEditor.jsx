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
import { useNavigate, useParams } from "react-router-dom";
import "./TravelDiary.css";
import months from "../months";

import { deletePhotosByDiaryId, savePhotos } from "../config/photoApi";
import travelCountries from "../travelCountries";
import { api } from "../config/network";
import { getMyPostById, updatePostById } from "../config/postApi";
import { el } from "date-fns/locale";
import { saveExpensesApi } from "../config/expenseApi";
import { saveExpenseDetailsApi } from "../config/expenseDetailApi";
// Modal.setAppElement("#root");

const TravelDiaryEditor = () => {
  const postId = useParams().id;
  const [savedPostId, setSavedPostId] = useState(null);
  const [savedDiaryId, setSavedDiaryId] = useState([]);
  // const [expenseEntries, setExpenseEntries] = useState([]);
  // const [expenses, setExpenses] = useState([]);
  const [selectedExpenseDate, setSelectedExpenseDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const navigate = useNavigate();

  const [savedExpenses, setSavedExpenses] = useState({});
  const [expenses, setExpenses] = useState({});
  const [postTitle, setPostTitle] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
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

  const saveOrUpdateDiaries = async (postId) => {
    const diaryUpdateRequest = [];
    let diaryIds = [];
    for (let [i, diary] of diaries.entries()) {
      if (!diary.id) {
        const diaryInput = {
          postId: postId,
          title: document.getElementById("diary-title" + i).value,
          content: document.getElementById("diary-content" + i).value,
          date: diary.date,
        };
        const newDiaryId = await createDiary([{ ...diaryInput }]);
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
    return diaryIds;
  };

  const savePhotosForDiary = async (postId, diaryIds) => {
    diaries.forEach((el, i) => {
      const photoIndex = Object.keys(el.image);
      const formData = new FormData();
      formData.append("postId", postId);
      formData.append("diaryId", diaryIds[i]);
      photoIndex.forEach((index) => {
        if (el.image[index]) formData.append("files", el.image[index]); // 사진이 존재하는 것만 files에 추가함
      });
      savePhotos(formData);
    });
  };

  const updatePost = async () => {
    const postTitle = document.getElementById("post-title").value;
    const scope = document.getElementById("public-post").checked
      ? "PUBLIC"
      : "PERSONAL";
    const country = document.getElementById("post-country").value;

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
    if (diaryId) {
      await deletePhotosByDiaryId(diaryId); // photo를 먼저 지워야 한다. (foreign key 때문에)
      await deleteDiaryById(diaryId); // id가 발급된 diary는 DB에서 삭제
    }
    updatedDiary.splice(diaryIndex, 1);
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

  const handleImageChange = (photoIndex, file, diaryIndex) => {
    if (file) {
      const updatedDiary = [...diaries];
      updatedDiary[diaryIndex].image[photoIndex] = file;
      console.log(updatedDiary, "updatedDiary");
      setDiaries(updatedDiary);
    }
  };

  const deleteImage = (photoIndex, diaryIndex) => {
    const updatedDiary = [...diaries];
    updatedDiary[diaryIndex].image[photoIndex] = null;
    setDiaries(updatedDiary);
  };

  const assignNewDiaryId = (diaryIds) => {
    const updatedDiaries = [...diaries];
    for (let diaryId of diaryIds) {
      for (let diary of updatedDiaries) {
        if (!diary.id) {
          diary.id = diaryId;
          break;
        }
      }
    }
    setDiaries(updatedDiaries);
  };

  const isTempPostAndDiaryEmpty = () => {
    const postTitle = document.getElementById("post-title").value;
    if (!postTitle) {
      alert("여행일지의 제목을 작성해주세요");
      return true;
    } else {
      for (const [i, diary] of diaries.entries()) {
        const diaryTitle = document.getElementById("diary-title" + i)
          ? document.getElementById("diary-title" + i).value
          : null;
        const description = document.getElementById("diary-content" + i)
          ? document.getElementById("diary-content" + i).value
          : null;
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

  const isPostEmpty = () => {
    const postTitle = document.getElementById("post-title").value;
    if (!postTitle) return true;
  };

  const isDiaryEmpty = () => {
    for (const [i, diary] of diaries.entries()) {
      const diaryTitle = document.getElementById("diary-title" + i)
        ? document.getElementById("diary-title" + i).value
        : null;
      const description = document.getElementById("diary-content" + i)
        ? document.getElementById("diary-content" + i).value
        : null;

      const isDiaryTotallyEmpty =
        !diaryTitle &&
        !diary.date &&
        !description &&
        Object.keys(diary.image).length === 0;
      const isDiaryPartiallyEmpty =
        !diaryTitle ||
        !diary.date ||
        !description ||
        Object.keys(diary.image).length === 0;

      if (isDiaryTotallyEmpty) return { result: true, status: "total" };
      else if (isDiaryPartiallyEmpty)
        return { result: true, status: "partial" };
      else return { result: false };
    }
  };

  const publishPost = async () => {
    if (window.confirm("여행기를 발행 하시겠습니까?")) {
      // 여행일지가 빈 케이스를 걸러냄
      if (isPostEmpty()) {
        alert("여행일지의 제목을 작성해주세요");
        setShowPublishModal(false);
        return;
      }
      // 여행기를 중간에 쓰다 만 케이스를 걸러냄
      if (isDiaryEmpty().result && isDiaryEmpty().status === "partial") {
        alert("여행기의 빈 칸을 채워주세요");
        setShowPublishModal(false);
        return;
        // 여행기와 경비가 모두 텅 빈 케이스를 걸러냄
      } else if (isDiaryEmpty().result && isExpenseEmpty()) {
        alert("여행기와 경비 중 최소 한 가지를 작성해 주세요");
        setShowPublishModal(false);
        return;
      }
      await updatePost();
      const diaryIds = await saveOrUpdateDiaries(savedPostId);
      if (!diaryIds) return;
      await savePhotosForDiary(savedPostId, diaryIds);
      const res = await saveExpensesToDB(savedPostId);
      if (res === "error") return;

      alert("발행이 완료되었습니다.");
      navigate("/mytrip");
    }
  };

  const saveTemporaryDiary = async () => {
    const isEmpty = isTempPostAndDiaryEmpty();
    if (isEmpty) return;

    await updateTempPost();
    const diaryIds = await saveOrUpdateDiaries(savedPostId);
    if (!diaryIds) return;
    setSavedDiaryId(diaryIds);
    assignNewDiaryId(diaryIds);
    await savePhotosForDiary(savedPostId, diaryIds);

    alert(
      '여행기 임시 저장이 완료되었습니다.\n저장된 내용은 "나의 여행"에서 확인하실 수 있습니다.'
    );
  };

  const getFormattedDate = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const formattedDate = utcDate.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleDateClick = async (date) => {
    console.log(savedExpenses);
    const formattedDate = getFormattedDate(date);
    setSelectedExpenseDate(formattedDate);
    setIsExpenseModalOpen(true);
    // if (!expenses[formattedDate]) {
    const newExpenses = structuredClone(savedExpenses);
    if (!newExpenses[formattedDate])
      newExpenses[formattedDate] = [{ cost: 0, place: "", category: "" }];
    setExpenses(newExpenses);
  };

  // 경비 입력 필드 추가
  const addExpenses = () => {
    const newExpenses = structuredClone(expenses);
    newExpenses[selectedExpenseDate] = [
      ...newExpenses[selectedExpenseDate],
      { cost: 0, place: "", category: "" },
    ];
    setExpenses(newExpenses);
  };

  const handleCloseRequest = () => {
    setIsExpenseModalOpen(false);
    setExpenses({});
  };

  const isExpenseEmpty = () => {
    if (Object.keys(savedExpenses).length === 0) return true;
  };

  const saveExpensesToDB = async (postId) => {
    const expenseKeys = Object.keys(savedExpenses);
    const dateList = expenseKeys.map((el) => {
      const date = new Date(el);
      return { date: date };
    });
    console.log(dateList);
    console.log(savedPostId, "savedPostId");
    try {
      const expenseResponses = await saveExpensesApi(postId, dateList);
      console.log(expenseResponses, "expenseResponses");
      for (let [i, response] of expenseResponses.entries()) {
        console.log(savedExpenses, "savedExpenses");
        console.log(response.date, "response.date");
        await saveExpenseDetailsApi(response.id, savedExpenses[response.date]);
      }
    } catch (e) {
      if (
        window.confirm(
          "해당 날짜에 이미 작성한 경비 내역이 존재합니다. 나의 여행으로 이동하시겠습니까?"
        )
      ) {
        navigate("/mytrip");
        return "error";
      }
      return "error";
    }
  };

  const saveTemporaryExpense = async () => {
    const postTitle = document.getElementById("post-title").value;
    if (!postTitle) {
      alert("여행일지의 제목을 작성해주세요");
      return;
    }
    if (isExpenseEmpty()) return;

    const res = await saveExpensesToDB(savedPostId);

    if (res !== "error")
      alert(
        '경비 임시 저장이 완료되었습니다.\n저장된 내용은 "나의 여행"에서 확인하실 수 있습니다.'
      );
    // save or update
  };

  const isExpensesEmpty = () => {
    for (let [i, expense] of expenses[selectedExpenseDate].entries()) {
      const place = document.getElementById("expense-place" + i).value;
      const category = document.getElementById("expense-category" + i).value;
      const cost = document.getElementById("expense-cost" + i).value;
      const isEmpty = !place || !category || !cost;
      const allEmpty = !place && !category && !cost;
      if (isEmpty && !allEmpty) {
        alert("빈 칸을 채워주세요");
        return true;
      }
    }
    return false;
  };

  // 경비 추가 함수
  const saveExpenses = async () => {
    if (!isExpensesEmpty()) {
      const newExpenses = structuredClone(expenses);
      if (
        newExpenses[selectedExpenseDate] &&
        newExpenses[selectedExpenseDate].length === 0
      )
        delete newExpenses[selectedExpenseDate];
      else {
        for (let [i, expense] of newExpenses[selectedExpenseDate].entries()) {
          const place = document.getElementById("expense-place" + i).value;
          const category = document.getElementById(
            "expense-category" + i
          ).value;
          const cost = document.getElementById("expense-cost" + i).value;
          if (!newExpenses[selectedExpenseDate])
            newExpenses[selectedExpenseDate] = [
              { place: "", category: "", cost: "" },
            ];
          else if (
            newExpenses[selectedExpenseDate] &&
            !newExpenses[selectedExpenseDate][i]
          )
            newExpenses[selectedExpenseDate][i] = {
              place: "",
              category: "",
              cost: "",
            };
          newExpenses[selectedExpenseDate][i].place = place;
          newExpenses[selectedExpenseDate][i].category = category;
          newExpenses[selectedExpenseDate][i].cost = cost;
        }
      }

      setSavedExpenses(newExpenses);
      setExpenses({});
      // setExpenses(newExpenses);
      setIsExpenseModalOpen(false);
    }
  };
  // 일일 경비 합계 계산
  const getDailyExpensesTotal = (date) => {
    const formattedDate = getFormattedDate(date);
    const totalExpensesPerDate = savedExpenses[formattedDate]?.reduce(
      (sum, expense) => {
        return sum + Number(expense.cost);
      },
      0
    );
    return totalExpensesPerDate;
  };

  // 날짜 타일에 경비 합계 표시
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const total = getDailyExpensesTotal(date);
      if (total && total > 0) {
        // document.querySelector(
        //   ".expenses-total"
        // ).parentNode.style.backgroundColor = "#9cc7ee";
      }
      return (
        <div className="expenses-total">
          {total > 0 && <p>\{total.toLocaleString()}</p>}
        </div>
      );
    }
  };

  const deleteExpense = (index) => {
    const newExpenses = structuredClone(expenses);
    newExpenses[selectedExpenseDate].splice(index, 1);
    setExpenses(newExpenses);
  };

  const getFileFromUrl = async (photoURL, filename) => {
    try {
      // Fetch the file from the GCS URL
      const response = await fetch(photoURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a File object from the Blob
      const file = new File([blob], filename, {
        type: blob.type,
        lastModified: Date.now(),
      });
      console.log(file, "file");
      return file;
    } catch (error) {
      console.error("Error fetching file from GCS:", error);
      return null;
    }
  };

  const getMyPost = async () => {
    try {
      const response = await getMyPostById(postId);
      console.log(response, "post");
      setPostTitle(response.title);
      const diariesFromResponse = [];
      for (let diary of response.diaries) {
        const image = {};
        for (let [i, photo] of diary.photos.entries()) {
          const file = await getFileFromUrl(
            photo.photoURL,
            `${Math.random()}.jpg`
          );
          image[i] = file;
        }
        const eachDiary = {
          id: diary.id,
          diaryTitle: diary.title,
          date: diary.date,
          description: diary.content,
          image: image,
        };
        diariesFromResponse.push(eachDiary);
      }

      console.log(diariesFromResponse, "diariesFromResponse");
      setDiaries(diariesFromResponse);
      const expensesFromResponse = {};
      response.expenses?.forEach((el) => {
        const date = el.date;
        expensesFromResponse[date] = [];
        for (let [i, detail] of el.expenseDetails.entries()) {
          expensesFromResponse[date][i] = {
            cost: detail.cost,
            category: detail.category,
            place: detail.place,
          };
        }
      });
      setSavedExpenses(expensesFromResponse);
      // setLoading(false);
    } catch {
      console.log("error in getMyPost");
    }
  };

  const sumTotalExpense = () => {
    const expenseKeys = Object.keys(savedExpenses);
    let totalSum = 0;
    expenseKeys.forEach((key) => {
      const eachSum = savedExpenses[key].reduce((sum, detail) => {
        console.log(typeof detail.cost, "type of");
        return sum + Number(detail.cost);
      }, 0);
      totalSum += eachSum;
    });
    console.log(totalSum, "totalSum");
    setTotalExpense(totalSum);
  };

  const changeTileStyle = () => {
    const expenseKeys = Object.keys(savedExpenses);
    if (expenseKeys.length > 0) {
      for (let key of expenseKeys) {
        const formattedKey = `abbr[aria-label="${key.slice(0, 4)}년 ${key.slice(
          6,
          7
        )}월 ${key.slice(8)}일"]`;
        console.log(formattedKey);
        const abbrElement = document.querySelector(formattedKey);
        if (abbrElement)
          abbrElement.parentNode.style.backgroundColor = "#9cc7ee";
      }
    }
  };

  useEffect(() => {
    sumTotalExpense();
    changeTileStyle();
  }, [savedExpenses]);

  useEffect(() => {
    setSavedPostId(postId);
    getMyPost();
    localStorage.removeItem("currentPage");
  }, []);

  return (
    <div className="travel">
      <div className="title-publish">
        <input
          id="post-title"
          type="text"
          placeholder=" 여행일지 제목 입력"
          className="title-input"
          defaultValue={postTitle}
        />
      </div>
      <div style={{ width: "100%" }}>
        <div className="public" style={{ textAlign: "right" }}>
          <button onClick={openPublishModal} className="save-travel-diary">
            발행
          </button>
        </div>

        <Modal
          isOpen={showPublishModal}
          onRequestClose={() => setShowPublishModal(false)}
          className="modaldiary"
          overlayClassName="overlaydiary"
          style={{ overflowY: "auto" }}
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
          <h3 style={{ textAlign: "left" }}>여행기</h3>
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
                    defaultValue={diary.diaryTitle}
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
                    defaultValue={diary.description}
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
                              onClick={() =>
                                deleteImage(photoIndex, diaryIndex)
                              }
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
      </div>
      <div className="expenses">
        <div className="travel-expenses">
          <h3 style={{ textAlign: "left" }}>경비</h3>
          <div className="calendar">
            <Calendar
              onClickDay={handleDateClick}
              tileContent={tileContent}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              textAlign: "right",
              width: "80%",
              margin: "20px auto 0 auto",
            }}
          >
            총 지출 금액 : {totalExpense.toLocaleString()}원
          </div>
          <Modal
            isOpen={isExpenseModalOpen}
            onRequestClose={handleCloseRequest}
            contentLabel="Add Expense"
            className="modal"
            overlayClassName="overlay"
          >
            {selectedExpenseDate && (
              <h3>
                {selectedExpenseDate.slice(0, 4) +
                  "년 " +
                  selectedExpenseDate.slice(6, 7) +
                  "월 " +
                  selectedExpenseDate.slice(8) +
                  "일 "}
              </h3>
            )}
            {expenses[selectedExpenseDate] &&
              expenses[selectedExpenseDate].map((expense, i) => (
                <div key={i} className="expenseInput">
                  <input
                    id={"expense-place" + i}
                    type="text"
                    placeholder="장소"
                    defaultValue={expense.place}
                  />
                  <select
                    id={"expense-category" + i}
                    defaultValue={expense.category}
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
                    id={"expense-cost" + i}
                    placeholder="금액"
                    type="number"
                    defaultValue={expense.cost}
                  />
                  <button
                    style={{
                      marginLeft: "20px",
                      backgroundColor: "rgb(156, 199, 238)",
                      color: "black",
                      border: "none",
                    }}
                    onClick={() => deleteExpense(i)}
                  >
                    X
                  </button>
                </div>
              ))}
            <button
              onClick={addExpenses}
              className="add-button"
              style={{
                backgroundColor: "#9cc7ee",
                color: "black",
                border: "none",
                margin: "auto",
                borderRadius: "15px",
              }}
            >
              +
            </button>
            <div
              style={{
                textAlign: "right",
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={saveExpenses}
                className="save-button"
                style={{
                  backgroundColor: "#9cc7ee",
                  color: "black",
                  border: "none",
                  margin: "0",
                  borderRadius: "15px",
                }}
              >
                저장
              </button>
            </div>
          </Modal>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={saveTemporaryExpense}
              className="save-button"
              style={{ marginTop: "40px" }}
            >
              임시 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDiaryEditor;
