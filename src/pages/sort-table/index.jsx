import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { NumericFormat } from 'react-number-format';
import useGetQuery from '@/hooks/api/useGetQuery'; // Adjust the path as per your project structure
import { URLS } from '@/constants/url'; // Adjust the path as per your project structure
import { KEYS } from '@/constants/key'; // Adjust the path as per your project structure

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: stock, isLoading: isLoadingStock } = useGetQuery({
        key: KEYS.apiBirja,
        url: URLS.apiBirja,
    });

    useEffect(() => {
        if (get(stock, "data", [])) {
            setData(get(stock, "data", []));
        }
    }, [get(stock, "data", [])]);

    const sortData = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((stockItem) => {
        return (
            get(stockItem, 'name', '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            get(stockItem, 'rn', '').toString().includes(searchQuery) ||
            get(stockItem, 'price', '').toString().includes(searchQuery) ||
            get(stockItem, 'range', '').toString().includes(searchQuery)
        );
    });

    if (isLoadingStock) {
        return <div>Loading...</div>; // Placeholder for loading indicator
    }

    return (
        <div>
            <h2>Product List</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="border px-2 py-1 mb-4"
            />
            <button onClick={sortData}>{sortOrder === 'asc' ? '▲' : '▼'}</button>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 uppercase font-semibold text-sm">
                        №
                    </th>
                    <th className="px-4 py-2 text-start bg-gray-200 text-gray-600 uppercase font-semibold text-sm">
                        Mahsulot nomi
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 uppercase font-semibold text-sm">
                        Narxi{' '}
                        <button onClick={sortData}>
                            {sortOrder === 'asc' ? '▲' : '▼'}
                        </button>
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 uppercase font-semibold text-sm">
                        Narxlar orasidagi o'zgarish
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((stockItem, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'even:bg-white' : 'odd:bg-[#E2E6ED]'}>
                        <td className="border px-4 py-2 text-center">{get(stockItem, 'rn')}</td>
                        <td className="border px-4 py-2">{get(stockItem, 'name')}</td>
                        <td className="border px-4 py-2 text-center">
                            <NumericFormat
                                className="bg-transparent"
                                value={get(stockItem, 'price').toFixed(2)}
                                thousandSeparator=" "
                                suffix=" so'm"
                            />
                        </td>
                        <td className="border px-4 py-2">{get(stockItem, 'range')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
