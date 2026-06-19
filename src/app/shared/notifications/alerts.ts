import Swal from "sweetalert2";

function withFix(options: any): any {
  const originalDidOpen = options.didOpen;
  return {
    ...options,
    didOpen: (popup: HTMLElement) => {
      requestAnimationFrame(() => {
        const container = popup.closest('.swal2-container') as HTMLElement;
        if (container) container.style.setProperty('z-index', '100000001', 'important');
        (document.querySelector('.swal2-backdrop') as HTMLElement)?.style.setProperty('z-index', '100000000', 'important');
      });
      originalDidOpen?.();
    }
  };
}

export namespace Alerts {

  export const Success = (message: string) => {
    Swal.fire(withFix({
      icon: 'success',
      text: message,
      showConfirmButton: false,
      timer: 2000
    }));
  }

  export const Warning = (message: string) => {
    Swal.fire(withFix({
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      timer: 2000
    }));
  }

  export const Error = (message: string) => {
    Swal.fire(withFix({
      icon: 'error',
      text: message,
      showConfirmButton: false,
      timer: 2000
    }));
  }

  export const Loading = (message: string = 'Cargando...') => {
    Swal.fire(withFix({
      text: message,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    }));
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