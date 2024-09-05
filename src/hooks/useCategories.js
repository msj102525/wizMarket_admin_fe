import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCategories = () => {
    const [mainCategory, setMainCategory] = useState('대분류');
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategory, setSubCategory] = useState('중분류');
    const [subCategories, setSubCategories] = useState([]);
    const [detailCategory, setDetailCategory] = useState('소분류');
    const [detailCategories, setDetailCategories] = useState([]);

    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_main_category`);
                setMainCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch main categories:', error);
            }
        };
        fetchMainCategories();
    }, []);

    useEffect(() => {
        setSubCategories([]);

        if (mainCategory === '대분류' || mainCategory === '0') return;

        const fetchSubCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_sub_category?biz_main_category_id=${mainCategory}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };
        fetchSubCategories();
    }, [mainCategory]);

    useEffect(() => {
        setDetailCategories([]);

        if (subCategory === '중분류' || subCategory === '0') return;

        const fetchDetailCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_detail_category?biz_sub_category_id=${subCategory}`);
                setDetailCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch detail categories:', error);
            }
        };
        fetchDetailCategories();
    }, [subCategory]);

    return {
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    };
};
