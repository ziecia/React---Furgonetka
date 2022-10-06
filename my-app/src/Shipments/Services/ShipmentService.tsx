import styled from 'styled-components';

const ShipmentServiceElement = styled.button`
    border-radius: 4px;
    height: 17px;
    font-size: 10px;
    border: none;

    &.poczta {
        background: red;
        color: yellow;
    }

    &.ups {
        background: rgb(105,49,32);
        color: rgb(178,134,27);
    }

    &.dpd {
        background: rgb(230,28,74);
        color: white;
    }

    &.fedex {
        background: rgb(80, 0, 135);
        color: white;
    }

    &.inpost {
        background: rgb(240,201,36);
        color: rgb(61,61,62);
    }

    &.dhl {
        background: rgb(239,202,34);
        color: rgb(201,28,43);
    }
`;

export enum ServiceType {
    poczta,
    ups,
    dpd,
    fedex,
    inpost,
    dhl
}

export interface IShipmentServiceProps {
    serviceType: ServiceType;
}

export function ShipmentService(props: IShipmentServiceProps) {
    return (
        <ShipmentServiceElement className={`${ServiceType[props.serviceType]}`}>
            {ServiceType[props.serviceType].toUpperCase()}
        </ShipmentServiceElement>
    );
}
