import { HeaderGroup } from "react-table";

export interface ITableHeaderProps {
    headerGroups: Array<HeaderGroup<any>>;
}

export function ShipmentsTableHeader(props: ITableHeaderProps) {
    return (
        <div className={'table-header'}>
            {props.headerGroups.map(headerGroup => (
                <div {...headerGroup.getHeaderGroupProps()} className={'tr'}>
                    {headerGroup.headers.map(column => (
                        <div className={`th header-${column.id}`} {...column.getHeaderProps()}>{column.render('Header')}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}