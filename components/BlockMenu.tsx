type props = { heading: string, subHeading: string, icon: any, onClick?: any };

const BlockMenu: React.FC<props> = (props) => {

    function handleClickEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (props.onClick != null)
            props.onClick(e);
    };

    return (
        <div className='pk_block_menu text-center p-4' onClick={(e) => handleClickEvent(e)}>
            <div className="flex justify-center" >
                <props.icon sx={{ fontSize: 40, color: "#1a8ef1" }}></props.icon>
            </div>
            <div className="fw-bold pk_text_primary" >
                {props.heading}
            </div>
            <div className="text-black-50 small">
                {props.subHeading}
            </div>
        </div>
    );
}

export default BlockMenu;