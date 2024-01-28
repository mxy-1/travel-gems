"use client"
import { useState } from 'react';
import style from './reviews.module.css';
import { deleteReview, handleVoting } from '@/lib/action';

const ReviewsCard = ({ review , userID , username, user }) => {

  const [voted, setVoted] = useState(false);
  const [updatedVotes, setUpdatedVotes] = useState(review.votes);

  const reviewId = review._id
  const locationId = review.location_id

  const handleVote = async () => {
    try {
      if (!user) {
        setVoteMessage("Please login to vote.");
        return;
      }

      if (!voted) {
        const updatedReview = await handleVoting(review._id);
        setVoted(true);
        setUpdatedVotes(updatedReview.votes);
      }
    } catch (error) {
      console.error('Error voting for review:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const successfulDelete = await deleteReview({ reviewId, locationId });
      window.location.reload();
    } catch {
      console.log("error deleting- see ReviewsCard");
    }
  };

  const [voteMessage, setVoteMessage] = useState(null);

  return (
    <section className="card bg-base-100 shadow-xl my-10 lg:w-5/6 lg:mx-auto" key={review._id.toString()}>

      <div className="card-body rounded-lg bg-indigo-400">

      <div className="stats shadow bg-indigo-300">
  
        <div className="stat place-content-center px-1 lg:px-4">
          <div className="stat-value text-xs lg:text-base ">{review.username}</div>
        </div>
        <div className="stat px-1">
          <div className="stat-title text-xs lg:text-base">rating out of 5</div>
          <div className="stat-value text-xs lg:text-base">{review.rating}</div>
        </div>
        <div className="stat px-1">
          <div className="stat-title text-xs lg:text-base">posted at</div>
          <div suppressHydrationWarning={true} className="stat-value text-xs lg:text-base">{review.createdAt ? review.createdAt.toLocaleDateString() : "04/01/2024"}</div>
        </div>
        <div className="stat px-1">
          <div className="stat-title text-xs lg:text-base">votes</div>
          <div className="stat-value text-xs lg:text-base">{updatedVotes}</div>
        </div>
        
      </div>

        <p className="text-sm text-gray-800 bg-white bg-opacity-75 p-4 rounded-lg">{review.body}</p>

        <div className='flex'>
          <button onClick={handleVote} disabled={voted} className={style.button}>
            {voted ? 'Voted!' : 'Like'}
          </button>
          {voteMessage && <p  className={style.login}>{voteMessage}</p>}

          {review.user_id === userID ? (
            <button onClick={handleDelete} className={style.button}>
              Delete
            </button>
          ) : null}
          </div>
        </div>
        

    </section>
  );
};

export default ReviewsCard;