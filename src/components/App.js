import React from 'react'
import {Layout, Header} from 'react-mdl'
import styled from 'styled-components'
import IWantBeer from './IWantBeer'
import logo from '../logo.svg'
import '../style/App.css'

const AppWrapper = styled(Layout)`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const AppHeader = styled(Header)`
  color: white;
`


export default () =>
  <AppWrapper>
    <AppHeader title='Hello'>
      
    </AppHeader>
    <IWantBeer />
  </AppWrapper>








