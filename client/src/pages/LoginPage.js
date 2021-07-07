import React, { useState } from 'react'
import { Form, Page, PageContainer } from '../common'
import Login from "../components/User/Login"

const LoginPage = () => {

    return (
        <Page>
            <PageContainer>
                <Login />
            </PageContainer>
        </Page>
    )
}

export default LoginPage