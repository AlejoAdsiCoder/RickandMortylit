import {css} from 'lit';

export const detailstyles = css`
:host {
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-between;
    gap: 30px;
}
.character {
    display: flex;
    flex-direction: column;
    padding: 18px;
    background: white;
    border-radius: 10px;
}
.character__title { 
    color: #000;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 700;
}
.character__description {
    text-align: center;
    margin-top: 12px;
    font-family: sans-serif;
}
.
`