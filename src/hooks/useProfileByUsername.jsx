import React, { useEffect, useState } from "react";
import { useUserProfileStore } from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setUserProfile({});
          return;
        }

        const userDoc = querySnapshot.docs[0].data(); // Directly getting the first document
        setUserProfile(userDoc);
        console.log(userDoc, "userdoc");
      } catch (error) {
        // Handle error (Ensure you have a showToast or any alert system)
        console.error("Error fetching user profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username]);

  return { isLoading, userProfile };
};

export default useProfileByUsername;
