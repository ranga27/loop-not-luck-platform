import Swal from 'sweetalert2';
import { getUserError } from './getUserError';

const showUserError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: getUserError(error),
  });
};

export default showUserError;
