import React from 'react';

const TestOpenComponent = ({ data }) => {

  const parseHTMLToListItems = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.body.children;
    const items = [];

    const labels = {
      "business": "업소",
      "person": "유동인구",
      "price": "매출",
      "wrcppl": "직장인구",
      "earn": "소득",
      "cnsmp": "소비",
      "hhCnt": "세대수",
      "rsdppl": "주거인구"
    };

    for (let el of elements) {
      if (el.tagName === "SPAN") {
        items.push(<li key={el.textContent}><strong>위치</strong>: {el.textContent}</li>);
      } else if (el.tagName === "STRONG") {
        const label = labels[el.getAttribute('data-name')];
        if (label) {
          items.push(<li key={el.textContent}><strong>{label}</strong>: {el.textContent}</li>);
        }
      }
    }

    return items;
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">결과</h2>
      <ul>
        {data && parseHTMLToListItems(data)}
      </ul>
    </div>
  );
};

export default TestOpenComponent;
