import React, { useState } from 'react'
import { Form, Page, PageContainer } from '../common'
import Signup from "../components/User/Signup"

const SignupPage = () => {

    return (
        <Page>
            <PageContainer>
                <Signup />
            </PageContainer>
        </Page>
    )
}

export default SignupPage