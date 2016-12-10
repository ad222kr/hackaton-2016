import React from 'react'
import {Layout, Header} from 'react-mdl'
import styled from 'styled-components'
import IWantBeer from './IWantBeer'
import logo from '../logo.svg'
import '../style/App.css'
import pic from '../style/beerrun_dribbble.gif'

const AppWrapper = styled(Layout)`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const AppHeader = styled(Header)`
  color: white;
`


export default () =>
  <AppWrapper fixedHeader>
    <AppHeader title='Hinner jag till systemet?'>
    </AppHeader>
    <IWantBeer />
    <div id='map'></div>
    <div className="image">
      </div>
  </AppWrapper>
