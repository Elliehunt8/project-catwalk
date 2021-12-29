import React, { useState, useEffect } from 'react';


let ReviewStars = ({review, scrapeReview, starIndex}) => {


  let star5 = document.getElementById(`5star${starIndex}`);
  let star4 = document.getElementById(`4star${starIndex}`);
  let star3 = document.getElementById(`3star${starIndex}`);
  let star2 = document.getElementById(`2star${starIndex}`);
  let star1 = document.getElementById(`1star${starIndex}`);

  let fillStars = () => {
    // console.log('THIS RAN FILLSTARS');
    star5.classList.remove('reviewStarsFill');
    star4.classList.remove('reviewStarsFill');
    star3.classList.remove('reviewStarsFill');
    star2.classList.remove('reviewStarsFill');
    star1.classList.remove('reviewStarsFill');
    if (review.rating === 5) {
      star5.classList.add('reviewStarsFill');
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (review.rating === 4) {
      star4.classList.add('reviewStarsFill');
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (review.rating === 3) {
      star3.classList.add('reviewStarsFill');
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (review.rating === 2) {
      star2.classList.add('reviewStarsFill');
      star1.classList.add('reviewStarsFill');
    } else if (review.rating === 1) {
      star1.classList.add('reviewStarsFill');
    }
  };


  let setStars = () => {
    if (!scrapeReview) {
      return;
    } else {
      fillStars();
    }
  };

  useEffect(() => {
    setStars();
  }, [review, scrapeReview]);

  return (

    <div className="reviewStarsContainer">
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`1star${starIndex}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`2star${starIndex}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`3star${starIndex}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`4star${starIndex}`} className="fas fa-star"></i>
        </div>
      </div>
      <div className="reviewInlineBlock">
        <div className="reviewStars">
          <i className="fas fa-star reviewStarsNoFill"></i>
          <i id={`5star${starIndex}`} className="fas fa-star"></i>
        </div>
      </div>
    </div>

  );


};



export default ReviewStars;