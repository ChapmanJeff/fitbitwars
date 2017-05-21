import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 8px;
  margin: 20px;
  width: 200px;
  font-family: Oswald;
  letter-spacing: 2px;
  font-size: 25px;
  background: linear-gradient(#35a7ff, #38618C)
  color: white;
  box-shadow: 2px 2px 5px black;
  cursor: pointer;
`

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
    & input {
      display:none;
    }
`

export const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
`

export const InputSwitch = styled.input`
    &:checked + div {
      background-color: #35a7ff;
    }
    &:focused + div {
      box-shadow: 0 0 1px #35a7ff;
    }
    &:checked + div:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
`
