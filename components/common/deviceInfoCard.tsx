import {ComputerOutlined} from '@mui/icons-material';
import styles from './deviceInfoCard.module.css'

type DeviceInfoCardProps = { color: any; count?: number; title?: string; icon?: string; };
export const DeviceInfoCard = (props: DeviceInfoCardProps) => {
    return (
        <div className={styles.deviceInfoCard} style={{color: props.color}}>
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