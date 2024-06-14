import React, { useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
Modal.setAppElement("#root");

const TravelDiary = () => {
  const [title, setTitle] = useState("");
  const [Publish, setPublish] = useState(false);
  const [travelCotent, setTravelCotent] = useState([]);
  const [expenseContent, setExpenseContent] = useState([]);
  const [newEntry, setNewEntry] = useState({
    description: "",
    image: null,
  });

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: null,
    location: "",
    category: "",
    amount: "",
  });

  const addEntry = () => {
    setTravelCotent([...travelCotent, newEntry]);
    setNewEntry({ description: "", image: null });
  };

  const addEntryExpense = () => {
    setExpenseContent([...expenseContent, newExpense]);
    setNewEntry({
      location: "",
      category: "",
      amount: "",
    });
  };

  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSave = () => {
    setModalIsOpen(true);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const addExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({ date: selectedDate, category: "", amount: "" });
    setIsExpenseModalOpen(false); // 모달 닫기
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setNewExpense({ ...newExpense, date: date }); // newExpense에 date 포함
    setIsExpenseModalOpen(true); // 모달 열기
  };

  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

  const resizeTextarea = (e) => {
    const { scrollHeight, clientHeight, value } = e.target;
    // 줄바꿈이 일어날 때
    if (scrollHeight > clientHeight) {
      setTextareaHeight((prev) => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [value.length - 1]: true },
      }));
    }

    // 텍스트 지워서 줄바꿈 지점에 도달했을 때
    if (textareaHeight.lineBreak[value.length]) {
      setTextareaHeight((prev) => ({
        row: prev.row - 1,
        lineBreak: { ...prev.lineBreak, [value.length]: false },
      }));
    }
  };

  // 날짜별 지출 합계를 계산하는 함수
  const getDailyExpensesTotal = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0];
      return expenseDate === dateString
        ? sum + parseFloat(expense.amount || 0)
        : sum;
    }, 0);
  };

  // 날짜 타일에 지출 합계를 표시하는 함수
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
            checked={Publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          발행
        </label>
        <div>
          <h4 style={{ textAlign: "left" }}>여행기</h4>
          {travelCotent.map((entry, index) => (
            <div key={index} className="entry">
              {/* <p>{entry.description}</p> */}
              {entry.image && (
                <img
                  src={URL.createObjectURL(entry.image)}
                  alt="entry"
                  className="entry-image"
                />
              )}
            </div>
          ))}
          <div className="new-entry">
            <div className="content-upload">
              <textarea
                className="textarea"
                placeholder="내용"
                value={newEntry.description}
                onChange={
                  (e) =>
                    setNewEntry({ ...newEntry, description: e.target.value })
                  // resizeTextarea(e);
                }
                // rows={textareaHeight.row} // textarea의 row 수를 동적으로 설정
              />
              <div className="divider"></div>
            </div>
            <div className="image-upload">
              <input
                type="file"
                onChange={(e) =>
                  setNewEntry({ ...newEntry, image: e.target.files[0] })
                }
                className="file-input"
              />
            </div>
          </div>
          <div>
            <button onClick={addEntry} className="add-button">
              +
            </button>
          </div>
          <div className="button-add-container">
            <button onClick={handleSave} className="save-button">
              저장
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            // contentLabel="Privacy Options"
            className="modal"
            overlayClassName="overlay"
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
              <opttion></opttion>
            </select>
            <button onClick={() => setModalIsOpen(false)}>완료</button>
          </Modal>
        </div>
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
            {selectedDate && (
              <div className="new-expense">
                <h3>{selectedDate.toDateString()} 경비 추가</h3>
                <select>
                  <option>나라 선택</option>
                  {/* 나라 옵션을 추가 */}
                  <option>일본</option>
                  <option>미국</option>
                  <option>아프리카</option>
                </select>
                <input
                  type="text"
                  placeholder="금액"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                />
                <button onClick={addExpense} className="add-button">
                  +
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TravelDiary;
