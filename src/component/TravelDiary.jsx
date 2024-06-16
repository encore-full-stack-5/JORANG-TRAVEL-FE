import React, { useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ImageSlider from "./ImageSlider.jsx";
Modal.setAppElement("#root");

const TravelDiary = () => {
  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState(false);
  const [travelContent, setTravelContent] = useState([]);
  const [newEntry, setNewEntry] = useState({
    description: "",
    image: null,
  });
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [expenseInputs, setExpenseInputs] = useState([
    { id: Math.random(), amount: "", location: "" },
  ]);

  // 새로운 여행 항목 추가
  const addEntry = () => {
    if (newEntry.description !== "" || newEntry.image !== null) {
      // travelContent에 새로운 항목 추가
      setTravelContent([...travelContent, newEntry]);
      // 새 입력 칸 초기화
      setNewEntry({ description: "", image: null });
    }
  };

  const handleSave = () => {
    setModalIsOpen(true);
  };

  // 경비 추가 함수
  const addExpense = () => {
    setExpenses([
      ...expenses,
      ...expenseInputs.map((input) => ({
        date: selectedDate,
        amount: input.amount,
        location: input.location,
      })),
    ]);
    // 입력 필드 초기화
    setExpenseInputs([{ id: Math.random(), amount: "", location: "" }]);
    setIsExpenseModalOpen(false);
  };

  // 날짜를 클릭했을 때 실행되는 함수
  const handleDateClick = (date) => {
    setSelectedDate(date);
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

  // 이미지 파일 변경 처리
  const handleImageChange = (file) => {
    setNewEntry({ ...newEntry, image: file });
  };

  // 설명 변경 처리
  const handleDescriptionChange = (description) => {
    setNewEntry({ ...newEntry, description });
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

  return (
    <div className="travel">
      <div className="travel-diary">
        <input
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <label className="publish-checkbox">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          발행
        </label>
        {/* <ImageSlider images={travelContent} /> */}
        {travelContent.map((entry, index) => (
          <div key={index} className="prview-entry-layout">
            {entry.image && (
              <img
                src={URL.createObjectURL(entry.image)}
                alt="Uploaded"
                className="preview-image"
              />
            )}
            <p className="preview-description" style={{ textAlign: "left" }}>
              {entry.description}
            </p>
          </div>
        ))}

        <div className="entry-layout">
          <div className="image-upload-section">
            <input
              type="file"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            {newEntry.image && (
              <img
                src={URL.createObjectURL(newEntry.image)}
                alt="Uploaded"
                className="preview-image"
              />
            )}
          </div>
          <div className="content-section">
            <textarea
              className="fixed-size-textarea"
              placeholder="내용"
              value={newEntry.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>
        </div>
        <div className="buttonAddEntry">
          <button onClick={addEntry} className="add-button">
            +
          </button>
        </div>
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
          </select>
          <button onClick={() => setModalIsOpen(false)}>완료</button>
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
            {selectedDate && <h3>{selectedDate.toDateString()} 경비 추가</h3>}
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
                  <option>나라 선택</option>
                  <option>미국</option>
                  <option>일본</option>
                  <option>중국</option>
                  <option>호주</option>
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
        </div>
      </div>
    </div>
  );
};

export default TravelDiary;
