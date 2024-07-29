import React from 'react';

const PageSizeSelector = () => {
    const handlePageSizeChange = (event) => {
        const selectedPageSize = event.target.value;
    };

    return (
        <div>
            <select id="page-size-select" onChange={handlePageSizeChange} value="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    );
};

export default PageSizeSelector;






