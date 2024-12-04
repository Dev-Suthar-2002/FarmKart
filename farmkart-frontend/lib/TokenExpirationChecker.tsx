'use client';

import { useEffect } from 'react';
import useTokenExpiration from './TokenExpiration';

const TokenExpirationChecker = () => {
    useTokenExpiration();

    return null;
};

export default TokenExpirationChecker;
