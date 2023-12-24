import { Button } from "@mui/material";


type props = { onDelete: () => void, close?: any };

const DeleteAlert = ({ onDelete, close }: props) => {
    return (
        <div className="bg-white p-5">
            <div className="row">
                <div className="col-12">
                    <div className="fw-bold">Are you sure, you want to delete?</div>
                </div>
            </div>
            <div className="row mt-5">

                <div className="col-6 text-center">
                    <Button variant="contained"  size="small" onClick={close} >
                        <div>Cancel</div>
                    </Button>
                </div>
                <div className="col-6 text-center">
                    <Button variant="contained" size="small" style={{backgroundColor:'#d32f2f'}} onClick={() => { onDelete(); close(); }} >
                        <div>Ok</div>
                    </Button>
                </div>
            </div>
        </div>);
}

export default DeleteAlert;