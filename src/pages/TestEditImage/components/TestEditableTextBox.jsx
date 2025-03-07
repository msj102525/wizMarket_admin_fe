import { useState } from "react";

const TestEditableTextBox = ({ box, updateText, setSelectedIndex, selectedIndex }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({ x: box.x, y: box.y });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    updateText(box.id, e.target.textContent);
    setIsEditing(false);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setSelectedIndex(box.id);

    // 📌 마우스와 박스 위치 차이를 저장 (점프 방지)
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    // 📌 윈도우에서 마우스 이동 감지 (드래그 중 div를 벗어나도 정상 작동)
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    // 📌 마우스 위치에서 `offset`을 빼서 자연스럽게 이동
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);

    // 📌 드래그 끝나면 윈도우 이벤트 제거 (성능 최적화)
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`absolute cursor-move select-none ${
        selectedIndex === box.id ? "border border-blue-500" : ""
      }`}
      style={{ top: position.y, left: position.x, position: "absolute" }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          className="bg-white px-2 py-1 rounded shadow-md"
        >
          {box.text}
        </div>
      ) : (
        <div className="bg-black text-white px-2 py-1 rounded shadow-md">
          {box.text}
        </div>
      )}
    </div>
  );
};

export default TestEditableTextBox;
