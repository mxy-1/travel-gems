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
    <section className={style.reviewCard} key={review._id.toString()}>
      <p>"{review.body}" - {review.username}</p>
      <p>{review.rating}/5</p>
      <p>{review.createdAt ? review.createdAt.toLocaleDateString() : "04/01/2024"}</p>
      <p>{updatedVotes} votes</p>
      <button onClick={handleVote} disabled={voted} className={style.button}>
        {voted ? 'Voted!' : 'Like'}
      </button>
      {voteMessage && <p  className={style.login}>{voteMessage}</p>}

      {review.user_id === userID ? (
        <button onClick={handleDelete} className={style.button}>
          Delete
        </button>
      ) : null}
    </section>
  );
};

export default ReviewsCard;