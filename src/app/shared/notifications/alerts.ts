import Swal from "sweetalert2"

export namespace Alerts {

  export const Success = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Warning = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Error = (message: string) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  export const Loading = (message: string = 'Cargando...') => {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  export const Question = (question: string) => {
    return Swal.fire({
      title: question,
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