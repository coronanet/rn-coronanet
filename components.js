import React , {forwardRef} from 'react'
import styled from 'styled-components/native'


import {
    space,
    layout,
    typography,
    color,
    flexbox,
    border,
    shadow
} from 'styled-system'

import { 
    Dimensions, 
    View, 
    Image, 
    SafeAreaView, 
    ScrollView,
    Button as _Button
} from 'react-native';

export const Box = styled.View`
    ${space};
    ${layout};
    ${color};
    ${flexbox};
    ${border};
    ${shadow};
    ${props => props.flex && `flex: ${props.flex}`}
`

export const Text = styled.Text`
    ${typography};
    ${color};
    ${layout};
    ${shadow};
`
export const Heading = props => (
    <Text
        {...props}
        fontSize = {4}
        fontFamily='heading'
        fontWeight='heading'
        lineHeight='heading'
    >

    </Text>
)
export const Flex = props => (
    <Box
        {...props}
        flex={1}
    >

    </Box>

)
export const Button = props => (
    <Box
        {...props}
    >
        <_Button {...props}/>
    </Box>
)

