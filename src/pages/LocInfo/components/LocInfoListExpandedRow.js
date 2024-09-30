// ExpandedRow.js
import React from 'react';

const ExpandedRow = ({ item, statData, allCorrData, filterCorrData }) => {

  const isValueAboveThreshold = (value) => value >= 0.7;  // 0.7 이상인지 확인

  return (
    <>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">L</td>
        <td colSpan="1" className="border px-4 py-2 text-center">전체</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop');
            return stat ? `${stat.AVG_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales');
            return stat ? `${(stat.AVG_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income');
            return stat ? `${(stat.AVG_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend');
            return stat ? `${(stat.AVG_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop');
            return stat ? `${stat.AVG_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident');
            return stat ? `${stat.AVG_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop');
            return stat ? `${stat.AVG_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house');
            return stat ? `${stat.AVG_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop');
            return stat ? `${stat.STD_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales');
            return stat ? `${(stat.STD_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income');
            return stat ? `${(stat.STD_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend');
            return stat ? `${(stat.STD_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop');
            return stat ? `${stat.STD_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident');
            return stat ? `${stat.STD_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop');
            return stat ? `${stat.STD_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 표준편차 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house');
            return stat ? `${stat.STD_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop');
            return stat ? `${stat.MED_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales');
            return stat ? `${(stat.MED_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income');
            return stat ? `${(stat.MED_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend');
            return stat ? `${(stat.MED_VAL / 10000).toFixed(1)}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop');
            return stat ? `${stat.MED_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident');
            return stat ? `${stat.MED_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop');
            return stat ? `${stat.MED_VAL.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 중위값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house');
            return stat ? `${stat.MED_VAL.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">최대/최소</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop');
            return stat ? `${stat.MAX_VALUE}/${stat.MIN_VALUE}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales');
            return stat ? `${(stat.MAX_VALUE / 10000).toLocaleString()}만원 / ${(stat.MIN_VALUE / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income');
            return stat ? `${(stat.MAX_VALUE / 10000).toLocaleString()}만원 / ${(stat.MIN_VALUE / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend');
            return stat ? `${(stat.MAX_VALUE / 10000).toLocaleString()}만원 / ${(stat.MIN_VALUE / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop');
            return stat ? `${stat.MAX_VALUE}/${stat.MIN_VALUE}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident');
            return stat ? `${stat.MAX_VALUE}/${stat.MIN_VALUE}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop');
            return stat ? `${stat.MAX_VALUE}/${stat.MIN_VALUE}명` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 최대값/최소값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house');
            return stat ? `${stat.MAX_VALUE}/${stat.MIN_VALUE}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* J-Score 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house');
            return stat ? stat.J_SCORE.toFixed(1) : "데이터 없음";
          })()}
        </td>


        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">전체</td>
        <td colSpan="1" className="border px-4 py-2 text-center">상관분석</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균 매출</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <td colSpan="1" className="border px-4 py-2 text-center">유동 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균매출</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["SALES"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["SALES"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["INCOME"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["INCOME"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["INCOME"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["INCOME"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["SPEND"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["SPEND"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["SPEND"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["SPEND"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["SPEND"]) ? 'red' : 'black' }}
        >
          {allCorrData["INCOME"]["SPEND"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">유동인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["MOVE_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["MOVE_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["MOVE_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["MOVE_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["MOVE_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["INCOME"]["MOVE_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["MOVE_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SPEND"]["MOVE_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">직장인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["WORK_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["WORK_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["WORK_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["WORK_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["WORK_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["INCOME"]["WORK_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["WORK_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["SPEND"]["WORK_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["WORK_POP"]) ? 'red' : 'black' }}
        >
          {allCorrData["MOVE_POP"]["WORK_POP"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">주거인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["INCOME"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["SPEND"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["MOVE_POP"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["WORK_POP"]["RESIDENT"]) ? 'red' : 'black' }}
        >
          {allCorrData["WORK_POP"]["RESIDENT"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SHOP"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["SHOP"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SALES"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["SALES"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["INCOME"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["INCOME"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["SPEND"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["SPEND"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["MOVE_POP"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["MOVE_POP"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["WORK_POP"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["WORK_POP"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"
          style={{ color: isValueAboveThreshold(allCorrData["RESIDENT"]["HOUSE"]) ? 'red' : 'black' }}
        >
          {allCorrData["RESIDENT"]["HOUSE"].toFixed(4)}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">L</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find(
              (stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop'
            );
            return stat ? stat.city_name : "데이터 없음"; // stat이 있으면 city_name 출력, 없으면 "데이터 없음"
          })()}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find(
              (stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop'
            );
            return stat ? stat.district_name : "데이터 없음"; // stat이 있으면 city_name 출력, 없으면 "데이터 없음"
          })()}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">최대/최소</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MAX_VALUE / 10000)}/{(stat.MIN_VALUE / 10000)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MAX_VALUE / 10000)}/{(stat.MIN_VALUE / 10000)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{(stat.MAX_VALUE / 10000)}/{(stat.MIN_VALUE / 10000)}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) => data.DISTRICT_NAME === item.district_name // item의 지역 이름과 같은 DISTRICT_NAME을 찾음
            );
            return matchingDistrict ? matchingDistrict.DISTRICT_NAME : "데이터 없음"; // 찾은 지역 이름을 출력, 없으면 "데이터 없음" 출력
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">상관분석</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균 매출</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <td colSpan="1" className="border px-4 py-2 text-center">유동 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균매출</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.SALES >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.SALES.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.INCOME >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.INCOME.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.INCOME >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.INCOME.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.SPEND >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.SPEND.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.SPEND >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.SPEND.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.SPEND >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.SPEND.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">유동인구</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.MOVE_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.MOVE_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.MOVE_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.MOVE_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.MOVE_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.MOVE_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.MOVE_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.MOVE_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">직장인구</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.WORK_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.WORK_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.WORK_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.WORK_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.WORK_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.WORK_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.WORK_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.WORK_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.WORK_POP >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.WORK_POP.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">주거인구</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "WORK_POP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.RESIDENT >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "WORK_POP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.RESIDENT.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SHOP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SALES"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "INCOME"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "SPEND"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "MOVE_POP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "WORK_POP"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "WORK_POP"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td
          colSpan="1"
          className="border px-4 py-2 text-center"
          style={{
            color: (() => {
              const matchingDistrict = filterCorrData.find(
                (data) =>
                  data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                  data.level_1 === "RESIDENT"                    // level_1이 "SHOP"인 조건
              );
              return matchingDistrict && matchingDistrict.HOUSE >= 0.7 ? 'red' : 'black'; // 0.7 이상이면 빨간색, 아니면 검정색
            })()
          }}
        >
          {(() => {
            const matchingDistrict = filterCorrData.find(
              (data) =>
                data.DISTRICT_NAME === item.district_name && // 지역 이름이 일치하고
                data.level_1 === "RESIDENT"                    // level_1이 "SHOP"인 조건
            );
            return matchingDistrict ? matchingDistrict.HOUSE.toFixed(4) : "데이터 없음"; // SALES 값을 출력, 없으면 "데이터 없음"
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
    </>
  );
};

export default ExpandedRow;
