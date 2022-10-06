
import { useTable, Column } from 'react-table';
import {ShipmentsTableSearch} from './Components/ShipmentsTableSearch';
import {ShipmentsTableHeader} from './Components/ShipmentsTableHeader';
import {ShipmentsTableBody} from './Components/ShipmentsTableBody';
import { IShipmentViewModel } from './../ShipmentsView';
import styled from 'styled-components';

const TableContainer = styled.div`
    font-size: 12px;
    margin-top: 20px;
    background: white;
    width: 100%;
    border-radius: 10px;
    border-collapse: collapse;

    .row-checkbox,
    .header-checkbox {
        min-width: 40px;
        width: 40px;
    }

    .row-sendDateTime,
    .header-sendDateTime {
        min-width: 130px;
        width: 130px;
    }

    .row-serviceWithPackageInfo,
    .row-sender,
    .row-receiver,
    .row-packageDimensions,
    .header-serviceWithPackageInfo,
    .header-sender,
    .header-receiver,
    .header-packageDimensions {
        flex: 1 0;
        min-width: 150px;
    }

    .row-serviceWithPackageInfo {
        :hover + .button {
            display: inline-block;
        }
    }

    .table-header {       
        text-align: left;
        color: gray;

        .tr {
            display: flex;
            align-items: center;
            height: 50px;           
            border-bottom: 1px solid rgb(215, 219, 221);
        }      
    }

    .table-body {
        .tr {
            display: flex;
            height: 60px;

            :not(:last-child) {
                border-bottom: 1px solid rgb(227, 227, 234);
            }
        }
    }
`

export interface ISearchData {
    searchText: string;
    onSearchTextChange: (searchText: string) => void;
}

export interface ITableData {
    columns: Array<Column>,
    data: Array<IShipmentViewModel>,
    totalDataCount: number;
}

export interface IShipmentsTableProps {
    searchData: ISearchData;
    tableData: ITableData;
    events: ITableEvents
}

export interface ITableEvents {
    setActiveRow: (rowId: number | null) => void;
    getData: () => void;
}

export function ShipmentsTable(props: IShipmentsTableProps) {   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
    } = useTable(
        {
            columns: props.tableData.columns,
            data: props.tableData.data,
            initialState: {
                hiddenColumns: [ 'id' ]
            },            
        }
    )

    return (
        <>
            <ShipmentsTableSearch
                searchText={props.searchData.searchText}
                onSearchTextChange={props.searchData.onSearchTextChange} />

            <TableContainer>
                <div {...getTableProps()} className={'table'}>
                    <ShipmentsTableHeader headerGroups={headerGroups}/>
                    <ShipmentsTableBody
                        rows={rows}
                        getTableBodyProps={getTableBodyProps}
                        prepareRow={prepareRow}
                        getTableProps={getTableProps}
                        totalColumnsWidth={totalColumnsWidth}
                        totalRowsCount={props.tableData.totalDataCount}
                        getRows={props.events.getData}
                        setActiveRow={props.events.setActiveRow} />
                </div>
            </TableContainer>
        </>
    );
}