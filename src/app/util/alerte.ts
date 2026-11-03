import Swal from "sweetalert2";

export class Alertes {
  static error(arg0: string) {
    throw new Error('Method not implemented.');
  }
  static success(arg0: string) {
    throw new Error('Method not implemented.');
  }

    static confirmAction(titre: string, text: string, callbacks: any, callbacks2?: any) {
        Swal.fire(
            {
                title: titre,
                icon: 'question',
                html: text,
                showCancelButton: true,
                cancelButtonText: 'Non',
                confirmButtonText: 'Oui'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                callbacks();
            } else {
                if (callbacks2) {
                    callbacks2();
                }
            }
        })
    }

  static infoPopPup(titre: string, text: string, callbacks?: any, callbacks2?: any) {
    Swal.fire(
      {
        title: titre,
        icon: 'question',
        text: text,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Enregistrer',
      }
    ).then((result: any) => {
      if (result.isConfirmed) {
        callbacks();
      } else {
        if (callbacks2) {
          callbacks2();
        }
      }
    })
  }

    static alerteResponse(titre: string, text: string, callbacks: any) {
        Swal.fire(
            {
                title: titre,
                icon: 'info',
                text: text,
                showCancelButton: false,
                confirmButtonText: "Ok"
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                callbacks();
            }
        })
    }

    static alerteGlobal(successMessage?: string, errorMessage?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: successMessage ? successMessage : errorMessage,
                icon: successMessage ? 'success' : 'error'
            }
        )
    }

    static alerteAddSuccess(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: message ? 'Enregistrement réussi: ' + ' ' + message ? message : '' : 'Enregistrement réussi',
                icon: 'success'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteAddDanger(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: message ? 'Enregistrement échoué: ' + ' ' + message : 'Enregistrement échoué',
                icon: 'error'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteDeleteSuccess(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: message ? 'Suppresion réussie :' + ' ' + message : 'Suppresion réussie',
                icon: 'success'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteDeleteDanger(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Suppresion échoué: ' + ' ' + message,
                icon: 'error'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteUpdateSuccess(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: message ? 'Modification réussie: ' + ' ' + message : 'Modification réussie',
                icon: 'success'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteUpdateDanger(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Modification échouée: ' + ' ' + message,
                icon: 'error'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static draftAction(titre: string, text: string, callbacks: any, callbacks2?: any) {
        Swal.fire(
            {
                title: titre,
                icon: 'question',
                text: text,
                showCancelButton: true,
                cancelButtonText: 'non',
                confirmButtonText: 'Mettre en brouillon'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                callbacks();
            } else {
                if (callbacks2) {
                    callbacks2();
                }
            }
        })
    }

    static errorPopPup(titre: string, text: string, callbacks?: any, callbacks2?: any) {
        Swal.fire(
            {
                title: titre,
                icon: 'error',
                text: text,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK',
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                callbacks();
            } else {
                if (callbacks2) {
                    callbacks2();
                }
            }
        })
    }
    static successPopPup(titre: string, text: string, callbacks?: any, callbacks2?: any) {
        Swal.fire(
            {
                title: titre,
                icon: 'success',
                text: text,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK',
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                callbacks();
            } else {
                if (callbacks2) {
                    callbacks2();
                }
            }
        })
    }

    static alerteValidSuccess(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: message ? message:  'Validation réussie',
                icon: 'success'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

    static alerteValidDanger(message?: string) {
        Swal.fire(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Validation échouée: ' + ' ' + message,
                icon: 'error'
            }
        ).then((result: any) => {
            if (result.isConfirmed) {
                // callbacks();
            }
        })
    }

  static alerteCustomDanger(message?: string) {
    Swal.fire(
      {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: message,
        icon: 'error'
      }
    ).then((result: any) => {
      if (result.isConfirmed) {
        // callbacks();
      }
    })
  }

  static alerteCustomSucces(message?: string) {
    Swal.fire(
      {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: message,
        icon: 'success'
      }
    ).then((result: any) => {
      if (result.isConfirmed) {
        // callbacks();
      }
    })
  }
}
