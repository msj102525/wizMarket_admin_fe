import React from 'react';
import CategorySelect from '../../../components/CategorySelect';
import SearchResetButtons from '../../../components/SearchResetButton';

const CateogoryForm = ({
    reference, references, setReference,
    mainCategory, setMainCategory, mainCategories,
    subCategory, setSubCategory, subCategories,
    detailCategory, setDetailCategory, detailCategories,
    handleSearch, handleReset
}) => {

    const totalReferencesCount = references.reduce((total, reference) => total + reference.category_count, 0);

    return (
        <div className="">
            <div className='flex justify-between gap-4'>
                <div className="flex-1">
                    <CategorySelect
                        reference={reference}
                        references={references}
                        setReference={setReference}
                        mainCategory={mainCategory}
                        setMainCategory={setMainCategory}
                        mainCategories={mainCategories}
                        subCategory={subCategory}
                        setSubCategory={setSubCategory}
                        subCategories={subCategories}
                        detailCategory={detailCategory}
                        setDetailCategory={setDetailCategory}
                        detailCategories={detailCategories}
                    />
                </div>
                <div className="flex-1">
                    <SearchResetButtons onSearch={handleSearch} onReset={handleReset} flexStart={true} />
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md mt-4 flex items-center space-x-8">
                <div>
                    출처 총: <span className="text-red-500">{totalReferencesCount}</span> 건
                </div>
                {references.map((reference, index) => (
                    <React.Fragment key={reference.reference_id}>
                        {index > 0 && <span className="border-l border-black h-4"></span>}
                        <div>
                            {reference.reference_name}: <span className="text-red-500">{reference.category_count}</span> 건
                        </div>
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};

export default CateogoryForm;
