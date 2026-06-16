import Swal from "sweetalert2"

export namespace Alerts {

  export const Success = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Warning = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Error = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Loading = (message: string = 'Cargando...') => {
    Swal.fire({
      text: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  export const Question = (question: string) => {
    return Swal.fire({
      text: question,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar'
    })
  }

  export function Close(timeOut: number = 0): void {
    setTimeout(() => Swal.close(), timeOut);
  }

}