import React, { useState } from 'react';

const RatingStar = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);



    const handleClick = (ratingValue) => {
        setRating(ratingValue);

    };

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index} >
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleClick(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <svg
                            className="star"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                            fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
                        </svg>
                    </label>
                );
            })}
        </div>
    );
};

export default RatingStar;
