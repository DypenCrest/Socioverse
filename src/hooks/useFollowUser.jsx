import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUserProfileStore } from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    const userToFollowOrUnfollowRef = doc(firestore, "users", userId);
    try {
      const currentUserRef = doc(firestore, "users", user.uid);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        // unfollow
        setUser({
          ...user,
          following: user.following.filter((uid) => uid !== userId),
        });
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== user.uid),
          });

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            following: user.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        // follow
        setUser({
          ...user,
          following: [...user?.following, userId],
        });

        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            following: [...user.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const isFollow = user?.following?.includes(userId);
    console.log(isFollow, "isfollow");
    setIsFollowing(isFollow);
  }, [user, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
