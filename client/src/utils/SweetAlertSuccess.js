
import Swal from 'sweetalert2'
const sweetAlertSuccess = (title)=>{
  Swal.fire({
    title: title,
    icon: "success",
    confirmButtonColor:'#00b050'
  });
} 

export default sweetAlertSuccess