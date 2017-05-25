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

// *** Next 3:Switch, Slider and InputSwitch are used together and cannot be used independently. They create the slider checkbox input used in modals ***//
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
  margin:0;
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
//******** Above 3 must be used together and not independently ***** //

export const Icon  = styled.img`
  height: 50px;
  width: 50px;
`
export const SmallerIcon = styled(Icon)`
  height: 35px;
  width: 35px;
`

export const AmountInput = styled.input`
  height: 25px;
  width: 100%;
  margin-top: 5px;
`

export const Banner = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top ;
  background-image: url('./app/images/Portrait.jpg');
  height:10%;
  align-items: center;
  border-bottom:1px solid #cbc9cf;
`
export const BannerTop = styled(Banner)`
  background-image: none;
  background: linear-gradient(to right,#202229, #38618C 130%);
`

export const MainContainerWhite = styled.section`
  height: 100%;
  width: 100%;
  background-color: white;
  overflow: hidden;
`
