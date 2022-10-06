import { IServiceWithPackageInfo, IShipmentViewModel } from '../ShipmentsView';
import { Column } from 'react-table';
import styled from 'styled-components';
import Highlighter from "react-highlight-words";
import { IDateTimeSend } from '../ShipmentsView'
import { ShipmentService } from '../Services/ShipmentService';

const DateTimeContainer = styled.div`
    width: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CheckboxContainer = styled.div`
    margin-top: 7px;
    margin-left: 10px;
`;

const BoldElement = styled.div`
    font-weight: bold;
`;

const PackageNumberElement = styled.div`
    margin-right: 5px;
`
const PackageNumberWithShipmentServiceElement = styled.div`
    display: flex;
`

const CopyButton = styled.button`
    margin-top: 3px;
    font-size: 10px;
    color: 
`

const copyToClipboard = (text: string) => {    
    navigator.clipboard.writeText(text).then(() => alert(`Numer paczki ${text} został skopiowany do schowka`));
}

const renderSenderContent = (value: string, searchText: string): JSX.Element => {
    return (
        <BoldElement>
            {renderHighlighter(value, searchText)}
        </BoldElement>
    );
}

const renderCheckboxContent = (): JSX.Element => {
    return (
        <CheckboxContainer>
            <input type={'checkbox'} />
        </CheckboxContainer>
    );
}

const renderSendDateTimeContent = (value: IDateTimeSend): JSX.Element => {
    return (
        <div>
            <DateTimeContainer>
                <BoldElement>
                    {value.date}
                </BoldElement>
                <div>
                    {value.time}
                </div>
            </DateTimeContainer>
        </div>
    );
}

const renderHighlighter = (value: string, searchText: string): JSX.Element => {
    return (
        <Highlighter
            searchWords={[searchText]}
            autoEscape={true}
            textToHighlight={value}
        />
    );
}

const renderReceiverContent = (value: string, searchText: string): JSX.Element => {
    return (
        <BoldElement>
            {renderHighlighter(value, searchText)}
        </BoldElement>
    );
}

const renderPackageNumberWithShipmentService = (value: IServiceWithPackageInfo, searchText: string, displayCopyButton: boolean) => {
    return (
        <>
            <PackageNumberWithShipmentServiceElement>
                <PackageNumberElement>
                    <BoldElement>
                        {renderHighlighter(value.packageNo, searchText)}
                    </BoldElement>
                </PackageNumberElement>
                <ShipmentService serviceType={value.service} />
            </PackageNumberWithShipmentServiceElement>
            {
                displayCopyButton && <CopyButton onClick={() => copyToClipboard(value.packageNo)}>
                    {'Kopiuj numer przesyłki'}
                </CopyButton>
            }
        </>
    );
}

export function getTableColumns(searchText: string, activeRowNumber: number | null): Array<Column> {
    return [
        { Header: 'id', accessor: 'id' },
        { Header: '', accessor: 'isChecked', Cell: renderCheckboxContent, id: 'checkbox' },
        { Header: 'Zamówione', accessor: 'sendDateTime', Cell: (props) => { return renderSendDateTimeContent(props.cell.value as IDateTimeSend) }},
        { Header: 'Przesyłka', accessor: 'serviceWithPackageInfo', Cell: (props) => { return renderPackageNumberWithShipmentService(props.cell.value as IServiceWithPackageInfo, searchText, activeRowNumber === props.cell.row.values.id) }},       
        { Header: 'Nadawca', accessor: 'sender', Cell: (props) => { return renderSenderContent(props.cell.value, searchText) }},
        { Header: 'Odbiorca', accessor: 'receiver', Cell: (props) => { return renderReceiverContent(props.cell.value, searchText) }},
        { Header: 'Przesyłka', accessor: 'packageDimensions'},
    ];
}

export function filterTableData(shipments: IShipmentViewModel[], searchText: string): Array<IShipmentViewModel> {
    let regex = new RegExp(searchText, "i");

    return shipments
        .filter(x => regex.test(x.sender) || regex.test(x.receiver) || regex.test(x.serviceWithPackageInfo.packageNo));
}