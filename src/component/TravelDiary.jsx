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
  const [travelContent, setTravelContent] = useState([]);
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
    if (newEntry.description !== "" || newEntry.image !== null) {
      setTravelContent([...travelContent, newEntry]); // travelContent에 새 항목 추가
      setNewEntry({ description: "", image: null }); // 새 항목 입력을 위해 초기화
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSave = () => {
    setModalIsOpen(true);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const addExpense = () => {
    // 여러 개의 금액 입력 데이터를 expenses 상태에 추가
    setExpenses([
      ...expenses,
      ...expenseInputs.map((input) => ({
        date: selectedDate,
        amount: input.amount,
      })),
    ]);
    setExpenseInputs([{ id: Math.random(), amount: "", location: "" }]);
    setIsExpenseModalOpen(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const expensesForDate = expenses.filter((exp) => {
      const expenseDate = new Date(exp.date).toISOString().split("T")[0];
      return expenseDate === date.toISOString().split("T")[0];
    });
    setExpenseInputs(
      expensesForDate.length > 0
        ? expensesForDate
        : [{ id: Math.random(), amount: "", location: "" }]
    );
    setIsExpenseModalOpen(true);
  };

  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

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
  const handleImageChange = (file) => {
    setNewEntry({ ...newEntry, image: file });
  };
  const handleDescriptionChange = (description) => {
    setNewEntry({ ...newEntry, description });
  };
  const addExpenseInput = () => {
    setExpenseInputs([
      ...expenseInputs,
      { id: Math.random(), amount: "", location: " " },
    ]);
  };

  const [expenseInputs, setExpenseInputs] = useState([
    { id: Math.random(), amount: "", location: " " },
  ]);

  const [locationInputs, setLocationInputs] = useState([]);
  const handleExpenseChange = (id, field, value) => {
    setExpenseInputs(
      expenseInputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
    // 입력된 경비를 저장하는 함수
    const addExpense = () => {
      const updatedExpenses = expenses.filter(
        (exp) =>
          !(
            new Date(exp.date).toISOString().split("T")[0] ===
            selectedDate.toISOString().split("T")[0]
          )
      );
      setExpenses([...updatedExpenses, ...expenseInputs]);
      setIsExpenseModalOpen(false);
    };
    const handleExpenseChange = (id, field, value) => {
      setExpenseInputs(
        expenseInputs.map((input) =>
          input.id === id ? { ...input, [field]: value } : input
        )
      );
    };
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

        {travelContent.map((entry, index) => (
          <div key={index} className="entry-layout">
            {entry.image && (
              <img
                src={URL.createObjectURL(entry.image)}
                alt="Uploaded"
                className="preview-image"
              />
            )}
            <p>{entry.description}</p>
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
          // contentLabel="Privacy Options"
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
            <opttion>일본</opttion>
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
            {expenseInputs.map((input, index) => (
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
                  <opttion>일본</opttion>
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
          <div style={{ textAlign: "right" }}>
            <button onClick={handleSave} className="save-button">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDiary;
