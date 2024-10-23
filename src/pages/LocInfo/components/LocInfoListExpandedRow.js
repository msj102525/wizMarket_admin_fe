// ExpandedRow.js
import React from 'react';
import CorrDataCell from './LocInfoListExpandedTD';

const ExpandedRow = ({ item, statData, filterCorrData, regionStat, filterForFind }) => {
  
  return (
    <>

      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score(전체)</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">
          평균(
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
          )
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          표준편차(
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
          )
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          중간값(Mean)(
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
          )
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          최대/최소(
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
          )
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
  {(() => {
    // item의 y_m과 같은 날짜의 데이터를 먼저 찾고 그 후 city_name과 district_name을 비교
    const matchingYear = filterCorrData[item.y_m]; // item의 y_m과 동일한 데이터를 찾음

    if (matchingYear) {
      const matchingDistrict = matchingYear.find(
        (data) =>
          data.DISTRICT_NAME === item.district_name
      );
      return matchingDistrict ? matchingDistrict.DISTRICT_NAME : "데이터 없음"; // 일치하는 지역 출력, 없으면 "데이터 없음" 출력
    } else {
      return "데이터 없음"; // 날짜가 일치하지 않으면 "데이터 없음" 출력
    }
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균매출</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="SALES" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="INCOME" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="INCOME" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="SPEND" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="SPEND" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="INCOME" 
          thresholdField="SPEND" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">유동인구</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="MOVE_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="MOVE_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="INCOME" 
          thresholdField="MOVE_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SPEND" 
          thresholdField="MOVE_POP" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">직장인구</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="WORK_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="WORK_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="INCOME" 
          thresholdField="WORK_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SPEND" 
          thresholdField="WORK_POP" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="MOVE_POP" 
          thresholdField="WORK_POP" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">주거인구</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="RESIDENT" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="RESIDENT" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="INCOME" 
          thresholdField="RESIDENT" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SPEND" 
          thresholdField="RESIDENT" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="MOVE_POP" 
          thresholdField="RESIDENT" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="WORK_POP" 
          thresholdField="RESIDENT" 
        />
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
        <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SHOP" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SALES" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="INCOME" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="SPEND" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="MOVE_POP" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="WORK_POP" 
          thresholdField="HOUSE" 
        />
        <CorrDataCell 
          item={item} 
          filterCorrData={filterCorrData} 
          targetField="RESIDENT" 
          thresholdField="HOUSE" 
        />
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
    </>
  );
};

export default ExpandedRow;
