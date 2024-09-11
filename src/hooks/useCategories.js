import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCategories = () => {
    const [reference, setReference] = useState('출처');
    const [references, setReferences] = useState([]);
    const [mainCategory, setMainCategory] = useState('대분류');
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategory, setSubCategory] = useState('중분류');
    const [subCategories, setSubCategories] = useState([]);
    const [detailCategory, setDetailCategory] = useState('소분류');
    const [detailCategories, setDetailCategories] = useState([]);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/reference`);
                setReferences(response.data);
            } catch (error) {
                console.error('Failed to fetch references:', error);
            }
        };
        fetchReferences();
    }, []);

    useEffect(() => {
        if (reference === '출처' || reference === '0' || reference === 2) return;

        if (reference === 1) {
            // reference 값이 1일 때 기존 방식대로 요청 처리
            const fetchMainCategories = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_main_category?reference_id=${reference}`);
                    setMainCategories(response.data);
                } catch (error) {
                    console.error('Failed to fetch main categories:', error);
                }
            };
            fetchMainCategories();
        } else if (reference === 3) {
            // reference 값이 3일 때 business_area_category 테이블에서 모든 카테고리 데이터 가져오기
            const fetchBusinessAreaCategory = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/business_area_category/business_area_category?reference_id=${reference}`);
                    const businessAreaCategory = response.data;
    
                    const mainCategoriesSet = new Set();
                    const subCategoriesSet = new Set();
                    const detailCategoriesSet = new Set();
    
                    // 배열 데이터를 객체로 변환
                    businessAreaCategory.forEach(item => {
                        const businessAreaItem = {
                            business_area_category_id: item[0],
                            main_category_code: item[1],
                            main_category_name: item[2],
                            sub_category_code: item[3],
                            sub_category_name: item[4],
                            detail_category_code: item[5],
                            detail_category_name: item[6]
                        };
    
                        // 중복 제거를 위해 Set에 추가
                        mainCategoriesSet.add(`${businessAreaItem.main_category_code},${businessAreaItem.main_category_name}`);
                        subCategoriesSet.add(`${businessAreaItem.sub_category_code},${businessAreaItem.sub_category_name}`);
                        detailCategoriesSet.add(`${businessAreaItem.detail_category_code},${businessAreaItem.detail_category_name}`);
                    });
                    
    
                    // Set을 다시 배열로 변환하여 상태에 저장
                    setMainCategories(Array.from(mainCategoriesSet).map(item => {
                        const [biz_main_category_id, biz_main_category_name] = item.split(',');
                        return { biz_main_category_id, biz_main_category_name };
                    }));
                    setSubCategories(Array.from(subCategoriesSet).map(item => {
                        const [biz_sub_category_id, biz_sub_category_name] = item.split(',');
                        return { biz_sub_category_id, biz_sub_category_name };
                    }));
                    setDetailCategories(Array.from(detailCategoriesSet).map(item => {
                        const [biz_detail_category_id, biz_detail_category_name] = item.split(',');
                        return { biz_detail_category_id, biz_detail_category_name };
                    }));
                    
                } catch (error) {
                    console.error('Failed to fetch business area category data:', error);
                }
            };
    
            fetchBusinessAreaCategory();
        }
    }, [reference]);

    useEffect(() => {
        if (reference === 2 || reference === 3 || mainCategory === '대분류' || mainCategory === '0') return;

        setSubCategories([]);

        const fetchSubCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_sub_category?biz_main_category_id=${mainCategory}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };
        fetchSubCategories();
       
    }, [mainCategory, reference]);

    useEffect(() => {

        if (reference === 2 || reference === 3 || subCategory === '중분류' || subCategory === '0') return;

        setDetailCategories([]);

        const fetchDetailCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_detail_category?biz_sub_category_id=${subCategory}`);
                setDetailCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch detail categories:', error);
            }
        };
        fetchDetailCategories();
    }, [subCategory, reference]);

    return {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    };
};
