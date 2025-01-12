import styled from "styled-components";


const Chat = () => {
    return (
        <Container>
            <div className="container">

            </div>

        </Container>
    );
};

const Container = styled.div`
height: 100vh;
width: 100vw;
justify-content: flex;
justify-items: center;
align-items: center;
background-color: #131324;
.container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:750px) and (max-width : 1080px){
        grid-template-columns: 35% 65%;
    }
}
`

export default Chat;