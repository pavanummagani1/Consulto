import React, { useState } from 'react';
import { Table as AntTable, Input } from 'antd';

const Table = ({ columns = [], dataset = [] }) => {
    const [searchText, setSearchText] = useState('');
    const antColumns = columns.map(col => ({
        title: col,
        dataIndex: col,
        key: col,
        align: 'center',
        render: (text) => text || 'N/A',
    }));

    const filteredData = dataset.filter((record) =>
        columns.some((col) =>
            String(record[col]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: 300 }}
            />
            <AntTable
                columns={antColumns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                rowKey="id"
                bordered
            />
        </div>
    );
};

export default Table;
