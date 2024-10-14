import { doc, setDoc } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth, firestore } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const useSignup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (formData) => {
    console.log(formData, "formdata");
    try {
      // Create user with email and password
      const newUser = await createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // If the user creation failed, the error state would be handled below.
      if (newUser) {
        // Define the user document
        const userDoc = {
          uid: newUser.user.uid,
          email: formData.email,
          username: formData.username,
          fullName: formData.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        // Add user data to Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userDoc));
        loginUser();
        toast.success("User created successfully");
      }
    } catch (err) {
      // Handle Firestore or Firebase Authentication errors
      console.log(err, "err");
    }
  };

  // Handle error coming from Firebase Hooks
  if (error) {
    toast.error(error.code);
  }

  return { loading, error, signup };
};

export default useSignup;
