import { ServiceType } from "./Services/ShipmentService";
import { IShipment, IShipmentViewModel } from "./ShipmentsView";

export function mapShipmentsToViewModel(shipments: IShipment[]): IShipmentViewModel[] {
    return shipments.map(x => { 
        let dateTimeSplitted = x.datetime_send.split(' ');
        
        let shipmentView: IShipmentViewModel = {
            id: x.id,
            isChecked: false,
            serviceWithPackageInfo: {
                service: ServiceType[x.service as keyof typeof ServiceType],
                packageNo: x.parcels.package_no
            },
            sendDateTime: {
                date: dateTimeSplitted[0],
                time: dateTimeSplitted[1]
            },
            sender: `${x.sender.name} ${x.sender.surname}`,
            receiver: `${x.receiver.name} ${x.receiver.surname}`,
            packageDimensions: `${x.parcels.weight}kg (${x.parcels.width} x ${x.parcels.height} x ${x.parcels.depth}cm)`
        }
        
        return shipmentView;
    })
}