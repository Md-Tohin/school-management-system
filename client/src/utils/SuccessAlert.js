import Swal from "sweetalert2"

const SuccessAlert = (message) => {
    const alert = Swal.fire({
        icon: "success",
        title: message,
        confirmButtonColor: "#00b050"
    })

    return alert;
}

export default SuccessAlert;