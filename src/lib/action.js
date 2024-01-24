"use server"

import { Users } from "@/models/users";
import { signIn, signOut } from "./auth";
import { connectToDatabase } from "./db";
import bcrypt from 'bcryptjs'
import { deleteReviewByLocation, postLocation, removeLocation } from "./data";
import { addSavedLocation, deleteOneReview, deleteSavedLocation, getLocationById, getUserByEmail, removeReviewFromLocation, updateLocationWithReviewId } from "./data";
import { voteForReview, postReview } from './data';
import { revalidatePath } from "next/cache";


export const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/explore" })
}

export const handleLogout = async () => {
    await signOut()
}

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)
    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" }
    }

    try {
        connectToDatabase()

        const usernameUser = await Users.findOne({ username })

        if (usernameUser) {
            return { error: "Username already exists" }
        }

        const emailUser = await Users.findOne({ email })

        if (emailUser) {
            return { error: "Email is already used" }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            img,
            saved_locations: []
        })

        await newUser.save();
        return { success: true }
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong" }
    }
}

export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", {username, password})
    } catch (err) {
        if (err.type === "CredentialsSignin") {
            return {error: "Invalid username or password"}
        }
        throw err;
    }
}

export const submitReview = async (formData) => {

    try {
        const postedReview = await postReview(formData);
        const locationId = postedReview.location_id;
        const reviewId = postedReview._id;
        const newRating = postedReview.rating;  // Make sure this is correct

        let formattedReturn = postedReview.toObject ? postedReview.toObject() : { ...postedReview };

        if (formattedReturn.location_id) formattedReturn.location_id = formattedReturn.location_id.toString();
        if (formattedReturn.user_id) formattedReturn.user_id = formattedReturn.user_id.toString();
        if (formattedReturn._id) formattedReturn._id = formattedReturn._id.toString();



        const locationData = await getLocationById(locationId);
        const singleLocation = locationData[0]

        if (!singleLocation || !Array.isArray(singleLocation.reviews_by_id)) {
            throw new Error("Invalid location data received");
        }

        const { reviews_by_id, rating } = singleLocation;
        const newAverage = ((rating * reviews_by_id.length) + newRating) / (reviews_by_id.length + 1);
        await updateLocationWithReviewId({ locationId, reviewId, newAverage });

        return formattedReturn;
    } catch (error) {
        console.error("Error in submitReview:", error);
        throw new Error("Failed to add review: " + error.message);
    }
};


export const submitLocation = async (formData) => {
    try {
        await postLocation(formData)
    } catch (error) {
        console.log(error, "error")
        throw new Error("Failed to post location")
    }
};

export const deleteReview = async ({ reviewId, locationId }) => {
    try {
        const deletedReview = await deleteOneReview(reviewId)
        const removedReviewIdLocation = await removeReviewFromLocation(reviewId, locationId)
    } catch {
        console.log(error, "error in deleteReview")
    }
};

export const handleVoting = async (reviewId) => {
    try {
        const updatedReview = await voteForReview(reviewId);
        return updatedReview
    } catch (error) {
        console.log(error);

    }
};


export const saveLocationAction = async (id, email) => {
    const user = await getUserByEmail(email)
    try {
        if (user.savedLocations.includes(id)) {
            await deleteSavedLocation(id, user)
        } else {
            await addSavedLocation(id, user)
        }

        revalidatePath('/saved')
        revalidatePath('/explore')
        revalidatePath('/explore/[id]')

    } catch (error) {
        console.log(error)
    }
}

export const deleteLocation = async (locationId) => {
    try {

        await removeLocation(locationId)
        await deleteReviewByLocation(locationId)
    } catch (error) {
        console.log(error)
    }
}