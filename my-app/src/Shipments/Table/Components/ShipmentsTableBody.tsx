import { Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IShipmentsTableBodyProps {
    rows: Array<Row<{}>>;
    prepareRow: (row: Row<{}>) => void;
    getTableProps: (propGetter?: TablePropGetter<{}>) => TableProps;
    getTableBodyProps: (propGetter?: TableBodyPropGetter<{}>) => TableBodyProps;
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

    return (
        <div className={'table-body'} {...props.getTableBodyProps()}>
            <InfiniteScroll
                dataLength={props.totalRowsCount}
                next={props.getRows}
                hasMore={true}
                height={700}
                loader={<></>}>
                {props.rows.map((row, i) => {
                    props.prepareRow(row)
                    return (
                        <div onMouseEnter={() => { props.setActiveRow(row.values.id) }} onMouseLeave={() => { props.setActiveRow(null) }} className={'tr'} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <div className={`td row-${cell.column.id}`} {...cell.getCellProps()}>{cell.render('Cell')}</div>
                            })}
                        </div>
                    )
                })}
            </InfiniteScroll>
        </div>
    );
}