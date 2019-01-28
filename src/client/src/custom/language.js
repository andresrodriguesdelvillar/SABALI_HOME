export const register = {
  en: {
    title: "Register",
    Name: {
      label: "Name",
      errors: {
        space: "The name can not begin or end with a space",
        length: "the name needs to be at least 3 characters long",
        symbols:
          "the name can only contain latin-letters and the following symbols (_, -, ., &)"
      }
    },
    Company: {
      label: "Company",
      errors: {
        space: "The company can not begin or end with a space",
        symbols:
          "the company name can only contain latin-letters and the following symbols (_, -, ., &)"
      }
    },
    Email: {
      label: "Email",
      errors: { valid: "That is not a valid Email adress" }
    },
    Password: {
      label: "Password",
      errors: {
        length: "The password needs to contain at least 8 characters",
        uppercase: "The password needs to contain at least one c letter",
        symbol: "The password needs to contain at least one number or symbol"
      }
    },
    ConfPass: {
      label: "Confirm Password",
      errors: {
        match: "The password confirmation does not match the password"
      }
    },
    registrationErrors: {
      Email: "The Email is already registered",
      Server: "Oops, there has been a server error, please try again"
    },
    submitButton: "Register"
  },
  de: {
    title: "Anmelden",
    Name: {
      label: "Name",
      errors: {
        space: "Der Name darf nicht mit einem Leerzeichen beginnen oder enden",
        length: "Der Name muss mindestens 3 Zeichen enthalten",
        symbols:
          "Der Name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, ., &)"
      }
    },
    Company: {
      label: "Firma",
      errors: {
        space:
          "Der Firmen-name darf nicht mit einem Leerzeichen beginnen oder enden",

        symbols:
          "Der Firmen-name darf nur lateinische Buchstaben und die folgenden Symbole enthalten (_, -, ., &)"
      }
    },
    Email: {
      label: "Email",
      errors: { valid: "Dies ist keine gültige Email adresse" }
    },
    Password: {
      label: "Passwort",
      errors: {
        length: "Das Passwort muss mindestens 8 Zeichen enthalten",
        uppercase:
          "Das Passwort muss mindestens einen Großbuchstaben enthalten",
        symbol: "Das Passwort muss mindestens eine Zahl oder Symbol enthalten"
      }
    },
    ConfPass: {
      label: "Passwort Bestätigung",
      errors: {
        match: "Die Passwörter stimmen nicht überein"
      }
    },
    registrationErrors: {
      Email: "Diese Email ist schon registriert",
      Server:
        "Oops, Ein server-error ist aufgetreten, bitte versuchen sie es erneut"
    },
    submitButton: "Anmelden"
  },
  nl: {
    title: "Registreren",
    Name: {
      label: "Naam",
      errors: {
        space: "De naam mag niet met een spatie beginnen of eindigen",
        length: "De naam moet tenminst 3 karaters bevatten",
        symbols:
          "De naam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, ., &)"
      }
    },
    Company: {
      label: "Bedrijf",
      errors: {
        space: "De bedrijfsnaam mag niet met een spatie beginnen of eindigen",

        symbols:
          "De bedrijfsnaam mag allein lateinische karakters en de volgenden symbole bevatten (_, -, ., &)"
      }
    },
    Email: {
      label: "Email",
      errors: { valid: "Dat is geen geldige Emailadres" }
    },
    Password: {
      label: "Wachtwoord",
      errors: {
        length: "De wachtwoord moet tenminst 8 karakters bevatten",
        uppercase: "De wachtwoord moet tenminst een hooftletter bevatten",
        symbol: "De wachtwoord moet tenminst een getal of symbol bevatten"
      }
    },
    ConfPass: {
      label: "Wachtwoord bevestiging",
      errors: {
        match: "De wachtwoorden komen niet overeen"
      }
    },
    registrationErrors: {
      Email: "De Email is al in gebruik",
      Server:
        "Oops, er was een error met de server, probeer het opnieuw alsteblieft"
    },
    submitButton: "Registreren"
  },
  es: {
    title: "Register",
    Name: {
      label: "Nombre",
      errors: {
        space: "El nombre no puede comenzar o terminar con un espacio",
        length: "El nombre requiere mínimo 3 caracteres",
        symbols:
          "El nombre de la compañia debe de consistir solamente de caracteres latinos o los símbolos (_, -, ., &)"
      }
    },
    Company: {
      label: "Compañia",
      errors: {
        space:
          "El nombre de la compañia no puede comenzar o terminar con un espacio",
        symbols:
          "El nombre de la compañia debe de consistir solamente de caracteres latinos o los símbolos (_, -, ., &)"
      }
    },
    Email: {
      label: "Email",
      errors: { valid: "El correo electrónico no es valido" }
    },
    Password: {
      label: "contraseña",
      errors: {
        length: "La contraseña necesita mínimo 8 letras",
        symbol: "La contraseña necesita por lo menos un numero o símbol",
        uppercase: "La contraseña necesita por lo menos una letra mayúscula"
      }
    },
    ConfPass: {
      label: "confirmación de contraseña",
      errors: { match: "La verificación de la contraseña no cuadra" }
    },
    registrationErrors: {
      Email: "The Email is already registered",
      Server: "Oops there has been a server error, please try again"
    },
    submitButton: "Register"
  }
};

export const clientLinks = {
  en: {
    login: "Login",
    register: "Register",
    logout: "Logout"
  },
  de: {
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden"
  },
  nl: {
    login: "Aanmelden",
    register: "Registreren",
    logout: "Uitloggen"
  },
  es: {
    login: "Registrar",
    register: "Register",
    logout: "cierre de sesión"
  }
};

export const login = {
  en: {
    title: "Login",
    Email: {
      label: "Email",
      errors: { valid: "That is not a valid Email adress" }
    },
    Password: {
      label: "Password"
    },
    loginErrors: {
      Email: "This Email is not registered",
      Password: "The Password you have entered is wrong",
      Confirmed:
        "The Email is not confirmed. Please confirm your Email to login",
      Server: "Oops, there has been a server error, please try again"
    },
    submitButton: "Login",
    resend: {
      button: "Resend Email",
      messages: {
        success: "Email was send again!",
        error: "Email was not send, please try again!"
      }
    }
  },
  de: {
    title: "Anmelden",
    Email: {
      label: "Email",
      errors: { valid: "Dies ist keine gültige Email adresse" }
    },
    Password: {
      label: "Passwort"
    },
    loginErrors: {
      Email: "Diese Email ist nicht registriert",
      Password: "Das eingegebene Passwort ist falsch",
      Confirmed:
        "Diese Emailadresse ist nicht bestätigt. Bitte bestätigen sie die Emailadresse um sich an zu melden",
      Server:
        "Oops, Ein server-error ist aufgetreten, bitte versuchen sie es erneut"
    },
    submitButton: "Anmelden",
    resend: {
      button: "Email erneut senden",
      messages: {
        success: "Email wurde erneut gesendet!",
        error:
          "Email konnte nicht versendet werden, bitte versuchen sie es erneut!"
      }
    }
  },
  nl: {
    title: "Aanmelden",
    Email: {
      label: "Email",
      errors: { valid: "Dat is geen geldige Emailadres" }
    },
    Password: {
      label: "Wachtwoord"
    },

    loginErrors: {
      Email: "Deze Email is ons niet bekent",
      Password: "De wachtwoord is fout",
      Confirmed:
        "Deze Email is niet bevestigt. U moet de Email bevestigen om U aan te melden",
      Server:
        "Oops, er was een error met de server, probeer het opnieuw alsteblieft"
    },
    submitButton: "Aanmelden",
    resend: {
      button: "Emain opnieuw senden",
      messages: {
        success: "Email werd opnieuw gerstuurt!",
        error: "Email kon niet worden gestuurt, probeer het opnieuw!"
      }
    }
  },
  es: {
    title: "Registrar",
    Email: {
      label: "Email",
      errors: { valid: "El email no es valido" }
    },
    Password: {
      label: "Contraseña"
    },

    loginErrors: {
      Email: "Este email no esta registrado",
      Password: "La contraseña esta mal",
      Confirmed:
        "Este correo electrónico no esta registrado. Tienes que activarlo",
      Server: "Hay un problemita con el servidor, por favor trate de nuevo"
    },
    submitButton: "Registrar",
    resend: {
      button: "Mandar email de nuevo",
      messages: {
        success: "Hemos mandado el correo otra vez!",
        error: "El correo no fue enviado, por favor trate otra vez!"
      }
    }
  }
};

export const confirmEmailInfo = {
  en: {
    main: "We have sent an email to: ",
    resend: {
      text: "Did not reseive an Email?",
      button: "Resend Email",
      messages: {
        success: "Email was send again!",
        error: "Email was not send, please try again!"
      }
    },
    changeEmail: {
      text: "The Email is wrong, or you have no access to it",
      button: "Change Email",
      error: "This is not a valid Emailadress",
      result: {
        success: "The Email was successfully changed",
        Auth:
          "The authorization failed. Please use the password you've entered in the registration",
        Email: "The Email you wanted to change to is already registered",
        Server: "There has been a server-error, please try again",
        ConfirmationMail:
          "The Email adress was changed, but there was an error sending the new confirmation mail. Please try to send the Email again, or contact our support."
      }
    }
  },
  de: {
    main: "Wir haben eine Email an die folgende adresse gesendet: ",
    resend: {
      text: "Keine Email erhalten?",
      button: "Email erneut senden",
      messages: {
        success: "Email wurde erneut gesendet!",
        error:
          "Email konnte nicht versendet werden, bitte versuchen sie es erneut!"
      }
    },
    changeEmail: {
      text: "Die Email ist falsch, oder sie haben keinen Zugriff?",
      button: "Email ändern",
      error: "Dies ist keine gültige Email adresse",
      result: {
        success: "Die Emailadresse wurde geändert",
        Auth:
          "Das hat nicht funktioniert. Bitte benutzen sie das Passwort aus der Registrierung",
        Email: "Diese Emailadresse ist bereits registriert",
        Server: "Es gab einen Server-error, bitte versuchen sie es erneut",
        ConfirmationMail:
          "Die Emailadresse wurde geändert, aber es gab ein problem beim senden der neuen Bestätigungsmail. Bitte versuchen sie die Email erneut zu versenden und/oder kontaktieren sie unseren Support"
      }
    }
  },
  nl: {
    main: "We hebben een email aan de volgende adres gestuurt: ",
    resend: {
      text: "Geen email ontvangen?",
      button: "Emain opnieuw senden",
      messages: {
        success: "Email werd opnieuw gerstuurt!",
        error: "Email kon niet worden gestuurt, probeer het opnieuw!"
      }
    },
    changeEmail: {
      text: "De Email is fout, of U hebt geen access?",
      button: "Email veranderen",
      error: "Dat is geen geldige Email adres",
      result: {
        success: "De Emailadres werd verandert",
        Auth:
          "De autorizatie is mislukt. Gebruik alsteblieft de wachtwoord van de registratie",
        Email: "Deze Emailadres is al geregistreerd",
        Server: "Er was een error met de server, probeer het opnieuw",
        ConfirmationMail:
          "De Emailadres werd verandert, maar er was een problem met het senden van de bevestigingsemail. probeer de email opnieuw te versturen en/of contacteer onze support"
      }
    }
  },
  es: {
    main: "Te hemos mandado un email. Hacia:   ",
    resend: {
      text: "No recibió email?",
      button: "Mandar email de nuevo",
      messages: {
        success: "Hemos mandado el correo otra vez!",
        error: "El correo no fue enviado, por favor trate otra vez!"
      }
    },
    changeEmail: {
      text: "El email es incorrecto, o no tienes acceso?",
      button: "Cambiar email",
      error: "El email no es válido",
      result: {
        success: "El email a sido cambiado",
        Auth:
          "La autorización no es valida. Usa la contraseña que usaste a la hora de registrarte",
        Email: "El email que trataste de usar ya esta registrado",
        Server: "Hay un problemo con el servidor, por favor trate de nuevo",
        ConfirmationMail:
          "El email se cambió pero ha ávido un error mandando el email de confirmación, por favor trata de mandar el email de nuevo o contacta nos"
      }
    }
  }
};

export const confirmError = {
  en: {
    text:
      "This emailadress is not registered. If you changed your email adress please open the confirmationlink within the new Emailadress. Otherwise contact our support"
  },
  de: {
    text:
      "Diese Emailadresse ist nicht registriert. Wahrscheinlich haben sie die Emailadresse geändert. In dem Fall öffnen sie bitte den Link in der neuen Email bestätigungs mail. Andernfalls kontaktieren sie bitte unseren Support"
  },
  nl: {
    text:
      "Deze Emailadres is niet geregistrert. Waarschijnlijk hebt U de Emailadres gewisselt, in dat geval open alsteblieft de link in de nieuwe Email. Als dat niet de geval is contacteer alsteblieft onze Support."
  },
  es: {
    text:
      "Este correo electronico no esta registrado. Si cambiaste tu correo, por favor abre el nuevo enlace de confirmación. O contáctanos"
  }
};
