import React from 'react';
import {Modal, Button} from '@material-ui/core';

const popOut = (props) => {

    return(
        <Modal
            open={props.open}
            onClose={props.close}
            style={{
                border: "none"
            }}
        >
            <div style={{
                position: "relative",
                width: "30vw",
                height: "30vh",
                margin: "0 auto",
                top: "25%",
                backgroundColor: "rgba(255,255,255)",
                textAlign: "center"
            }}>
                <div id="simple-modal-description" style={{
                    padding: "10px"
                }}>
                <h2>{props.message}</h2>
                <Button variant="contained" color="primary" onClick={props.close}>Ok</Button>
            </div>
          </div>
        </Modal>
    )                   
}


export default popOut;