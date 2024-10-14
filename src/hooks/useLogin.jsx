import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";

const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (formData) => {
    try {
      const userCred = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("user", JSON.stringify(docSnap.data()));
          loginUser();
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.log("Login failed:", errorMessage);
    }
  };

  return { login, loading, error };
};

export default useLogin;
