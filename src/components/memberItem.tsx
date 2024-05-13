"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export type MemberItemParams = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

type MemberItemProps = MemberItemParams & { maskEmail: (email: string) => Promise<string> };

export function MemberItem({ id, email, first_name, last_name, avatar, maskEmail }: MemberItemProps) {
    const [masked, setMasked] = useState(true);
    const [maskedEmail, setMaskedEmail] = useState('');

    useEffect(() => {
        const updateMaskedEmail = async () => {
            if (masked) {
                const maskedEmail = await maskEmail(email);
                setMaskedEmail(maskedEmail);
            } else {
                setMaskedEmail(email);
            }
        };

        updateMaskedEmail();
    }, [masked, email, maskEmail]);

    const handleToggleMask = () => {
        setMasked(!masked);
    };

    return (
        <li className='flex-none sm:flex flex-row mb-4'>
            <div className='m-1'>
                <img src={avatar} alt={first_name} />
            </div>
            <div className='m-1'>
                <p>Name: {first_name} {last_name}</p>
                <p>Email: {maskedEmail}</p>
                <button onClick={handleToggleMask}>{masked ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
            </div>
        </li>
    );
}