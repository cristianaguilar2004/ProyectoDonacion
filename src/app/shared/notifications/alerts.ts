import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";

export namespace Alerts {

  function getTarget(): HTMLElement {
    return (document.querySelector('.cdk-overlay-container') as HTMLElement) ?? document.body;
  }

  function base(): Partial<SweetAlertOptions> {
    return {
      target: getTarget(),
      backdrop: false
    };
  }

  export const Success = (message: string) => {
    Swal.fire({
      ...base(),
      icon: 'success',
      text: message,
      showConfirmButton: false,
      timer: 2000
    } as SweetAlertOptions);  // ← cast aquí
  }

  export const Warning = (message: string) => {
    Swal.fire({
      ...base(),
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      timer: 2000
    } as SweetAlertOptions);
  }

  export const Error = (message: string) => {
    Swal.fire({
      ...base(),
      icon: 'error',
      text: message,
      showConfirmButton: false,
      timer: 2000
    } as SweetAlertOptions);
  }

  export const Loading = (message: string = 'Cargando...') => {
    Swal.fire({
      ...base(),
      text: message,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    } as SweetAlertOptions);
  }

  export const Question = (question: string) => {
    return Swal.fire({
      ...base(),
      text: question,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar'
    } as SweetAlertOptions);
  }

  export function Close(timeOut: number = 0): void {
    setTimeout(() => Swal.close(), timeOut);
  }
}