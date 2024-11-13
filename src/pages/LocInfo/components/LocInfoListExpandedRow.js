// ExpandedRow.js
import React from 'react';
import CorrDataCell from './LocInfoListExpandedCorr';

const ExpandedRow = ({ item, nationJScore, filterCorrData, statDataByRegion, filterSet }) => {


  // 필터 조건에 맞는 지역명 불러오는 함수
  const getStatField = () => {
    const { city, district, subDistrict } = filterSet;
    let stat;

    // 모든 값이 None일 때 city, district, sub_district로 필터링
    if (!city && !district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name
      );
      return stat ? stat.city_name : "-";
    }

    // city 값만 있을 때 city, subDistrict로 필터링
    if (city && !district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.city_name === item.city_name &&
        stat.sub_district_name === item.sub_district_name
      );
      return stat ? stat.city_name : "-";
    }

    // district 값만 있을 때 city, subDistrict로 필터링
    if (city && district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name
      );
      return stat ? stat.district_name : "-";
    }

    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
    if (city && district && subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name
      );
      return stat ? stat.district_name : "-";
    }

    // 아무 값도 맞지 않으면 - 반환
    return "-";
  };



  // 각각의 통계 값 가져오는 함수 분리 (avgField 추가)
  const getStatValue = (statDataByRegion, item, filterSet, targetItem, field, divisor) => {
    const { city, district, subDistrict } = filterSet;
    let stat;

    // 모든 값이 None일 때 city, district, subDistrict로 필터링
    if (!city && !district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.ref_date === item.y_m &&
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem
      );
    }
    // city 값만 있을 때 city, subDistrict로 필터링
    else if (city && !district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.ref_date === item.y_m &&
        stat.city_name === item.city_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem
      );
    }
    // district 값만 있을 때 city, subDistrict로 필터링
    else if (city && district && !subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.ref_date === item.y_m &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem
      );
    }
    // subDistrict 값만 있을 때 city, district, subDistrict로 필터링
    else if (city && district && subDistrict) {
      stat = statDataByRegion.find(stat =>
        stat.ref_date === item.y_m &&
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem
      );
    }

    // 조건에 맞는 stat이 있을 때 avgField 값 표시
    if (stat && stat[field] !== undefined) {
      // min_val 또는 max_val이면 그대로 반환
      if (field === 'min_val' || field === 'max_val') {
        return stat[field] / divisor;  // 그대로 반환
      } else {
        // 그 외의 필드는 divisor로 나누고 소수점 한 자리로 반환
        const value = stat[field] / divisor;
        return value.toFixed(1);
      }
    } else {
      return 0;
    }
  };

  function getJScore(nationJScore, item, targetItem, scoreType) {
    const stat = nationJScore.find(
      (stat) =>
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem &&
        stat.ref_date === item.y_m
    );

    if (stat) {
      const score =
        scoreType === 'rank' ? stat.j_score_rank :
          scoreType === 'per' ? stat.j_score_per :
            stat.j_score;
      return score !== null ? score.toFixed(2) : "-";
    }
  }

  function getJScoreNonOutliers(nationJScore, item, targetItem, scoreType) {
    const stat = nationJScore.find(
      (stat) =>
        stat.city_name === item.city_name &&
        stat.district_name === item.district_name &&
        stat.sub_district_name === item.sub_district_name &&
        stat.target_item === targetItem &&
        stat.ref_date === item.y_m
    );

    if (stat) {
      const score =
        scoreType === 'per' ? stat.j_score_per_non_outliers :
          stat.j_score_non_outliers;
      return score !== null ? score.toFixed(2) : "-";
    }
  }


  return (
    <>

      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">전국</td>
        <td colSpan="1" className="border px-4 py-2 text-center">이상치 제거 전</td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'shop') !== "-"
            ? `${getJScore(nationJScore, item, 'shop')}(${getJScore(nationJScore, item, 'shop', 'rank')}/${getJScore(nationJScore, item, 'shop', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'sales') !== "-"
            ? `${getJScore(nationJScore, item, 'sales')}(${getJScore(nationJScore, item, 'sales', 'rank')}/${getJScore(nationJScore, item, 'sales', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'income') !== "-"
            ? `${getJScore(nationJScore, item, 'income')}(${getJScore(nationJScore, item, 'income', 'rank')}/${getJScore(nationJScore, item, 'income', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'spend') !== "-"
            ? `${getJScore(nationJScore, item, 'spend')}(${getJScore(nationJScore, item, 'spend', 'rank')}/${getJScore(nationJScore, item, 'spend', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'move_pop') !== "-"
            ? `${getJScore(nationJScore, item, 'move_pop')}(${getJScore(nationJScore, item, 'move_pop', 'rank')}/${getJScore(nationJScore, item, 'move_pop', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'work_pop') !== "-"
            ? `${getJScore(nationJScore, item, 'work_pop')}(${getJScore(nationJScore, item, 'work_pop', 'rank')}/${getJScore(nationJScore, item, 'work_pop', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'resident') !== "-"
            ? `${getJScore(nationJScore, item, 'resident')}(${getJScore(nationJScore, item, 'resident', 'rank')}/${getJScore(nationJScore, item, 'resident', 'per')})`
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScore(nationJScore, item, 'house') !== "-"
            ? `${getJScore(nationJScore, item, 'house')}(${getJScore(nationJScore, item, 'house', 'rank')}/${getJScore(nationJScore, item, 'house', 'per')})`
            : "-"
          }
        </td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">이상치 제거 후</td>
        <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'shop') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'shop')}</strong>
                ({getJScore(nationJScore, item, 'shop', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'shop', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'sales') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'sales')}</strong>
                ({getJScore(nationJScore, item, 'sales', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'sales', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'income') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'income')}</strong>
                ({getJScore(nationJScore, item, 'income', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'income', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'spend') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'spend')}</strong>
                ({getJScore(nationJScore, item, 'spend', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'spend', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'move_pop') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'move_pop')}</strong>
                ({getJScore(nationJScore, item, 'move_pop', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'move_pop', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'work_pop') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'work_pop')}</strong>
                ({getJScore(nationJScore, item, 'work_pop', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'work_pop', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'resident') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'resident')}</strong>
                ({getJScore(nationJScore, item, 'resident', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'resident', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getJScoreNonOutliers(nationJScore, item, 'house') !== "-"
            ? (
              <>
                <strong>{getJScoreNonOutliers(nationJScore, item, 'house')}</strong>
                ({getJScore(nationJScore, item, 'house', 'rank')}/
                <strong>{getJScoreNonOutliers(nationJScore, item, 'house', 'per')}</strong>)
              </>
            )
            : "-"
          }
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">L</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatField()}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          평균(
          {getStatField()}
          )
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'shop', 'avg_val', 1)}개</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'sales', 'avg_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'income', 'avg_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'spend', 'avg_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'move_pop', 'avg_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'work_pop', 'avg_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'resident', 'avg_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'house', 'avg_val', 1)}개</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">
          표준편차(
          {getStatField()}
          )
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'shop', 'std_val', 1)}개</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'sales', 'std_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'income', 'std_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'spend', 'std_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'move_pop', 'std_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'work_pop', 'std_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'resident', 'std_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'house', 'std_val', 1)}개</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">
          중간값(Mean)(
          {getStatField()}
          )
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'shop', 'med_val', 1)}개</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'sales', 'med_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'income', 'med_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'spend', 'med_val', 10000)}만원</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'move_pop', 'med_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'work_pop', 'med_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'resident', 'med_val', 1)}명</td>
        <td colSpan="1" className="border px-4 py-2 text-center">{getStatValue(statDataByRegion, item, filterSet, 'house', 'med_val', 1)}개</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">
          최대/최소(
          {getStatField()}
          )
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'shop', 'max_val', 1)} /{getStatValue(statDataByRegion, item, filterSet, 'shop', 'min_val', 1)}개
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'sales', 'max_val', 10000)} /{getStatValue(statDataByRegion, item, filterSet, 'sales', 'min_val', 10000)}만원
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'income', 'max_val', 10000)} /{getStatValue(statDataByRegion, item, filterSet, 'income', 'min_val', 10000)}만원
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'spend', 'max_val', 10000)} /{getStatValue(statDataByRegion, item, filterSet, 'spend', 'min_val', 10000)}만원
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'move_pop', 'max_val', 1)} /{getStatValue(statDataByRegion, item, filterSet, 'move_pop', 'min_val', 1)}명
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'work_pop', 'max_val', 1)} /{getStatValue(statDataByRegion, item, filterSet, 'work_pop', 'min_val', 1)}명
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'resident', 'max_val', 1)} /{getStatValue(statDataByRegion, item, filterSet, 'resident', 'min_val', 1)}명
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {getStatValue(statDataByRegion, item, filterSet, 'house', 'max_val', 1)} /{getStatValue(statDataByRegion, item, filterSet, 'house', 'min_val', 1)}개
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
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
              return matchingDistrict ? matchingDistrict.DISTRICT_NAME : "-"; // 일치하는 지역 출력, 없으면 "-" 출력
            } else {
              return "-"; // 날짜가 일치하지 않으면 "-" 출력
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
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
    </>
  );
};

export default ExpandedRow;
