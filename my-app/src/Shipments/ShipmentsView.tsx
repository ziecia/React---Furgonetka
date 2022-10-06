import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { ServiceType } from './Services/ShipmentService';
import { mapShipmentsToViewModel } from './ShipmentsViewHelper';
import { ShipmentsTable } from './Table/ShipmentsTable';
import { getTableColumns, filterTableData } from './Table/ShipmentsTableHelper';

const ShipmentsViewLayout = styled.div`
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    background: rgb(236, 244, 248);
    padding: 10px;
`
interface IParcel {
    package_no: string,
    weight: number,
    width: number,
    height: number,
    depth: number
}

interface IPerson {
    name: string,
    surname: string
}

export interface IDateTimeSend {
    date: string,
    time: string
}

export interface IServiceWithPackageInfo {
    service: ServiceType;
    packageNo: string;
}

export interface IShipment {
    id: number,   
    service: string;
    datetime_send: string;
    sender: IPerson;
    receiver: IPerson;
    parcels: IParcel;
}

export interface IShipmentViewModel {
    id: number,
    isChecked: boolean;
    sendDateTime: IDateTimeSend;
    receiver: string;
    sender: string
    serviceWithPackageInfo: IServiceWithPackageInfo
    packageDimensions: string;
}

export function ShipmentsView() {
    const [shipments, setShipments] = useState<IShipmentViewModel[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [dataPageNumber, setDataPageNumber] = useState<number>(0);
    const [activeRowNumber, setActiveRowNumber] = useState<number | null>(null);

    const fetchMoreShipments = useCallback(() => {
        let newDataPage: number = dataPageNumber + 1;

        const fetchData = async () => {
            const data = await fetch(`https://test.furgonetka.pl/example-integration/packages?page=${newDataPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'C638833F69BBFB3C267AFA0A74434812436B8F08A81FD263C6BE6871DE4F1265',
                }
            });

            return await data.json();
        }

        fetchData().then(x => {
            const newShipments = mapShipmentsToViewModel(x);
            setShipments(shipments.concat(newShipments));
            setDataPageNumber(newDataPage);

        });
    }, [dataPageNumber]);

    const setActiveRow = useCallback((rowId: number | null) => {
        setActiveRowNumber(rowId);
    }, []);

    useEffect(() => {
        fetchMoreShipments();
    }, []);

    const columns = useMemo(() => getTableColumns(searchText, activeRowNumber), [searchText, activeRowNumber]); 
    const data = useMemo(() => filterTableData(shipments, searchText), [shipments, searchText]);
   
    return (
        <ShipmentsViewLayout>
            <ShipmentsTable
                tableData={{
                    columns: columns,
                    data: data,
                    totalDataCount: shipments.length,                  
                }}
                searchData={{
                    searchText: searchText,
                    onSearchTextChange: setSearchText
                }}
                events={{
                    getData: fetchMoreShipments,
                    setActiveRow: setActiveRow
                }}
                />
        </ShipmentsViewLayout>
    );
}