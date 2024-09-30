// ExpandedRow.js
import React from 'react';

const ExpandedRow = ({ item, statData }) => {
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
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
            <>{(stat.AVG_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}명 </>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
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
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
            <>{(stat.STD_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}명 </>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
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
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
            <>{(stat.MED_VAL / 10000).toFixed(1).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}명 </>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
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
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}개</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
            <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>  // 10,000으로 나누고, "만원" 추가
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
            <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
            <>{(stat.MAX_VALUE / 10000).toLocaleString()}만원 / {(stat.MIN_VALUE / 10000).toLocaleString()}만원</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
            <>{stat.MAX_VALUE}/{stat.MIN_VALUE}명</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
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
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'sales').map((stat) => (
            <>{(stat.J_SCORE.toFixed(1)).toLocaleString()}</>  // 10,000으로 나누고, "만원" 추가
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>

        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'income').map((stat) => (
            <>{(stat.J_SCORE.toFixed(1)).toLocaleString()}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'spend').map((stat) => (
            <>{(stat.J_SCORE).toFixed(1).toLocaleString()}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'move_pop').map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'resident').map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'work_pop').map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'house').map((stat) => (
            <>{stat.J_SCORE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
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
        <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대 수</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">L</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.city_name}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.sub_district_name === item.sub_district_name && stat.column_name === 'shop').map((stat) => (
            <>{stat.district_name}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'shop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.AVG_VAL.toFixed(1)}</>
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
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.STD_VAL.toFixed(1)}</>
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
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MED_VAL.toFixed(1)}</>
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
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.MAX_VALUE.toFixed(1)}/{stat.MIN_VALUE.toFixed(1)}</>
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
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'sales' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'income' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'spend' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'move_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'resident' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'work_pop' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center">
          {/* 평균 값 표시 */}
          {statData.filter((stat) => stat.district_name === item.district_name && stat.column_name === 'house' && stat.sub_district_id === null).map((stat) => (
            <>{stat.J_SCORE}</>
          ))}
          {/* 각 데이터 컬럼에 대한 통계 표시 */}
        </td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
      <tr>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">강서구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">상관분석</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
        <td colSpan="1" className="border px-4 py-2 text-center">업소 평균 매출</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
        <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
        <td colSpan="1" className="border px-4 py-2 text-center">유동 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
        <td colSpan="1" className="border px-4 py-2 text-center">세대 수</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
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
        <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
        <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
        <td colSpan="1" className="border px-4 py-2 text-center">1</td>
        <td colSpan="1" className="border px-4 py-2 text-center"></td>
      </tr>
    </>
  );
};

export default ExpandedRow;
