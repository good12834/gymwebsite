import React from 'react';
import { useLocation } from 'react-router-dom';

function SignupPage() {
    const { state } = useLocation();
    const plan = state?.plan || "No plan selected";
    return (
        <div>
            <h2>Sign Up for {plan}</h2>
            {/* Add signup form here */}
        </div>
    );
}
export default SignupPage;