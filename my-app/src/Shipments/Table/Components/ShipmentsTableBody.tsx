import { useCallback, useState } from "react";
import { Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IShipmentsTableBodyProps {
    rows: Array<Row<any>>;
    prepareRow: (row: Row<any>) => void;
    getTableProps: (propGetter?: TablePropGetter<any>) => TableProps;
    getTableBodyProps: (propGetter?: TableBodyPropGetter<any>) => TableBodyProps;
    totalColumnsWidth: number;
    totalRowsCount: number;
    getRows: () => void;
    setActiveRow: (rowId: number | null) => void;
}

export function ShipmentsTableBody(props: IShipmentsTableBodyProps) {
    //const [bodyHeight, setBodyHeight] = useState<number>(0);

    // useEffect(() => {
    //     const scrollContainerWithMargins: number = 200; 
        
    //     const handleResize = () => {
    //         const bodyHeight: number = window.innerHeight - scrollContainerWithMargins;
    //         setBodyHeight(bodyHeight);
    //     }

    //     window.addEventListener('resize', handleResize, false);
    //     handleResize();

    //     return () => window.removeEventListener('resize', handleResize, false);
    // }, []);

    const renderRows = useCallback(
        () => props.rows.map((row, i) => {
            props.prepareRow(row)
            return (
                <div onMouseEnter={() => { props.setActiveRow(row.values.id)}} onMouseLeave={() => { props.setActiveRow(null)}} className={'tr'} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <div className={`td row-${cell.column.id}`} {...cell.getCellProps()}>{cell.render('Cell')}</div>
                    })}
                </div>
            )
        }),
        [props.prepareRow, props.rows, props.setActiveRow]
    )

    return (
        <div className={'table-body'} {...props.getTableBodyProps()}>
            <InfiniteScroll
                dataLength={props.totalRowsCount}
                next={props.getRows}                
                hasMore={true}
                height={760}
                loader={<></>}>
                <div>
                    {renderRows()}
                </div>
            </InfiniteScroll>
        </div>
    );
}