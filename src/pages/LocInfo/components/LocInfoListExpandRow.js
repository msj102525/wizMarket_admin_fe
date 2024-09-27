const ExpandedRow = ({ item, statData }) => {
    return (
        <>
            {/* 첫 번째 통계 데이터 - 평균 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">L</td>
                <td colSpan="1" className="border px-4 py-2 text-center">전체</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
                <td colSpan="1" className="border px-4 py-2 text-center">{statData ? statData.AVG_VAL : 'N/A'}</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>

            {/* 두 번째 통계 데이터 - 표준편차 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>

            {/* 세 번째 통계 데이터 - 중위값 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">중간값</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 네 번째 통계 데이터 - 최고/최소 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">최고/최소</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 다섯 번째 통계 데이터 - J-Score */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 여섯 번째 통계 데이터 - 지역 평균 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">L</td>
                <td colSpan="1" className="border px-4 py-2 text-center">서울시</td>
                <td colSpan="1" className="border px-4 py-2 text-center">강서구</td>
                <td colSpan="1" className="border px-4 py-2 text-center">평균</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 일곱 번째 통계 데이터 - 표준편차 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">표준편차</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 여덟 번째 통계 데이터 - 중간값 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">중간값(Mean)</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 아홉 번째 통계 데이터 - 최고/최소 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">최고/최소</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
            {/* 열 번째 통계 데이터 - 표준편차 */}
            <tr>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                <td colSpan="1" className="border px-4 py-2 text-center">J-Score</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값1</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값2</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값3</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값4</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값5</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값6</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값7</td>
                <td colSpan="1" className="border px-4 py-2 text-center">값8</td>
                <td colSpan="1" className="border px-4 py-2 text-center"></td>
            </tr>
        </>
    )
}



export default ExpandedRow;