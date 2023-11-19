import React from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import styles from '../commons/styles/my-styles.css';

import ClientNavBar from '../navbars/clientNavbar';

import BackgroundImg from '../commons/images/sage-green.jpg';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = { color: 'black' };

function ClientHome() {
    return (
        <div>
            <Jumbotron style={backgroundStyle}>
                <Container >
                    <h1 className={styles.title} style={textStyle}>Integrated Energy Management System</h1>
                    <h1 className={styles.title} style={textStyle}>Client Platform</h1>
                    <hr color='black'/>
                    <p className="lead">
                        <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn more</Button>
                    </p>
                </Container>
            </Jumbotron>
        </div>
    );
}


export default ClientHome;