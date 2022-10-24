import styled from 'styled-components'


export const BackContainer = styled.div`
    position: absolute;
    display: flex;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    background-color: white;
    padding: 10px;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
    a {
        text-decoration: none; 
        display: flex;
        color: black; 
    }
    a:visited { 
        text-decoration: none; 
        color: black; 
    }
    a:focus { 
        text-decoration: none; 
        color:black; 
    }
    a:active { 
        text-decoration: none; 
        color:teal; 
    }
`