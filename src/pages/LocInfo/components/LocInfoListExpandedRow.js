// ExpandedRow.js
import React from 'react';

const ExpandedRow = ({ item, statData, allCorrData, filterCorrData, regionStat, filterForFind }) => {

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
            const stat = statData.find((stat) => stat.target_item === 'shop');
            return stat ? `${stat.avg_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'sales');
            return stat ? `${(stat.avg_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'income');
            return stat ? `${(stat.avg_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'spend');
            return stat ? `${(stat.avg_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'move_pop');
            return stat ? `${stat.avg_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'work_pop');
            return stat ? `${stat.avg_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'resident');
            return stat ? `${stat.avg_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'house');
            return stat ? `${stat.avg_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'shop');
            return stat ? `${stat.std_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'sales');
            return stat ? `${(stat.std_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'income');
            return stat ? `${(stat.std_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'spend');
            return stat ? `${(stat.std_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'move_pop');
            return stat ? `${stat.std_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'work_pop');
            return stat ? `${stat.std_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'resident');
            return stat ? `${stat.std_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'house');
            return stat ? `${stat.std_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'shop');
            return stat ? `${stat.med_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'sales');
            return stat ? `${(stat.med_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'income');
            return stat ? `${(stat.med_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">

          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'spend');
            return stat ? `${(stat.med_val / 10000).toLocaleString()}만원` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'move_pop');
            return stat ? `${stat.med_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'work_pop');
            return stat ? `${stat.med_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'resident');
            return stat ? `${stat.med_val.toFixed(1)}명` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'house');
            return stat ? `${stat.med_val.toFixed(1)}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'shop');
            return stat ? `${stat.max_val}개 / ${stat.min_val}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* max/min 값 만단위로 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'sales');
            return stat
              ? `${(stat.max_val / 10000)}만원 / ${(stat.min_val / 10000)}만원`
              : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* max/min 값 만단위로 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'income');
            return stat
              ? `${(stat.max_val / 10000)}만원 / ${(stat.min_val / 10000)}만원`
              : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* max/min 값 만단위로 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'spend');
            return stat
              ? `${(stat.max_val / 10000)}만원 / ${(stat.min_val / 10000)}만원`
              : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'move_pop');
            return stat ? `${stat.max_val}개 / ${stat.min_val}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'work_pop');
            return stat ? `${stat.max_val}개 / ${stat.min_val}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'resident');
            return stat ? `${stat.max_val}개 / ${stat.min_val}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {(() => {
            const stat = statData.find((stat) => stat.target_item === 'house');
            return stat ? `${stat.max_val}개 / ${stat.min_val}개` : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'shop'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'sales'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'income'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'spend'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'move_pop'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'work_pop'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'resident'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {(() => {
            const stat = statData.find(
              (stat) =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name &&
                stat.target_item === 'house'
            );
            return stat ? <>{stat.j_score.toFixed(1)}</> : "데이터 없음";
          })()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">L</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
          (() => {
            const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
            let stat;

            // 모든 값이 None일 때 city, district, subDistrict로 필터링
            if (!city && !district && !subDistrict) {
              stat = regionStat.find(stat =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name
              );
              // 조건에 맞는 경우 district_name 반환
              return stat ? stat.district_name : "데이터 없음";  
            }
            // city 값만 있을 때 city, subDistrict로 필터링
            else if (city && !district && !subDistrict) {
              stat = regionStat.find(stat =>
                stat.city_name === item.city_name &&
                stat.sub_district_name === item.sub_district_name
              );
              // 조건에 맞는 경우 avg_val 반환
              return stat ? stat.city_name : "데이터 없음";  
            }
            // district 값만 있을 때 city, subDistrict로 필터링
            else if (city && district && !subDistrict) {
              stat = regionStat.find(stat =>
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name
              );
              // 조건에 맞는 경우 max_val 반환
              return stat ? stat.district_name : "데이터 없음";  
            }
            // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
            else if (city && district && subDistrict) {
              stat = regionStat.find(stat =>
                stat.city_name === item.city_name &&
                stat.district_name === item.district_name &&
                stat.sub_district_name === item.sub_district_name
              );
              // 조건에 맞는 경우 j_score 반환
              return stat ? stat.district_name : "데이터 없음";  
            }
            // 아무 값도 맞지 않으면 데이터 없음 반환
            return "데이터 없음";
          })()
        }

        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "shop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.avg_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "sales" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.avg_val / 10000).toFixed(1)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "income" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.avg_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "spend" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.avg_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "move_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.avg_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "work_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.avg_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "resident" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.avg_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "house" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.avg_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "shop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.std_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "sales" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.std_val / 10000).toFixed(1)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "income" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.std_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "spend" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.std_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "move_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.std_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "work_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.std_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "resident" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.std_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "house" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.std_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "shop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.med_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "sales" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.med_val / 10000).toFixed(1)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "income" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.med_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "spend" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.med_val / 10000).toFixed(1)}만원`;  
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "move_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.med_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "work_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.med_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "resident" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.med_val.toFixed(1)}명`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "house" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.med_val.toFixed(1)}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">최대/최소</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'shop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "shop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.max_val}/${stat.min_val}개`;  // '개' 단위 추가
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'sales'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "sales" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.max_val / 10000)}/${(stat.min_val / 10000)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'income'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "income" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.max_val / 10000)}/${(stat.min_val / 10000)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'spend'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "spend" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${(stat.max_val / 10000)}/${(stat.min_val / 10000)}만원`;   
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'move_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "move_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.max_val}/${stat.min_val}명`;
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'work_pop'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "work_pop" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.max_val}/${stat.min_val}명`;
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'resident'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "resident" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.max_val}/${stat.min_val}명`;
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
        {
            (() => {
              const { city, district, subDistrict } = filterForFind;  // subDistrict로 수정
              let stat;

              // 모든 값이 None일 때 city, district, subDistrict로 필터링
              if (!city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // city 값만 있을 때 city, subDistrict로 필터링
              else if (city && !district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // district 값만 있을 때 city, subDistrict로 필터링
              else if (city && district && !subDistrict) {
                stat = regionStat.find(stat =>
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === 'house'
                );
              }
              // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
              else if (city && district && subDistrict) {
                stat = regionStat.find(stat =>
                  stat.city_name === item.city_name &&
                  stat.district_name === item.district_name &&
                  stat.sub_district_name === item.sub_district_name &&
                  stat.target_item === "house" 
                );
              }
              // 조건에 맞는 stat이 있을 때 j_score 표시
              if (stat) {
                return `${stat.max_val}/${stat.min_val}개`;
              } else {
                return "데이터 없음";
              }
            })()
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
    </>
  );
};

export default ExpandedRow;
