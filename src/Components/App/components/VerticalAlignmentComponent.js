import React, { useState } from 'react';

const VerticalAlignmentComponent = ({ onAlignmentChange,onCrop }) => {
    const [alignment, setAlignment] = useState(onCrop === 1 ? 'left' : 'top');

    const handleAlignmentChange = (event) => {
        const newAlignment = event.target.value;
        setAlignment(newAlignment);
        onAlignmentChange(newAlignment); // Notify the parent component
    };

    return (
        <div className="container">
            <p>The image is too {onCrop === -1 ? 'tall' : 'wide'} please select which part of the image you want.</p>
            {onCrop !== 1 && <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="alignment"
                    id="top"
                    value="top"
                    checked={alignment === 'top'}
                    onChange={handleAlignmentChange}
                />
                <label className="form-check-label" htmlFor="top">
                    Top
                </label>
            </div>}
            {onCrop !== -1 && <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="alignment"
                    id="left"
                    value="left"
                    checked={alignment === 'left'}
                    onChange={handleAlignmentChange}
                />
                <label className="form-check-label" htmlFor="left">
                    Left
                </label>
            </div>}

            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="alignment"
                    id="center"
                    value="center"
                    checked={alignment === 'center'}
                    onChange={handleAlignmentChange}
                />
                <label className="form-check-label" htmlFor="center">
                    Center
                </label>
            </div>

            {onCrop !== 1 && <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="alignment"
                    id="bottom"
                    value="bottom"
                    checked={alignment === 'bottom'}
                    onChange={handleAlignmentChange}
                />
                <label className="form-check-label" htmlFor="bottom">
                    Bottom
                </label>
            </div>}
            {onCrop !== -1 && <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="alignment"
                    id="right"
                    value="right"
                    checked={alignment === 'right'}
                    onChange={handleAlignmentChange}
                />
                <label className="form-check-label" htmlFor="right">
                    Right
                </label>
            </div>}
        </div>
    );
};

export default VerticalAlignmentComponent;