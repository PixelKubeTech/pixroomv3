import {ComputerOutlined} from '@mui/icons-material';

type DeviceInfoCardProps = { color: any; count?: number; title?: string; icon?: string; };
export const DeviceInfoCard = (props: DeviceInfoCardProps) => {
    return (
        <div className="border border-solid border-[#c7cdd2] min-w-[150px] w-[calc(25%-.75rem)] flex justify-between p-[18px] rounded-md items-center" style={{color: props.color}}>
            <div>
                <div className='font-bold text-2xl'>{props.count}</div>
                <div className='font-semibold text-xs'>{props.title}</div>
            </div>
            <div>
                <ComputerOutlined color={props.color}/>
            </div>
        </div>
    )
}