import styled from 'styled-components';

const InputContainer = styled.div`
    padding: 20px;
    background: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const Input = styled.input`
    width: 400px;
    height: 25px;
    border: 1px solid gray;
`;

export interface IShipmentsTableSearchProps {
    searchText: string;
    onSearchTextChange: (searchText: string) => void;
}

export function ShipmentsTableSearch(props: IShipmentsTableSearchProps) {
    return (
        <InputContainer>
            <Input
                type={'text'}
                onChange={(e) => props.onSearchTextChange(e.target.value)}
                placeholder='Wpisz number lub dane przesyłki' />
        </InputContainer>
    );
}