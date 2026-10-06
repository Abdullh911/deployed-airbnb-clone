import React from 'react';
import { useRecoilState } from 'recoil';
import './Switch.css';
import { checkboxState } from '../../StateMangement/State';

const Switch = () => {
    const [isChecked, setIsChecked] = useRecoilState(checkboxState);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return ( 
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span className="slider">
                    <svg
                        className="slider-icon"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                    >
                        <path fill="none" d="m4 16.5 8 8 16-16"></path>
                    </svg> 
                </span>
            </label>
        </div>
    );
};

export default Switch;
