import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfos } from '../../redux/actions/userActions.jsx';
import './user.css';

function User() {
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    const [display, setDisplay] = useState(true);
    const [formData, setFormData] = useState({
        firstName: userData.firstname,
        lastName: userData.lastname,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmitUsername = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch(updateUserInfos(formData));
                setDisplay(!display);
            } else {
                console.log("Invalid Fields");
                setErrorMessage("Invalid Fields");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            setErrorMessage("Error updating user info");
        }
    };

    const renderWelcomeMessage = () => (
        <div>
            <h2>Welcome back 
                <br />
                {userData.firstname} {userData.lastname} !
            </h2>
            <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
        </div>
    );

    const renderEditForm = () => (
        <div>
            <h2>Welcome back</h2>
            <form>
                <div className="inputs">
                    <input
                        type="text"
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                
                
                    <input
                        type="text"
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="buttons">
                    <button className="edit-button" onClick={handleSubmitUsername}>Save</button>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Cancel</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );

    return (
        <div className="header">
            { display ? renderWelcomeMessage() : renderEditForm() }
        </div>
    );
}

export default User;
