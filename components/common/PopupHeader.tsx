import CloseIcon from '@mui/icons-material/Close';
type popupHeaderProps = { title: string, subHeading?: string, align: string, close?: any, };

const PopupHeader: React.FC<popupHeaderProps> = (props) => {
    return (
        <div className="row">
            <div className="col-12 text-{props.align}">
                <h6 className="fw-bold mb-0">
                    {props.title}
                    <div className="float-end mt-2" onClick={props.close}>
                        <CloseIcon style={{ color: 'grey' }}></CloseIcon>
                    </div>
                </h6>
                <p className="text-black-50 small">
                    {props.subHeading}
                </p>
            </div>
        </div>
    );
}

export default PopupHeader;
