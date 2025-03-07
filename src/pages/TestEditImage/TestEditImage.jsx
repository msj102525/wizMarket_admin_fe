import React, { useState } from "react";
import TestEditableTextBox from "./components/TestEditableTextBox";
import Aside from '../../components/Aside';
import Header from '../../components/Header';

const TestEditImage = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addTextBox = (e) => {
    const containerRect = e.currentTarget.getBoundingClientRect(); // 부모 div 위치 가져오기

    const newTextBox = {
      id: Date.now(),
      x: e.clientX - containerRect.left, // 부모 div 기준 X 좌표
      y: e.clientY - containerRect.top,  // 부모 div 기준 Y 좌표
      text: "텍스트 입력",
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const updateText = (id, newText) => {
    setTextBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, text: newText } : box))
    );
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="mb:hidden">
          <Aside />
        </div>
        <main className="flex flex-col gap-4 h-full w-full p-4 overflow-y-auto">
          <div
            className="relative w-[600px] h-[400px] border bg-gray-200"
            onDoubleClick={addTextBox} // 더블 클릭으로 텍스트 박스 추가
          >
            {textBoxes.map((box) => (
              <TestEditableTextBox
                key={box.id}
                box={box}
                updateText={updateText}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestEditImage;
