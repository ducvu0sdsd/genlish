'use client'
import { authContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

const Learn = () => {

    const { authData } = useContext(authContext)

    return (
        <div>{authData.user + ''}</div>
    )
}

export default Learn