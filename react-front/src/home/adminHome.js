import React from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import styles from '../commons/styles/my-styles.css';

import AdminNavBar from '../navbars/adminNavbar';

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

function AdminHome() {
    return (
        <div>
            <Jumbotron style={backgroundStyle}>
                <Container >
                    <h1 className={styles.title} style={textStyle}>Integrated Energy Management System</h1>
                    <h1 className={styles.title} style={textStyle}>Administrator Platform</h1>
                    <hr color='black'/>
                    <p className="lead">
                        <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn more</Button>
                    </p>
                </Container>
            </Jumbotron>
        </div>
    );
}


export default AdminHome;