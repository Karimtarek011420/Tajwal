import axios from "axios";
import Swal from "sweetalert2";

// A refactored logoutApi function
export const logoutApi = async (
  token,
  settoken,
  logoutUrl = "https://api.tajwal.co/api/v1/logout"
) => {
  try {
    const { data } = await axios.get(logoutUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (data.success) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "تم تسجيل الخروج بنجاح",
        showConfirmButton: false,
        timer: 500,
        toast: true,
        background: "#4b87a4",
        color: "white",
        iconColor: "white",
        padding: "10px 20px",
        width: 400,
        timerProgressBar: true,
      });

      setTimeout(() => {
        settoken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }, 500);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "يرجى المحاولة مرة أخرى لاحقًا";

    Swal.fire({
      position: "top",
      icon: "error",
      title: "فشل تسجيل الخروج",
      text: errorMessage,
      showConfirmButton: true,
      background: "#E14F72",
      color: "white",
    });

    // Log the error for debugging
    console.error("Logout API Error:", error);
  }
};
